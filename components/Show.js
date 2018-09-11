import React from 'react'
import Link from 'next/link';
import slug from 'speakingurl';
import Router from 'next/router'
import Bars from './bars';
import { havePreviouslyWatched } from '../lib/previouslyWatched';

export default class Show extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      haveWatched: false,
    }

    this.updateWatchedState = this.updateWatchedState.bind(this);
  }

  changeURL = (e, show) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    Router.push(`/?number=${show.displayNumber}`, href, { shallow: true })
  }

  componentDidMount() {
    this.updateWatchedState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) this.updateWatchedState();
  }

  updateWatchedState() {
    const { show } = this.props;
    const haveWatched = havePreviouslyWatched(show.number);

    this.setState({
      haveWatched,
    });
  }

  render() {
    const { show, currentPlaying, currentShow, setCurrentPlaying } = this.props;
    const { haveWatched } = this.state;
    
    return (
      <div className={`show ${currentPlaying === show.displayNumber ? 'show--playing' : '' } ${currentShow === show.displayNumber ? 'show--active' : '' }
      `}>
        <a className="show__link" href={`/show/${show.displayNumber}/${slug(show.title)}`} onClick={(e) => this.changeURL(e, show)}>
          <p className="show__displayNumber">Episode {show.displayNumber}</p>
          <h3 className={`show__title ${haveWatched ? `show__title--watched` : ''}`}>{show.title}</h3>
        </a>

        <div className="show__playcontrols">
          {currentPlaying === show.displayNumber ? <Bars/ > : <button onClick={() => setCurrentPlaying(show.displayNumber)} className="show__play">►</button> }
        </div>
      </div>
    )
  }
}
