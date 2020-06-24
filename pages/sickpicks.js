import React from 'react';
import PropTypes from 'prop-types';
import Meta from '../components/meta';
import Page from '../components/Page';
import { getAllShowSickPicks } from '../lib/getShows'

export async function getStaticProps() {
  const sickPicks = await getAllShowSickPicks()

  return {
    unstable_revalidate: 1,
    props: {
      sickPicks
    }
  }
}

export default class SickPicksPage extends React.Component {
  static propTypes = {
    sickPicks: PropTypes.array.isRequired
  };

  render() {
    const { sickPicks = [] } = this.props;

    return (
      <Page>
        <Meta staticPage={{ title: 'Sick Picks' }} />
        <div className="wrapper wrapper--text">
          {sickPicks.map(sickPick => (
            <div
              key={sickPick.id}
              dangerouslySetInnerHTML={{ __html: sickPick.html }} //eslint-disable-line
            />
          ))}
        </div>
      </Page>
    );
  }
}
