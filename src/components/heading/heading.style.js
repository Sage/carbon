import styled, { css } from "styled-components";
import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import baseTheme from "../../style/themes/base";
import StyledLink from "../link/link.style";

const StyledHeading = styled.div`
  width: 100%;
  &&&& ${StyledLink} {
    a,
    button {
      text-decoration: none;
      padding-top: ${({ divider }) => (divider ? "8px" : "1px")};

      &:focus {
        background-color: transparent;
        outline: 3px solid ${({ theme }) => theme.colors.focus};
        width: 25px;
      }
    }

    ${({ divider, subheader }) => css`
      margin-top: ${!divider ? "-16px" : ""};
      margin-top: ${!subheader ? "-22px" : ""};
      margin-top: ${!divider && !subheader ? "-12px" : ""};
      margin-top: ${divider && !subheader ? "-14px" : ""};
    `}
  }
  position: relative;
`;

StyledHeading.defaultProps = {
  theme: baseTheme,
};

const StyledHeadingIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.border};
  cursor: pointer;
  top: 50%;
  z-index: 1002;
  position: absolute;

  &,
  &.${StyledIcon} {
    position: absolute;
    display: block;
    color: ${({ theme }) => theme.icon};
  }

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

const StyledSubHeader = styled.div`
  margin-top: 5px;
`;

StyledSubHeader.defaultProps = {
  theme: baseTheme,
};

const StyledHeader = styled.div`
  position: relative;
`;

StyledHeader.defaultProps = {
  theme: baseTheme,
};

const StyledDivider = styled.hr`
  width: inherit;
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.hr.background};
  margin: 15px 0 20px;
`;

StyledDivider.defaultProps = {
  theme: baseTheme,
};

const StyledSeparator = styled.hr`
  border-top: 2px solid ${({ theme }) => theme.palette.slateTint(80)};
  margin: 10px 0 8px;
  text-align: left;
  width: 50px;
`;

StyledSeparator.defaultProps = {
  theme: baseTheme,
};

const StyledHeaders = styled.div`
  margin-left: ${({ back }) => (back ? "30px" : "")};
`;

const StyledHeaderLink = styled.div`
  margin-top: -14px;
  top: 50%;
  position: absolute;
`;

const StyledHeaderHelp = styled.div`
  display: inline-block;
  margin-left: 10px;
  position: relative;
  top: -3px;
  height: 22px;
`;

export {
  StyledHeadingIcon,
  StyledHeading,
  StyledSubHeader,
  StyledHeader,
  StyledDivider,
  StyledSeparator,
  StyledHeaders,
  StyledHeaderLink,
  StyledHeaderHelp,
};
