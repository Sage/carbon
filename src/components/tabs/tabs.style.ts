import styled, { css } from "styled-components";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";
import { StyledTabsHeaderWrapper } from "./__internal__/tabs-header/tabs-header.style";
import StyledTab from "./tab/tab.style";
import { TabsProps } from ".";

export interface StyledTabsProps
  extends Pick<TabsProps, "headerWidth" | "position"> {
  isInSidebar?: boolean;
}

const StyledTabs = styled.div<StyledTabsProps>`
  ${({ position, isInSidebar, headerWidth }) => css`
    color: var(--colorsActionMinorYin090);

    ${position === "left" &&
    css`
      ${headerWidth &&
      css`
        ${StyledTabsHeaderWrapper} {
          width: ${headerWidth};
        }

        ${StyledTab} {
          width: ${`calc(100% - ${headerWidth})`};
        }
      `}

      ${!isInSidebar &&
      css`
        display: flex;
        width: 100%;
      `}

      ${isInSidebar &&
      css`
        width: 99%;
      `}
    `}
  `}

  ${margin}
`;

StyledTabs.defaultProps = {
  theme: BaseTheme,
};

export default StyledTabs;
