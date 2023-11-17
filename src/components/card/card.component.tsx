import React, { useLayoutEffect, useState } from "react";
import { MarginProps } from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import { filterStyledSystemMarginProps } from "../../style/utils";
import CardContext, { CardContextProps } from "./__internal__/card-context";
import StyledCard from "./card.style";
import Icon from "../icon";
import Logger from "../../__internal__/utils/logger";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

type DesignTokensType = keyof typeof DesignTokens;
type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;

export interface CardProps
  extends MarginProps,
    Pick<TagProps, "data-element" | "data-role"> {
  /**
   * [DEPRECATED - use `data-role` instead]
   * Identifier used for testing purposes, applied to the root element of the component.
   * */
  dataRole?: string;
  /** Action to be executed when card is clicked or enter pressed */
  action?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Style value for width of card */
  cardWidth?: string;
  /** Child nodes */
  children: React.ReactNode;
  /** Flag to indicate if card is draggable */
  draggable?: boolean;
  /** Height of the component (any valid CSS value) */
  height?: string;
  /** Flag to indicate if card is interactive */
  interactive?: boolean;
  /** Design token for custom Box Shadow. Note: please check that the box shadow design token you are using is compatible with the Card component. */
  boxShadow?: BoxShadowsType;
  /** Design token for custom Box Shadow on hover. Interactive prop must be True. Note: please check that the box shadow design token you are using is compatible with the Card component. */
  hoverBoxShadow?: BoxShadowsType;
  spacing?: CardContextProps["spacing"];
  roundness?: CardContextProps["roundness"];
}

let isDeprecationWarningTriggered = false;

const Card = ({
  "data-element": dataElement,
  "data-role": dataRole,
  dataRole: oldDataRole,
  action,
  children,
  cardWidth = "500px",
  draggable,
  height,
  interactive,
  spacing = "medium",
  boxShadow,
  hoverBoxShadow,
  roundness = "default",
  ...rest
}: CardProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [firstRowId, setFirstRowId] = useState<string>("");
  const [rowCount, setRowCount] = useState<number>(0);

  if (!isDeprecationWarningTriggered && oldDataRole) {
    isDeprecationWarningTriggered = true;
    Logger.deprecate(
      "The `dataRole` prop of `Card` is now deprecated. Please use the kebab-case version `data-role` instead."
    );
  }

  useLayoutEffect(() => {
    if (ref) {
      const rows = Array.from(
        ref.querySelectorAll("[data-component='card-row']") ||
          /* istanbul ignore next */ []
      );
      setRowCount(rows.length);
      setFirstRowId(rows[0]?.getAttribute("id") || "");
    }
  }, [ref]);

  return (
    <StyledCard
      ref={setRef}
      cardWidth={cardWidth}
      interactive={!!interactive}
      draggable={!!draggable}
      spacing={spacing}
      boxShadow={boxShadow}
      hoverBoxShadow={hoverBoxShadow}
      onClick={interactive && !draggable ? action : undefined}
      height={height}
      {...(interactive && { tabIndex: 0, type: "button" })}
      roundness={roundness}
      {...filterStyledSystemMarginProps(rest)}
      {...tagComponent("card", {
        "data-element": dataElement,
        "data-role": dataRole || oldDataRole,
      })}
    >
      {draggable && <Icon type="drag" />}
      <CardContext.Provider
        value={{ roundness, spacing, firstRowId, rowCount }}
      >
        {children}
      </CardContext.Provider>
    </StyledCard>
  );
};

Card.displayName = "Card";
export default Card;
