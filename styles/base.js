import { injectGlobal } from 'styled-components';
import theme from './theme';
const { colors } = theme;

const base = injectGlobal`
  @font-face {
    font-family: '💪';
    src:  url('/static/fonts/Radnika-Bold.woff2') format('woff2'),
          url('/static/fonts/Radnika-Bold.woff') format('woff');
  }

  @font-face {
    font-family: 'rad';
    src:  url('/static/fonts/Radnika-Light.woff2') format('woff2'),
          url('/static/fonts/Radnika-Light.woff') format('woff');
  }

  html {
    box-sizing: border-box;
    width: 100%;
    font-size: 10px;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'rad';
    color: black;
    font-size: 10px;
    line-height: 1.5;
    background: black url('/static/background.jpg');
    border-top: 3px solid ${colors.yellow};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: '💪';
    font-weight: 100;
  }

  h1 {
    font-size:2em;
  }

  img {
    max-width: 100%;
    border: 0;
  }

  svg:not(:root) {
    overflow:hidden;
  }

  li {
    line-height: 1.7;
  }

  a {
    color: ${colors.yellow};
    text-decoration: none;
    &:active,
    &:hover {
      outline:0;
    }
    &:focus {
      outline: thin dotted;
    }
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: 100%;
    margin: 0;
    line-height: normal;
  }
  button, html input[type=button],
  input[type=reset], input[type=submit] {
    -webkit-appearance:button;
    cursor: pointer;
  }
  button[disabled],input[disabled] {
    cursor: default;
  }
  textarea {
    overflow: auto;
    vertical-align: top;
  }
  button {
    border: 0;
    background: ${colors.lightgrey};
    color: ${colors.black};
    line-height: 1;
    padding: 1rem;
    display: inline-block;
    transition: all 0.2s;
  }
  figure, figcaption {
    margin: 0;
  }
  audio, canvas, video {
    display: inline-block;
  }
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  b, strong {
    font-weight: 700;
  }

`;

export default base;
