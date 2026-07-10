import React from "react";
import { Hint, Label } from "./date-input-field-label.style";

interface DateInputFieldLabelProps {
  disabled?: boolean;
  hint?: React.ReactNode;
  hintId?: string;
  htmlFor?: string;
  isRequired?: boolean;
  label?: string;
  labelId?: string;
  readOnly?: boolean;
  size: "small" | "medium" | "large";
}

const DateInputFieldLabel = ({
  disabled,
  hint,
  hintId,
  htmlFor,
  isRequired,
  label,
  labelId,
  readOnly,
  size,
}: DateInputFieldLabelProps) => {
  const typographySize = size === "large" ? "L" : "M";

  if (!label && !hint) {
    return null;
  }

  return (
    <>
      {label && (
        <Label
          forwardedAs="label"
          variant="p"
          weight="medium"
          size={typographySize}
          m={0}
          id={labelId}
          htmlFor={htmlFor}
          data-component="label"
          data-element="label"
          aria-disabled={disabled || undefined}
          $disabled={disabled}
          $readOnly={readOnly}
          $isRequired={isRequired}
          $size={size}
        >
          {label}
        </Label>
      )}
      {hint && (
        <Hint
          forwardedAs="span"
          variant="p"
          weight="regular"
          size={typographySize}
          m={0}
          id={hintId}
          data-element="input-hint"
          data-role="hint-text"
          $disabled={disabled}
        >
          {hint}
        </Hint>
      )}
    </>
  );
};

export default DateInputFieldLabel;
