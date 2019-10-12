import React from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause } from 'react-icons/fa';
import formatTime from '../lib/formatTime';
import VolumeBars from './VolumeBars';
import ls from '../lib/localstorage-object'
import upgradeLocalStorage from '../lib/upgrade-localstorage'

export default class Player extends React.Component {
  static propTypes = {
    show: PropTypes.object.isRequired,
    enableLocalStorage: PropTypes.bool,
  };

  static defaultProps = {
    enableLocalStorage: true,
  }

  constructor(props) {
    super(props);

    const initialState = {
      progressTime: 50,
      playing: false,
      duration: 0,
      currentTime: 0,
      currentVolume: 1,
      playbackRate: 1,
      timeWasLoaded: false,
      showTooltip: false,
      tooltipPosition: 0,
      tooltipTime: '0:00'
    }

    // for Server Side Rendering
    if (typeof window !== 'undefined' && this.props.enableLocalStorage) {

      upgradeLocalStorage()

      const { show } = this.props;
      const currentTimeLabel = `currentTime${show.number}`
      
      if (ls.currentVolume) initialState.currentVolume = ls.currentVolume
      if (ls.playbackRate) initialState.playbackRate = ls.playbackRate
      if (ls[currentTimeLabel]) initialState.currentTime = ls[currentTimeLabel]

    }

    initialState.timeWasLoaded = initialState.lastPlayed !== 0,
    this.state = initialState
  } // END Constructor

  componentWillUpdate(nextProps, nextState) {
    this.audio.playbackRate = nextState.playbackRate;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.enableLocalStorage) return

    const { show } = this.props;
    const currentTimeLabel = `currentTime${show.number}`
    if (show.number !== prevProps.show.number) { //show changed
      const currentTime = ls[currentTimeLabel]
      this.audio.currentTime = currentTime
      this.setState({currentTime})
      this.audio.play();
    }
    else {
      ls[currentTimeLabel] = this.state.currentTime
      ls.currentVolume = this.state.currentVolume
      ls.playbackRate = this.state.playbackRate
    }
  }

  timeUpdate = e => {
    // console.log('Updating Time');
    const { show } = this.props;
    const currentTimeLabel = `currentTime${show.number}`

    const { timeWasLoaded } = this.state;
    // Check if the user already had a curent time
    if (timeWasLoaded) {
      if (this.props.enableLocalStorage) {
        e.currentTarget.currentTime = ls[currentTimeLabel]
      }
      this.setState({ timeWasLoaded: false });
    } else {
      const { currentTime = 0, duration = 0 } = e.currentTarget;
      const progressTime = (currentTime / duration) * 100;
      if (Number.isNaN(progressTime)) return;
      this.setState({ progressTime, currentTime, duration });
    }
  };

  volumeUpdate = e => {
    const { timeWasLoaded } = this.state;
    // Check if the user already had a curent volume
    if (timeWasLoaded) {
      const lastVolume = localStorage.getItem(`lastVolumeSetting`);
      if (lastVolume) {
        e.currentTarget.volume = JSON.parse(lastVolume).lastVolumePref;
      }
      this.setState({ timeWasLoaded: false });
    }
  };

  groupUpdates = e => {
    this.timeUpdate(e);
    this.volumeUpdate(e);
  };

  togglePlay = () => {
    const { playing } = this.state;
    const method = playing ? 'pause' : 'play';
    this.audio[method]();
  };

  scrubTime = eventData =>
    (eventData.nativeEvent.offsetX / this.progress.offsetWidth) *
    this.audio.duration;

  scrub = e => {
    this.audio.currentTime = this.scrubTime(e);
  };

  seekTime = e => {
    this.setState({
      tooltipPosition: e.nativeEvent.offsetX,
      tooltipTime: formatTime(this.scrubTime(e))
    });
  };

  playPause = () => {
    this.setState({ playing: !this.audio.paused });
    const method = this.audio.paused ? 'add' : 'remove';
    document.querySelector('.bars').classList[method]('bars--paused'); // 💩
  };

  volume = e => {
    this.audio.volume = e.currentTarget.value;
    this.setState({
      currentVolume: `${e.currentTarget.value}`
    });
  };

  speedUp = () => {
    this.speed(0.25);
  };

  speedDown = e => {
    e.preventDefault();
    this.speed(-0.25);
  };

  speed = change => {
    const playbackRateMax = 2.5;
    const playbackRateMin = 0.75;

    let playbackRate = this.state.playbackRate + change;

    if (playbackRate > playbackRateMax) {
      playbackRate = playbackRateMin;
    }

    if (playbackRate < playbackRateMin) {
      playbackRate = playbackRateMax;
    }

    this.setState({ playbackRate });
  };

  render() {
    const { show } = this.props;
    const {
      playing,
      playbackRate,
      progressTime,
      currentTime,
      duration,
      showTooltip,
      tooltipPosition,
      tooltipTime
    } = this.state;

    return (
      <div className="player">
        <div className="player__section player__section--left">
          <button
            onClick={this.togglePlay}
            aria-label={playing ? 'pause' : 'play'}
            type="button"
          >
            <p className="player__icon">{playing ? <FaPause /> : <FaPlay />}</p>
            <p>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </button>
        </div>

        <div className="player__section player__section--middle">
          <div
            className="progress"
            onClick={this.scrub}
            onMouseMove={this.seekTime}
            onMouseEnter={() => {
              this.setState({ showTooltip: true });
            }}
            onMouseLeave={() => {
              this.setState({ showTooltip: false });
            }}
            ref={x => (this.progress = x)}
          >

            {/* eslint-enable */}

            <div
              className="progress__time"
              style={{ width: `${progressTime}%` }}
            />
          </div>
          <h3 className="player__title">
            Playing: {show.displayNumber}: {show.title}
          </h3>
          <div
            className="player__tooltip"
            style={{
              left: `${tooltipPosition}px`,
              opacity: `${showTooltip ? '1' : '0'}`
            }}
          >
            {tooltipTime}
          </div>
        </div>

        <div className="player__section player__section--right">
          <button
            onClick={this.speedUp}
            onContextMenu={this.speedDown}
            className="player__speed"
            type="button"
          >
            <p>FASTNESS</p>
            <span className="player__speeddisplay">{playbackRate} &times;</span>
          </button>
          <div className="player__volume">
            <p>LOUDNESS</p>
            <div className="player__inputs">

              <VolumeBars volume={this.volume} />

            </div>
          </div>
        </div>
        <audio
          ref={audio => (this.audio = audio)}
          onPlay={this.playPause}
          onPause={this.playPause}
          onTimeUpdate={this.timeUpdate}
          onVolumeChange={this.volumeUpdate}
          onLoadedMetadata={this.groupUpdates}
          src={show.url}
        />
      </div>
    );
  }
}
