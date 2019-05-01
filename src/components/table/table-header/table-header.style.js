import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { THEMES } from '../../../style/themes';

const StyledTableHeader = styled.th`
  ${styleTableHeader}
`;

function styleTableHeader(props) {
  return props.theme.name === THEMES.classic ? classicStyledHeader(props) : modernStyledHeader(props);
}

function classicStyledHeader(props) {
  return css`
    background-color: #335c6d;
    border-bottom: 1px solid #ccd6db;
    border-left: 1px solid #668592;
    border-right: none;
    border-top: none;
    box-sizing: border-box;
    color: #ffffff;
    font-weight: 700;
    height: 40px;
    outline: medium none;
    padding: 0 8px;
    position: relative;
    text-align: ${props.align !== '' ? props.align : 'left'};
    text-overflow: ellipsis;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    &:first-child {
      border-left: none;
    }

    ${props.isSelectable && ` 
      text-align: center;
      width: 18px;
    
      .carbon-checkbox {
        height: 15px;
        padding-top: 0;
      }
    `}
    
    .carbon-table-header__icon {
      float: right;
    
      .carbon-icon__svg--sort-down,
      .carbon-icon__svg--sort-up {
        height: 11px;
        width: 10px;
      }
    }
    
    .carbon-table-header__icon--align-right {
      float: left;
    }

    ${props.sortable && `
      cursor: pointer;

      &:hover {
        background-color: #002E41;
      }

      a {
        &:link,
        &:visited,
        &:hover,
        &:active {
          color: #ffffff;
          text-decoration: none;
        }
      }
    `}
  `;
}

function modernStyledHeader(props) {

}

StyledTableHeader.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right', ''])
};

export default StyledTableHeader;
