import React, { useCallback } from "react";
import { MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";

import StyledCard from "./card.style";
import Icon from "../icon";
import { CardRow, CardRowProps, CardFooter, CardFooterProps } from ".";
import { CardSpacing } from "./card.config";
import Logger from "../../__internal__/utils/logger";

export interface CardProps extends MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
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
  /** Flag to indicate if card is interactive */
  interactive?: boolean;
  /** Size of card for applying padding */
  spacing?: CardSpacing;
}

function hasDisplayName(child: React.ReactElement, displayName: string) {
  return (child.type as React.FunctionComponent).displayName === displayName;
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
  interactive,
  spacing = "medium",
  ...rest
}: CardProps) => {
  if (!isDeprecationWarningTriggered && oldDataRole) {
    isDeprecationWarningTriggered = true;
    Logger.deprecate(
      "The `dataRole` prop of `Card` is now deprecated. Please use the kebab-case version `data-role` instead."
    );
  }

  const renderChildren = useCallback(
    () =>
      React.Children.map<React.ReactNode, React.ReactNode>(
        children,
        (child, index) => {
          if (
            !React.isValidElement<CardRowProps | CardFooterProps>(child) ||
            (React.isValidElement(child) &&
              !hasDisplayName(child, CardRow.displayName) &&
              !hasDisplayName(child, CardFooter.displayName))
          )
            return child;

          if (index !== 0) return React.cloneElement(child, { spacing });

          const childProps = {
            spacing,
            ...child.props,
          };

          if (hasDisplayName(child, CardRow.displayName)) {
            const pad =
              React.Children.toArray(children).filter(
                (row: React.ReactNode) =>
                  React.isValidElement<CardRowProps>(row) &&
                  hasDisplayName(row, CardRow.displayName)
              ).length === 1
                ? "pt"
                : "py";

            childProps[pad] = 0;
          }
          return React.cloneElement(child, childProps);
        }
      ),
    [children, spacing]
  );

  return (
    <StyledCard
      data-component="card"
      data-element={dataElement}
      data-role={dataRole || oldDataRole}
      cardWidth={cardWidth}
      interactive={!!interactive}
      draggable={!!draggable}
      spacing={spacing}
      onClick={interactive && !draggable ? action : undefined}
      {...(interactive && { tabIndex: 0, type: "button" })}
      {...filterStyledSystemMarginProps(rest)}
    >
      {draggable && <Icon type="drag" />}
      {renderChildren()}
    </StyledCard>
  );
};

Card.displayName = "Card";
export default Card;
