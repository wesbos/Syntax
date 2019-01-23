import styled from 'styled-components';
import media from './media';

const StyledHeader = styled.header`
  max-width: 1000px;
  margin: 0 auto;

  ${media.desktop`
    padding: 0 2rem;
  `};
`;

export default StyledHeader;
