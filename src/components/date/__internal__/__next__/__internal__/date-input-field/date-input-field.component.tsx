import React from "react";
import Input from "../../../../../../__internal__/input";
import DateInputFieldLabel from "./date-input-field-label.component";
import {
  DateInputLabelWrapper,
  DateInputWrapper,
  InputWrapper,
} from "./date-input-field.style";

interface DateInputFieldProps {
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  inputAriaDescribedBy?: string;
  inputAriaLabelledBy?: string;
  inputHint?: React.ReactNode;
  inputHintId?: string;
  inputIcon?: React.ReactNode;
  inputId: string;
  inputName: string;
  inputWidth?: number;
  inputProps: Record<string, unknown>;
  inputRef: React.Ref<HTMLInputElement>;
  inputValue: string;
  isRequired?: boolean;
  label?: string;
  labelAlign?: "left" | "right";
  labelId?: string;
  labelInline?: boolean;
  maxWidth?: string;
  minWidth: string;
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (ev: React.MouseEvent<HTMLInputElement>) => void;
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  onMouseDown: () => void;
  prefix?: string;
  prefixId?: string;
  readOnly?: boolean;
  size: "small" | "medium" | "large";
  validation?: React.ReactNode;
}

const DateInputField = ({
  autoFocus,
  className,
  disabled,
  hasError,
  inputAriaDescribedBy,
  inputAriaLabelledBy,
  inputHint,
  inputHintId,
  inputIcon,
  inputProps,
  inputId,
  inputName,
  inputWidth,
  inputRef,
  inputValue,
  isRequired,
  label,
  labelAlign,
  labelId,
  labelInline,
  maxWidth,
  minWidth,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  onMouseDown,
  prefix,
  prefixId,
  readOnly,
  size,
  validation,
}: DateInputFieldProps) => {
  return (
    <DateInputWrapper
      data-role="date-input-wrapper"
      $labelInline={labelInline}
      $size={size}
    >
      {(label || inputHint) && (
        <DateInputLabelWrapper
          data-role="label-wrapper"
          $labelAlign={labelAlign}
          $labelInline={labelInline}
          $size={size}
        >
          <DateInputFieldLabel
            label={label}
            hint={inputHint}
            hintId={inputHintId}
            labelId={labelId}
            htmlFor={inputId}
            size={size}
            disabled={disabled}
            readOnly={readOnly}
            isRequired={isRequired}
          />
        </DateInputLabelWrapper>
      )}
      <InputWrapper
        data-role="input-wrapper"
        $size={size}
        $maxWidth={maxWidth}
        $inputWidth={inputWidth}
        $minWidth={minWidth}
      >
        <Input
          {...inputProps}
          id={inputId}
          name={inputName}
          className={className}
          aria-invalid={hasError}
          aria-describedby={inputAriaDescribedBy || undefined}
          aria-labelledby={inputAriaLabelledBy}
          value={inputValue}
          required={isRequired}
          ref={inputRef}
          autoFocus={autoFocus}
          onMouseDown={onMouseDown}
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          error={hasError}
          inputIcon={inputIcon}
          size={size}
          prefix={prefix}
          prefixId={prefixId}
          type="text"
          disabled={disabled}
          readOnly={readOnly}
        />
        {validation}
      </InputWrapper>
    </DateInputWrapper>
  );
};

export default DateInputField;
