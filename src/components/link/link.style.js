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
        box-shadow: inset 0 0 0 2px var(--colorsActionMajor500);
        border: 2px solid var(--colorsYang100);
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
      color: ${isSkipLink
        ? "var(--colorsYin090)"
        : "var(--colorsActionMajor500)"};
      display: inline-block;
      ${StyledIcon} {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        ${iconAlign === "left" &&
        css`
          margin-right: ${hasContent ? "var(--spacing100)" : 0};
        `}
        ${iconAlign === "right" &&
        css`
          margin-right: 0;
          margin-left: ${hasContent ? "var(--spacing100)" : 0};
        `}
      }

      &:hover {
        cursor: pointer;
        color: ${isSkipLink
          ? "var(--colorsYin090)"
          : "var(--colorsActionMajor600)"};
      }

      &:focus {
        color: var(--colorsYin090);
        background-color: ${isSkipLink
          ? "var(--colorsYang100)"
          : "var(--colorsSemanticFocus250)"};
        outline: none;
      }

      ${disabled &&
      css`
        color: var(--colorsYin065);
        &:hover,
        &:focus {
          cursor: not-allowed;
          color: var(--colorsYin065);
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
