import styled, { css } from "styled-components";
import { padding } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import type { ThemeObject } from "../../../style/themes/theme.types";
import { TabProps } from ".";

export type StyledTabProps = Pick<TabProps, "position" | "isTabSelected"> & {
  theme?: ThemeObject;
};

const StyledTab = styled.div.attrs(applyBaseTheme)<StyledTabProps>`
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

export default StyledTab;
