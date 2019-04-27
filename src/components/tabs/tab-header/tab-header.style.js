import styled, { css } from 'styled-components';
import tabHeaderClassicStyle from './tab-header-classic.style';

const StyledTabHeader = styled.li`
background-color: transparent;
border-bottom: 2px solid #e5eaec; // TODO: zmienic na kolor z palety
color: ${({ theme }) => theme.disabled.disabled};
font-size: ${({ theme }) => theme.text.size}
display: inline-block;
font-weight: bold;
height: 100%;
margin-left: 2px;
padding: 11px 15px 10px;

&:first-child {
  margin-left: 0;
}

&:focus,
&:hover {
  background: none;
  border-bottom-color: #004b87;
  color: ${({ theme }) => theme.text.color};
  outline: none;
}

${({ isTabSelected }) => !isTabSelected
  && css`
    &:hover {
      background: #fff;
      color: #003349;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 6px rgba(37, 91, 199, 0.6);
    }
  `}

${({ isTabSelected, theme }) => isTabSelected
  && css`
    background-color: transparent;
    color: ${theme.text.color};
    border-bottom-color: ${theme.colors.primary};
  `}

  ${({ position }) => position === 'left'
    && css`
      background-color: #fff;
      border-bottom-color: #1963f6;
      border-bottom: 0px;
      border-right: 2px solid #ccd6db;
      display: block;
      height: auto;
      margin-left: 0px;
      margin-top: 2px;

      &:first-child {
        margin-top: 0;
      }

      &:hover {
        border-right-color: #1963f6;
      }

      ${({ isTabSelected, theme }) => isTabSelected
        && css`
          border-right-color: ${theme.colors.primary};
        `}
    `}
  ${tabHeaderClassicStyle}
`;

export default StyledTabHeader;
