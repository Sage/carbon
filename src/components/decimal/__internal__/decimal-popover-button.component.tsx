import React, { forwardRef, useImperativeHandle, useRef } from "react";

import { ButtonProps } from "../../button/__next__";
import { RenderOpenProps } from "../../popover-container";
import {
  StyledDecimalPopoverButton,
  StyledDecimalPopoverButtonWrapper,
} from "./decimal-popover-button.style";

type DecimalPopoverButtonProps = Pick<
  RenderOpenProps,
  | "onClick"
  | "data-element"
  | "aria-label"
  | "aria-expanded"
  | "aria-haspopup"
  | "id"
> & {
  size?: ButtonProps["size"];
};

const DecimalPopoverButton = forwardRef<
  HTMLButtonElement,
  DecimalPopoverButtonProps
>(
  (
    {
      onClick,
      "data-element": dataElement,
      "aria-label": ariaLabel,
      "aria-expanded": ariaExpanded,
      "aria-haspopup": ariaHasPopup,
      id,
      size,
    },
    ref,
  ) => {
    const wrapperRef = useRef<HTMLSpanElement>(null);

    // PopoverContainer compares openButtonRef.current with document.activeElement
    // and uses indexOf() against the DOM's focusable elements list. It therefore
    // needs the ref to point at the real <button> element, not a ButtonHandle
    // object. We resolve it here via querySelector once the span has mounted.
    useImperativeHandle(
      ref,
      () => wrapperRef.current?.querySelector("button") as HTMLButtonElement,
    );

    return (
      <StyledDecimalPopoverButtonWrapper ref={wrapperRef}>
        <StyledDecimalPopoverButton
          onClick={onClick as React.MouseEventHandler<HTMLElement>}
          data-element={dataElement}
          aria-label={ariaLabel}
          aria-haspopup={ariaHasPopup}
          aria-expanded={ariaExpanded}
          id={id}
          iconType="ellipsis_vertical"
          variantType="subtle"
          size={size}
        />
      </StyledDecimalPopoverButtonWrapper>
    );
  },
);

DecimalPopoverButton.displayName = "DecimalPopoverButton";

export default DecimalPopoverButton;
