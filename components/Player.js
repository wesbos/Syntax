import React from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause } from 'react-icons/fa';
import formatTime from '../lib/formatTime';
import styled from 'styled-components';
import { theme, mixins, media } from '../styles';
const { colors } = theme;

const PlayerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  top: -1px;
  bottom: 0;
  width: 100%;
  background: ${colors.black};
  border-top: 1px solid ${colors.yellow};
  color: ${colors.white};
  z-index: 2;
  button {
    ${mixins.flexCenter};
    justify-content: space-around;
    flex-direction: column;
    background: ${colors.black};
    color: ${colors.white};
    border: 0;
    padding: 1rem;
    border-right: 1px solid rgba(0, 0, 0, 0.6);
    outline-color: ${colors.yellow};
    font-size: 10px;
  }
`;
const PlayerSection = styled.div`
  order: 2;
  background: ${colors.black};
`;
const PlayerLeft = styled(PlayerSection)`
  width: 100px;
  min-width: 80px;
  ${media.phablet`
    flex: 1;
  `};
`;
const PlayButton = styled.button`
  width: 100%;
`;
const PlayerIcon = styled.div`
  font-size: 2rem;
  line-height: 0.5;
  margin: 2rem 0;
`;
const PlayerTime = styled.span`
  margin-bottom: 10px;
`;
const PlayerMiddle = styled(PlayerSection)`
  position: relative;
  border-right: 1px solid rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  ${media.phablet`
    order: 1;
    width: 100%;
  `};
`;
const PlayerRight = styled(PlayerSection)`
  display: flex;
  ${media.phablet`
    flex: 2;
  `};
`;
const PlayerSpeed = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  flex: 0 1 auto;
  padding: 1rem;
  ${media.phablet`
    flex-grow: 1;
  `};
`;
const SpeedDisplay = styled.span`
  height: 2.5rem;
  line-height: 2;
`;
const Progress = styled.div`
  background: #0d0d0d;
  width: 100%;
  height: 2rem;
  cursor: crosshair;
  overflow: hidden;
`;
const ProgressTime = styled.div`
  min-width: 20px;
  height: 100%;
  transition: width 0.1s;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  background: ${colors.green};
  background: ${colors.grad};
`;
const PlayerTitle = styled.h3`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  max-width: 650px;
  width: 100%;
  margin: 0;
  padding-left: 2rem;
  font-size: 1.5rem;
  ${media.phablet`
    padding: 1rem;
  `};
`;
const PlayerTooltip = styled.div`
  position: absolute;
  top: 22px;
  transform: translate(-50%);
  opacity: 0;
  &:after {
    content: " ";
    position: absolute;
    bottom: 94%;
    left: 50%;
    margin-left: -2px;
    border-width: 2px;
    border-style: solid;
    border-color: transparent transparent ${colors.white} transparent;
  }
`;
const PlayerInputs = styled.div`
  font-size: 0;
`;
const SRInput = styled.input`
  ${mixins.sr};
`;
const SRLabel = styled.span`
  ${mixins.sr};
`;
const PlayerVolume = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 120px;
  padding: 1rem;
  text-align: center;
  outline-color: ${colors.yellow};
  font-weight: normal;
  letter-spacing: 0px;

  ${media.phablet`
    flex-grow: 0;
  `};

  &:focus-within {
    outline: ${colors.yellow} auto 5px;
  }
  &:hover {
    label {
      border-top: 1px solid ${colors.yellow};
    }
  }
  label {
    border-top: 1px solid ${colors.green};
    &:hover {
      & ~ label {
        border-top: 1px solid ${colors.black};
      }
    }
  }
  input {
    ~ label {
      background: ${colors.green};
      border-right: 2px solid ${colors.black};
      display: inline-block;
      width: 8px;
      height: 2.5rem;
    }
    &:checked {
      ~ label {
        background: ${colors.grey};
      }
      + label {
        background: ${colors.green};
      }
    }
  }
