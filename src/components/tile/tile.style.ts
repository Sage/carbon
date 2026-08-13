import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import computeSizing from "../../style/utils/element-sizing";
import { TileProps } from "./tile.component";
import { STATUS_KEYLINE_VARIANTS } from "./tile.config";

type StyledTileProps = Pick<
  TileProps,
  | "borderVariant"
  | "variant"
  | "width"
  | "radius"
  | "height"
  | "outline"
  | "inverse"
  | "statusKeyline"
> &
  SpaceProps & {
    $hasFooter?: boolean;
    $footerVariant?: "selected" | "active";
  };

const getColorMappingByVariant = ({
  variant,
  inverse,
}: {
  variant: TileProps["variant"];
  inverse?: boolean;
}) => {
  switch (variant) {
    case "alt":
      return {
        color: `var(--container-standard-${inverse ? "inverse-" : ""}txt-default)`,
        border: `var(--container-standard-${inverse ? "inverse-" : ""}border-default)`,
        bg: `var(--container-standard-${inverse ? "inverse-" : ""}bg-alt)`,
      };
    case "positive":
      return {
        color: "var(--container-standard-txt-default)",
        border: "var(--message-contextual-success-border-default)",
        bg: "var(--message-contextual-success-bg-alt)",
      };
    case "negative":
      return {
        color: "var(--container-standard-txt-default)",
        border: "var(--message-contextual-error-border-default)",
        bg: "var(--message-contextual-error-bg-alt)",
      };
    case "unavailable":
      return {
        color: "var(--container-standard-txt-default)",
        border: "var(--container-action-border-inactive)",
        bg: "var(--container-action-bg-disabled)",
      };
    default:
      // "standard"
      return {
        color: `var(--container-standard-${inverse ? "inverse-" : ""}txt-default)`,
        border: `var(--container-standard-${inverse ? "inverse-" : ""}border-default)`,
        bg: `var(--container-standard-${inverse ? "inverse-" : ""}bg-default)`,
      };
  }
};

const getBorderRadius = (radius: TileProps["radius"]) => {
  switch (radius) {
    case "moderate":
      return "var(--global-radius-container-l)";
    default:
      return "var(--global-radius-container-2-xl)";
  }
};

const getStatusKeylineVariant = ({
  variant,
  inverse,
}: {
  variant: TileProps["statusKeyline"];
  inverse?: boolean;
}) => {
  switch (variant) {
    case "blue":
      return inverse
        ? "var(--container-standard-priority-inverse-bg-info)"
        : "var(--container-standard-priority-bg-info)";
    case "green":
      return inverse
        ? "var(--container-standard-priority-inverse-bg-positive)"
        : "var(--container-standard-priority-bg-positive)";
    case "orange":
      return inverse
        ? "var(--container-standard-priority-inverse-bg-caution)"
        : "var(--container-standard-priority-bg-caution)";
    case "red":
      return inverse
        ? "var(--container-standard-priority-inverse-bg-negative)"
        : "var(--container-standard-priority-bg-negative)";
    case "neutral":
      return inverse
        ? "var(--container-standard-priority-inverse-bg-neutral)"
        : "var(--container-standard-priority-bg-neutral)";
    case "purple":
      return inverse
        ? "var(--container-standard-priority-inverse-bg-prio)"
        : "var(--container-standard-priority-bg-prio)";
    default:
      // ai is default
      return `linear-gradient(to bottom, #00D639 0%, #00D6DE 40%, #9D60FF 90%)`;
  }
};

const getTileBorder = ({
  $hasFooter,
  $footerVariant,
  outline,
  variant,
  inverse,
}: {
  $hasFooter?: boolean;
  $footerVariant?: "selected" | "active";
  outline?: boolean;
  variant: TileProps["variant"];
  inverse?: boolean;
}) => {
  if (
    $hasFooter &&
    ($footerVariant === "selected" || $footerVariant === "active")
  ) {
    return `var(--global-borderwidth-s) solid ${$footerVariant === "selected" ? "var(--container-action-border-active)" : "var(--container-action-bg-footer-activated)"}`;
  }

  return `var(--global-borderwidth-xs) solid ${outline ? getColorMappingByVariant({ variant, inverse }).border : "transparent"}`;
};

const StyledTile = styled.div.attrs(applyBaseTheme)<StyledTileProps>`
  ${({
    outline,
    variant,
    inverse,
    width,
    radius,
    height,
    $hasFooter,
    $footerVariant,
  }) => css`
    padding: var(--global-space-comp-xl);
    ${space}

    box-sizing: border-box;
    border: ${getTileBorder({
      $hasFooter,
      $footerVariant,
      outline,
      variant,
      inverse,
    })};
    border-radius: ${getBorderRadius(radius)};
    --tileBorderRadius: ${getBorderRadius(radius)};
    background-color: ${getColorMappingByVariant({ variant, inverse }).bg};
    color: ${getColorMappingByVariant({ variant, inverse }).color};

    > *:first-child:not([data-role="tile-content"]) {
      border-top-left-radius: calc(${getBorderRadius(radius)} - 1px);
      border-bottom-left-radius: calc(${getBorderRadius(radius)} - 1px);
    }

    > *:last-child:not([data-role="tile-content"]) {
      border-top-right-radius: calc(${getBorderRadius(radius)} - 1px);
      border-bottom-right-radius: calc(${getBorderRadius(radius)} - 1px);
    }

    display: flex;
    flex-direction: row;
    position: relative;
    ${computeSizing({
      width: width || /* istanbul ignore next */ undefined,
      height: height || undefined,
    })}
  `}
`;

const StyledTileWrapper = styled.div<{ radius?: TileProps["radius"] }>`
  position: relative;
  overflow: hidden;
  border-radius: ${({ radius }) => getBorderRadius(radius)};
`;

const StyledTileKeyline = styled.div<{
  statusKeyline?: (typeof STATUS_KEYLINE_VARIANTS)[number];
  inverse?: boolean;
}>`
  ${({ statusKeyline, inverse }) =>
    statusKeyline &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: var(--global-size-4-xs);
      background: ${getStatusKeylineVariant({
        variant: statusKeyline,
        inverse,
      })};
      z-index: 1;
    `}
`;

export { StyledTile, StyledTileWrapper, StyledTileKeyline };
