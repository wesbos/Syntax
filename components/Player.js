import React from "react";
import Show from "./Show";
import formatTime from "../lib/formatTime";
import { FaPlay,FaPause } from "react-icons/fa";
export default class Player extends React.Component {
  constructor(props) {
    super(props);

    let lastPlayed = 0;

    // for SSR
    if (typeof window !== "undefined") {
      const lp = localStorage.getItem(`lastPlayed${this.props.show.number}`);
      if (lp) lastPlayed = JSON.parse(lp).lastPlayed;
    }

    this.state = {
      progressTime: 50,
      playing: false,
      duration: 0,
      currentTime: lastPlayed,
      playbackRate: 1,
      timeWasLoaded: lastPlayed !== 0,
      volume: 1
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyboardShortcuts);
  }

  componentWillUpdate(nextProps, nextState) {
    this.audio.playbackRate = nextState.playbackRate;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show.number !== prevProps.show.number) {
      const lp = localStorage.getItem(`lastPlayed${this.props.show.number}`);
      if (lp) {
        const data = JSON.parse(lp);
        this.setState({
          currentTime: data.lastPlayed
        });
        this.audio.currentTime = data.lastPlayed;
      }
      this.audio.play();
    } else {
      localStorage.setItem(
        `lastPlayed${this.props.show.number}`,
        JSON.stringify({ lastPlayed: this.state.currentTime })
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyboardShortcuts);
  }

  handleKeyboardShortcuts = e => {
    switch (e.which) {
      // k: play/pause
      case 75:
      case 107:
        this.togglePlay();
        return;
      // j: backward 10 seconds
      case 74:
      case 106:
        this.forwardBackward('backward');
        return;
      // l: forward 10 seconds
      case 76:
      case 108:
        this.forwardBackward('forward');
        return;
      // i: volume up
      case 73:
      case 105:
        this.volumeShortcut('increase');
        return;
      // o: volume down
      case 79:
      case 111:
        this.volumeShortcut('decrease');
        return;
      // [: decrease speed by 0.10x
      case 219:
      case 91:
        this.speed('decrease');
        return;
      // ]: increase speed by 0.10x
      case 221:
      case 93:
        this.speed('increase');
        return;
      default:
        return;
    }
  };

