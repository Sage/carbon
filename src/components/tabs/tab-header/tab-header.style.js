import styled, { css } from 'styled-components';
import tabHeaderClassicStyle from './tab-header-classic.style';

const StyledTabHeader = styled.li`
background-color: #f5f6f7;
border-bottom: 2px solid #ccd6db;
color: #003349;
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
  background: #004b87;
  border-bottom-color: #004b87;
  color: #fff;
  outline: none;
}

&:focus {
  outline: none;
  box-shadow: 0 0 6px rgba(37, 91, 199, 0.6);
}

${({ isTabSelected }) => isTabSelected
  && css`
    background-color: #fff;
    border-bottom-color: #1963f6;

    &:hover {
      background: #fff;
      border-bottom-color: #1963f6;
      color: #003349;
    }
  `}

  ${({ position }) => position === 'left'
    && css`
      background-color: #f5f6f7;
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
        border-right-color: #004b87;
        background: #004b87;
      }

      ${({ isTabSelected }) => isTabSelected
        && css`
          border-right-color: #1963f6;
          background-color: #fff;

          &:hover {
            border-right-color: #1963f6;
            background-color: #fff;
          }
        `}
    `}
  ${tabHeaderClassicStyle}
`;

export default StyledTabHeader;
