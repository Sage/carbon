import styled, { css } from "styled-components";
import { space } from "styled-system";
import { ExplicitUnion } from "../../__internal__/utils/helpers/types";
import StyledButton from "../button/button.style";
import { baseTheme } from "../../style/themes";

export interface StyledDlProps {
  /** Render the DefinitionList as a single column */
  asSingleColumn?: boolean;
  /** This value will specify the width of the `StyledDtDiv` as a percentage. The remaining space will be taken up
      by the `StyledDdDiv`. This prop has no effect when `asSingleColumn` is set.
   */
  w?: number;
}

export type ElementAlignment = "left" | "center" | "right";

export const StyledDl = styled.dl<StyledDlProps>`
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

StyledDl.defaultProps = {
  theme: baseTheme,
};

export interface StyledDtDivProps {
  /** This string will specify the text align styling of the `<dt></dt>`. */
  dtTextAlign?: ExplicitUnion<ElementAlignment>;
}

export const StyledDtDiv = styled.div<StyledDtDivProps>`
  ${space}
  ${({ dtTextAlign }) => css`
    text-align: ${dtTextAlign};
  `}
`;

StyledDtDiv.defaultProps = {
  theme: baseTheme,
};

export interface StyledDdDivProps {
  /** This string will specify the text align styling of the `<dd></dd>`. */
  ddTextAlign?: ExplicitUnion<ElementAlignment>;
}

export const StyledDdDiv = styled.div<StyledDdDivProps>`
  ${({ ddTextAlign }) => css`
    text-align: ${ddTextAlign};
  `}
`;

export const StyledDt = styled.dt`
  ${space}
  font-size: var(--fontSizes100);
  font-weight: 700;
  color: var(--colorsUtilityYin090);
`;

StyledDt.defaultProps = {
  theme: baseTheme,
};

export const StyledDd = styled.dd`
  font-size: var(--fontSizes100);
  font-weight: var(--fontWeights400);
  color: var(--colorsUtilityYin065);
  margin-left: 0px;

  ${StyledButton} {
    padding: 0;
    border: none;
  }
  ${space}
`;
