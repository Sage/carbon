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

export const StyledTabList = styled.div<TabListProps>`
  display: flex;
  ${({ orientation }) => css`
    flex-direction: ${orientation === "vertical" ? "column" : "row"};
    ${orientation === "horizontal" ? "margin-bottom" : "margin-right"}: 8px;
  `}
`;

export const Spacer = styled.div`
  align-self: flex-end;
  background: #8b8b8bff;
  flex-grow: 1;
  height: 2px;
`;

interface StyledTabProps
  extends Omit<TabProps, "controls" | "index" | "label"> {
  activeTab: boolean;
}

export const StyledTab = styled.button<StyledTabProps>`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #8b8b8bff;

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
  }

  :hover {
    background-color: #00000010;
    cursor: pointer;
  }

  ${({ size = "medium" }) => css`
    font-size: ${sizes[size].fontSize}px;
    height: ${sizes[size].height}px;
    min-width: ${sizes[size].width}px;
    padding: ${sizes[size].paddingY}px ${sizes[size].paddingX}px;
  `};

  ${({ activeTab, orientation, size = "medium" }) =>
    activeTab &&
    orientation === "horizontal" &&
    css`
      background-color: white;
      border: 2px solid #8b8b8bff;
      border-bottom: none;

      padding: ${sizes[size].paddingY - 2}px ${sizes[size].paddingX - 2}px
        ${sizes[size].paddingY + 4}px ${sizes[size].paddingX - 2}px;

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
        background-color: black;
        border-radius: 2px;
        min-width: 24px;
      }
    `};

  ${({ activeTab, orientation, size = "medium" }) =>
    orientation === "vertical"
      ? css`
          border: none;
          border-right: 2px solid #d1d1d1;

          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 0px;
          border-top-left-radius: 8px;
          border-top-right-radius: 0px;
          max-width: ${VERTICAL_TAB_WIDTH}px;
          min-width: ${VERTICAL_TAB_WIDTH}px;

          ${activeTab &&
          css`
            background-color: white;
            border: 2px solid #d1d1d1;
            border-right: none;

            padding: ${sizes[size].paddingY - 2}px ${sizes[size].paddingX - 2}px;

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
                background-color: black;
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

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

export const StyledTabs = styled.div<{
  orientation?: "horizontal" | "vertical";
}>`
  display: flex;
  ${({ orientation = "horizontal" }) => css`
    flex-direction: ${orientation === "horizontal" ? "column" : "row"};
  `}
`;
