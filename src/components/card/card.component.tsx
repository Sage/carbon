import React, { useState } from "react";
import { MarginProps } from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { CardProvider, CardContextProps } from "./__internal__/card.context";
import { StyledCard, StyledCardContent, StyledDragRow } from "./card.style";
import Icon from "../icon";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Logger from "../../__internal__/utils/logger";

type DesignTokensType = keyof typeof DesignTokens;
type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;

export interface CardProps extends MarginProps, TagProps {
  /** Action to be executed when card is clicked or enter pressed.
   * Renders a button when passed and no draggable or href props set
   * */
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  /** Style value for width of card */
  width?: string;
  /** Child nodes */
  children: React.ReactNode;
  /** Flag to indicate if card is draggable */
  draggable?: boolean;
  /** Height of the component (any valid CSS value) */
  height?: string;
  /** @deprecated Design token for custom Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Card component. */
  boxShadow?: BoxShadowsType;
  /** @deprecated Design token for custom Box Shadow on hover. One of `onClick` or `href` props must be true. Note: please check that the box shadow design token you are using is compatible with the Card component. */
  hoverBoxShadow?: BoxShadowsType;
  /** Size padding applied to the card. */
  spacing?: CardContextProps["spacing"];
  /** Sets the level of roundness of the corners. "moderate" is 16px and "curved" is 20px.
   * "default" (alias for "moderate") and "large" (alias for "curved") are deprecated. Use "moderate" or "curved" instead.
   */
  roundness?: CardContextProps["roundness"];
  /** The path to navigate to. Renders an anchor element when passed and no draggable prop set */
  href?: string;
  /** Visual style variant of the card */
  cardType?: "standard" | "outlined";
  /** The header to render above the Card content */
  header?: React.ReactNode;
  /** The footer to render underneath the Card content */
  footer?: React.ReactNode;
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target?: string;
  /** String for rel property when card has an href prop set */
  rel?: string;
  /** Prop to specify an aria-label for the component */
  "aria-label"?: string;
  /** Slot rendered on the opposite side of the drag handle, only visible when `draggable` is true.
   * Intended for accessibility controls (e.g. move-up / move-down buttons) for keyboard users.
   */
  draggableAccessory?: React.ReactNode;
}

const Card = ({
  "data-element": dataElement,
  "data-role": dataRole,
  children,
  width = "500px",
  draggable,
  height,
  onClick,
  href,
  spacing = "medium",
  boxShadow,
  hoverBoxShadow,
  roundness = "moderate",
  header,
  footer,
  rel,
  target,
  "aria-label": ariaLabel,
  cardType = "standard",
  draggableAccessory,
  ...rest
}: CardProps) => {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const interactive = !!(onClick || href);
  let footerWarningFired = false;

  if (
    !footerWarningFired &&
    interactive &&
    contentRef?.querySelector("[data-component='card-footer']")
  ) {
    footerWarningFired = true;

    Logger.warn(
      "This `Card` is interactive you should use the `footer` prop to render a `CardFooter` to avoid potential accessibility issues",
    );
  }

  return (
    <StyledCard
      cardWidth={width}
      interactive={interactive}
      draggable={!!draggable}
      spacing={spacing}
      boxShadow={boxShadow}
      hoverBoxShadow={hoverBoxShadow}
      height={height}
      roundness={roundness}
      cardType={cardType}
      {...filterStyledSystemMarginProps(rest)}
      {...tagComponent("card", {
        "data-element": dataElement,
        "data-role": dataRole,
      })}
    >
      <CardProvider value={{ roundness, spacing }}>
        {header}
        {draggable && (
          <StyledDragRow spacing={spacing}>
            <Icon type="drag" />
            {draggableAccessory}
          </StyledDragRow>
        )}
        <StyledCardContent
          data-element="card-content-container"
          onClick={!draggable ? onClick : undefined}
          href={!draggable ? href : undefined}
          rel={!draggable && href ? rel : undefined}
          target={!draggable && href ? target : undefined}
          interactive={interactive}
          spacing={spacing}
          roundness={roundness}
          hasHeader={!!header}
          hasFooter={!!footer}
          ref={setContentRef}
          aria-label={ariaLabel}
        >
          {children}
        </StyledCardContent>
        {footer}
      </CardProvider>
    </StyledCard>
  );
};

Card.displayName = "Card";
export default Card;