  timeUpdate = e => {
    console.log("Updating Time");
    // Check if the user already had a curent time
    if (this.state.timeWasLoaded) {
      const lp = localStorage.getItem(`lastPlayed${this.props.show.number}`);
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
    const method = this.state.playing ? "pause" : "play";
    this.audio[method]();
  };

  scrub = e => {
    const scrubTime =
      (e.nativeEvent.offsetX / this.progress.offsetWidth) * this.audio.duration;
    this.audio.currentTime = scrubTime;
  };

  playPause = () => {
    this.setState({ playing: !this.audio.paused });
    const method = this.audio.paused ? "add" : "remove";
    document.querySelector(".bars").classList[method]("bars--paused"); // 💩
  };

  volume = e => {
    this.setState({ volume: parseFloat(e.currentTarget.value) }, () => {
      this.setVolume();
    });
  };

  volumeShortcut = type => {
    let volume;

    switch (type) {
      case 'decrease':
        volume = parseFloat((this.state.volume - 0.1).toFixed(1));
        if (volume <= 0.1) {
          volume = 0.1;
        }
        this.setState({ volume }, () => {
          this.setVolume();
        });
        break;
      case 'increase':
        volume = parseFloat((this.state.volume + 0.1).toFixed(1));
        if (volume >= 1) {
          volume = 1;
        }
        this.setState({ volume }, () => {
          this.setVolume();
        });
        break;
      default:
        break;
    }
  };

  setVolume = () => {
    this.audio.volume = this.state.volume;
  };

  speed = type => {
    let playbackRate;

    switch (type) {
      case 'decrease':
        playbackRate = parseFloat((this.state.playbackRate - 0.1).toFixed(2));
        if (playbackRate <= 0) {
          playbackRate = this.state.playbackRate;
        }
        this.setState({ playbackRate });
        break;
      case 'increase':
        playbackRate = parseFloat((this.state.playbackRate + 0.1).toFixed(2));
        if (playbackRate > 2.5) {
          playbackRate = this.state.playbackRate;
        }
        this.setState({ playbackRate });
        break;
      default:
        playbackRate = this.state.playbackRate + 0.25;
        if (playbackRate > 2.5) {
          playbackRate = 0.75;
        }
        this.setState({ playbackRate });
        break;
    }
  };

  forwardBackward = type => {
    switch (type) {
      case 'backward':
        this.audio.currentTime =
          this.audio.currentTime - 10 <= 0 ? 0 : this.audio.currentTime - 10;
        break;
      case 'forward':
        this.audio.currentTime =
          this.audio.currentTime + 10 > this.audio.duration
            ? this.audio.duration
            : this.audio.currentTime + 10;
        break;
      default:
        break;
    }
  };

  render() {
    const { show } = this.props;
    const { playing, progressTime, currentTime, duration } = this.state;

    return (
      <div className="player">
        <div className="player__section player__section--left">
          <button
            onClick={this.togglePlay}
            aria-label={playing ? "pause" : "play"}
          >
            <p className="player__icon">{playing ? <FaPause /> : <FaPlay/>}</p>
            <p>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </button>
        </div>

        <div className="player__section player__section--middle">
          <div
            className="progress"
            onClick={this.scrub}
            ref={x => (this.progress = x)}
          >
            <div
              className="progress__time"
              style={{ width: `${progressTime}%` }}
            />
          </div>
          <h3 className="player__title">
            Playing: {show.displayNumber}: {show.title}
          </h3>
        </div>

        <div className="player__section player__section--right">
          <button onClick={this.speed} className="player__speed">
            <p>FASTNESS</p>
            <span className="player__speeddisplay">
              {this.state.playbackRate} &times;{" "}
            </span>
          </button>

          <div className="player__volume">
            <p>LOUDNESS</p>
            <div className="player__inputs">
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.1"
                id="vol10"
                checked={this.state.volume === 0.1 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol10">
                <span className="sr-only">Volume Level 10/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.2"
                id="vol20"
                checked={this.state.volume === 0.2 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol20">
                <span className="sr-only">Volume Level 20/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.3"
                id="vol30"
                checked={this.state.volume === 0.3 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol30">
                <span className="sr-only">Volume Level 30/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.4"
                id="vol40"
                checked={this.state.volume === 0.4 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol40">
                <span className="sr-only">Volume Level 40/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.5"
                id="vol50"
                checked={this.state.volume === 0.5 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol50">
                <span className="sr-only">Volume Level 50/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.6"
                id="vol60"
                checked={this.state.volume === 0.6 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol60">
                <span className="sr-only">Volume Level 60/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.7"
                id="vol70"
                checked={this.state.volume === 0.7 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol70">
                <span className="sr-only">Volume Level 70/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.8"
                id="vol80"
                checked={this.state.volume === 0.8 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol80">
                <span className="sr-only">Volume Level 80/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.9"
                id="vol90"
                checked={this.state.volume === 0.9 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol90">
                <span className="sr-only">Volume Level 90/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="1"
                id="vol100"
                checked={this.state.volume === 1 ? true : false}
                className="sr-only"
              />
              <label htmlFor="vol100">
                <span className="sr-only">Volume Level 100/100</span>
              </label>
            </div>
          </div>
        </div>

        <div className="player__section player__section--bottom">
          {/* <div>Keyboard Sortcuts:</div>  */}
          <div>Play/Pause - K</div>
          <div>Forward/Backward - L/J</div>
          <div>Speed Up/Down - ]/[</div>
          <div>Volume Up/Down - I/O</div>
        </div>

        <audio
          ref={audio => (this.audio = audio)}
          onPlay={this.playPause}
          onPause={this.playPause}
          onTimeUpdate={this.timeUpdate}
          onLoadedMetadata={this.timeUpdate}
          src={show.url}
        />
      </div>
    );
  }
}
