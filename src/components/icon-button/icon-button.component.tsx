import React, { useState, useCallback } from "react";
import { SpaceProps } from "styled-system";
import invariant from "invariant";
import Events from "../../__internal__/utils/helpers/events";
import StyledIconButton from "./icon-button.style";
import { IconProps } from "../icon";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import Logger from "../../__internal__/utils/logger";

export interface IconButtonProps extends SpaceProps {
  /** Prop to specify the aria-label of the icon-button component */
  "aria-label"?: string;
  /** Icon meant to be rendered, should be an Icon component */
  children: React.ReactElement<IconProps>;
  /** Callback triggered on blur */
  onBlur?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback triggered on focus */
  onFocus?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback triggered on mouse enter */
  onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback triggered on mouse leave */
  onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /** [DEPRECATED - use `onClick` instead] Action callback */
  onAction?: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Set the button to disabled */
  disabled?: boolean;
  /** Callback triggered on click */
  onClick?: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
}

let onActionButtonWarnTriggered = false;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      "aria-label": ariaLabel,
      onAction,
      onClick,
      children,
      disabled,
      ...rest
    }: IconButtonProps,
    ref
  ) => {
    if (!onActionButtonWarnTriggered && onAction) {
      onActionButtonWarnTriggered = true;
      Logger.deprecate(
        "The `onAction` callback for the `IconButton` component is deprecated and will soon be removed. Please use `onClick` instead"
      );
    }

    invariant(
      !(onClick && onAction),
      "onClick and onAction have both been set, please use onClick as onAction will soon be deprecated"
    );

    const [internalRef, setInternalRef] = useState<HTMLButtonElement>();
    const ariaLabelValue =
      ariaLabel ||
      (internalRef?.querySelector(
        "[data-component='icon']"
      ) as Element)?.getAttribute("type") ||
      "";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        onAction?.(e);
        onClick?.(e);
      }
    };

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onAction?.(e);
      onClick?.(e);
    };

    const setRefs = useCallback(
      (reference) => {
        setInternalRef(reference);
        if (!ref) return;
        if (typeof ref === "object") ref.current = reference;
        if (typeof ref === "function") ref(reference);
      },
      [ref]
    );

    return (
      <StyledIconButton
        p={0}
        {...rest}
        aria-label={ariaLabelValue}
        onKeyDown={handleKeyDown}
        onClick={handleOnClick}
        ref={setRefs}
        disabled={disabled}
      >
        <TooltipProvider
          disabled={disabled}
          focusable={false}
          target={internalRef}
        >
          {children}
        </TooltipProvider>
      </StyledIconButton>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
