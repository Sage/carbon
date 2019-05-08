import styled, { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import baseTheme from '../../../style/themes/base';
// import { THEMES } from '../../../style/themes';

const StyledTableSubheader = styled(StyledTableCell)`
  ${applyClassicSubheaderStyling}
`;

// function styleTableSubheader(props) {
//   return props.theme.name === THEMES.classic ? applyClassicSubheaderStyling() : applyModernSubheaderStyling();
// }

function applyClassicSubheaderStyling() {
  return css`
    background-color: #001E2B;
    color: white;
    font-weight: bold;
  `;
}

StyledTableSubheader.defaultProps = {
  theme: baseTheme
};

export default StyledTableSubheader;
