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
  background: var(--tab-border-active-alt);
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
  border-radius: var(--global-radius-none);
  border-top-right-radius: var(--global-radius-action-m);
  border-top-left-radius: var(--global-radius-action-m);
  border-color: var(--tab-border-active-alt);
  background: white;
  border: none;
  border-bottom: 2px solid var(--tab-border-active-alt);
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
  border-radius: var(--global-radius-none);
  border-color: var(--tab-border-active-alt);
  border: none;
  border-bottom: 2px solid var(--tab-border-active-alt);
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
  border-bottom: 2px solid var(--tab-border-default);
  border-radius: var(--global-radius-action-m) var(--global-radius-action-m) 0 0;
  white-space: nowrap;
  height: fit-content;
  color: var(--tab-label-default);
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
    background-color: var(--tab-bg-hover);
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
      background-color: var(--tab-bg-active);
      border: 2px solid var(--tab-border-active-alt);
      border-bottom: none;
      color: var(--tab-label-active);

      ${!$hasCustomLayout &&
      css`
        padding-top: ${sizes[$size].paddingY - 4}px;
        padding-right: ${sizes[$size].paddingX - 2}px;
        padding-bottom: ${sizes[$size].paddingY}px;
        padding-left: ${sizes[$size].paddingX - 2}px;
      `}

      :hover {
        background-color: var(--tab-bg-active);
      }

      ::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 20%;
        width: 60%;
        height: 4px;
        background-color: ${() => {
          if (error) return "var(--tab-validation-border-error)";
          if (warning) return "var(--tab-validation-border-warning)";
          if (info) return "#0060a7ff";
          return "black";
        }};
        border-radius: var(--global-radius-container-2-xs);
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
      border-right: 2px solid var(--tab-border-default);
      border-radius: var(--global-radius-action-m) 0 0
        var(--global-radius-action-m);
      max-width: ${$headerWidth ?? `${VERTICAL_TAB_WIDTH}px`};
      width: ${$headerWidth ?? `${VERTICAL_TAB_WIDTH}px`};

      ${$headerWidth &&
      css`
        white-space: normal;
        height: auto;
      `}

      ${activeTab &&
      css`
        background-color: var(--tab-bg-active);
        border: 2px solid var(--tab-border-active-alt);
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
          background-color: var(--tab-bg-active);
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
              if (error) return "var(--tab-validation-border-error)";
              /* istanbul ignore if */
              if (warning) return "var(--tab-validation-border-warning)";
              /* istanbul ignore if */
              if (info) return "#0060a7ff";

              return "black";
            }};
            border-radius: var(--global-radius-container-2-xs);
            min-height: 24px;
          }
        }
      `}
    `}

  :focus {
    ${addFocusStyling()}
    z-index: 1;

    ${({ $orientation }) => css`
      border-top-left-radius: var(--global-radius-action-m);
      border-top-right-radius: ${$orientation === "horizontal"
        ? "var(--global-radius-action-m)"
        : "var(--global-radius-none)"};
      border-bottom-left-radius: ${$orientation === "horizontal"
        ? "var(--global-radius-none)"
        : "var(--global-radius-action-m)"};
      border-bottom-right-radius: var(--global-radius-none);
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
