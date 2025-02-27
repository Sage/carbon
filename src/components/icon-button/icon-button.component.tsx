import React, { useState, useCallback, useContext } from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import Events from "../../__internal__/utils/helpers/events";
import StyledIconButton from "./icon-button.style";
import { IconProps } from "../icon";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";

export interface IconButtonProps extends SpaceProps, TagProps {
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
  /** Set the button to disabled */
  disabled?: boolean;
  /** Callback triggered on click */
  onClick?: (
    e:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** @private @internal @ignore */
  "data-component"?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      "aria-label": ariaLabel,
      onClick,
      children,
      disabled = false,
      ...rest
    }: IconButtonProps,
    ref,
  ) => {
    const { batchSelectionDisabled } = useContext(BatchSelectionContext);
    const isDisabled = disabled || batchSelectionDisabled;
    const [internalRef, setInternalRef] = useState<HTMLButtonElement>();
    const ariaLabelValue =
      ariaLabel ||
      (
        internalRef?.querySelector("[data-component='icon']") as Element
      )?.getAttribute("type") ||
      "";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (Events.isEnterKey(e) || Events.isSpaceKey(e)) {
        e.preventDefault();
        onClick?.(e);
      }
    };

    const setRefs = useCallback(
      (reference: HTMLButtonElement) => {
        setInternalRef(reference);
        if (!ref) return;
        if (typeof ref === "object") ref.current = reference;
        if (typeof ref === "function") ref(reference);
      },
      [ref],
    );

    return (
      <StyledIconButton
        p={0}
        {...rest}
        aria-label={ariaLabelValue}
        onKeyDown={handleKeyDown}
        onClick={onClick}
        ref={setRefs}
        disabled={isDisabled}
        {...tagComponent(rest["data-component"] ?? "icon-button", rest)}
      >
        <TooltipProvider
          disabled={isDisabled}
          focusable={false}
          target={internalRef}
        >
          {children}
        </TooltipProvider>
      </StyledIconButton>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
