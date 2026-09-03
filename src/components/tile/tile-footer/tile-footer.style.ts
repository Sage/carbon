import styled, { css } from "styled-components";
import { padding } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { TileFooterProps } from "./tile-footer.component";

const getBackgroundColor = (variant: TileFooterProps["variant"]) => {
  switch (variant) {
    case "selected":
      return "var(--container-action-bg-footer-active)";
    case "active":
      return "var(--container-action-bg-footer-activated)";
    default:
      return "transparent";
  }
};

const StyledTileFooter = styled.div.attrs(applyBaseTheme)<{
  variant: TileFooterProps["variant"];
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 var(--global-space-comp-xl);
  height: var(--global-size-l);
  ${padding}

  ${({ variant }) => css`
    border-bottom-left-radius: calc(
      var(--tileBorderRadius) - ${variant ? "3px" : "0px"}
    );
    border-bottom-right-radius: calc(
      var(--tileBorderRadius) - ${variant ? "3px" : "0px"}
    );
    background: ${getBackgroundColor(variant)};
    border-top: 1px solid
      ${variant === "selected" || variant === "active"
        ? "transparent"
        : "var(--container-standard-border-default)"};
    ${variant && `font: var(--global-font-static-comp-medium-l)`};
    ${variant &&
    `color: var(--container-action-label-footer-${variant === "selected" ? "activated" : "active"})`};
  `}
`;

export default StyledTileFooter;
