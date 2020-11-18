import styled, { css } from "styled-components";
import { space } from "styled-system";
import { baseTheme } from "../../style/themes";
import StyledButton from "../button/button.style";
import LinkStyle from "../link/link.style";

export const StyledDl = styled.dl`
  ${space}
  display: grid;
  height: auto;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
  grid-template-rows: auto;
  grid-template-columns: ${({ w }) => `${w}% auto;`};
`;

export const StyledDtDiv = styled.div`
  ${space}
  ${({ dtTextAlign }) => css`
    text-align: ${dtTextAlign};
  `}
`;

export const StyledDdDiv = styled.div`
  ${({ ddTextAlign }) => css`
    text-align: ${ddTextAlign};
  `}
`;

export const StyledDt = styled.dt`
  ${space}
  ${({ theme }) => css`
    font-size: 14px
    font-weight: 700;
    color: ${theme.definitionList.dtTextDark};
  `}
`;

StyledDt.defaultProps = {
  theme: baseTheme,
};

export const StyledDd = styled.dd`
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
  ${space}
`;

StyledDd.defaultProps = {
  theme: baseTheme,
};
