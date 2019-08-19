import React from 'react';
import PropTypes from 'prop-types';
import slug from 'speakingurl';
import Router from 'next/router';
import { Highlight } from 'react-instantsearch-dom';
import { FaPlay } from 'react-icons/fa';
import Bars from './bars';

const Show = ({ show, currentPlaying, currentShow, setCurrentPlaying }) => {
  const { hit } = show;
  const changeURL = (e, hit) => {
    e.preventDefault();
    const { href } = e.currentTarget;
    Router.push(`/?number=${hit.displayNumber}`, href, { shallow: true });
  };

  return (
    <div
      className={`show ${
        currentPlaying === hit.displayNumber ? 'show--playing' : ''
      } ${currentShow === hit.displayNumber ? 'show--active' : ''}
      `}
    >
      <a
        className="show__link"
        href={`/show/${hit.displayNumber}/${slug(hit.title)}`}
        onClick={e => changeURL(e, hit)}
      >
        <p className="show__displayNumber">Episode {hit.displayNumber}</p>
        <h3 className="show__title">
          <Highlight attribute="title" hit={hit} />
        </h3>
      </a>

      <div className="show__playcontrols">
        {currentPlaying === hit.displayNumber ? (
          <Bars />
        ) : (
          <button
            type="button"
            onClick={() => setCurrentPlaying(hit.displayNumber)}
            className="show__play"
            title="play button"
          >
            <FaPlay />
          </button>
        )}
      </div>
    </div>
  );
};

Show.propTypes = {
  show: PropTypes.any.isRequired,
  currentPlaying: PropTypes.string.isRequired,
  currentShow: PropTypes.string.isRequired,
  setCurrentPlaying: PropTypes.func.isRequired
};

export default Show;
