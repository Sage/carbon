import React, { useContext } from "react";

import HiddenCheckableInputStyle from "./hidden-checkable-input.style";
import { InputContext, InputGroupContext } from "../input-behaviour";

export interface CommonHiddenCheckableInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "size" | "type"
  > {
  /** The id of the element that describe the input. */
  ariaDescribedBy?: string;
  /** Prop to specify the aria-labelledby attribute of the input */
  ariaLabelledBy?: string;
  /** If true the Component will be focused when page load */
  autoFocus?: boolean;
  /** Checked state of the input */
  checked?: boolean;
  /** Input name */
  name?: string;
  /** OnChange event handler */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** OnFocus event handler */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** OnMouseLeave event handler */
  onMouseLeave?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** OnMouseEnter event handler */
  onMouseEnter?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** Id of the validation icon */
  validationIconId?: string;
  /** Value of the input */
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
      ariaDescribedBy,
      ariaLabelledBy,
      name,
      checked,
      type,
      value,
      onChange,
      autoFocus,
      role,
      validationIconId,
      ...props
    }: HiddenCheckableInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const {
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      hasFocus,
      hasMouseOver,
    } = useContext(InputContext);
    const {
      onBlur: onBlurGroup,
      onFocus: onFocusGroup,
      onMouseEnter: onMouseEnterGroup,
      onMouseLeave: onMouseLeaveGroup,
      hasFocus: hasGroupFocus,
      hasMouseOver: hasGroupMouseOver,
    } = useContext(InputGroupContext);

    const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (props.onFocus) props.onFocus(ev);
      if (onFocus) onFocus();
      if (onFocusGroup) onFocusGroup();
    };

    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (props.onBlur) props.onBlur(ev);
      if (onBlur) onBlur();
      if (onBlurGroup) onBlurGroup();
    };

    const handleMouseEnter = (ev: React.MouseEvent<HTMLInputElement>) => {
      if (props.onMouseEnter) props.onMouseEnter(ev);
      if (onMouseEnter) onMouseEnter();
      if (onMouseEnterGroup) onMouseEnterGroup();
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLInputElement>) => {
      if (props.onMouseLeave) props.onMouseLeave(ev);
      if (onMouseLeave) onMouseLeave();
      if (onMouseLeaveGroup) onMouseLeaveGroup();
    };

    const hasValidationPart =
      (hasFocus || hasGroupFocus || hasMouseOver || hasGroupMouseOver) &&
      validationIconId;

    const descriptionList = ariaDescribedBy ? [ariaDescribedBy] : [];

    if (hasValidationPart) {
      descriptionList.push(validationIconId);
    }

    const combinedDescription = descriptionList.length
      ? descriptionList.filter(Boolean).join(" ")
      : undefined;

    return (
      <HiddenCheckableInputStyle
        aria-describedby={combinedDescription}
        aria-labelledby={ariaLabelledBy}
        autoFocus={autoFocus}
        data-has-autofocus={autoFocus ? true : undefined}
        aria-checked={checked}
        checked={checked}
        name={name}
        role={role || type}
        type={type}
        value={value}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onChange={onChange}
        ref={ref}
      />
    );
  },
);

HiddenCheckableInput.displayName = "HiddenCheckableInput";

export default React.memo(HiddenCheckableInput);
