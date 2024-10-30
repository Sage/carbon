import styled, { css } from "styled-components";

import StyledIcon from "../../../icon/icon.style";
import StyledValidationIcon from "../../../../__internal__/validations/validation-icon.style";

import { TabTitleProps } from ".";

interface StyledTitleContentProps
  extends Pick<
    TabTitleProps,
    | "align"
    | "borders"
    | "error"
    | "info"
    | "isTabSelected"
    | "noLeftBorder"
    | "noRightBorder"
    | "position"
    | "size"
    | "warning"
  > {
  alternateStyling?: boolean;
  hasCustomLayout?: boolean;
  hasHref?: boolean;
  hasSiblings?: boolean;
  validationRedesignOptIn?: boolean;
}

const StyledTitleContent = styled.span<StyledTitleContentProps>`
  outline: none;
  display: flex;
  align-items: flex-start;
  line-height: 20px;
  margin: 0;
  position: relative;

  ${({
    hasCustomLayout,
    error,
    warning,
    info,
    size,
    isTabSelected,
    hasSiblings,
    borders = false,
    position = "top",
    noLeftBorder,
    noRightBorder,
    hasHref,
    alternateStyling,
    align,
    validationRedesignOptIn,
  }) => css`
    text-align: ${align};

    ${position === "left" &&
    css`
      display: flex;
      width: 100%;
      justify-content: ${align === "right" ? "flex-end" : "flex-start"};
      border-top-left-radius: var(--borderRadius100);
      border-bottom-left-radius: var(--borderRadius100);
      border-bottom-right-radius: var(--borderRadius000);
      border-top-right-radius: var(--borderRadius000);
    `}

    ${position === "left" &&
    validationRedesignOptIn &&
    css`
      justify-content: space-between;
    `}

    ${position === "top" &&
    css`
      border-top-left-radius: var(--borderRadius100);
      border-top-right-radius: var(--borderRadius100);
      border-bottom-right-radius: var(--borderRadius000);
      border-bottom-left-radius: var(--borderRadius000);
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

    ${(warning || info) &&
    css`
      outline: 1px solid;
      outline-offset: -1px;
      z-index: ${validationRedesignOptIn ? 1 : 2};

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

    ${error &&
    css`
      outline: 2px solid var(--colorsSemanticNegative500);
      outline-offset: -2px;
      z-index: ${validationRedesignOptIn ? 1 : 2};

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

    ${hasSiblings &&
    !hasCustomLayout &&
    position === "top" &&
    css`
      height: 20px;
    `}

    ${hasCustomLayout &&
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
  `}
`;

const tabTitleStyles = css<
  TabTitleProps & { validationRedesignOptIn?: boolean }
>`
  background-color: transparent;
  display: inline-block;
  border-top-left-radius: var(--borderRadius100);
  border-top-right-radius: var(--borderRadius100);
  font-weight: 500;
  position: relative;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0px;
  text-decoration: none;
  outline-offset: 0px;
  margin: 0;
  ${({ position }) => position === "top" && "white-space: nowrap"};

  ${({ position }) => css`
    ${position === "left" &&
    css`
      border-top-right-radius: var(--borderRadius000);
    `}
  `}

  a:visited {
    color: inherit;
  }

  ${({
    size,
    position = "top",
    borders = false,
    noRightBorder,
    noLeftBorder,
    isTabSelected,
    alternateStyling,
    error,
    warning,
    info,
    isInSidebar,
    validationRedesignOptIn,
  }) => css`
    height: ${size === "large" ? "var(--sizing600)" : "var(--sizing500)"};

    ${
      position === "top" &&
      css`
        ${borders &&
        !(noRightBorder || noLeftBorder) &&
        css`
          &:nth-of-type(n + 1):not(:first-of-type) {
            margin-left: -1px;
          }
          &:first-child {
            margin-left: 0;
          }
        `}
      `
    }
    ${
      position === "left" &&
      css`
        ${borders &&
        css`
          &:nth-of-type(n + 1):not(:first-of-type) {
            margin-top: -1px;
          }
          &:first-child {
            margin-top: 0;
          }
        `}
      `
    }

    ${
      !isTabSelected &&
      css`
        color: var(--colorsActionMinorYin090);
        ${validationRedesignOptIn &&
        css`
          background: transparent;
        `}

        &:hover {
          background: var(--colorsActionMinor100);
          ${validationRedesignOptIn &&
          css`
            background: var(--colorsUtilityMajor100);
          `}
          color: var(--colorsActionMinorYin090);
          outline: none;
        }
        &:focus {
          color: var(--colorsActionMinorYin090);
          outline: none;
        }
      `
    }

    ${
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
      `
    }

    ${({ theme }) =>
      `
      &:focus {
        outline: 4px solid ${!theme.focusRedesignOptOut ? "black" : /* istanbul ignore next */ "var(--colorsSemanticFocus500)"};
        top: -2px;
        z-index: 6;

        > span[data-role="tab-title-content"] {
          outline:none;
        }

        ${
          position === "top"
            ? css`
                border-top-left-radius: var(--borderRadius100);
                border-top-right-radius: var(--borderRadius100);
              `
            : css`
                border-top-left-radius: var(--borderRadius100);
                border-bottom-left-radius: var(--borderRadius100);
              `
        }

        ${
          !theme.focusRedesignOptOut
            ? `::before {
          content: "";
          position: absolute;
          top: 0;
          left 0;
          bottom: 0;
          right: ${position === "top" ? "0" : "-1px"};
          outline: 3px solid var(--colorsSemanticFocus500);
          ${
            position === "top"
              ? css`
                  border-top-left-radius: var(--borderRadius100);
                  border-top-right-radius: var(--borderRadius100);
                `
              : css`
                  border-top-left-radius: var(--borderRadius100);
                  border-bottom-left-radius: var(--borderRadius100);
                `
          }
          outline-offset: -2px;
         z-index: 5;
        }

        > [data-element="tab-selected-indicator"] {
         z-index: 4;
         ${
           position === "top"
             ? css`
                 bottom: 2px;
                 left: 2px;
                 right: 1px;
               `
             : css`
                 bottom: 2px;
                 right: 1px;
               `
         }
        }`
            : /* istanbul ignore next */ ""
        }
      }
    `}

    ${
      position === "left" &&
      css`
        background-color: transparent;
        border-bottom: 0px;

        ${!isInSidebar &&
        !error &&
        css`
          --border-right-value: ${validationRedesignOptIn ? "0px" : "2px"}
            border-right:
            ${alternateStyling ? "1px" : "var(--border-right-value)"} solid
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
          ${alternateStyling &&
          "border-right-color: var(--colorsActionMinor100)"}
        }

        ${(warning || info) &&
        css`
          border-right: none;
        `}

        ${!isTabSelected &&
        css`
          border-right-color: var(--colorsActionMinor100);
        `}

      ${isTabSelected &&
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
              ${!(error || warning || info) &&
              !validationRedesignOptIn &&
              "margin-right: 2px;"}
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
      `
    }

    ${
      alternateStyling &&
      css`
        &:focus {
          background-color: var(--colorsActionMinor200);
        }

        &:hover {
          background-color: ${isTabSelected
            ? "var(--colorsActionMinor200)"
            : "var(--colorsActionMinor250)"};
        }

        ${isTabSelected &&
        css`
          background-color: var(--colorsActionMinor200);
        `}
      `
    }

    & ${StyledIcon} { {
      ${validationRedesignOptIn ? "margin-top: 10px;" : "margin-top: 2px;"}
    }
  `}
`;

const StyledTabTitleButton = styled.button`
  ${tabTitleStyles}
`;

const StyledTabTitleLink = styled.a`
  ${tabTitleStyles}
`;

interface StyledLayoutWrapperProps
  extends Pick<TabTitleProps, "titlePosition" | "position"> {
  hasCustomLayout?: boolean;
  hasCustomSibling?: boolean;
  validationRedesignOptIn?: boolean;
}

const StyledLayoutWrapper = styled.div<StyledLayoutWrapperProps>`
  ${({
    hasCustomLayout,
    titlePosition = "before",
    hasCustomSibling,
    validationRedesignOptIn,
  }) => css`
    ${hasCustomLayout &&
    css`
      flex-grow: 2;
    `}

    ${!hasCustomLayout &&
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
          height: ${validationRedesignOptIn ? "0px" : "16px"};
          left: -2px;
        }
      }
    `}
  `}
`;

const StyledVerticalIndicator = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  box-shadow: inset calc(-1 * var(--sizing050)) 0px 0px 0px
    var(--colorsActionMinor100);
  width: 2px;
  z-index: 1;
`;

type StyledSelectedIndicatorProps = Pick<
  TabTitleProps,
  "position" | "error" | "warning"
> & {
  validationRedesignOptIn?: boolean;
};

const StyledSelectedIndicator = styled.div<StyledSelectedIndicatorProps>`
  position: absolute;
  z-index: 1;
  ${(validationRedesignOptIn) => css`
    ${validationRedesignOptIn &&
    css`
      z-index: 2;
    `}
  `}

  ${({ position = "top", warning, error }) => css`
    --selected-indicator-color: var(--colorsActionMajor500);

    ${warning &&
    css`
      --selected-indicator-color: var(--colorsSemanticCaution500);
    `}

    ${error &&
    css`
      --selected-indicator-color: var(--colorsSemanticNegative500);
    `}
    ${position === "top" &&
    css`
      bottom: -1px;
      left: 0px;
      right: 0px;
      box-shadow: inset 0px calc(-1 * var(--sizing050)) 0px
        var(--selected-indicator-color);
      height: var(--sizing050);
    `}

    ${position === "left" &&
    css`
      top: 0px;
      bottom: 0px;
      right: 0px;
      box-shadow: inset calc(-1 * var(--sizing050)) 0px 0px 0px
        var(--selected-indicator-color);
      width: var(--sizing050);
    `}
  `}

  &:focus {
    bottom: 3px;
    left: 3px;
    right: 3px;
  }
`;

export {
  StyledTabTitleButton,
  StyledTabTitleLink,
  StyledTitleContent,
  StyledLayoutWrapper,
  StyledSelectedIndicator,
  StyledVerticalIndicator,
};
