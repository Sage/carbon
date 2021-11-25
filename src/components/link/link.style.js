import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const StyledLink = styled.span`
  ${({ isSkipLink, theme, iconAlign, hasContent, disabled }) => css`
    display: inline-block;

    ${isSkipLink &&
    css`
      a {
        position: absolute;
        padding-left: 24px;
        padding-right: 24px;
        line-height: 36px;
        left: -999em;
        z-index: ${theme.zIndex.aboveAll};
        box-shadow: inset 0 0 0 2px ${theme.colors.primary};
        border: 2px solid ${theme.colors.white};
      }

      a:focus {
        top: 8px;
        left: 8px;
      }
    `}

    a,
  button {
      font-size: ${isSkipLink ? "16px" : "14px"};
      text-decoration: underline;
      color: ${isSkipLink ? theme.text.color : theme.colors.primary};
      display: inline-block;
      ${StyledIcon} {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        ${iconAlign === "left" &&
        css`
          margin-right: ${hasContent ? "5px" : 0};
        `}
        ${iconAlign === "right" &&
        css`
          margin-right: 0;
          margin-left: ${hasContent ? "5px" : 0};
        `}
      }

      &:hover {
        cursor: pointer;
        color: ${isSkipLink ? theme.text.color : theme.colors.secondary};
      }

      &:focus {
        color: ${theme.text.color};
        background-color: ${isSkipLink
          ? theme.colors.white
          : theme.colors.focusedLinkBackground};
        outline: none;
      }

      ${disabled &&
      css`
        color: ${theme.disabled.text};
        &:hover,
        &:focus {
          cursor: not-allowed;
          color: ${theme.disabled.text};
        }
      `}
    }

    button {
      background-color: transparent;
      border: none;
      padding: 0;
    }
  `}
`;

StyledLink.defaultProps = {
  theme: baseTheme,
  disabled: false,
  hasContent: true,
};

StyledLink.propTypes = {
  disabled: PropTypes.bool,
  hasContent: PropTypes.bool,
};

const StyledContent = styled.span``;

export { StyledLink, StyledContent };
