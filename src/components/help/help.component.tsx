import React, { useContext, useEffect, useRef, useState } from "react";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import Icon, { IconType } from "../icon";
import StyledHelp from "./help.style";
import Events from "../../__internal__/utils/helpers/events";
import { TooltipContext } from "../../__internal__/tooltip-provider";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipPositions } from "../tooltip/tooltip.config";
import guid from "../../__internal__/utils/helpers/guid";

export interface HelpProps extends MarginProps, TagProps {
  /** Overrides the default 'as' attribute of the Help component */
  as?: keyof JSX.IntrinsicElements;
  /** Aria label */
  ariaLabel?: string;
  /** The message to be displayed within the tooltip */
  children?: React.ReactNode;
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
  /** Id passed to the tooltip container, used for accessibility purposes */
  tooltipId?: string;
  /** Position of tooltip relative to target */
  tooltipPosition?: TooltipPositions;
  /** Help Icon type */
  type?: IconType;
  // any has been used here to allow rest props to be spread
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const Help = ({
  as,
  ariaLabel = "help",
  children,
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
  const defaultTooltipId = useRef(guid());
  const helpElement = useRef<HTMLDivElement>(null);
  const [isTooltipVisible, updateTooltipVisible] = useState(false);
  const { helpAriaLabel } = useContext(TooltipContext);

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
      aria-describedby={
        isFocused || isTooltipVisible
          ? tooltipId || defaultTooltipId.current
          : undefined
      }
      aria-label={helpAriaLabel || ariaLabel}
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
      tabIndex={tabIndex}
      {...(href
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {
            role: "button",
          })}
      {...filterStyledSystemMarginProps(rest)}
      {...rest}
      {...tagComponent("help", rest)}
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
        tooltipId={tooltipId || defaultTooltipId.current}
      />
    </StyledHelp>
  );
};

Help.displayName = "Help";

export default Help;
