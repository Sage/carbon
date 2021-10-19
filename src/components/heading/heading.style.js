import styled, { css } from "styled-components";
import { margin } from "styled-system";

import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import baseTheme from "../../style/themes/base";
import Help from "../help";
import Typography from "../typography";
import Hr from "../hr";
import Link from "../link";

const StyledHeading = styled.div`
  width: 100%;
  ${margin}
`;

StyledHeading.defaultProps = {
  theme: baseTheme,
};

const StyledHeaderContent = styled.div`
  display: inline-flex;
  align-items: flex-end;
`;

const StyledHeader = styled.div`
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

const StyledHeadingBackButton = styled(Link)`
  margin-right: 5px;
  margin-top: 2px;

  a,
  button {
    margin: 0 1px 0 0;
    text-decoration: none;

    &:focus {
      background-color: transparent;
      outline: 3px solid ${({ theme }) => theme.colors.focus};
    }

    ${StyledIcon} {
      margin-right: 0;
      display: inline-flex;
    }
  }
`;

StyledHeadingBackButton.defaultProps = {
  theme: baseTheme,
};

const StyledHeadingTitle = styled(Typography)`
  line-height: 32px;
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

const StyledSubHeader = styled.div`
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
  color: ${({ theme }) => theme.colors.border};
  height: 30px;

  &:before,
  &${StyledIcon}:before {
    font-size: 24px;
  }

  &:hover {
    color: ${({ theme }) => theme.icon.focus};
  }
`;

StyledHeadingIcon.defaultProps = {
  theme: baseTheme,
};

const StyledSeparator = styled.hr`
  border-top: 2px solid ${({ theme }) => theme.palette.slateTint(80)};
  margin: 10px 0 8px;
  text-align: left;
  width: 50px;
`;

const StyledDivider = styled(Hr)`
  margin: 15px 0 20px;
`;

StyledSeparator.defaultProps = {
  theme: baseTheme,
};

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
  StyledHeadingBackButton,
  StyledHeadingPills,
};
