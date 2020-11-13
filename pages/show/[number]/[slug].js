import { useRouter, withRouter } from 'next/router';
import ErrorPage from 'next/error';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import slug from 'speakingurl';
import ShowList from '../../../components/ShowList';
import ShowNotes from '../../../components/ShowNotes';
import Player from '../../../components/Player';
import Meta from '../../../components/meta';
import Page from '../../../components/Page';
import { getShows, getShow } from '../../../lib/getShows';
import { getShowTranscript } from '../../../lib/getTranscripts';
import Transcript from '../../../components/Transcript';

export async function getStaticPaths() {
  const shows = await getShows('all');

  return {
    fallback: false,
    paths: [
      // Homepage
      {
        params: {
          number: 'latest',
          slug: 'latest',
        },
      },
      ...shows.map((show) => ({
        params: {
          number: show.displayNumber,
          slug: slug(show.title),
        },
      })),
    ],
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const shows = await getShows();
  const showNumber =
    params.number === 'latest' ? shows[0].displayNumber : params.number;
  const show = await getShow(showNumber);

  const transcript = await getShowTranscript(parseFloat(showNumber));
  const props =
    show.date > Date.now()
      ? {}
      : {
          shows,
          params,
          show,
          showNumber,
          transcript,
        };

  return {
    revalidate: 1,
    props,
  };
}

export default function IndexPage({ showNumber, shows, transcript, params }) {
  const router = useRouter();
  const [currentShow, setCurrentShow] = useState(showNumber);
  const [currentPlaying, setCurrentPlaying] = useState(showNumber);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(
    function () {
      const { query } = router;
      if (query.number) {
        setCurrentShow(
          query.number === 'latest' ? shows[0].displayNumber : query.number
        );
      }
    },
    // watch the router for changes, and when it does, the above code will change
    [router]
  );

  // When the page changes...

  if (!shows) {
    return <ErrorPage statusCode={404} />;
  }

  const show = shows.find((showItem) => showItem.displayNumber === currentShow);

  const current = shows.find(
    (showItem) => showItem.displayNumber === currentPlaying
  );
  return (
    <Page>
      <Meta show={show} />
      <div className="wrapper">
        <main className="show-wrap" id="main" tabIndex="-1">
          <Player show={current} onPlayPause={(a) => setIsPlaying(!a.paused)} />
          <ShowList
            shows={shows}
            currentShow={currentShow}
            currentPlaying={currentPlaying}
            setCurrentPlaying={setCurrentPlaying}
            isPlaying={isPlaying}
          />
          <div className="showNotes">
            <Transcript transcript={transcript} />
            <ShowNotes show={show} setCurrentPlaying={setCurrentPlaying} />
          </div>
        </main>
      </div>
    </Page>
  );
}

IndexPage.propTypes = {
  shows: PropTypes.array,
  showNumber: PropTypes.string,
};
