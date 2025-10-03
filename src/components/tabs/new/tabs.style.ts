import styled, { css } from "styled-components";
import { TabListProps, TabProps } from "./tabs.types";

type Dimension = {
  fontSize: number;
  iconMinWidth: number;
  height: number;
  paddingX: number;
  paddingY: number;
  width: number;
};

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
  flex-direction: ${({ orientation }) =>
    orientation === "vertical" ? "column" : "row"};
  margin-bottom: 8px;
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

  ${({ activeTab, size = "medium" }) =>
    activeTab &&
    css`
      background-color: white;
      border: 2px solid #8b8b8bff;
      border-bottom: none;

      padding: ${sizes[size].paddingY}px ${sizes[size].paddingX - 2}px
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
        height: 2px;
        background-color: black;
        border-radius: 2px;
        min-width: 24px;
      }
    `};
`;
