import React from "react";
import StyledPill, { StyledPillProps } from "./pill.style";
import Icon from "../icon";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import IconButton from "../icon-button";

export interface PillProps extends StyledPillProps {
  /** The content to display inside of the pill.  */
  children: string;
  /** Change the color of a status pill. */
  colorVariant?:
    | "neutral"
    | "negative"
    | "positive"
    | "warning"
    | "information";
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill?: boolean;
  /** Callback function for when the pill is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLSpanElement>) => void;
  /** Callback function for when the remove icon is clicked. */
  onDelete?: (
    ev?:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Sets the type of pill in use. */
  pillRole?: "tag" | "status";
  /** Sets custom aria-label attribute on the remove button */
  ariaLabelOfRemoveButton?: string;
  /** @private @ignore title attribute passed down to underlying element */
  title?: string;
}

export const Pill = ({
  wrapText,
  borderColor,
  colorVariant = "neutral",
  children,
  fill = false,
  maxWidth,
  onClick,
  onDelete,
  pillRole = "tag",
  size = "M",
  ariaLabelOfRemoveButton = "remove pill",
  ...rest
}: PillProps) => (
  <StyledPill
    inFill={fill}
    colorVariant={colorVariant}
    isDeletable={!!onDelete}
    pillRole={pillRole}
    size={size}
    borderColor={borderColor}
    onClick={onClick}
    {...tagComponent("pill", rest)}
    maxWidth={maxWidth}
    wrapText={wrapText}
    {...rest}
  >
    {children}
    {onDelete && (
      <IconButton
        onClick={onDelete}
        data-element="close"
        aria-label={ariaLabelOfRemoveButton}
      >
        <Icon type="cross" />
      </IconButton>
    )}
  </StyledPill>
);

export default Pill;
