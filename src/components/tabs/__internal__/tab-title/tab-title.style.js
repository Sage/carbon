import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import StyledIcon from "../../../icon/icon.style";
import StyledValidationIcon from "../../../../__internal__/validations/validation-icon.style";

const StyledTitleContent = styled.span`
  outline: none;
  display: inline-block;

  ${({
    size,
    borders,
    position,
    noLeftBorder,
    noRightBorder,
    hasHref,
    alternateStyling,
    align,
  }) => css`
    line-height: 20px;
    margin: 0;
    text-align: ${align};

    ${position === "left" &&
    css`
      display: flex;
      width: 100%;
      justify-content: ${align === "right" ? "flex-end" : "flex-start"};
    `}

    ${hasHref &&
    css`
      color: var(--colorsActionMinorYin090);
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

    ${!hasHref &&
    css`
      [data-component="icon"]:not([color]) {
        color: var(--colorsActionMinorYin065);
      }
    `}

    ${borders &&
    css`
      border-top: 1px solid var(--colorsActionMinor100);
      border-left: 1px solid var(--colorsActionMinor100);
      border-right: 1px solid var(--colorsActionMinor100);

      ${position === "left" &&
      css`
        border-bottom: 1px solid var(--colorsActionMinor100);
        ${!alternateStyling && `margin-right: -1px;`}
      `}

      ${noLeftBorder &&
      css`
        border-left: none;

        ${!noRightBorder &&
        css`
          border-right: 1px solid var(--colorsActionMinor100);
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
      padding: 14px 24px;
      ${borders && `padding-bottom: 9px;`}
      font-size: 16px;
    `}

    ${size === "large" &&
    position === "left" &&
    css`
      font-size: 16px;
      padding: 14px 24px;
    `}

    ${size === "default" &&
    css`
      padding: 10px 16px;

      ${borders && `padding-bottom: 9px;`}
    `}
  `}

  ${({ position, warning, info, size, hasCustomLayout }) =>
    (warning || info) &&
    css`
      outline: 1px solid;
      outline-offset: -1px;

      ${info &&
      !warning &&
      css`
        outline-color: var(--colorsSemanticInfo500);
      `}

      ${warning &&
      css`
        outline-color: var(--colorsSemanticCaution500);
      `}

    ${position === "top" &&
      css`
        border-bottom-color: transparent;
      `}

    ${position === "left" &&
      css`
        border-right-color: transparent;
        padding-right: ${size === "large" ? "26px" : "18px"};
      `}
      
      &:hover {
        outline: 1px solid;
        outline-offset: -1px;

        ${info &&
        !warning &&
        css`
          outline-color: var(--colorsSemanticInfo500);
        `}

        ${warning &&
        css`
          outline-color: var(--colorsSemanticCaution500);
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
          padding-right: ${size === "large" ? "26px" : "18px"};
        `}
      }
    `}

  ${({ error, position, size, hasCustomLayout }) =>
    error &&
    css`
      outline: 2px solid var(--colorsSemanticNegative500);
      outline-offset: -2px;

      ${position === "top" &&
      css`
        border-bottom-color: transparent;
      `}

      ${position === "left" &&
      css`
        border-right-color: transparent;
        padding-right: ${size === "large" ? "26px" : "18px"};
      `}
    
      &:hover {
        outline: 2px solid var(--colorsSemanticNegative500);
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
          padding-right: ${size === "large" ? "26px" : "18px"};
        `}
      }
    `}

  ${({ hasSiblings, hasCustomLayout, position }) =>
    hasSiblings &&
    !hasCustomLayout &&
    position === "top" &&
    css`
      height: 20px;
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
        padding: ${size === "large" ? "2px" : "0px"};
        ${isTabSelected &&
        css`
          padding-right: 0px;
        `}
        ${(error || warning || info) &&
        css`
          padding-right: ${size === "large" ? "26px" : "18px"};
        `}
      `}

      ${position === "top" &&
      css`
        padding: ${size === "large" ? "2px" : "0px"};
        ${isTabSelected &&
        css`
          padding-bottom: 0px;
        `}
        ${(error || warning || info) &&
        css`
          padding-bottom: ${size === "large" ? "4px" : "2px"};
          padding-right: ${size === "large" ? "18px" : "14px"};

          &:hover {
            padding-bottom: ${size === "large" ? "4px" : "2px"};
          }
        `}
      `}
    `}
