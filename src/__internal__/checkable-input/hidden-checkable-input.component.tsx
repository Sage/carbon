import React from "react";

import HiddenCheckableInputStyle from "./hidden-checkable-input.style";

export interface CommonHiddenCheckableInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "size" | "type"
  > {
  /**
   * The id of the element that describe the input.
   * @deprecated This prop is deprecated, please use the `aria-describedby` attribute instead.
   */
  ariaDescribedBy?: string;
  /**
   * Prop to specify the aria-labelledby attribute of the input.
   * @deprecated This prop is deprecated, please use the `aria-labelledby` attribute instead.
   */
  ariaLabelledBy?: string;
  /** If true, the component will be automatically focused when rendered. */
  autoFocus?: boolean;
  /** Checked state of the input. */
  checked?: boolean;
  /** Input name attribute. */
  name?: string;
  /** Value of the input. */
  value?: string;
}

export interface HiddenCheckableInputProps
  extends CommonHiddenCheckableInputProps {
  /** HTML type attribute of the input */
  type: string;
  /** Role attribute of the input */
  role?: string;
}

const HiddenCheckableInput = React.forwardRef(
  (
    {
      ariaDescribedBy: _ariaDescribedBy,
      ariaLabelledBy: _ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      name,
      checked,
      type,
      value,
      autoFocus,
      role,
      ...props
    }: HiddenCheckableInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <HiddenCheckableInputStyle
        aria-describedby={ariaDescribedBy || _ariaDescribedBy || undefined}
        aria-labelledby={ariaLabelledBy || _ariaDescribedBy || undefined}
        autoFocus={autoFocus}
        data-has-autofocus={autoFocus ? true : undefined}
        checked={checked}
        name={name}
        role={role || type}
        type={type}
        value={value}
        {...props}
        ref={ref}
      />
    );
  },
);

HiddenCheckableInput.displayName = "HiddenCheckableInput";

export default React.memo(HiddenCheckableInput);
