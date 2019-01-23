import React from 'react';
import PropTypes from 'prop-types';
import Show from './Show';
import styled from 'styled-components';
import { theme, media } from '../styles';
const { colors } = theme;

const ShowListContainer = styled.div`
  width: 38%;
  display: flex;
  flex-direction: column;
  ${media.phablet`
    width: 100%;
    height: 300px;
    overflow-x: auto;
    overflow-y: scroll;
  `};
`;
const DummyShow = styled.div`
  display: flex;
  flex: 10 auto;
  border: 1px solid ${colors.grey};
  border-left: 10px solid ${colors.grey};
  background: ${colors.lightgrey};
  position: relative;
`;

const ShowList = ({
  shows,
  currentPlaying,
  currentShow,
  setCurrentPlaying,
  isPlaying,
}) => (
  <ShowListContainer>
    {shows.map(show => (
      <Show
        setCurrentPlaying={setCurrentPlaying}
        currentPlaying={currentPlaying}
        currentShow={currentShow}
        key={show.number}
        show={show}
        isPlaying={isPlaying}
      />
    ))}
    <DummyShow />
  </ShowListContainer>
);

ShowList.propTypes = {
  shows: PropTypes.array.isRequired,
  currentPlaying: PropTypes.string.isRequired,
  currentShow: PropTypes.string.isRequired,
  setCurrentPlaying: PropTypes.func.isRequired,
};

export default ShowList;
