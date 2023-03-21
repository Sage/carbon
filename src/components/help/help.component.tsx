import React, { useContext, useEffect, useRef, useState } from "react";
import { MarginProps } from "styled-system";

import Icon, { IconType } from "../icon";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledHelp, { VisuallyHidden } from "./help.style";
import Events from "../../__internal__/utils/helpers/events";
import { TooltipContext } from "../../__internal__/tooltip-provider";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipPositions } from "../tooltip/tooltip.config";
import Logger from "../../__internal__/utils/logger";

export interface HelpProps extends MarginProps {
  /** Overrides the default 'as' attribute of the Help component */
  as?: keyof JSX.IntrinsicElements;
  /** A label to be attached to the component, which is rendered in hidden text that is announced by a screenreader, along with the tooltip text.
   * Defaults to "help".
   */
  accessibilityLabel?: string;
  /** A synonym for accessibilityLabel (deprecated) */
  ariaLabel?: string;
  /** The message to be displayed within the tooltip */
  children?: React.ReactNode;
  /** [Legacy] A custom class name for the component. */
  className?: string;
  /** The unique id of the component (used with aria-describedby for accessibility) */
  helpId?: string;
  /** A path for the anchor */
  href?: string;
  /** A boolean received from IconWrapper */
  isFocused?: boolean;
  /** Overrides the default tabindex of the component */
  tabIndex?: number;
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
  /** Overrides the default flip behaviour of the Tooltip,
   *  must be an array containing some or all of ["top", "bottom", "left", "right"]
   * (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements)
   */
  tooltipFlipOverrides?: TooltipPositions[];
  /** Id passed to the tooltip container (deprecated) */
  tooltipId?: string;
  /** Position of tooltip relative to target */
  tooltipPosition?: TooltipPositions;
  /** Help Icon type */
  type?: IconType;
  // any has been used here to allow rest props to be spread
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

let tooltipIdDeprecationWarningTriggered = false;
let ariaLabelDeprecationWarningTriggered = false;

export const Help = ({
  as,
  accessibilityLabel,
  ariaLabel,
  children,
  className,
  href,
  helpId,
  isFocused,
  tabIndex = 0,
  tooltipBgColor,
  tooltipFontColor,
  tooltipFlipOverrides,
  tooltipId,
  tooltipPosition = "top",
  type = "help",
  ...rest
}: HelpProps): JSX.Element => {
  const helpElement = useRef<HTMLDivElement>(null);
  const [isTooltipVisible, updateTooltipVisible] = useState(false);
  const { helpAriaLabel } = useContext(TooltipContext);
  const labelProp = accessibilityLabel || ariaLabel || "help";

  if (tooltipId && !tooltipIdDeprecationWarningTriggered) {
    tooltipIdDeprecationWarningTriggered = true;
    Logger.deprecate(
      "The `tooltipId` prop of `Help` is now deprecated and will be removed in a future release. " +
        "It still provides the HTML ID of the tooltip element but is no longer needed for accessibility"
    );
  }

  if (ariaLabel && !ariaLabelDeprecationWarningTriggered) {
    ariaLabelDeprecationWarningTriggered = true;
    Logger.deprecate(
      "The `ariaLabel` prop of `Help` is now deprecated and will be removed in a future release. Please use the `accessibilityLabel` prop instead."
    );
  }

  useEffect(() => {
    function handleKeyPress(ev: KeyboardEvent) {
      if (Events.isEscKey(ev)) {
        helpElement?.current?.blur();
        updateTooltipVisible(false);
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const tagType = as || (href && "a") || "div";

  function handleFocusBlur(isVisible: boolean) {
    return () => {
      updateTooltipVisible(isVisible);
    };
  }

  return (
    <StyledHelp
      className={className}
      as={tagType}
      href={href}
      id={helpId}
      ref={helpElement}
      onClick={() => {
        helpElement?.current?.focus();
      }}
      onFocus={handleFocusBlur(true)}
      onBlur={handleFocusBlur(false)}
      onMouseOver={handleFocusBlur(true)}
      onMouseLeave={handleFocusBlur(false)}
      {...tagComponent("help", rest)}
      tabIndex={tabIndex}
      {...(href
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      {...filterStyledSystemMarginProps(rest)}
      {...rest}
    >
      <Icon
        aria-hidden
        type={type}
        tooltipMessage={children}
        tooltipPosition={tooltipPosition}
        tooltipVisible={isFocused || isTooltipVisible}
        tooltipBgColor={tooltipBgColor}
        tooltipFontColor={tooltipFontColor}
        tooltipFlipOverrides={tooltipFlipOverrides}
        focusable={false}
        tooltipId={tooltipId}
      />
      <VisuallyHidden>
        {helpAriaLabel || labelProp}. {children}
      </VisuallyHidden>
    </StyledHelp>
  );
};

Help.displayName = "Help";

export default Help;
