import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, media, StyledButton } from '../styles';
const { colors } = theme;

const ShowNotesContainer = styled.div`
  padding: 2rem;
  width: 62%;
  font-size: 1.5rem;
  ${media.phablet`
    width: 100%;
  `};
  pre {
    background: ${colors.lightgrey};
    padding: 1rem;
  }
  ul {
    padding-left: 2rem;
    list-style-type: circle;
  }
  li {
    margin: 10px 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'courier';
    font-weight: 100;
    border-bottom: 1px solid ${colors.grey};
    padding-bottom: 1rem;
    &:before {
      padding-right: 1rem;
    }
  }
  a {
    color: ${colors.black};
    border-bottom: 1px solid ${colors.yellow};
    text-decoration: none;
  }
`;
const ShowDate = styled.p`
  margin-top: 0;
  text-align: right;
  color: ${colors.grey3};
  font-size: 1.2rem;
`;
const ShowTitle = styled.h2`
  font-family: 'courier';
  font-weight: 100;
  font-size: 2.5rem;
  border-bottom: 1px solid ${colors.grey};
  padding-bottom: 1rem;
  &:before {
    padding-right: 1rem;
  }
`;
const ButtonIcon = styled.span`
  border-right: 1px solid ${colors.grey};
  padding-right: 0.5rem;
  margin-right: 0.5rem;
`;
const ShowNotesButton = styled.a`
  ${mixins.button};
  margin-left: 1rem;
  border: 0 !important;
`;

const ShowNotes = ({ show, setCurrentPlaying }) => (
  <ShowNotesContainer>
    <ShowDate>{show.displayDate}</ShowDate>
    <ShowTitle>{show.title}</ShowTitle>
    <StyledButton
      onClick={() => setCurrentPlaying(show.displayNumber)}
      type="button"
    >
      <ButtonIcon>🎵</ButtonIcon> Play Episode {show.displayNumber}
    </StyledButton>
    <ShowNotesButton download href={show.url}>
      <ButtonIcon>👇</ButtonIcon> Download Show
    </ShowNotesButton>
    <ShowNotesButton
      href={`https://github.com/wesbos/Syntax/edit/master/${show.notesFile}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ButtonIcon>✏️</ButtonIcon> Edit Show Notes
    </ShowNotesButton>
    <div dangerouslySetInnerHTML={{ __html: show.html }} />
  </ShowNotesContainer>
);

ShowNotes.propTypes = {
  show: PropTypes.object.isRequired,
  setCurrentPlaying: PropTypes.func.isRequired,
};

export default ShowNotes;
