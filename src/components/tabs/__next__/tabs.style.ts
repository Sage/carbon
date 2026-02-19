import styled, { css } from "styled-components";
import { TabProps } from "./tabs.types";
import addFocusStyling from "../../../style/utils/add-focus-styling";

type Dimension = {
  fontSize: number;
  iconMinWidth: number;
  height: number;
  paddingX: number;
  paddingY: number;
  width: number;
};

const VERTICAL_TAB_WIDTH = 200;

const sizes: Record<string, Dimension> = {
  medium: {
    fontSize: 14,
    iconMinWidth: 84,
    height: 40,
    paddingX: 16,
    paddingY: 8,
    width: 56,
  },
  large: {
    fontSize: 16,
    iconMinWidth: 104,
    height: 48,
    paddingX: 24,
    paddingY: 0,
    width: 76,
  },
};

interface StyledTabListProps {
  $orientation: "horizontal" | "vertical";
}

export const StyledTabPanel = styled.div`
  padding: 0 6px;
`;

export const StyledTabList = styled.div<StyledTabListProps>`
  display: flex;
  ${({ $orientation }) => css`
    ${$orientation === "horizontal" &&
    css`
      margin-bottom: 8px;
    `}

    ${$orientation === "vertical" &&
    css`
      flex-direction: column;
      flex-wrap: wrap;
      margin-right: 8px;
    `}
  `}
  width: 100%;
  padding: 6px;
  overflow-x: hidden;
`;

export const StyledTabListWrapper = styled.div<{ $headerWidth?: string }>`
  display: flex;
  z-index: 6;

  ${({ $headerWidth }) =>
    $headerWidth &&
    css`
      width: ${$headerWidth};
    `};
`;

export const Spacer = styled.div`
  align-self: flex-end;
  background: #8b8b8bff;
  flex-grow: 1;
  height: 2px;
`;

// Can't be easily tested in Jest owing to lack of an actual DOM
/* istanbul ignore next */
export const StyledScrollButton = styled.button<{
  $size: "medium" | "large";
}>`
  height: ${({ $size }) => ($size === "medium" ? "40px" : "48px")};
  width: ${({ $size }) => ($size === "medium" ? "40px" : "48px")};
  border-radius: 0px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-color: #8b8b8bff;
  background: white;
  border: none;
  border-bottom: 2px solid #8b8b8bff;
  top: 6px;
  position: relative;
`;

// Again, can't be easily tested in Jest owing to lack of an actual DOM
/* istanbul ignore next */
export const StyledScrollButtonPlaceholder = styled.div<{
  $size: "medium" | "large";
}>`
  height: ${({ $size }) => ($size === "medium" ? "40px" : "48px")};
  width: ${({ $size }) => ($size === "medium" ? "40px" : "48px")};
  border-radius: 0;
  border-color: #8b8b8bff;
  border: none;
  border-bottom: 2px solid #8b8b8bff;
  top: 4px;
  position: relative;
`;

interface StyledTabProps
  extends Omit<TabProps, "controls" | "index" | "label"> {
  activeTab: boolean;
  error?: string | boolean;
  warning?: string | boolean;
  $orientation: "horizontal" | "vertical";
  $size: "medium" | "large";
  $hasCustomLayout?: boolean;
  $headerWidth?: string;
}

