import React, { useState } from "react";
import { MarginProps } from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import { filterStyledSystemMarginProps } from "../../style/utils";
import CardContext, { CardContextProps } from "./__internal__/card.context";
import { StyledCard, StyledCardContent } from "./card.style";
import Icon from "../icon";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

type DesignTokensType = keyof typeof DesignTokens;
type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;

export interface CardProps
  extends MarginProps,
    Pick<TagProps, "data-element" | "data-role"> {
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
  /** Design token for custom Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Card component. */
  boxShadow?: BoxShadowsType;
  /** Design token for custom Box Shadow on hover. One of `onClick` or `href` props must be true. Note: please check that the box shadow design token you are using is compatible with the Card component. */
  hoverBoxShadow?: BoxShadowsType;
  /** Size of card for applying padding */
  spacing?: CardContextProps["spacing"];
  /** Sets the level of roundness of the corners, "default" is 8px and "large" is 16px */
  roundness?: CardContextProps["roundness"];
  /** The path to navigate to. Renders an anchor element when passed and no draggable prop set */
  href?: string;
  /** The footer to render underneath the Card content */
  footer?: React.ReactNode;
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target?: string;
  /** String for rel property when card has an href prop set */
  rel?: string;
  /** Prop to specify an aria-label for the component */
  "aria-label"?: string;
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
  roundness = "default",
  footer,
  rel,
  target,
  "aria-label": ariaLabel,
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
    // eslint-disable-next-line no-console
    console.warn(
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
      {...filterStyledSystemMarginProps(rest)}
      {...tagComponent("card", {
        "data-element": dataElement,
        "data-role": dataRole,
      })}
    >
      {draggable && <Icon type="drag" />}
      <CardContext.Provider value={{ roundness, spacing }}>
        <StyledCardContent
          data-element="card-content-container"
          onClick={!draggable ? onClick : undefined}
          href={!draggable ? href : undefined}
          rel={!draggable && href ? rel : undefined}
          target={!draggable && href ? target : undefined}
          interactive={interactive}
          spacing={spacing}
          roundness={roundness}
          hasFooter={!!footer}
          ref={setContentRef}
          aria-label={ariaLabel}
        >
          {children}
        </StyledCardContent>
        {footer}
      </CardContext.Provider>
    </StyledCard>
  );
};

Card.displayName = "Card";
export default Card;
