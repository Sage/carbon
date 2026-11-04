import styled, { css } from "styled-components";
import { margin } from "styled-system";
import { StyledButton } from "../button/__next__/button.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const StyledSplitButton = styled.div.attrs(applyBaseTheme)<{
  $variantType: "primary" | "secondary";
}>`
  ${margin}
  display: inline-flex;
  align-items: stretch;
  position: relative;

  & > ${StyledButton}:first-of-type {
    border-top-right-radius: var(--global-size-none);
    border-bottom-right-radius: var(--global-size-none);
  }

  & > ${StyledButton} {
    margin: var(--global-space-none);
    &:focus {
      position: relative;
      z-index: 1;
    }
  }

  ${({ $variantType }) =>
    $variantType === "secondary" &&
    css`
      & > ${StyledButton} {
        position: relative;
        &:hover,
        &:active {
          z-index: 1;
        }
        &:focus {
          z-index: 2;
        }
      }
    `}
`;

const StyledPopoverMenuWrapper = styled.div`
  display: flex;
  align-items: stretch;
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--carbon-zindex-small-overlay);
  background-color: transparent;
`;

export default StyledSplitButton;
export { StyledPopoverMenuWrapper, StyledBackdrop };