export const StyledTab = styled.button<StyledTabProps>`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #8b8b8bff;

  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  white-space: nowrap;
  height: fit-content;

  color: var(--colorsYin090);

  font-weight: var(--fontWeights500);
  line-height: var(--lineHeights500);
  position: relative;

  .tab-title-content-wrapper {
    ${({ $hasCustomLayout }) =>
      !$hasCustomLayout &&
      css`
        align-items: center;
        display: flex;
        gap: 8px;
      `}

    ${({
      activeTab,
      $orientation,
      $size,
      error,
      warning,
      info,
      $hasCustomLayout,
    }) =>
      activeTab &&
      css`
        ${$orientation === "horizontal" &&
        (error || warning || info) &&
        css`
          position: relative;
          top: 1px;
        `}

        ${$size === "large" &&
        css`
          margin-top: -4px;
        `}

        ${$hasCustomLayout &&
        $orientation === "horizontal" &&
        css`
          position: relative;
          top: -2px;
          left: 1px;
        `}
      `}
  }

  :hover {
    background-color: #00000010;
    cursor: pointer;
  }

  ${({ $size, $hasCustomLayout }) => css`
    font-size: ${sizes[$size].fontSize}px;
    height: ${sizes[$size].height}px;

    ${$hasCustomLayout
      ? css`
          padding: 0;
        `
      : css`
          padding: ${sizes[$size].paddingY}px ${sizes[$size].paddingX}px;
        `}
  `};

  ${({
    activeTab,
    error,
    info,
    $orientation,
    $size,
    warning,
    $hasCustomLayout,
  }) =>
    activeTab &&
    $orientation === "horizontal" &&
    css`
      background-color: white;
      border: 2px solid #8b8b8bff;
      border-bottom: none;

      ${!$hasCustomLayout &&
      css`
        padding-top: ${sizes[$size].paddingY - 4}px;
        padding-right: ${sizes[$size].paddingX - 2}px;
        padding-bottom: ${sizes[$size].paddingY}px;
        padding-left: ${sizes[$size].paddingX - 2}px;
      `}

      :hover {
        background-color: white;
      }

      ::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 20%;
        width: 60%;
        height: 4px;
        background-color: ${() => {
          if (error) return "#db004e";
          if (warning) return "#d64309";
          if (info) return "#0060a7ff";
          return "black";
        }};
        border-radius: 2px;
        min-width: 24px;
      }
    `};

  ${({
    activeTab,
    error,
    info,
    $orientation,
    $size,
    warning,
    $hasCustomLayout,
    $headerWidth,
  }) =>
    $orientation === "vertical" &&
    css`
      border: none;
      border-right: 2px solid #8b8b8bff;

      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 0px;
      border-top-left-radius: 8px;
      border-top-right-radius: 0px;
      max-width: ${$headerWidth ?? `${VERTICAL_TAB_WIDTH}px`};
      width: ${$headerWidth ?? `${VERTICAL_TAB_WIDTH}px`};

      ${$headerWidth &&
      css`
        white-space: normal;
        height: auto;
      `}

      ${activeTab &&
      css`
        background-color: white;
        border: 2px solid #8b8b8bff;
        border-right: none;

        ${!$hasCustomLayout &&
        css`
          padding-top: ${$size === "medium" ? sizes.medium.paddingY - 2 : 4}px;
          padding-right: var(--global-space-none);
          padding-bottom: ${$size === "medium"
            ? sizes.medium.paddingY - 2
            : sizes.large.paddingY}px;
          padding-left: ${sizes[$size].paddingX - 2}px;
        `}

        :hover {
          background-color: white;
        }

        .tab-title-content-wrapper {
          ${$headerWidth &&
          !$hasCustomLayout &&
          css`
            padding-right: 18px;
          `}

          ${$hasCustomLayout &&
          css`
            width: 100%;

            > * {
              position: relative;
              left: -2px;
              top: -2px;
            }
          `}

          ::after {
            content: "";
            position: absolute;
            right: 0;
            width: 4px;
            ${$hasCustomLayout &&
            css`
              top: 20%;
              right: 0px;
            `}
            height: 60%;
            background-color: ${() => {
              /* istanbul ignore if */
              if (error) return "#db004e";
              /* istanbul ignore if */
              if (warning) return "#d64309";
              /* istanbul ignore if */
              if (info) return "#0060a7ff";

              return "black";
            }};
            border-radius: 2px;
            min-height: 24px;
          }
        }
      `}
    `}

  :focus {
    ${addFocusStyling()}
    z-index: 1;

    ${({ $orientation }) => css`
      border-top-left-radius: 8px;
      border-top-right-radius: ${$orientation === "horizontal" ? "8px" : "0"};
      border-bottom-left-radius: ${$orientation === "horizontal"
        ? "0px"
        : "8px"};
      border-bottom-right-radius: 0px;
    `}
  }
`;

export const StyledTabs = styled.div<{
  $orientation?: "horizontal" | "vertical";
}>`
  display: flex;
  ${({ $orientation }) => css`
    flex-direction: ${$orientation === "horizontal" ? "column" : "row"};
  `}
`;

export const StyledTabProvider = styled.div<{
  visible: boolean;
}>`
  ${({ visible }) => css`
    display: ${visible ? "block" : "none"};
  `}
`;
