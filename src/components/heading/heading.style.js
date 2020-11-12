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

  .carbon-heading--has-divider & {
    margin-top: -8px;
  }

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

export { StyledHeadingIcon, StyledHeading };
