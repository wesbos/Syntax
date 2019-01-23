import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { theme } from '../styles';
const { colors } = theme;

const SkipLink = styled.a`
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 2px solid ${colors.yellow};
  padding: 10px 15px;
  font-size: 16px;
  background: #000;

  &:active,
  &:focus,
  &:hover {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: auto;
    height: auto;
    overflow: visible;
  }
`;

export default class Page extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <div className="page">
        <SkipLink href="#main">Skip to content</SkipLink>
        <Header />
        {children}
        <Footer />
      </div>
    );
  }
}
