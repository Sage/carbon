import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { StyledHeader, StyledSeparator } from "../heading/heading.style";

interface DividerProps {
  hasDivider: boolean;
}

export const StyledSettingsRow = styled.div.attrs(applyBaseTheme)<DividerProps>`
  ${margin}

  clear: both;
  color: var(--colorsUtilityYin055);
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding: 0;
  position: relative;

  ${({ hasDivider }) =>
    hasDivider &&
    css`
      border-bottom: 1px solid var(--colorsUtilityMajor050);
      padding-bottom: 30px;
    `}

  ${StyledHeader} {
    margin-bottom: 0;
  }

  ${StyledSeparator} {
    margin-bottom: 17px;
  }

  + & {
    padding-top: 30px;
  }
`;

export const StyledSettingsRowHeader = styled.div`
  box-sizing: border-box;
  clear: both;
  float: left;
  max-width: 325px;
  width: 35%;
`;

export const StyledSettingsRowInput = styled.div`
  box-sizing: border-box;
  clear: both;
  float: left;
  margin-left: 50px;
  width: 100%;
`;
