import styled, { css } from "styled-components";
import { space } from "styled-system";
import StyledButton from "../button/button.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { DlProps } from "./dl.component";

export const StyledDl = styled.dl.attrs(applyBaseTheme)<
  Omit<DlProps, "dtTextAlign" | "ddTextAlign">
>`
  ${space}

  ${({ asSingleColumn, w }) => css`
    ${!asSingleColumn &&
    css`
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: ${w}% auto;
    `}
    ${asSingleColumn &&
    css`
      line-height: 21px;
    `}
  `}

  width: 100%;
  height: auto;
  background-color: transparent;
`;

export const StyledDt = styled.dt.attrs(applyBaseTheme)<
  Pick<DlProps, "asSingleColumn" | "dtTextAlign">
>`
  ${space}
  font-size: var(--fontSizes100);
  font-weight: 500;
  color: var(--colorsUtilityYin090);
  ${({ asSingleColumn }) =>
    !asSingleColumn &&
    css`
      grid-column: 1;
    `}
  ${({ dtTextAlign }) => css`
    text-align: ${dtTextAlign};
  `}
`;

export const StyledDd = styled.dd<
  Pick<DlProps, "asSingleColumn" | "ddTextAlign">
>`
  font-size: var(--fontSizes100);
  font-weight: var(--fontWeights400);
  color: var(--colorsUtilityYin065);
  margin-left: 0px;
  ${({ asSingleColumn }) =>
    !asSingleColumn &&
    css`
      grid-column: 2;
    `}
  ${({ ddTextAlign }) => css`
    text-align: ${ddTextAlign};
  `}

  ${StyledButton} {
    padding: 0;
    border: none;
  }
  ${space}
`;
