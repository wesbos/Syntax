import React from 'react'
import styled from 'styled-components';
import Link from 'next/link';
import slug from 'speakingurl';
import Router from 'next/router'
import Bars from './bars';
import { FaPlay } from "react-icons/fa";
import { black, yellow, green, grey, grey3, lightgrey } from '../styles/variables'

export default class Show extends React.Component {
  changeURL = (e, show) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    Router.push(`/?number=${show.displayNumber}`, href, { shallow: true })
  }

  render() {
    const { show, currentPlaying, currentShow, setCurrentPlaying } = this.props;
    return (
      <ShowWrapper className={`show ${currentPlaying === show.displayNumber ? 'show--playing' : '' } ${currentShow === show.displayNumber ? 'show--active' : '' }
      `}>
        <a className="show__link" href={`/show/${show.displayNumber}/${slug(show.title)}`} onClick={(e) => this.changeURL(e, show)}>
          <p className="show__displayNumber">Episode {show.displayNumber}</p>
          <h3 className="show__title">{show.title}</h3>
        </a>

        <div className="show__playcontrols">
          {currentPlaying === show.displayNumber ? <Bars/ > : <button onClick={() => setCurrentPlaying(show.displayNumber)} className="show__play" title="play button" ><FaPlay/></button> }
        </div>
      </ShowWrapper>
    )
  }
}

const ShowWrapper = styled.div`
  .show {
    border-right: 1px solid ${grey};
    border-bottom: 1px solid ${grey};
    border-left: 10px solid ${grey};
    background: ${lightgrey};
    position: relative;
    display: flex;
  }

  .show a {
    flex: 1 1 auto;
    padding: 10px;
  }

  .show__playcontrols {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    flex-shrink: 0;
    padding: 1rem;
  }

  .show__playcontrols button {
    background: none;
    border: 0;
    outline-color: ${yellow};
  }

  .show__playcontrols button:hover {
    color: ${yellow};
  }

  .show--dummy {
    flex: 1 0 auto;
  }

  .show--active {
    border-right-color: #fff;
    background: #fff;
    border-left: 0;
    padding-left: 1rem;
  }

  .show--active:before {
    display: block;
    background: linear-gradient(30deg, #d2ff52 0%, ${green} 100%);
    width: 10px;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }

  .show__displayNumber {
    text-transform: uppercase;
    margin: 0;
    color: ${grey3};
    font-size: 11px;
  }

  .show__title {
    color: ${black};
    font-size: 1.5rem;
    margin: 0;
  }

  .show__date {
    margin-top: 0;
    text-align: right;
    color: ${grey3};
    font-size: 1.2rem;
  }

  .show-wrap {
    background: #fff;
    display: flex;
    flex-wrap: wrap;
  }

  .showList {
    width: 38%;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 650px) {
    .showList {
      width: 100%;
    }
  }
`;