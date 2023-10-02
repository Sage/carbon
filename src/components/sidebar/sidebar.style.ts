import styled, { css } from "styled-components";
import { PaddingProps } from "styled-system";
import computeSizing from "../../style/utils/element-sizing";

import { SidebarProps } from "./sidebar.component";
import baseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";
import {
  calculateFormSpacingValues,
  calculateWidthValue,
} from "../../style/utils/form-style-utils";
import { StyledFormContent, StyledFormFooter } from "../form/form.style";
import { SIDEBAR_SIZES_CSS } from "./sidebar.config";

type StyledSidebarProps = Pick<
  SidebarProps,
  "onCancel" | "position" | "size" | "width"
> &
  PaddingProps;

const StyledSidebar = styled.div<StyledSidebarProps>`
  // prevents outline being added in safari
  :focus {
    outline: none;
  }

  ${StyledFormContent} {
    ${(props: StyledSidebarProps) =>
      calculateFormSpacingValues(props, true, "sidebar")}
  }

  ${StyledFormFooter}.sticky {
    ${calculateWidthValue}
    ${(props: StyledSidebarProps) =>
      calculateFormSpacingValues(props, false, "sidebar")}
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

StyledSidebar.defaultProps = {
  theme: baseTheme,
};

export default StyledSidebar;
