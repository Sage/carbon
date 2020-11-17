import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import BaseTheme from "../../../../style/themes/base";
import StyledIcon from "../../../icon/icon.style";
import StyledValidationIcon from "../../../validations/validation-icon.style";

const StyledTitleContent = styled.div`
  outline: none;

  ${({
    theme,
    size,
    borders,
    position,
    noLeftBorder,
    noRightBorder,
    isTabSelected,
    hasSiblings,
    error,
    warning,
    info,
  }) => css`
    line-height: 20px;
    margin: 0;
    ${borders &&
    css`
      border-top: 1px solid ${theme.tab.background};
      border-left: 1px solid ${theme.tab.background};

      ${noLeftBorder &&
      css`
        border-left: none;

        ${!noRightBorder &&
        css`
          border-right: 1px solid ${theme.tab.background};
        `}
      `}

      ${noRightBorder &&
      css`
        border-right: none;
      `}
    `}

    ${size === "large" &&
    position === "top" &&
    css`
      padding: 10px 24px;
      font-size: 16px;
      ${isTabSelected &&
      !hasSiblings &&
      !(error || warning || info) &&
      css`
        padding-bottom: 6px;
      `}
    `}

    ${size === "large" &&
    position === "left" &&
    css`
      font-size: 16px;
      padding: 22px 24px;
    `}

    ${size === "default" &&
    css`
      padding: 10px 16px;
      ${isTabSelected &&
      !(error || warning || info) &&
      position === "top" &&
      css`
        padding-bottom: 8px;
      `}
    `}
  `}

  ${({ position, warning, info, theme, size, hasCustomLayout }) =>
    (warning || info) &&
    css`
      outline: 1px solid;
      outline-offset: -1px;

      ${info &&
      !warning &&
      css`
        outline-color: ${theme.colors.info};
      `}

      ${warning &&
      css`
        outline-color: ${theme.colors.warning};
      `}

    ${position === "top" &&
      css`
        border-bottom-color: transparent;
      `}

    ${position === "left" &&
      css`
        border-right-color: transparent;
        padding-right: ${size === "large" ? "26px;" : "18px;"};
      `}
      
    &:hover {
        outline: 1px solid;
        outline-offset: -1px;

        ${info &&
        !warning &&
        css`
          outline-color: ${theme.colors.info};
        `}

        ${warning &&
        css`
          outline-color: ${theme.colors.warning};
        `}

      ${position === "top" &&
        css`
          border-bottom-color: transparent;

          ${hasCustomLayout &&
          css`
            padding-bottom: 2px;
          `}
        `}

      ${position === "left" &&
        css`
          border-right-color: transparent;
          padding-right: ${size === "large" ? "26px;" : "18px;"};
        `}
      }
    `}

  ${({ error, theme, position, size, hasCustomLayout }) =>
    error &&
    css`
      outline: 2px solid ${theme.colors.error};
      outline-offset: -2px;

      ${position === "top" &&
      css`
        border-bottom-color: transparent;
      `}

      ${position === "left" &&
      css`
        border-right-color: transparent;
        padding-right: ${size === "large" ? "26px;" : "18px;"};
      `}
    
    &:hover {
        outline: 2px solid ${theme.colors.error};
        outline-offset: -2px;
        ${position === "top" &&
        css`
          border-bottom-color: transparent;

          ${hasCustomLayout &&
          css`
            padding-bottom: 2px;
          `}
        `}

        ${position === "left" &&
        css`
          border-right-color: transparent;
          padding-right: ${size === "large" ? "26px;" : "18px;"};
        `}
      }
    `}

  ${({
    hasSiblings,
    hasCustomLayout,
    error,
    warning,
    info,
    size,
    isTabSelected,
  }) =>
    hasSiblings &&
    !hasCustomLayout &&
    css`
      ${size === "default" &&
      css`
      padding-top: 11px 
      padding-bottom: 8px;

      ${
        !(error || warning || info) &&
        isTabSelected &&
        css`
          padding-bottom: 6px;
        `
      }
    `}

      ${size === "large" &&
      css`
      padding-top: 9px 
      padding-bottom: 9px;

      ${
        !(error || warning || info) &&
        isTabSelected &&
        css`
          padding-bottom: 5px;
        `
      }
    `}
    `}

  ${({
    hasCustomLayout,
    error,
    warning,
    info,
    position,
    size,
    isTabSelected,
  }) =>
    hasCustomLayout &&
    css`
      display: flex;

      ${position === "left" &&
      css`
        padding: ${size === "large" ? "2px;" : "0px;"}
          ${isTabSelected &&
          css`
            padding-right: 0px;
          `}
          ${(error || warning || info) &&
          css`
            padding-right: ${size === "large" ? "26px;" : "18px;"};
          `};
      `}

      ${position === "top" &&
      css`
        padding: ${size === "large" ? "2px;" : "0px;"}
          ${isTabSelected &&
          css`
            padding-bottom: 0px;
          `}
          ${(error || warning || info) &&
          css`
        padding-bottom: ${size === "large" ? "4px;" : "2px;"}
        padding-right: ${size === "large" ? "18px;" : "14px;"}

        &:hover {
          padding-bottom: ${size === "large" ? "4px;" : "2px;"}
        }
      `};
      `}
    `}
`;

