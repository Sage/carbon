import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { baseTheme } from "../../../../style/themes";
import StyledIconButton from "../../../icon-button/icon-button.style";

const StyledSidebarHeader = styled.div<{ hasClose?: boolean }>`
  background-color: var(--colorsUtilityYang100);
  box-shadow: inset 0 -1px 0 0 var(--colorsUtilityMajor100);
  box-sizing: border-box;
  width: 100%;
  color: var(--colorsActionMinorYin090);
  transition: all 0.2s ease;

  ${padding}

  ${({ hasClose }) =>
    hasClose &&
    css`
      display: flex;
      justify-content: space-between;

      > ${StyledIconButton}:first-of-type {
        position: absolute;
        z-index: 1;
        right: 25px;
      }
    `}

    div[data-element="sidebar-heading"] {
    width: 100%;
  }
`;

StyledSidebarHeader.defaultProps = {
  theme: baseTheme,
};

export default StyledSidebarHeader;
