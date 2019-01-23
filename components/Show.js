import React from 'react';
import PropTypes from 'prop-types';
import slug from 'speakingurl';
import Router from 'next/router';
import { FaPlay } from 'react-icons/fa';
import Bars from './bars';
import styled from 'styled-components';
import { theme, mixins, media } from '../styles';
const { colors } = theme;

const ShowContainer = styled.div`
  display: flex;
  position: relative;
  background-color: ${props =>
    props.active ? colors.white : colors.lightgrey};
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
  border-left: ${props =>
    props.active ? 0 : `10px solid ${colors.grey}`};
  border-right-color: ${props =>
    props.active ? colors.white : colors.grey};
  padding-left: ${props => (props.active ? `1rem` : `0`)};

  ${media.phablet`
    flex: 1 0 auto;
  `};

  &:before {
    content: '';
    display: ${props => (props.active ? `block` : `none`)};
    background: ${colors.grad};
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
  }
`;
const ShowLink = styled.a`
  flex: 1 1 auto;
  padding: 10px;
`;
const ShowNumber = styled.p`
  text-transform: uppercase;
  margin: 0;
  color: ${colors.grey3};
  font-size: 11px;
`;
const ShowTitle = styled.h3`
  color: ${colors.black};
  font-size: 1.5rem;
  margin: 0;
`;
const ShowPlayControls = styled.div`
  ${mixins.flexCenter};
  width: 5rem;
  flex-shrink: 0;
  padding: 1rem;
`;
const PlayButton = styled.button`
  background: none;
  border: 0;
  outline-color: ${colors.yellow};
  padding: 0.5rem;
  &:hover {
    color: ${colors.yellow};
  }
`;

class Show extends React.Component {
  static propTypes = {
    show: PropTypes.object.isRequired,
    currentPlaying: PropTypes.string.isRequired,
    currentShow: PropTypes.string.isRequired,
    setCurrentPlaying: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  };

  changeURL = (e, show) => {
    e.preventDefault();
    const { href } = e.currentTarget;
    Router.push(`/?number=${show.displayNumber}`, href, { shallow: true });
  };

  render() {
    const { show, currentPlaying, currentShow, setCurrentPlaying, isPlaying } = this.props;
    return (
      <ShowContainer
        active={currentShow === show.displayNumber}
        playing={currentPlaying === show.displayNumber}
      >
        <ShowLink
          href={`/show/${show.displayNumber}/${slug(show.title)}`}
          onClick={e => this.changeURL(e, show)}
        >
          <ShowNumber>Episode {show.displayNumber}</ShowNumber>
          <ShowTitle>{show.title}</ShowTitle>
        </ShowLink>

        <ShowPlayControls>
          {currentPlaying === show.displayNumber ? (
            <Bars isPlaying={isPlaying} />
          ) : (
            <PlayButton
              onClick={() => setCurrentPlaying(show.displayNumber)}
              title="play button"
              type="button"
            >
              <FaPlay />
            </PlayButton>
          )}
        </ShowPlayControls>
      </ShowContainer>
    );
  }
}

export default Show;
