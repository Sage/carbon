import styled, { css } from "styled-components";
import { PaddingProps, padding as paddingFn } from "styled-system";
import computeSizing from "../../style/utils/element-sizing";

import { SidebarProps } from "./sidebar.component";
import baseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";

import { SIDEBAR_SIZES_CSS } from "./sidebar.config";
import { StyledForm, StyledFormContent } from "../form/form.style";

type StyledSidebarProps = Pick<
  SidebarProps,
  "onCancel" | "position" | "size" | "width"
>;

const StyledSidebar = styled.div<StyledSidebarProps>`
  // prevents outline being added in safari
  :focus {
    outline: none;
  }

  ${({ onCancel, position, size, theme, width }) => css`
    background: var(--colorsUtilityMajor025);
    border-radius: 1px;
    bottom: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    z-index: ${theme.zIndex.fullScreenModal};

    ${!width &&
    size &&
    css`
      width: ${SIDEBAR_SIZES_CSS[size]};
    `}
    ${width && computeSizing({ width })}

    ${position &&
    css`
      box-shadow: var(--boxShadow300);
      ${position}: 0;
    `}

    ${onCancel &&
    css`
      > ${StyledIconButton}:first-of-type {
        position: absolute;
        z-index: 1;
        right: 25px;
        top: 25px;
      }
    `}
  `}
`;

const StyledSidebarContent = styled.div<PaddingProps>`
  box-sizing: border-box;
  display: block;
  overflow-y: auto;
  flex-grow: 1;

  padding: var(--spacing300) var(--spacing400) var(--spacing400);
  ${paddingFn}

  &:has(${StyledForm}.sticky) {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    padding: 0;

    ${StyledForm}.sticky {
      ${StyledFormContent} {
        padding: var(--spacing300) var(--spacing400) var(--spacing400);
        ${paddingFn}
      }
    }
  }
`;

StyledSidebar.defaultProps = {
  theme: baseTheme,
};

export { StyledSidebar, StyledSidebarContent };