`;

class Player extends React.Component {
  static propTypes = {
    show: PropTypes.object.isRequired,
    getPlayerState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let lastPlayed = 0;

    // for SSR
    if (typeof window !== 'undefined') {
      const { show } = this.props;
      const lp = localStorage.getItem(`lastPlayed${show.number}`);
      // eslint-disable-next-line
      if (lp) lastPlayed = JSON.parse(lp).lastPlayed;
    }

    this.state = {
      progressTime: 50,
      playing: false,
      duration: 0,
      currentTime: lastPlayed,
      playbackRate: 1,
      timeWasLoaded: lastPlayed !== 0,
      showTooltip: false,
      tooltipPosition: 0,
      tooltipTime: '0:00',
    };
  }

  componentWillUpdate(nextProps, nextState) {
    this.audio.playbackRate = nextState.playbackRate;
  }

  componentDidUpdate(prevProps, prevState) {
    const { show } = this.props;
    const { currentTime } = this.state;
    if (show.number !== prevProps.show.number) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`);
      if (lp) {
        const data = JSON.parse(lp);
        // eslint-disable-next-line
        this.setState({
          currentTime: data.lastPlayed,
        });
        this.audio.currentTime = data.lastPlayed;
      }
      this.audio.play();
    } else {
      localStorage.setItem(
        `lastPlayed${show.number}`,
        JSON.stringify({ lastPlayed: currentTime })
      );
    }
  }

  timeUpdate = e => {
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
    const { getPlayerState } = this.props;
    getPlayerState(!this.audio.paused);
    this.setState({ playing: !this.audio.paused });
  };

  volume = e => {
    this.audio.volume = e.currentTarget.value;
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
    // eslint-disable-next-line
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
      tooltipTime,
    } = this.state;

    return (
      <PlayerContainer>
        <PlayerLeft>
          <PlayButton
            onClick={this.togglePlay}
            aria-label={playing ? 'pause' : 'play'}
            type="button"
          >
            <PlayerIcon>{playing ? <FaPause /> : <FaPlay />}</PlayerIcon>
            <PlayerTime>
              {formatTime(currentTime)} / {formatTime(duration)}
            </PlayerTime>
          </PlayButton>
        </PlayerLeft>

        <PlayerMiddle>
          <Progress
            onClick={this.scrub}
            onMouseMove={this.seekTime}
            onMouseEnter={() => {
              this.setState({ showTooltip: true });
            }}
            onMouseLeave={() => {
              this.setState({ showTooltip: false });
            }}
            innerRef={x => {
              this.progress = x;
            }}
          >
            <ProgressTime style={{ width: `${progressTime}%` }} />
          </Progress>
          <PlayerTitle>
            Playing: {show.displayNumber}: {show.title}
          </PlayerTitle>
          <PlayerTooltip
            style={{
              left: `${tooltipPosition}px`,
              opacity: `${showTooltip ? '1' : '0'}`,
            }}
          >
            {tooltipTime}
          </PlayerTooltip>
        </PlayerMiddle>

        <PlayerRight>
          <PlayerSpeed onClick={this.speedUp}
            onContextMenu={this.speedDown}
            className="player__speed"
            type="button"
          >
            <span>FASTNESS</span>
            <SpeedDisplay>{playbackRate} &times;</SpeedDisplay>
          </PlayerSpeed>

          <PlayerVolume>
            <span>LOUDNESS</span>
            <PlayerInputs>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.1"
                id="vol10"
              />
              <label htmlFor="vol10">
                <SRLabel>Volume Level 10/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.2"
                id="vol20"
              />
              <label htmlFor="vol20">
                <SRLabel>Volume Level 20/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.3"
                id="vol30"
              />
              <label htmlFor="vol30">
                <SRLabel>Volume Level 30/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.4"
                id="vol40"
              />
              <label htmlFor="vol40">
                <SRLabel>Volume Level 40/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.5"
                id="vol50"
              />
              <label htmlFor="vol50">
                <SRLabel>Volume Level 50/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.6"
                id="vol60"
              />
              <label htmlFor="vol60">
                <SRLabel>Volume Level 60/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.7"
                id="vol70"
              />
              <label htmlFor="vol70">
                <SRLabel>Volume Level 70/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.8"
                id="vol80"
              />
              <label htmlFor="vol80">
                <SRLabel>Volume Level 80/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                defaultChecked
                type="radio"
                name="volume"
                value="0.9"
                id="vol90"
              />
              <label htmlFor="vol90">
                <SRLabel>Volume Level 90/100</SRLabel>
              </label>
              <SRInput
                onChange={this.volume}
                type="radio"
                name="volume"
                value="1"
                id="vol100"
              />
              <label htmlFor="vol100">
                <SRLabel>Volume Level 100/100</SRLabel>
              </label>
            </PlayerInputs>
          </PlayerVolume>
        </PlayerRight>

        <audio
          ref={audio => {
            this.audio = audio;
          }}
          onPlay={this.playPause}
          onPause={this.playPause}
          onTimeUpdate={this.timeUpdate}
          onLoadedMetadata={this.timeUpdate}
          src={show.url}
        />
      </PlayerContainer>
    );
  }
}

export default Player;
