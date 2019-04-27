import styled, { css } from 'styled-components';
import tabClassicStyling from './tab-classic.style';

const StyledTab = styled.div`
display: none;

${({ isTabSelected }) => isTabSelected
  && css`
    display: block;
  `}
${({ isTabSelected, position }) => isTabSelected
  && position === 'left'
  && css`
    width: 80%;
  `}
  ${tabClassicStyling}
`;

export default StyledTab;
