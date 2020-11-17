import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause } from 'react-icons/fa';
import useLocalStorageState from 'use-local-storage-state/dist';
import formatTime from '../lib/formatTime';
import VolumeBars from './VolumeBars';

export default function Player({ show, onPlayPause }) {
  const [playing, setPlaying] = useState(false);
  const [progressTime, setProgressTime] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastPlayedString = 0] = useLocalStorageState(
    `lastPlayedTimestamp${show.number}`
  );
  const lastPlayed = parseInt(lastPlayedString);
  // TODO: Refactor from state.currentVolume
  const [volume, setVolume] = useLocalStorageState(`volume`, 1);
  const [playbackRate, setPlaybackRate] = useLocalStorageState(
    `playbackRate`,
    1
  );
  // Tooltips. Maybe refactor into it's own hook?
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [tooltipTime, setTooltipTime] = useState('0:00');
  const progressRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.volume = volume;
  });

  async function togglePlay() {
    const audio = audioRef.current;

    if (audio.paused) {
      return audio.play();
    }
    return audio.pause();
  }

  function scrubTime(e) {
    return (
      (e.nativeEvent.offsetX / progressRef.current.offsetWidth) *
      audioRef.current.duration
    );
  }

  function scrub(e) {
    audioRef.current.currentTime = scrubTime(e);
  }

  function seekTime(e) {
    setTooltipPosition(e.nativeEvent.offsetX);
    setTooltipTime(formatTime(scrubTime(e)));
  }

  function playPause() {
    console.log('TODO: Bring onPlayPause into this hook');
    setPlaying(!audioRef.current.paused);
    onPlayPause(audioRef.current);
  }

  function timeUpdate(e) {
    const { currentTime = 0, duration = 0 } = e.currentTarget;
    const progressTime = (currentTime / duration) * 100;
    if (Number.isNaN(progressTime)) return;
    setProgressTime(progressTime);
    setDuration(duration);
    setCurrentTime(currentTime);
  }

  function volumeUpdate(e) {
    console.log('TODO: Persist volume and restore from localstorage');
    const volume = parseFloat(e.currentTarget.value);
    console.log(volume, typeof volume);
    if (typeof volume === 'number' && !Number.isNaN(volume)) {
      audioRef.current.volume = volume;
      setVolume(volume);
    }
  }

  function speed(change) {
    const playbackRateMax = 2.5;
    const playbackRateMin = 0.75;

    let newPlaybackRate = playbackRate + change;

    if (newPlaybackRate > playbackRateMax) {
      newPlaybackRate = playbackRateMin;
    }

    if (newPlaybackRate < playbackRateMin) {
      newPlaybackRate = playbackRateMax;
    }

    setPlaybackRate(newPlaybackRate);
  }

  function keyboardProgress(e) {
    if (e.code === 'ArrowRight') {
      audioRef.current.currentTime = audioRef.current.currentTime + 30;
    }
    if (e.code === 'ArrowLeft') {
      audioRef.current.currentTime = audioRef.current.currentTime - 30 || 0;
    }
  }
  return (
    <div className="player">
      <div className="player__section player__section--left">
        <button
          onClick={togglePlay}
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
          onClick={scrub}
          onMouseMove={seekTime}
          onMouseEnter={() => {
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setShowTooltip(false);
          }}
          onKeyDown={keyboardProgress}
          ref={progressRef}
          role="progressbar"
          tabIndex={0}
        >
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
          onClick={() => speed(0.25)}
          onContextMenu={() => speed(-0.25)}
          className="player__speed"
          type="button"
        >
          <p>FASTNESS</p>
          <span className="player__speeddisplay">{playbackRate} &times;</span>
        </button>
        <div className="player__volume">
          <div className="player__inputs">
            <VolumeBars volume={volume} volumeUpdate={volumeUpdate} />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onPlay={playPause}
        onPause={playPause}
        onTimeUpdate={timeUpdate}
        // onVolumeChange={volumeUpdate}
        onLoadedMetadata={(e) => {
          timeUpdate(e);
          volumeUpdate(e);
        }}
        src={show.url}
      />
    </div>
  );
}

Player.propTypes = {
  show: PropTypes.object.isRequired,
  onPlayPause: PropTypes.func,
};
