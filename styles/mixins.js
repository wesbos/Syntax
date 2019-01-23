import { css } from 'styled-components';
import theme from './theme';
const { colors } = theme;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  outline: css`
    outline: 1px solid red;
  `,

  button: css`
    display: inline-block;
    padding: 1rem;
    border: 0;
    background: ${colors.lightgrey};
    color: black;
    font-size: 1.5rem;
    line-height: 1;
    transition: all 0.2s;
    &:hover {
      background: #f2f2f2;
    }
  `,

  // accessible way of hiding inputs and labels
  sr: css`
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  `,
};

export default mixins;
