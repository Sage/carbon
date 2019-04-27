import styled, { css } from 'styled-components';
import tabsHeaderClassicStyle from './tabs-header-classic.style';

const StyledTabHeaders = styled.ul`
box-shadow: inset 0px -2px 0px 0px #e5eaec; // TODO: zmienic na kolor z palety
cursor: pointer;
list-style: none;
margin: 0 0 10px;
padding: 0;

${({ align }) => align === 'right'
  && css`
    text-align: right;
  `}

${({ position }) => position === 'left'
  && css`
    box-shadow: inset -2px 0px 0px 0px #e5eaec; // TODO: zmienic na kolor z palety
    display: inline-block;
    width: 20%;
    margin: 0 10px 0;
  `}
  ${tabsHeaderClassicStyle}
`;

export default StyledTabHeaders;
