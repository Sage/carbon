import styled, { css } from "styled-components";
import { TabListProps, TabProps } from "./tabs.types";
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

interface StyledTabListProps extends TabListProps {
  orientation: "horizontal" | "vertical";
  size: "medium" | "large";
}

export const StyledTabPanel = styled.div`
  padding: 0 6px;
`;

export const StyledTabList = styled.div<StyledTabListProps>`
  display: flex;
  ${({ orientation }) => css`
    flex-direction: ${orientation === "vertical" ? "column" : "row"};
    ${orientation === "horizontal" ? "margin-bottom" : "margin-right"}: 8px;
  `}
  width: 100%;
  height: fit-content;
  white-space: nowrap;
  padding: 6px;
  overflow-x: hidden;
`;

export const StyledTabListWrapper = styled.div`
  display: flex;
  z-index: 6;
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
  size: "medium" | "large";
}>`
  height: ${({ size }) => (size === "medium" ? "40px" : "48px")};
  width: ${({ size }) => (size === "medium" ? "40px" : "48px")};
  border-radius: 0px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
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
  size: "medium" | "large";
}>`
  height: ${({ size }) => (size === "medium" ? "40px" : "48px")};
  width: ${({ size }) => (size === "medium" ? "40px" : "48px")};
  border-radius: 0;
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
  orientation: "horizontal" | "vertical";
  size: "medium" | "large";
}

export const StyledTab = styled.button<StyledTabProps>`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid var(--tab-border-active-alt);

  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  color: var(--colorsYin090);

  font-weight: var(--fontWeights500);
  line-height: var(--lineHeights500);
  position: relative;

  .tab-title-content-wrapper {
    align-items: center;
    display: flex;
    gap: 8px;
    ${({ activeTab, size }) =>
      activeTab &&
      size === "large" &&
      css`
        margin-top: -4px;
      `}
  }

  :hover {
    background-color: var(--tab-bg-hover);
    cursor: pointer;
  }

  ${({ size }) => css`
    font-size: ${sizes[size].fontSize}px;
    height: ${sizes[size].height}px;
    padding: ${sizes[size].paddingY}px ${sizes[size].paddingX}px;
  `};

  ${({ activeTab, error, info, orientation, size, warning }) =>
    activeTab &&
    orientation === "horizontal" &&
    css`
      background-color: white;
      border: 2px solid var(--tab-border-active-alt);
      border-bottom: none;

      padding-top: ${sizes[size].paddingY - 4}px;
      padding-right: ${sizes[size].paddingX - 2}px;
      padding-bottom: ${sizes[size].paddingY}px;
      padding-left: ${sizes[size].paddingX - 2}px;

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

  ${({ activeTab, error, info, orientation, size, warning }) =>
    orientation === "vertical"
      ? css`
          border: none;
          border-right: 2px solid var(--tab-border-active-alt);

          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 0px;
          border-top-left-radius: 8px;
          border-top-right-radius: 0px;
          max-width: ${VERTICAL_TAB_WIDTH}px;
          min-width: ${VERTICAL_TAB_WIDTH}px;

          ${activeTab &&
          css`
            background-color: white;
            border: 2px solid var(--tab-border-active-alt);
            border-right: none;

            padding-top: ${size === "medium"
              ? sizes.medium.paddingY - 2
              : 4}px !important;
            padding-right: ${sizes[size].paddingX - 2}px;
            padding-bottom: ${size === "medium"
              ? sizes.medium.paddingY - 2
              : sizes.large.paddingY}px;
            padding-left: ${sizes[size].paddingX - 2}px;

            :hover {
              background-color: white;
            }

            .tab-title-content-wrapper {
              ::after {
                content: "";
                position: absolute;
                right: 0;
                top: 20%;
                height: 60%;
                width: 4px;
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
        `
      : css``}

  :focus {
    ${addFocusStyling()}
    z-index: 1;

    ${({ orientation }) => css`
      border-top-left-radius: 8px;
      border-top-right-radius: ${orientation === "horizontal" ? "8px" : "0"};
      border-bottom-left-radius: ${orientation === "horizontal"
        ? "0px"
        : "8px"};
      border-bottom-right-radius: 0px;
    `}
  }
`;

export const StyledTabs = styled.div<{
  orientation?: "horizontal" | "vertical";
}>`
  display: flex;
  ${({ orientation }) => css`
    flex-direction: ${orientation === "horizontal" ? "column" : "row"};
  `}
`;

export const StyledTabProvider = styled.div<{
  visible: boolean;
}>`
  ${({ visible }) => css`
    display: ${visible ? "block" : "none"};
  `}
`;
