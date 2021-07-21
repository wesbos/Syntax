import React from 'react';
import PropTypes from 'prop-types';
import { FaPlay } from 'react-icons/fa';
import ShowLink from './ShowLink';
import Bars from './bars';

export default class Show extends React.Component {
  render() {
    const {
      show,
      currentPlaying,
      currentShow,
      setCurrentPlaying,
      isPlaying,
    } = this.props;
    return (
      <div
        className={`show ${
          currentPlaying === show.displayNumber ? 'show--playing' : ''
        } ${currentShow === show.displayNumber ? 'show--active' : ''}
      `}
      >
        <ShowLink
          displayNumber={show.displayNumber}
          title={show.title}
          displayDate={show.displayDate}
        />
        <div className="show__playcontrols">
          {currentPlaying === show.displayNumber ? (
            <Bars isPlaying={isPlaying} />
          ) : (
            <button
              type="button"
              onClick={() => setCurrentPlaying(show.displayNumber)}
              className="show__play"
              title="play button"
            >
              <FaPlay />
            </button>
          )}
        </div>
      </div>
    );
  }
}

Show.propTypes = {
  show: PropTypes.object.isRequired,
  currentPlaying: PropTypes.string.isRequired,
  currentShow: PropTypes.string.isRequired,
  setCurrentPlaying: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
};
