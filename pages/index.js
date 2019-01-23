import { withRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ShowList from '../components/ShowList';
import ShowNotes from '../components/ShowNotes';
import Player from '../components/Player';
import Meta from '../components/meta';
import Page from '../components/Page';
import getBaseURL from '../lib/getBaseURL';
import styled from 'styled-components';
import { theme, StyledWrapper } from '../styles';
const { colors } = theme;

const ShowWrap = styled.div`
  background: ${colors.white};
  display: flex;
  flex-wrap: wrap;
`;

export default withRouter(
  class IndexPage extends React.Component {
    static propTypes = {
      router: PropTypes.object.isRequired,
      shows: PropTypes.array.isRequired,
      baseURL: PropTypes.string.isRequired,
    };

    constructor(props) {
      super();
      const currentShow =
        props.router.query.number || props.shows[0].displayNumber;

      this.state = {
        currentShow,
        currentPlaying: currentShow,
        isPlaying: false,
      };
    }

    static async getInitialProps({ req }) {
      const baseURL = getBaseURL(req);
      const { data: shows } = await axios.get(`${baseURL}/api/shows`);
      return { shows, baseURL };
    }

    componentWillReceiveProps(nextProps) {
      const { query } = nextProps.router;
      if (query.number) {
        this.setState({ currentShow: query.number });
      }
    }

    setCurrentPlaying = currentPlaying => {
      this.setState({ currentPlaying });
    };

    // Passed down to Player component to fish out the state of the player to animate the bars
    getPlayerState = isPlaying => {
      this.setState({ isPlaying });
    };

    render() {
      const { shows = [], baseURL } = this.props;
      const { currentShow, currentPlaying, isPlaying } = this.state;
      // Currently Shown shownotes
      const show =
        shows.find(showItem => showItem.displayNumber === currentShow) ||
        shows[0];
      // Currently Playing
      const current =
        shows.find(showItem => showItem.displayNumber === currentPlaying) ||
        shows[0];

      return (
        <Page>
          <Meta show={show} baseURL={baseURL} />
          <StyledWrapper>
            <ShowWrap id="main" tabIndex="-1">
              <Player show={current} getPlayerState={this.getPlayerState} />
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
                isPlaying={isPlaying}
              />
            </ShowWrap>
          </StyledWrapper>
        </Page>
      );
    }
  }
);
