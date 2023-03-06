import styled, { css } from "styled-components";
import { TabHeaderProps } from "./tabs-header.component";

const computeLineWidth = ({
  alternateStyling,
  isInSidebar,
  position,
}: Pick<TabHeaderProps, "alternateStyling" | "isInSidebar" | "position">) => {
  if (isInSidebar && position === "left") {
    return "0px";
  }
  return alternateStyling ? "-1px" : "-2px";
};

type StyledTabsHeaderWrapperProps = Pick<
  TabHeaderProps,
  "position" | "isInSidebar"
>;

const StyledTabsHeaderWrapper = styled.div<StyledTabsHeaderWrapperProps>`
  ${({ position, isInSidebar }) =>
    position === "left" &&
    css`
      overflow-y: auto;
      box-sizing: border-box;
      padding: 3px;

      ${!isInSidebar &&
      css`
        min-width: 20%;
      `}

      ${isInSidebar &&
      css`
        min-width: 100%;
        margin: auto;
        padding: 0px;
      `}
    `}
`;

export type StyledTabsHeaderListProps = Pick<
  TabHeaderProps,
  | "align"
  | "alternateStyling"
  | "extendedLine"
  | "noRightBorder"
  | "isInSidebar"
  | "position"
>;

const StyledTabsHeaderList = styled.div<StyledTabsHeaderListProps>`
  display: flex;
  box-shadow: inset 0px ${computeLineWidth} 0px 0px var(--colorsActionMinor100);
  ${({ extendedLine = true }) =>
    !extendedLine &&
    css`
      width: fit-content;
    `}
  cursor: default;
  list-style: none;
  margin: 0;
  padding: 0;

  ${({ align = "left" }) =>
    align === "right" &&
    css`
      justify-content: flex-end;
      text-align: right;
    `}

  ${({ position = "top", noRightBorder, align = "left" }) =>
    position === "left" &&
    css`
      flex-direction: column;
      box-shadow: none;

      ${noRightBorder &&
      css`
        box-shadow: none;
      `}

      ${align === "right" &&
      css`
        justify-content: flex-start;
      `}
    `}
`;

export { StyledTabsHeaderWrapper, StyledTabsHeaderList };
