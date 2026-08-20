import styled from "styled-components";
import { margin } from "styled-system";
import { StyledButton } from "../button/__next__/button.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const StyledSplitButton = styled.div.attrs(applyBaseTheme)`
  ${margin}
  display: inline-block;
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
`;

const StyledPopoverMenuWrapper = styled.div<{ $menuWidth?: string }>`
  display: inline-block;

  [data-role="menu-wrapper"] {
    width: ${({ $menuWidth }) => $menuWidth ?? "100%"};
    max-width: ${({ $menuWidth }) => $menuWidth ?? "100%"};
  }
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
