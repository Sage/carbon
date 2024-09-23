import styled, { css } from "styled-components";
import { PaddingProps, padding as paddingFn } from "styled-system";
import computeSizing from "../../style/utils/element-sizing";

import { SidebarProps } from "./sidebar.component";
import baseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";

import { SIDEBAR_SIZES_CSS } from "./sidebar.config";
import resolvePaddingSides from "../../style/utils/resolve-padding-sides";
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

const StyledSidebarContent = styled.div<PaddingProps>((props) => {
  const {
    paddingTop = "var(--spacing300)",
    paddingRight = "var(--spacing400)",
    paddingBottom = "var(--spacing400)",
    paddingLeft = "var(--spacing400)",
  } = resolvePaddingSides(props);

  return css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    flex: 1;

    ${StyledForm}.sticky {
      margin-top: calc(-1 * ${paddingTop});
      margin-right: calc(-1 * ${paddingRight});
      margin-bottom: calc(-1 * ${paddingBottom});
      margin-left: calc(-1 * ${paddingLeft});

      ${StyledFormContent} {
        padding-top: ${paddingTop};
        padding-right: ${paddingRight};
        padding-bottom: ${paddingBottom};
        padding-left: ${paddingLeft};
      }
    }

    padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};
    ${paddingFn}
  `;
});

StyledSidebar.defaultProps = {
  theme: baseTheme,
};

export { StyledSidebar, StyledSidebarContent };
