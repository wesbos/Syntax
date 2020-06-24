import React from 'react';
import PropTypes from 'prop-types';
import slug from 'speakingurl';
import { FaPlay } from 'react-icons/fa';
import Bars from './bars';
import Link from 'next/link'

export default class Show extends React.Component {
  static propTypes = {
    show: PropTypes.object.isRequired,
    currentPlaying: PropTypes.string.isRequired,
    currentShow: PropTypes.string.isRequired,
    setCurrentPlaying: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool
  };

  render() {
    const { show, currentPlaying, currentShow, setCurrentPlaying, isPlaying } = this.props;
    return (
      <div
        className={`show ${
          currentPlaying === show.displayNumber ? 'show--playing' : ''
          } ${currentShow === show.displayNumber ? 'show--active' : ''}
      `}
      >
        <Link shallow scroll={false} href="/show/[number]/[slug]" as={`/show/${show.displayNumber}/${slug(show.title)}`}>
        <a
          className="show__link"
        > 
          <div className="show__container">
            <p className="show__displayNumber">Episode {show.displayNumber}</p>
            <span className="show__seperator">{" | "}</span>
            <p className="show__modifiedDate">{show.displayDate}</p>
          </div>
          <h3 className="show__title">{show.title}</h3>
        </a>
        </Link>

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
