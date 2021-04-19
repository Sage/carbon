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
    href,
    error,
    warning,
    info,
    alternateStyling,
  }) => css`
    line-height: 20px;
    margin: 0;

    ${href &&
    css`
      color: ${theme.text.color};
      display: block;
      text-decoration: none;

      [type="link"] {
        width: 16px;
        margin-left: 8px;
        height: 16px;
        color: inherit;
        margin-top: -2px;
      }
    `}

    ${borders &&
    css`
      border-top: 1px solid ${theme.tab.background};
      border-left: 1px solid ${theme.tab.background};
      border-right: 1px solid ${theme.tab.background};

      ${position === "left" &&
      css`
        border-bottom: 1px solid ${theme.tab.background};
        ${!alternateStyling && `margin-right: -1px;`}
      `}

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
      ${!isTabSelected &&
      !alternateStyling &&
      (error || warning || info) &&
      `margin-right: -2px;`}
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

      ${position === "left" &&
      !isTabSelected &&
      !alternateStyling &&
      (error || warning || info) &&
      `margin-right: -2px;`}
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
    position,
  }) =>
    hasSiblings &&
    !hasCustomLayout &&
    position === "top" &&
    css`
      height: 20px;

      ${size === "default" &&
      css`
        padding-top: 10px;
        padding-bottom: 10px;

        ${!(error || warning || info) &&
        isTabSelected &&
        css`
          padding-bottom: 8px;
        `}
      `}

      ${size === "large" &&
      css`
        padding-top: 10px;
        padding-bottom: 10px;

        ${!(error || warning || info) &&
        isTabSelected &&
        css`
          padding-bottom: 6px;
        `}
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
            padding-right: ${size === "large" ? "26px" : "18px"};
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
  position: relative;

  ${({ position, borders, noRightBorder, noLeftBorder }) => `
      ${
        position === "top" &&
        css`
          ${borders &&
          !(noRightBorder || noLeftBorder) &&
          css`
            &:not(:first-of-type) {
              margin-left: -1px;
            }
          `}
        `
      }
      ${
        position === "left" &&
        css`
          ${borders &&
          css`
            &:not(:first-of-type) {
              margin-top: -1px;
            }
          `}
        `
      }
    `}

  &:first-child {
    margin-left: 0;
  }

  ${({ isTabSelected, theme }) =>
    !isTabSelected &&
    css`
      &:hover,
      &:focus {
        background: ${theme.tab.background};
        color: ${theme.text.color};
        outline: none;
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
    position,
  }) =>
    isTabSelected &&
    css`
    ${!isInSidebar && "z-index: 1;"}
    color: ${theme.text.color};
    background-color: ${theme.colors.white};

    ${
      alternateStyling &&
      css`
        border-bottom: 2px solid ${theme.tab.background};
      `
    }

    ${
      !alternateStyling &&
      css`
        padding-bottom: 2px;
      `
    }

    ${
      size === "large" &&
      css`
        ${position === "top" &&
        `
          padding-bottom: ${alternateStyling ? "3px" : "4px"};
          `}
      `
    }
    ${
      (error || warning || info) &&
      css`
        padding-bottom: 0px;
      `
    }

    &:focus {
      outline: ${isInSidebar ? "none;" : `2px solid ${theme.colors.focus};`}
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

      &:hover {
        ${alternateStyling && `border-right-color: ${theme.tab.background};`}
      }

      ${({ isTabSelected }) =>
        isTabSelected &&
        css`
          ${alternateStyling &&
          css`
            border-right-color: ${theme.tab.background};
          `}

          ${!alternateStyling &&
          css`
            border-right: none;
            padding-bottom: 0px;

            ${StyledTitleContent} {
              ${!(error || warning || info) && `margin-right: 2px;`}
              border-right: none;
            }
          `}
    
          background-color: ${theme.colors.white};

          ${size === "large" &&
          css`
            & ${StyledTitleContent} {
              padding-right: 22px;
            }
          `}

          &:hover {
            ${alternateStyling &&
            ` border-right-color: ${theme.tab.background};`}
            background-color: ${theme.colors.white};
            ${(error || warning || info) &&
            `border-right-color: ${theme.colors.error};`}
          }

          &:focus {
            ${(error || warning || info) &&
            `border-right-color: ${theme.colors.error};`}
          }
        `}
    `}

  ${({ alternateStyling, theme, isTabSelected, isInSidebar }) =>
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

      ${isInSidebar && `padding-bottom: 1px;`}
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

const StyledSelectedIndicator = styled.div`
  position: absolute;
  z-index: 5;

  ${({ position, size, theme }) =>
    position === "top" &&
    css`
    bottom: 0px;
    left: 0px
    box-shadow: inset 0px ${size === "large" ? "-4px" : "-2px"} 0px ${
      theme.colors.primary
    };
    width: 100%;
    height: ${size === "large" ? "4px" : "2px"};
  `}

  ${({ position, size, theme }) =>
    position === "left" &&
    css`
    top: 0px;
    right: 0px
    box-shadow: inset ${size === "large" ? "-4px" : "-2px"} 0px 0px 0px ${
      theme.colors.primary
    };
    height: 100%;
    width: ${size === "large" ? "4px" : "2px"};
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

StyledSelectedIndicator.propTypes = {
  position: PropTypes.oneOf(["top", "left"]),
  size: PropTypes.oneOf(["default", "large"]),
};

StyledSelectedIndicator.defaultProps = {
  theme: BaseTheme,
  position: "top",
  size: "default",
};

export {
  StyledTabTitle,
  StyledTitleContent,
  StyledLayoutWrapper,
  StyledSelectedIndicator,
};
