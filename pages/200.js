import React from 'react';
import Meta from '../components/meta';
import Page from '../components/Page';

export default class TwoHundy extends React.Component {
  render() {
    return (
      <Page>
        <Meta staticPage={{ title: 'Sick Picks' }} />
        <div className="wrapper wrapper--text">
          <h2>Episode 200!</h2>
          <p>
            Ask us anything in the form below and tune in around 11:30ET for a
            live stream!
          </p>

          <p>
            Huge thanks to{' '}
            <a href="https://pigeonhole.at" target="_blank">
              Pigeon Hole
            </a>{' '}
            for supplying the software for this Q+A. 👇🏻
          </p>
          <iframe
            title="Two Hundred"
            src="https://pigeonhole.at/TASTY/q/385778"
            frameBorder="0"
            style={{
              width: '100%',
              height: '1000px',
            }}
          ></iframe>
        </div>
      </Page>
    );
  }
}
