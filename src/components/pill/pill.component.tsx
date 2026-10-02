import React from "react";
import StyledPill, { StyledPillProps, StyledDeleteButton } from "./pill.style";
import Icon from "../icon";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";

export interface PillProps extends StyledPillProps, TagProps {
  /** The content to display inside of the pill.  */
  children: string;
  /**
   * Determines the colour variant of the pill.
   * @deprecated Use `variant` prop instead.
   */
  colorVariant?:
    | "neutral"
    | "negative"
    | "positive"
    | "warning"
    | "information"
    | "neutralWhite";
  /** Sets the colour variant of a status pill. */
  variant?:
    | "grey"
    | "green"
    | "red"
    | "orange"
    | "blue"
    | "purple"
    | "teal"
    | "lime"
    | "pink"
    | "slate";
  /**
   * Apply inverse styling for use on dark backgrounds.
   * @deprecated Use `inverse` prop instead.
   */
  isDarkBackground?: boolean;
  /** Set to allow for inverse styling to be used on dark backgrounds. */
  inverse?: boolean;
  /**
   * A React node displayed to the left of the pill content.
   * Recommended for use with `size="L"` pills.
   */
  icon?: React.ReactNode;
  /** Fills the pill background with colour. When fill is false only the border is coloured. */
  fill?: boolean;
  /** Callback function for when the pill is clicked. */
  onClick?: (ev: React.MouseEvent<HTMLSpanElement>) => void;
  /**
   * Callback fired when the remove button is activated.
   * Receives the click event.
   */
  onDelete?: (
    ev?:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /**
   * Sets the type of pill in use.
   * @deprecated The pillRole prop is no longer used. Pill styling is determined by the `variant`, `fill`, and `inverse` props.
   */
  pillRole?: "tag" | "status";
  /** Sets custom aria-label attribute on the remove button */
  ariaLabelOfRemoveButton?: string;
  /** @private @ignore title attribute passed down to underlying element */
  title?: string;
}

const LEGACY_COLOR_VARIANT_MAP = {
  neutral: "grey",
  positive: "green",
  negative: "red",
  warning: "orange",
  information: "blue",
  neutralWhite: "grey",
} as const;

const resolveVariant = (
  variant: PillProps["variant"],
  colorVariant: PillProps["colorVariant"],
): NonNullable<PillProps["variant"]> => {
  if (variant !== undefined) return variant;

  if (colorVariant !== undefined) {
    return LEGACY_COLOR_VARIANT_MAP[colorVariant];
  }

  return "grey";
};

export const Pill = ({
  wrapText,
  borderColor,
  colorVariant,
  variant,
  isDarkBackground = false,
  inverse = false,
  icon,
  children,
  fill = false,
  maxWidth,
  onClick,
  onDelete,
  pillRole,
  size = "M",
  ariaLabelOfRemoveButton,
  ...rest
}: PillProps) => {
  const locale = useLocale();
  const resolvedPillRole = pillRole ?? "tag";
  const resolvedVariant = resolveVariant(variant, colorVariant);

  return (
    <StyledPill
      $inFill={fill}
      $colorVariant={resolvedVariant}
      $inverse={inverse || isDarkBackground}
      $isDeletable={!!onDelete}
      $pillRole={resolvedPillRole}
      $size={size}
      $borderColor={borderColor}
      onClick={onClick}
      $maxWidth={maxWidth}
      $wrapText={wrapText}
      {...rest}
      {...tagComponent("pill", rest)}
    >
      {icon}
      {children}
      {onDelete && (
        <StyledDeleteButton
          type="button"
          onClick={(ev) => onDelete(ev)}
          data-element="close"
          aria-label={ariaLabelOfRemoveButton || locale.pill.remove(children)}
        >
          <Icon type="cross" />
        </StyledDeleteButton>
      )}
    </StyledPill>
  );
};

export default Pill;
