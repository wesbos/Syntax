import styled from 'styled-components';
import media from './media';

const StyledFooter = styled.footer`
  max-width: 1000px;
  margin: 0 auto;
  ${media.desktop`
    padding: 0 2rem;
  `};
`;

export default StyledFooter;