const StyledTabTitle = styled.li`
  background-color: transparent;
  display: inline-block;
  font-weight: bold;
  height: 100%;

  ${({ theme, position, borders, noRightBorder }) =>
    position === "top" &&
    css`
      ${borders &&
      !noRightBorder &&
      css`
        &:last-of-type {
          ${StyledTitleContent} {
            border-right: 1px solid ${theme.tab.background};
          }
        }
      `}
    `}

  &:first-child {
    margin-left: 0;
  }

  ${({ isTabSelected, theme, error, warning, info }) =>
    !isTabSelected &&
    css`
      &:hover,
      &:focus {
        background: ${theme.tab.background};
        color: ${theme.text.color};
        outline: none;
        ${error || warning || info ? "border-bottom: none;" : ""}
      }
    `}

  ${({
    isTabSelected,
    theme,
    alternateStyling,
    error,
    warning,
    info,
    size,
    isInSidebar,
  }) =>
    isTabSelected &&
    css`
    color: ${theme.text.color};
    background-color: ${theme.colors.white};
    border-bottom: 2px solid ${
      alternateStyling ? `${theme.tab.background}` : `${theme.colors.primary}`
    };
    ${
      size === "large" &&
      css`
        border-bottom-width: 4px;
      `
    }
    ${error || warning || info ? "border-bottom: none;" : ""}

    &:focus {
      outline: ${isInSidebar ? "none;" : `2px solid ${theme.colors.focus};`}
      z-index: 10;
    }

    &:hover {
      background-color: ${theme.colors.white};
      border-bottom-color: ${
        alternateStyling
          ? `${theme.tab.background};`
          : `${theme.colors.primary};`
      }
      color: ${theme.text.color};
      cursor: default;
    }
  `}
  
  ${({
    position,
    size,
    borders,
    theme,
    alternateStyling,
    error,
    warning,
    info,
  }) =>
    position === "left" &&
    css`
      background-color: transparent;
      border-bottom: 0px;

      ${borders &&
      css`
        &:last-of-type {
          ${StyledTitleContent} {
            border-bottom: 1px solid ${theme.tab.background};
          }
        }
      `}

      ${!borders &&
      css`
        ${StyledTitleContent} {
          border-bottom: none;
        }
      `}

    ${!alternateStyling &&
      css`
        border-right: 2px solid ${theme.tab.background};
      `}
    display: block;
      height: auto;
      margin-left: 0px;

      &:first-child {
        margin-top: 0;
      }

      ${error || warning || info ? "border-right: none;" : ""}

      &:hover {
        ${borders &&
        css`
          &:last-of-type {
            ${StyledTitleContent} {
              border-bottom: 1px solid ${theme.tab.background};
            }
          }
        `}
        border-right-color: ${alternateStyling
          ? `${theme.tab.background};`
          : ""}
      ${error || warning || info ? "border-right: none;" : ""}
      }

      ${({ isTabSelected }) =>
        isTabSelected &&
        css`
      border-right-color: ${
        alternateStyling
          ? `${theme.tab.background};`
          : `${theme.colors.primary};`
      }
      background-color: ${theme.colors.white};
      ${error || warning || info ? "border-right: none;" : ""}

      ${
        size === "large" &&
        css`
          border-right-width: 4px;
        `
      }

      &:hover {
        border-right-color: ${
          alternateStyling
            ? `${theme.tab.background};`
            : `${theme.colors.primary};`
        }
        background-color: ${theme.colors.white};
        ${
          error || warning || info
            ? `border-right-color: ${theme.colors.error};`
            : ""
        }
      }

      &:focus {
        ${
          error || warning || info
            ? `border-right-color: ${theme.colors.error};`
            : ""
        }
      }
    `}
    `}

  ${({ alternateStyling, theme, isTabSelected }) =>
    alternateStyling &&
    css`
      &:focus {
        background-color: ${theme.tab.background};
      }

      &:hover {
        background-color: ${isTabSelected
          ? `${theme.tab.background};`
          : `${theme.tab.altHover};`};
      }

      ${isTabSelected &&
      css`
        background-color: ${theme.tab.background};
      `}
    `}
`;

const StyledLayoutWrapper = styled.div`
  ${({ hasCustomLayout }) =>
    hasCustomLayout &&
    css`
      flex-grow: 2;
      min-width: 100px;
    `}

  ${({ hasCustomLayout, titlePosition, hasCustomSibling }) =>
    !hasCustomLayout &&
    css`
      display: inline-flex;

      ${({ theme }) => css`
        position: relative;
        top: -1px;
        ${hasCustomSibling &&
        css`
          left: 4px;
        `}
        ${!hasCustomSibling &&
        css`
          ${titlePosition === "before"
            ? `left: ${theme.spacing}px;`
            : `right: ${theme.spacing}px;`}
        `}
      `}

      ${StyledIcon} {
        height: 20px;
      }

      ${StyledValidationIcon} {
        z-index: 10;

        ${StyledIcon} {
          height: 16px;
          left: -2px;
          top: 3px;
        }
      }
    `}
`;

StyledTabTitle.propTypes = {
  position: PropTypes.oneOf(["top", "left"]),
  size: PropTypes.oneOf(["default", "large"]),
  borders: PropTypes.bool,
};

StyledTabTitle.defaultProps = {
  theme: BaseTheme,
  position: "top",
  size: "default",
  borders: false,
};

StyledLayoutWrapper.propTypes = {
  hasCustomLayout: PropTypes.bool,
  titlePosition: PropTypes.oneOf(["before", "after"]),
};

StyledLayoutWrapper.defaultProps = {
  theme: BaseTheme,
  titlePosition: "before",
};

StyledTitleContent.propTypes = {
  position: PropTypes.oneOf(["top", "left"]),
  size: PropTypes.oneOf(["default", "large"]),
  borders: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  info: PropTypes.bool,
  noLeftBorder: PropTypes.bool,
  noRightBorder: PropTypes.bool,
  hasSiblings: PropTypes.bool,
};

StyledTitleContent.defaultProps = {
  theme: BaseTheme,
  position: "top",
  size: "default",
  borders: false,
};

export { StyledTabTitle, StyledTitleContent, StyledLayoutWrapper };
