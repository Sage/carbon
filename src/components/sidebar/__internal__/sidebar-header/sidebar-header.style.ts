import styled, { css } from "styled-components";
import { padding } from "styled-system";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import StyledIconButton from "../../../icon-button/icon-button.style";
import StyledIcon from "../../../icon/icon.style";

const StyledSidebarHeader = styled.div.attrs(applyBaseTheme)<{
  hasClose?: boolean;
  headerVariant?: "light" | "dark";
}>`
  background-color: ${({ headerVariant }) =>
    headerVariant === "light"
      ? "var(--colorsUtilityYang100)"
      : "var(--colorsUtilityYin100)"};
  box-shadow: inset 0 -1px 0 0 var(--colorsUtilityMajor100);
  box-sizing: border-box;
  width: 100%;
  color: var(--colorsActionMinorYin090);
  transition: all 0.2s ease;
  ${padding}
  ${({ hasClose, headerVariant }) =>
    hasClose &&
    css`
      display: flex;
      justify-content: space-between;
      gap: var(--spacing200);
      > ${StyledIconButton}:first-of-type {
        ${headerVariant === "dark" &&
        css`
          ${StyledIcon} {
            color: var(--colorsUtilityYang080);
          }
        `}
        align-self: flex-start;
      }
    `}
  div[data-element="sidebar-heading"] {
    width: 100%;
  }
`;

const StyledSidebarSubHeader = styled.div.attrs(applyBaseTheme)`
  box-sizing: border-box;
  width: 100%;
  color: var(--colorsActionMinorYin090);
  background-color: var(--colorsUtilityMajor050);
  border-bottom: 1px solid var(--colorsUtilityMajor075);
  ${padding}
  transition: all 0.2s ease;
`;

export default StyledSidebarHeader;
export { StyledSidebarSubHeader };
