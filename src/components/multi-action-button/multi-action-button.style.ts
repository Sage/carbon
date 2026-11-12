import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { MultiActionButtonProps } from "./multi-action-button.component";
import computeSizing from "../../style/utils/element-sizing";

type StyledMultiActionButtonProps = Pick<
  MultiActionButtonProps,
  "width" | "menuWidth" | "fullWidth"
> & {
  displayed: boolean;
};

const StyledMultiActionButton = styled.div.attrs(
  applyBaseTheme,
)<StyledMultiActionButtonProps>`
  ${margin}

  display: inline-block;
  position: relative;

  ${({ width }) =>
    width &&
    css`
      ${computeSizing({ width })}
    `}

  /* TODO: Revisit this override once the PopoverMenu overflow/scroll behaviour has been updated as part of FE-7800 and investigate whether it can be removed or refactored. */
  [data-component="scroll-wrapper"] {
    overflow-y: auto;
  }

  /* Raise the inline menu above the legacy sticky Form footer (z-index: 1000) until stickyFooter support is removed. */
  form & [data-role="menu-wrapper"] {
    z-index: 1001;
  }
`;

export default StyledMultiActionButton;
