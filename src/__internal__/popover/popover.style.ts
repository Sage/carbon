import styled from "styled-components";
import applyBaseTheme from "../../style/themes/apply-base-theme";

export const StyledBackdrop = styled.div.attrs(applyBaseTheme)`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.popover};
  background: transparent;
`;

type StyledPopoverContentProps = {
  isOpen?: boolean;
};

export const StyledPopoverContent = styled.div<StyledPopoverContentProps>`
  ${({ isOpen }) => !isOpen && "display: none;"}
`;
