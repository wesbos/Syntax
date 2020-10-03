import React from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause } from 'react-icons/fa';
import formatTime from '../lib/formatTime';
import VolumeBars from './VolumeBars';

export default class Player extends React.Component {
  static propTypes = {
    show: PropTypes.object.isRequired,
    clickedTimestamp: PropTypes.number,
    onPlayPause: PropTypes.func,
  };

  constructor(props) {
    super(props);

    let lastPlayed = 0;
    let lastVolumePref = 1;
    let lastPlaybackRate = 1;

    // for Server Side Rendering
    if (typeof window !== 'undefined') {
      const { show } = this.props;
      const lp = localStorage.getItem(`lastPlayed${show.number}`);
      const lastVolume = localStorage.getItem(`lastVolumeSetting`);
      const lastPlayback = localStorage.getItem(`lastPlaybackSetting`);

      if (lp) lastPlayed = JSON.parse(lp).lastPlayed; //eslint-disable-line
      if (lastVolume) lastVolumePref = JSON.parse(lastVolume).lastVolumePref; //eslint-disable-line
      if (lastPlayback)
        lastPlaybackRate = JSON.parse(lastPlayback).lastPlaybackRate; //eslint-disable-line
    }

    this.state = {
      progressTime: 50,
      playing: false,
      duration: 0,
      currentTime: lastPlayed,
      currentVolume: lastVolumePref,
      playbackRate: lastPlaybackRate,
      timeWasLoaded: lastPlayed !== 0,
      showTooltip: false,
      tooltipPosition: 0,
      tooltipTime: '0:00',
    };
  } // END Constructor

  componentWillUpdate(nextProps, nextState) { //eslint-disable-line
    this.audio.playbackRate = nextState.playbackRate;
  }

  componentDidUpdate(prevProps, prevState) { //eslint-disable-line
    const { show, clickedTimestamp } = this.props;
    const { currentTime, currentVolume, playbackRate } = this.state;
    if (show.number !== prevProps.show.number) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`);
      if (lp) {
        const lastVolume = localStorage.getItem(`lastVolumeSetting`);
        const lastPlayback = localStorage.getItem(`lastPlaybackSetting`);
        const data = JSON.parse(lp);
        const data2 = JSON.parse(lastVolume);
        const data3 = JSON.parse(lastPlayback);
        // eslint-disable-next-line
        this.setState({
          currentTime: data.lastPlayed,
          currentVolume: data2.lastVolumePref,
          playbackRate: data3.lastPlaybackRate,
        });
        this.audio.currentTime = data.lastPlayed;
        this.audio.volume = data2.lastVolumePref;
        this.audio.playbackRate = data3.lastPlaybackRate;
      }
      this.audio.play();
    } else {
      localStorage.setItem(
        `lastPlayed${show.number}`,
        JSON.stringify({ lastPlayed: currentTime })
      );
      localStorage.setItem(
        `lastVolumeSetting`,
        JSON.stringify({ lastVolumePref: currentVolume })
      );
      localStorage.setItem(
        `lastPlaybackSetting`,
        JSON.stringify({ lastPlaybackRate: playbackRate })
      );
    }
    if (clickedTimestamp !== prevProps.clickedTimestamp) {
      this.audio.currentTime = clickedTimestamp;
    }
  }

  timeUpdate = e => {
    // console.log('Updating Time');
    const { show } = this.props;
    const { timeWasLoaded } = this.state;
    // Check if the user already had a curent time
    if (timeWasLoaded) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`);

      if (lp) {
        e.currentTarget.currentTime = JSON.parse(lp).lastPlayed;
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
      tooltipTime: formatTime(this.scrubTime(e)),
    });
  };

  playPause = () => {
    this.setState({ playing: !this.audio.paused });
    this.props.onPlayPause(this.audio)
  };

  volume = e => {
    this.audio.volume = e.currentTarget.value;
    this.setState({
      currentVolume: `${e.currentTarget.value}`,
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

    let playbackRate = this.state.playbackRate + change; //eslint-disable-line

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
      tooltipTime,
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
          {/* eslint-disable */}
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
              opacity: `${showTooltip ? '1' : '0'}`,
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
        {/* eslint-disable */}
        <audio
          ref={audio => (this.audio = audio)}
          onPlay={this.playPause}
          onPause={this.playPause}
          onTimeUpdate={this.timeUpdate}
          onVolumeChange={this.volumeUpdate}
          onLoadedMetadata={this.groupUpdates}
          src={show.url}
        />
        {/* eslint-enable */}
      </div>
    );
  }
}