`;

const StyledTabTitle = styled.button`
  background-color: transparent;
  display: inline-block;
  font-weight: bold;
  position: relative;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0px;
  text-decoration: none;
  outline-offset: 0px;
  margin: 0;
  height: ${({ size }) =>
    size === "large" ? "var(--sizing600)" : "var(--sizing500)"};

  a:visited {
    color: inherit;
  }

  ${({ position, borders, noRightBorder, noLeftBorder }) => css`
    ${position === "top" &&
    css`
      ${borders &&
      !(noRightBorder || noLeftBorder) &&
      css`
        &:nth-of-type(n + 1) {
          margin-left: -1px;
        }
        &:first-child {
          margin-left: 0;
        }
      `}
    `}
    ${position === "left" &&
    css`
      ${borders &&
      css`
        &:nth-of-type(n + 1) {
          margin-top: -1px;
        }
        &:first-child {
          margin-top: 0;
        }
      `}
    `}
  `}

  ${({ isTabSelected }) =>
    !isTabSelected &&
    css`
      color: var(--colorsActionMinorYin090);

      &:hover {
        background: var(--colorsActionMinor100);
        color: var(--colorsActionMinorYin090);
        outline: none;
      }
      &:focus {
        color: var(--colorsActionMinorYin090);
        outline: none;
      }
    `}

  ${({ isTabSelected, alternateStyling, error, warning, info }) =>
    isTabSelected &&
    css`
      color: var(--colorsActionMajorYin090);
      background-color: var(--colorsActionMajorYang100);

      ${(error || warning || info) &&
      css`
        padding-bottom: 0px;
      `}

      &:hover {
        background-color: var(--colorsActionMajorYang100);
        border-bottom-color: ${alternateStyling
          ? "var(--colorsActionMinor100)"
          : "var(--colorsActionMajor500)"};
        color: var(--colorsActionMajorYin090);
        cursor: default;
      }
    `}

  ${({ isInSidebar }) => `
    &:focus {
      outline: ${
        isInSidebar
          ? "none;"
          : "var(--borderWidth300) solid var(--colorsSemanticFocus500);"
      }
      z-index: 2;
    }
  `}
  
  ${({
    position,
    borders,
    alternateStyling,
    error,
    warning,
    info,
    isInSidebar,
  }) =>
    position === "left" &&
    css`
      background-color: transparent;
      border-bottom: 0px;

      ${!isInSidebar &&
      !error &&
      css`
        border-right: ${alternateStyling ? "1px" : "2px"} solid
          var(--colorsActionMinor100);
      `}

      ${!borders &&
      css`
        ${StyledTitleContent} {
          border-bottom: none;
        }
      `}

      display: flex;
      height: auto;
      margin-left: 0px;

      &:first-child {
        margin-top: 0;
      }

      &:hover {
        ${alternateStyling && "border-right-color: var(--colorsActionMinor100)"}
      }

      ${(warning || info) &&
      css`
        border-right: none;
      `}

      ${({ isTabSelected }) =>
        isTabSelected &&
        css`
          ${alternateStyling &&
          css`
            border-right-color: var(--colorsActionMinor100);
          `}

          ${!alternateStyling &&
          css`
            border-right: none;
            padding-bottom: 0px;

            ${StyledTitleContent} {
              ${!(error || warning || info) && "margin-right: 2px;"}
              border-right: none;
            }
          `}
    
          background-color: var(--colorsActionMajorYang100);

          &:hover {
            ${alternateStyling &&
            "border-right-color: var(--colorsActionMinor100);"}
            background-color: var(--colorsActionMajorYang100);
            ${(error || warning || info) &&
            "border-right-color: var(--colorsSemanticNegative500);"}
          }

          &:focus {
            ${(error || warning || info) &&
            "border-right-color: var(--colorsSemanticNegative500);"}
          }
        `}
    `}

  ${({ alternateStyling, isTabSelected, isInSidebar }) =>
    alternateStyling &&
    css`
      &:focus {
        background-color: var(--colorsActionMinor100);
      }

      &:hover {
        background-color: ${isTabSelected
          ? "var(--colorsActionMinor100)"
          : "var(--colorsActionMinor150)"};
      }

      ${isTabSelected &&
      css`
        background-color: var(--colorsActionMinor100);
      `}

      ${isInSidebar && `padding-bottom: 1px;`}
    `}
`;

const StyledLayoutWrapper = styled.div`
  ${({ hasCustomLayout }) =>
    hasCustomLayout &&
    css`
      flex-grow: 2;
    `}

  ${({ hasCustomLayout, titlePosition, hasCustomSibling, position }) =>
    !hasCustomLayout &&
    css`
      display: inline-flex;

      position: relative;
      top: -1px;
      ${hasCustomSibling &&
      css`
        left: 4px;
      `}
      ${!hasCustomSibling &&
      css`
        ${titlePosition === "before" ? "left: 8px;" : "right: 8px;"}
      `}

      ${StyledIcon} {
        height: 20px;
      }

      ${StyledValidationIcon} {
        z-index: 10;

        ${StyledIcon} {
          height: 16px;
          left: -2px;
          top: ${position === "left" ? "1px" : "3px"};
        }
      }
    `}
`;

const StyledSelectedIndicator = styled.div`
  position: absolute;
  z-index: 1;

  ${({ position }) =>
    position === "top" &&
    css`
      bottom: 0px;
      left: 0px;
      box-shadow: inset 0px calc(-1 * var(--sizing025)) 0px
        var(--colorsActionMajor500);
      width: 100%;
      height: var(--sizing025);
    `}

  ${({ position }) =>
    position === "left" &&
    css`
      top: 0px;
      right: 0px;
      box-shadow: inset calc(-1 * var(--sizing025)) 0px 0px 0px
        var(--colorsActionMajor500);
      height: 100%;
      width: var(--sizing025);
    `}
`;

StyledTabTitle.propTypes = {
  position: PropTypes.oneOf(["top", "left"]),
  size: PropTypes.oneOf(["default", "large"]),
  borders: PropTypes.bool,
};

StyledTabTitle.defaultProps = {
  position: "top",
  size: "default",
  borders: false,
};

StyledLayoutWrapper.propTypes = {
  hasCustomLayout: PropTypes.bool,
  titlePosition: PropTypes.oneOf(["before", "after"]),
};

StyledLayoutWrapper.defaultProps = {
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
  position: "top",
  size: "default",
  borders: false,
};

StyledSelectedIndicator.propTypes = {
  position: PropTypes.oneOf(["top", "left"]),
  size: PropTypes.oneOf(["default", "large"]),
};

StyledSelectedIndicator.defaultProps = {
  position: "top",
  size: "default",
};

export {
  StyledTabTitle,
  StyledTitleContent,
  StyledLayoutWrapper,
  StyledSelectedIndicator,
};
