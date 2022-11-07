import React, { useState, useCallback } from "react";
import { MarginProps } from "styled-system";

import { Expand } from "../../__internal__/utils/helpers/types";
import Events from "../../__internal__/utils/helpers/events";
import StyledIconButton from "./icon-button.style";
import { IconProps } from "../icon";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

export interface IconButtonProps extends Expand<MarginProps> {
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
  /** Action callback */
  onAction: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Set the button to disabled */
  disabled?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      "aria-label": ariaLabel,
      onAction,
      children,
      disabled,
      ...rest
    }: IconButtonProps,
    ref
  ) => {
    const [internalRef, setInternalRef] = useState<HTMLButtonElement>();
    const marginProps = filterStyledSystemMarginProps(rest);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        onAction(e);
      } else {
        e.stopPropagation();
      }
    };

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onAction(e);
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
        {...rest}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        onClick={handleOnClick}
        ref={setRefs}
        disabled={disabled}
        {...marginProps}
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
