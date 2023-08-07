import React, { useContext, useMemo } from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import Tooltip from "../tooltip";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipContext } from "../../__internal__/tooltip-provider";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledIcon, { StyledIconProps } from "./icon.style";
import { ICON_TOOLTIP_POSITIONS } from "./icon-config";
import { IconType } from "./icon-type";
import { TooltipPositions } from "../tooltip/tooltip.config";
import { TabTitleContext } from "../tabs/__internal__/tab-title";

export type LegacyIconTypes =
  | "help"
  | "maintenance"
  | "new"
  | "success"
  | "messages";

export interface IconProps extends Omit<StyledIconProps, "type">, MarginProps {
  /** Set whether icon should be recognised by assistive technologies */
  "aria-hidden"?: boolean;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** Id passed to the icon. */
  id?: string;
  /** The ARIA role to be applied to the Icon */
  role?: string;
  /** The message to be displayed within the tooltip */
  tooltipMessage?: React.ReactNode;
  /** The position to display the tooltip */
  tooltipPosition?: TooltipPositions;
  /** Control whether the tooltip is visible */
  tooltipVisible?: boolean;
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
  /** Overrides the default flip behaviour of the Tooltip */
  tooltipFlipOverrides?: TooltipPositions[];
  /** Id passed to the tooltip container, used for accessibility purposes */
  tooltipId?: string;
  /**
   * Icon type
   *
   * The full list of types can be seen [here](https://carbon.sage.com/?path=/docs/icon--list-of-icons#list-of-icons).
   */
  type: IconType | LegacyIconTypes;
  /** @ignore @private */
  focusable?: boolean;
  /** @ignore @private */
  isPartOfInput?: boolean;
  /** @ignore @private */
  inputSize?: "small" | "medium" | "large";
  /** @ignore @private */
  tabIndex?: number;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      "aria-hidden": ariaHidden,
      ariaLabel,
      bg,
      bgShape,
      bgSize = "small",
      className,
      color,
      disabled,
      focusable = true,
      fontSize = "small",
      id,
      inputSize,
      isPartOfInput,
      tabIndex,
      tooltipMessage,
      tooltipPosition,
      tooltipVisible,
      tooltipBgColor,
      tooltipFontColor,
      tooltipFlipOverrides,
      tooltipId,
      type,
      role,
      ...rest
    }: IconProps,
    ref
  ): JSX.Element => {
    const flipBehaviourCheck =
      Array.isArray(tooltipFlipOverrides) &&
      tooltipFlipOverrides.every((override) =>
        ICON_TOOLTIP_POSITIONS.includes(override)
      );

    if (tooltipFlipOverrides) {
      invariant(
        flipBehaviourCheck,
        `The tooltipFlipOverrides prop supplied to \`Icon\` must be an array containing some or all of ["top", "bottom", "left", "right"].`
      );
    }

    const isInteractive = !!tooltipMessage && !disabled;
    const {
      tooltipPosition: tooltipPositionFromContext,
      focusable: focusableFromContext,
      tooltipVisible: tooltipVisibleFromContext,
      disabled: disabledFromContext,
      target,
    } = useContext(TooltipContext);

    const { isInTab } = useContext(TabTitleContext);

    /** Return Icon type with overrides */
    const iconType = useMemo(() => {
      // switch tweaks icon names for actual icons in the set
      switch (type) {
        case "help":
          return "question";
        case "maintenance":
          return "settings";
        case "new":
          return "gift";
        case "success":
          return "tick";
        case "messages":
        case "email":
          return "message";
        default:
          return type;
      }
    }, [type]);

    const isFocusable =
      focusableFromContext !== undefined ? focusableFromContext : focusable;
    const hasTooltip =
      !disabled && !disabledFromContext && !!tooltipMessage && isFocusable;

    const computedTabIndex = useMemo(() => {
      if (isInTab) {
        return undefined;
      }

      return hasTooltip && tabIndex === undefined ? 0 : tabIndex;
    }, [isInTab, hasTooltip, tabIndex]);

    const styledIconProps = {
      "aria-hidden": ariaHidden,
      "aria-label": ariaLabel,
      bg,
      bgSize,
      bgShape,
      className: className || undefined,
      color,
      "data-element": iconType,
      disabled: disabledFromContext || disabled,
      fontSize,
      hasTooltip,
      id,
      isInteractive,
      key: "icon",
      ref,
      role,
      tabIndex: computedTabIndex,
      type: iconType,
      ...tagComponent("icon", rest),
      ...filterStyledSystemMarginProps(rest),
    };

    const shouldShowTooltip = () => {
      return tooltipVisibleFromContext !== undefined
        ? tooltipVisibleFromContext
        : tooltipVisible;
    };

    if (tooltipMessage) {
      const visible = disabled ? undefined : shouldShowTooltip();

      return (
        <Tooltip
          message={tooltipMessage}
          position={tooltipPositionFromContext || tooltipPosition}
          type={type}
          id={tooltipId}
          isVisible={visible}
          isPartOfInput={isPartOfInput}
          inputSize={inputSize}
          bgColor={tooltipBgColor}
          fontColor={tooltipFontColor}
          flipOverrides={tooltipFlipOverrides}
          target={target}
        >
          <StyledIcon {...styledIconProps} />
        </Tooltip>
      );
    }
    return <StyledIcon {...styledIconProps} />;
  }
);

Icon.displayName = "Icon";

export default Icon;
