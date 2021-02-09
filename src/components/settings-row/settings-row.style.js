import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import {
  StyledHeader,
  StyledHeadingTitle,
  StyledSeparator,
} from "../heading/heading.style";

export const StyledSettingsRow = styled.div`
  clear: both;
  color: ${({ theme }) => theme.palette.slateTint(20)};
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  position: relative;

  ${({ hasDivider }) =>
    hasDivider &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.palette.slateTint(90)};
      padding-bottom: 30px;
    `}

  ${StyledHeader} {
    margin-bottom: 0;
  }

  ${StyledHeadingTitle} {
    color: ${({ theme }) => theme.palette.slate};
    font-size: 15px;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  ${StyledSeparator} {
    margin-bottom: 17px;
  }

  + & {
    padding-top: 30px;
  }
`;

StyledSettingsRow.defaultProps = {
  theme: baseTheme,
};

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
