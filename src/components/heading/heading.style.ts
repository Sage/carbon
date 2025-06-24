import styled, { css, SimpleInterpolation } from "styled-components";
import { margin } from "styled-system";

import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import Help from "../help";
import Typography from "../typography";
import Hr from "../hr";
import addFocusStyling from "../../style/utils/add-focus-styling";

const StyledHeading = styled.div.attrs(applyBaseTheme)`
  width: 100%;
  ${margin}
`;

const StyledHeaderContent = styled.div`
  display: inline-flex;
  align-items: flex-end;
`;

type StyledHeaderProps = {
  divider?: boolean;
  subheader?: boolean;
  hasBackLink?: boolean;
};

const StyledHeader = styled.div<StyledHeaderProps>`
  ${({ divider, subheader, hasBackLink }) => css`
    ${subheader &&
    css`
      margin-bottom: 16px;
    `}

    ${divider &&
    css`
      margin-bottom: 15px;
    `}

    ${divider &&
    !subheader &&
    css`
      margin-bottom: 20px;
    `}

    ${hasBackLink &&
    css`
      display: grid;
      grid-template-columns: min-content auto;
    `}
  `}
`;

export const styledHeadingBackButton = (baseStyles: SimpleInterpolation) => css`
  ${baseStyles}

  margin-right: 5px;
  margin-top: 2px;
  box-shadow: none;
  a,
  button {
    margin: 0 1px 0 0;
    text-decoration: none;
    display: block;

    &:focus {
      background-color: transparent;
      ${addFocusStyling()}
    }

    &:hover {
      ${StyledIcon} {
        color: var(--colorsActionMinor600);
      }
    }

    ${StyledIcon} {
      margin-right: 0;
      display: inline-flex;
      color: var(--colorsActionMinor500);
    }
  }
`;

type StyledHeadingTitleProps = {
  withMargin?: boolean;
};

const StyledHeadingTitle = styled(Typography)<StyledHeadingTitleProps>`
  ${({ withMargin }) =>
    withMargin
      ? css`
          margin-right: 16px;
        `
      : null}
`;

const StyledHeadingPills = styled.span`
  line-height: 32px;
  display: inline-block;
  vertical-align: top;
`;

type StyledSubHeaderProps = {
  hasBackLink?: boolean;
  hasSeparator?: boolean;
};

const StyledSubHeader = styled.div<StyledSubHeaderProps>`
  margin-top: 5px;
  grid-row: 2;

  ${({ hasBackLink }) =>
    hasBackLink &&
    css`
      grid-column: 2;
    `}

  ${({ hasSeparator }) =>
    hasSeparator &&
    css`
      grid-row: 3;
      margin-top: 0px;
    `}
`;

const StyledHeadingIcon = styled(Icon)`
  height: 30px;

  &:before,
  &${StyledIcon}:before {
    font-size: 24px;
  }
`;

const StyledSeparator = styled.hr`
  border-top: 2px;
  border-style: solid;
  border-color: var(--colorsUtilityMajor100);
  margin: 10px 0 8px;
  text-align: left;
  width: 50px;
`;

const StyledDivider = styled(Hr)`
  margin: 15px 0 20px;
`;

const StyledHeaderHelp = styled(Help)`
  display: inline-block;
  margin-left: -6px;
  margin-right: 16px;
  position: relative;
  top: -4px;
  height: 22px;
`;

export {
  StyledHeadingIcon,
  StyledHeading,
  StyledSubHeader,
  StyledHeader,
  StyledSeparator,
  StyledHeaderHelp,
  StyledHeadingTitle,
  StyledDivider,
  StyledHeaderContent,
  StyledHeadingPills,
};
