import styled from "styled-components";
import applyBaseTheme from "../../style/themes/apply-base-theme";

export const StyledBackdrop = styled.div.attrs(applyBaseTheme)`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  /* If behind an adaptive sidebar, use the backdrop z-index value, if not default to original z-index value */
  z-index: var(
    --adaptiveSidebarModalBackdrop,
    ${({ theme }) => theme.zIndex.popover}
  );

  background: transparent;
`;

type StyledPopoverContentProps = {
  hide?: boolean;
  $topLayer?: boolean;
};

export const StyledPopoverContent = styled.div<StyledPopoverContentProps>`
  ${({ $topLayer }) =>
    $topLayer &&
    `
      position: fixed;
      inset: 0 auto auto 0;
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
      border: 0;
      overflow: visible;
      background: transparent;
      color: inherit;
    `}
  ${({ hide }) => hide && "display: none;"}
`;
