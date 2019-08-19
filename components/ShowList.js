import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config'
import { Configure,   InstantSearch,   SearchBox, InfiniteHits, PoweredBy } from 'react-instantsearch-dom';
import { FaMicrophone } from 'react-icons/fa';
import Show from '../components/Show';
import ShowNotes from '../components/ShowNotes';

export default class ShowList extends Component {
  static propTypes = {
    show: PropTypes.any.isRequired,
    currentPlaying: PropTypes.string.isRequired,
    currentShow: PropTypes.string.isRequired,
    setCurrentPlaying: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      supportsSpeech: false,
      isTalking: false,
    }
  };

  componentDidMount = () => {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (typeof window.SpeechRecognition === 'undefined') {
      console.log('Speech recognition Chrome API not supported');
    } else {
      this.setState({
        supportsSpeech: true,
      });
    };
  };

  handleSpeech = event => {
    event.preventDefault();
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;

    recognition.start();

    recognition.onstart = () => {
      this.setState({
        isTalking: true,
      })
    };

    recognition.onresult = e => {
      let query = e.results[0][0].transcript;
      this.search.refine(query);
    };

    recognition.onsoundend = () => {
      this.setState({
        isTalking: false,
      });
      recognition.stop();
    };
  };

  render() {
    const { show, currentPlaying, currentShow, setCurrentPlaying } = this.props;
    const { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } = getConfig().publicRuntimeConfig;
    const speechClasses = this.state.isTalking ? 'ais-microphone-on' : '';

    return (
      <InstantSearch appId={ALGOLIA_APP_ID} apiKey={ALGOLIA_API_KEY} indexName={ALGOLIA_INDEX_NAME}>
        <Configure hitsPerPage={25} />
        <div className="ais-search">
          <div className="ais-search-container">
            <SearchBox translations={{ placeholder: 'Search for episodes...' }} ref={node => this.search = node} />
            <PoweredBy />
          </div>
          {this.state.supportsSpeech && (
            <button className={`ais-microphone ${speechClasses}`} onClick={this.handleSpeech}>
              <FaMicrophone />
            </button>
          )}
        </div>
        <div className="ais-instantSearch">
          <InfiniteHits
            hitComponent={hit => (
              <Show
                show={hit}
                currentPlaying={currentPlaying}
                currentShow={currentShow}
                setCurrentPlaying={setCurrentPlaying}
              />
            )}
          />
          <ShowNotes show={show} setCurrentPlaying={setCurrentPlaying} />
        </div>
      </InstantSearch>
    );
  }
};
