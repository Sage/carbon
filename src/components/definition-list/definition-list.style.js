import styled, { css } from 'styled-components';
import { space } from 'styled-system';
import { baseTheme } from '../../style/themes';
import StyledButton from '../button/button.style';
import LinkStyle from '../link/link.style';

export const StyledDl = styled.dl`
  ${space}
  display: inline-flex;
  height: auto;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
`;

export const StyledDtDiv = styled.div`
  ${space}
  ${({ w, dtTextAlign }) => css`
    text-align: ${dtTextAlign};
    width: ${w}%;
  `}
`;

export const StyledDdDiv = styled.div`
  ${({ ddTextAlign }) => css`
    text-align: ${ddTextAlign};
    width: inherit;
    width: -moz-available;
    width: -webkit-fill-available;
  `}
`;

export const StyledDt = styled.dt`
  ${space}
  margin-bottom: 0px;
  ${({ theme }) => css`
    font-size: 14px
    font-weight: 700;
    color: ${theme.definitionList.dtTextDark};
  `}
`;

StyledDt.defaultProps = {
  theme: baseTheme
};

export const StyledDd = styled.dd`
  ${space}
  margin-bottom: 0px;
  ${({ theme }) => css`
    font-size: 14px
    font-weight: 700;
    color: ${theme.definitionList.ddText};
    margin-left: 0px;

    ${StyledButton} {
      padding: 0;
      border: none;
    }

    ${LinkStyle} {
      a, button {
        font-weight: 700px;
        text-decoration: none;
      }
    }
  `}
`;

StyledDt.defaultProps = {
  theme: baseTheme
};
