import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { MultiActionButtonProps } from "./multi-action-button.component";
import computeSizing from "../../style/utils/element-sizing";

type StyledMultiActionButtonProps = Pick<MultiActionButtonProps, "width" | "menuWidth" | "fullWidth"> & {
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

      [data-component="popover-menu"],
      [data-component="popover-menu-control"] {
        width: 100%;
      }
    `}

  [data-component="scroll-wrapper"] {
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 12px;
      border-radius: var(--global-radius-container-circle);
    }

    &::-webkit-scrollbar-track {
      background-color: var(--container-scrollbar-bg-default);
      border-radius: 0 var(--global-radius-container-circle)
        var(--global-radius-container-circle) 0;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: var(--global-radius-container-circle);
      background-clip: padding-box;
      border: var(--global-space-comp-2-xs) solid transparent;
      background-color: var(--container-scrollbar-fg-default);
      min-height: 146px;
    }
  }
`;

export default StyledMultiActionButton;
