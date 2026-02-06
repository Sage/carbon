import React from "react";
import StyledPill, { StyledPillProps } from "./pill.style";
import Icon from "../icon";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Logger from "../../__internal__/utils/logger";
import IconButton from "../icon-button";
import useLocale from "../../hooks/__internal__/useLocale";

export interface PillProps extends StyledPillProps, TagProps {
  /** The content to display inside of the pill.  */
  children: string;
  /** Change the color of a status pill. */
  colorVariant?:
    | "neutral"
    | "negative"
    | "positive"
    | "warning"
    | "information"
    | "neutralWhite";
  /** Sets the colour styling when a status pill is rendered on a dark background. */
  isDarkBackground?: boolean;
  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill?: boolean;
  /** Callback function for when the pill is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLSpanElement>) => void;
  /** Callback function for when the remove icon is clicked. */
  onDelete?: (
    ev?:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** Sets the type of pill in use. */
  pillRole?: "tag" | "status";
  /** Sets custom aria-label attribute on the remove button */
  ariaLabelOfRemoveButton?: string;
  /** @private @ignore title attribute passed down to underlying element */
  title?: string;
}

let neutralWhiteWarnTriggered = false;

const Pill = ({
  wrapText,
  borderColor,
  colorVariant = "neutral",
  isDarkBackground = false,
  children,
  fill = false,
  maxWidth,
  onClick,
  onDelete,
  pillRole = "tag",
  size = "M",
  ariaLabelOfRemoveButton,
  ...rest
}: PillProps) => {
  const locale = useLocale();

  if (
    !neutralWhiteWarnTriggered &&
    !isDarkBackground &&
    colorVariant === "neutralWhite" &&
    !fill
  ) {
    neutralWhiteWarnTriggered = true;

    Logger.warn(
      "[WARNING] The `neutralWhite` variant should only be used on dark backgrounds with fill set to true. " +
        "Please set the `isDarkBackground` and `fill` props to true or use another color variant.",
    );
  }

  return (
    <StyledPill
      inFill={fill}
      colorVariant={colorVariant}
      isDarkBackground={isDarkBackground}
      isDeletable={!!onDelete}
      pillRole={pillRole}
      size={size}
      borderColor={borderColor}
      onClick={onClick}
      maxWidth={maxWidth}
      wrapText={wrapText}
      {...rest}
      {...tagComponent("pill", rest)}
    >
      {children}
      {onDelete && (
        <IconButton
          onClick={onDelete}
          data-element="close"
          aria-label={ariaLabelOfRemoveButton || locale.pill.remove(children)}
        >
          <Icon type="cross" />
        </IconButton>
      )}
    </StyledPill>
  );
};

export default Pill;
