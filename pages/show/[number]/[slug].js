import { withRouter } from 'next/router';
import ErrorPage from 'next/error'
import React from 'react';
import PropTypes from 'prop-types';
import ShowList from '../../../components/ShowList';
import ShowNotes from '../../../components/ShowNotes';
import Player from '../../../components/Player';
import Meta from '../../../components/meta';
import Page from '../../../components/Page';
import { getShows, getShow } from '../../../lib/getShows'
import slug from 'speakingurl';


export async function getStaticPaths() {
  const shows = await getShows('all')

  return {
    fallback: false,
    paths: [
      // Homepage
      {
        params: {
          number: 'latest',
          slug: 'latest'
        }
      },
      ...shows.map((show) => {
        return {
          params: {
            number: show.displayNumber,
            slug: slug(show.title)
          }
        }
      })
    ]
  }
}

export async function getStaticProps({params}) {
  const shows = await getShows();
  const showNumber = params.number === 'latest' ? shows[0].displayNumber : params.number;
  const show = await getShow(showNumber);
  const props = show.date > Date.now() ? {} : { shows, showNumber };

  return {
    unstable_revalidate: 1,
    props
  }
}

export default withRouter(
  class IndexPage extends React.Component {
    static propTypes = {
      router: PropTypes.object.isRequired,
      shows: PropTypes.array
    };

    constructor(props) {
      super();
      const currentShow = props.showNumber

      this.state = {
        currentShow,
        currentPlaying: currentShow,
        clickedTimestamp: undefined,
        isPlaying: false,
      };
    }

    componentWillReceiveProps(nextProps) {
      const { query } = nextProps.router;
      if (query.number) {
        this.setState({ currentShow: query.number });
      }
    }

    setCurrentPlaying = currentPlaying => {
      console.log('Setting current playing');
      this.setState({ currentPlaying });
    };

    setIsPlaying = (isPlaying) => {
      this.setState({isPlaying})
    }

    render() {
      const { shows } = this.props;

      if (!shows) {
        return <ErrorPage statusCode={404} />
      }

      const {
        currentShow,
        currentPlaying,
        isPlaying,
        clickedTimestamp,
      } = this.state;
      const show = shows.find(showItem => showItem.displayNumber === currentShow)
      const current = shows.find(showItem => showItem.displayNumber === currentPlaying)
      return (
        <Page>
          <Meta show={show} />
          <div className="wrapper">
            <main className="show-wrap" id="main" tabIndex="-1">
              <Player
                show={current}
                clickedTimestamp={clickedTimestamp}
                onPlayPause={(a) => this.setIsPlaying(!a.paused)}
              />
              <ShowList
                shows={shows}
                currentShow={currentShow}
                currentPlaying={currentPlaying}
                setCurrentPlaying={this.setCurrentPlaying}
                isPlaying={isPlaying}
              />
              <ShowNotes
                show={show}
                setCurrentPlaying={this.setCurrentPlaying}
                onClickTimestamp={(timestamp) => {
                  this.setState({
                    currentPlaying: show.displayNumber,
                    clickedTimestamp: timestamp,
                  });
                }}
              />
            </main>
          </div>
        </Page>
      );
    }
  }
);
