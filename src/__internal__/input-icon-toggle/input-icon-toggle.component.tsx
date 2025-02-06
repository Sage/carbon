import React from "react";
import Icon, { IconType } from "../../components/icon";
import InputIconToggleStyle, {
  InputIconToggleStyleProps,
} from "./input-icon-toggle.style";
import ValidationIcon, {
  ValidationProps,
} from "../validations/validation-icon.component";

export interface InputIconToggleProps
  extends InputIconToggleStyleProps,
    ValidationProps {
  align?: "left" | "right";
  disabled?: boolean;
  iconTabIndex?: number;
  inputIcon?: IconType;
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  readOnly?: boolean;
  useValidationIcon?: boolean;
  /** Id of the validation icon */
  validationIconId?: string;
}

const shouldDisplayValidationIcon = ({
  error,
  warning,
  info,
}: ValidationProps) => {
  const validation = error || warning || info || null;

  return typeof validation === "string";
};

const InputIconToggle = ({
  disabled,
  readOnly,
  size,
  inputIcon: type,
  onClick,
  onFocus,
  onBlur,
  onMouseDown,
  error,
  warning,
  info,
  useValidationIcon,
  align,
  iconTabIndex,
  validationIconId,
}: InputIconToggleProps) => {
  if (
    useValidationIcon &&
    !disabled &&
    shouldDisplayValidationIcon({ error, warning, info })
  ) {
    return (
      <InputIconToggleStyle size={size}>
        <ValidationIcon
          error={error}
          warning={warning}
          info={info}
          size={size}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          isPartOfInput
          tabIndex={iconTabIndex}
          tooltipId={validationIconId}
          tooltipPosition={align === "right" ? "left" : "right"}
        />
      </InputIconToggleStyle>
    );
  }

  if (type) {
    return (
      <InputIconToggleStyle
        size={size}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        data-element="input-icon-toggle"
        disabled={disabled}
        readOnly={readOnly}
        data-role="input-icon-toggle"
        aria-hidden="true"
        tabIndex={-1}
      >
        <Icon disabled={disabled || readOnly} type={type} />
      </InputIconToggleStyle>
    );
  }
  return null;
};

export default InputIconToggle;
