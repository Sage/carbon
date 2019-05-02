import styled, { css } from 'styled-components';
import StyledTableCell from '../table-cell/table-cell.style';
import { THEMES } from '../../../style/themes';

const StyledTableSubheader = styled(StyledTableCell)`
  ${styleTableSubheader}
`;

function styleTableSubheader(props) {
  return props.theme.name === THEMES.classic ? applyClassicSubheaderStyling() : applyModernSubheaderStyling();
}

function applyClassicSubheaderStyling() {
  return css`
    background-color: #001E2B;
    color: white;
    font-weight: bold;
  `;
}

function applyModernSubheaderStyling() {

}

export default StyledTableSubheader;
