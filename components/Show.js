import React from 'react'
import Link from 'next/link';
import slug from 'speakingurl';
import Router from 'next/router'
import Bars from './bars';
import {FaPlay} from "react-icons/fa";

const Show = ({show, currentPlaying, currentShow, setCurrentPlaying}) => {

  const [isPlaying, isDisplayed] = [currentPlaying, currentShow].map(currentX => show.displayNumber === currentX)
  const showClassName = [
    'show', 
    isPlaying ? 'show--playing' : '',
    isDisplayed ? 'show--active' : '',
  ].join(' ')

  const changeURL = (e, show) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    Router.push(`/?number=${show.displayNumber}`, href, {shallow: true})
  }
  const PlayButton = () => <button
    onClick={() => setCurrentPlaying(show.displayNumber)}
    className="show__play"
    title="play button"><FaPlay/></button>

  return (
    <div className={showClassName}>
      <a
        className="show__link"
        href={`/show/${show.displayNumber}/${slug(show.title)}`}
        onClick={(e) => changeURL(e, show)}>
        <p className="show__displayNumber">Episode {show.displayNumber}</p>
        <h3 className="show__title">{show.title}</h3>
      </a>

      <div className="show__playcontrols">
        {isPlaying
          ? <Bars/ >
            :
            <PlayButton/>}
      </div>
    </div>
  )
};

export default Show;