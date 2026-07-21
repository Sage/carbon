import React, { forwardRef } from "react";

import { ButtonProps } from "../../button/__next__";
import { RenderOpenProps } from "../../popover-container";
import StyledDecimalPopoverButton from "./decimal-popover-button.style";

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
    return (
      <StyledDecimalPopoverButton
        ref={ref}
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
    );
  },
);

DecimalPopoverButton.displayName = "DecimalPopoverButton";

export default DecimalPopoverButton;
