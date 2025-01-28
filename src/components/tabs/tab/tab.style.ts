import styled, { css } from "styled-components";
import { padding } from "styled-system";
import BaseTheme, { ThemeObject } from "../../../style/themes/base";
import { TabProps } from ".";

export type StyledTabProps = Pick<TabProps, "position" | "isTabSelected"> & {
  theme?: ThemeObject;
};

const StyledTab = styled.div<StyledTabProps>`
  display: none;

  ${({ isTabSelected, position = "top" }) =>
    isTabSelected &&
    css`
      display: block;

      ${position === "top" &&
      css`
        margin-left: 4px;
        margin-right: 4px;
      `}

      ${position === "left" &&
      css`
        margin-left: -6px;
        margin-top: var(--spacing075);
        width: calc(80% + var(--spacing075));
      `}

      ${padding}
    `}
`;

StyledTab.defaultProps = {
  theme: BaseTheme,
};

export default StyledTab;
