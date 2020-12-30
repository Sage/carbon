import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const LinkStyle = styled.div`
  display: inline-block;
  a,
  button {
    font-size: 14px;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary};
    display: inline-block;
    ${StyledIcon} {
      position: relative;
      vertical-align: middle;
      ${({ iconAlign, hasContent }) =>
        iconAlign === "left" &&
        css`
          margin-right: ${hasContent ? "5px" : 0};
        `}
      ${({ iconAlign, hasContent }) =>
        iconAlign === "right" &&
        css`
          margin-right: 0;
          margin-left: ${hasContent ? "5px" : 0};
        `}
    }
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.secondary};
    }
    ${({ theme }) => css`
      &:focus {
        color: ${theme.text.color};
        background-color: ${theme.colors.focusedLinkBackground};
        outline: none;
      }
    `}
    ${({ disabled, theme }) =>
      disabled &&
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
`;

LinkStyle.defaultProps = {
  theme: baseTheme,
  disabled: false,
  hasContent: true,
};

LinkStyle.propTypes = {
  disabled: PropTypes.bool,
  hasContent: PropTypes.bool,
};

export default LinkStyle;
