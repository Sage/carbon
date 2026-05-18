import React, { useCallback } from "react";
import Icon, { IconType } from "../../components/icon";
import InputIconToggleStyle from "./input-icon-toggle.style";
import ValidationIcon, {
  ValidationProps,
} from "../validations/validation-icon.component";

export interface InputIconToggleProps extends ValidationProps {
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
  onClick?: (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>,
  ) => void;
  size?: "small" | "medium" | "large";
  /**
   * @private @ignore @internal
   * Whether to apply focus styling to input icon
   * */
  blockFocusStyling?: boolean;
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
  blockFocusStyling,
}: InputIconToggleProps) => {
  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLSpanElement>) => {
      /* istanbul ignore else */
      if (ev.key === " " || ev.key === "Enter") {
        ev.preventDefault();
        return onClick?.(ev);
      }
    },
    [onClick],
  );

  if (
    useValidationIcon &&
    !disabled &&
    shouldDisplayValidationIcon({ error, warning, info })
  ) {
    return (
      <InputIconToggleStyle $size={size}>
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
        $size={size}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onKeyDown={onClick && handleKeyDown}
        data-element="input-icon-toggle"
        $disabled={disabled}
        $readOnly={readOnly}
        data-role="input-icon-toggle"
        aria-hidden="true"
        tabIndex={blockFocusStyling ? undefined : -1}
        $blockFocusStyling={blockFocusStyling}
      >
        <Icon disabled={disabled || readOnly} type={type} />
      </InputIconToggleStyle>
    );
  }
  return null;
};

export default InputIconToggle;
