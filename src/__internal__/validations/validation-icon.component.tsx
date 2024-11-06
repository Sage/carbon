import React, { useContext, useRef, useState } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import guid from "../utils/helpers/guid";
import Icon from "../../components/icon";
import ValidationIconStyle from "./validation-icon.style";
import {
  InputContext,
  InputGroupContext,
  InputContextProps,
} from "../input-behaviour";
import { filterStyledSystemMarginProps } from "../../style/utils";

export interface ValidationProps {
  /** Indicate that error has occurred
   * Pass string to display icon, tooltip and red border
   * Pass true boolean to only display red border
   */
  error?: boolean | string;
  /** Indicate additional information
   * Pass string to display icon, tooltip and blue border
   * Pass true boolean to only display blue border
   */
  info?: boolean | string;
  /** Indicate that warning has occurred
   * Pass string to display icon, tooltip and orange border
   * Pass true boolean to only display orange border
   */
  warning?: boolean | string;
}

type TooltipPositions = "top" | "bottom" | "left" | "right";

export interface ValidationIconProps
  extends ValidationProps,
    Pick<MarginProps, "mr" | "ml"> {
  /** A small string to indicate the size of the icon */
  size?: "small" | "medium" | "large";
  /** The unique id of the component (used with aria-describedby for accessibility) */
  iconId?: string;
  /** Define position of the tooltip */
  tooltipPosition?: TooltipPositions;
  /**
   * Overrides the default flip behaviour of the Tooltip,
   * must be an array containing some or all of ["top", "bottom", "left", "right"]
   * (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements)
   */
  tooltipFlipOverrides?: TooltipPositions[];
  /** Id passed to the tooltip container, used for accessibility purposes */
  tooltipId?: string;
  /** An onClick handler */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** An onBlur handler */
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** An onFocus handler */
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** A boolean to indicate if the icon is part of an input */
  isPartOfInput?: boolean;
  /** Overrides the default tabindex of the component */
  tabIndex?: number;
}

const getValidationType = ({ error, warning, info }: ValidationProps) => {
  if (error) return "error";
  if (warning) return "warning";
  if (info) return "info";
  return null;
};

export const ValidationIcon = ({
  error,
  warning,
  info,
  size,
  onFocus,
  onBlur,
  iconId,
  tooltipId,
  isPartOfInput,
  tabIndex = -1,
  onClick,
  tooltipPosition = "right",
  tooltipFlipOverrides,
  ...rest
}: ValidationIconProps) => {
  const validationTooltipId = useRef(tooltipId || guid());
  const flipBehaviourCheck =
    Array.isArray(tooltipFlipOverrides) &&
    tooltipFlipOverrides.every((override) =>
      ["bottom", "left", "right", "top"].includes(override),
    );

  if (tooltipFlipOverrides) {
    invariant(
      flipBehaviourCheck,
      `The tooltipFlipOverrides prop supplied to ValidationIcon must be an array containing some or all of ["top", "bottom", "left", "right"].`,
    );
  }

  const { hasFocus, hasMouseOver } =
    useContext<InputContextProps>(InputContext);
  const { hasFocus: groupHasFocus, hasMouseOver: groupHasMouseOver } =
    useContext<InputContextProps>(InputGroupContext);
  const [triggeredByIcon, setTriggeredByIcon] = useState(false);

  const validationType = getValidationType({ error, warning, info });

  const validationMessage = error || warning || info;

  if (typeof validationMessage !== "string" || !validationType) {
    return null;
  }

  return (
    <ValidationIconStyle
      validationType={validationType}
      onClick={onClick}
      onMouseOver={() => setTriggeredByIcon(true)}
      onMouseLeave={() => setTriggeredByIcon(false)}
      onFocus={(e) => {
        setTriggeredByIcon(true);
        if (onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        setTriggeredByIcon(false);
        if (onBlur) onBlur(e);
      }}
      isPartOfInput={isPartOfInput}
      data-role="validation-icon-wrapper"
      {...filterStyledSystemMarginProps(rest)}
    >
      <Icon
        aria-describedby={validationTooltipId.current}
        key={`${validationType}-icon`}
        type={validationType}
        tabIndex={tabIndex}
        tooltipId={validationTooltipId.current}
        tooltipMessage={validationMessage}
        tooltipPosition={tooltipPosition}
        tooltipVisible={
          hasFocus ||
          hasMouseOver ||
          groupHasFocus ||
          groupHasMouseOver ||
          triggeredByIcon
        }
        tooltipFlipOverrides={
          isPartOfInput && !tooltipFlipOverrides
            ? ["top", "bottom"]
            : tooltipFlipOverrides
        }
        isPartOfInput={isPartOfInput}
        inputSize={size}
        id={iconId}
        focusable={tabIndex !== -1}
        data-role={`icon-${validationType}`}
      />
    </ValidationIconStyle>
  );
};

export default ValidationIcon;
