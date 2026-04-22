import React, { useCallback, useRef, useState } from "react";

import { MarginProps } from "styled-system";

import { IconType } from "../icon";
import { CommonInputProps } from "../../__internal__/legacy-input";
import { ValidationProps } from "../../__internal__/validations";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import TextInput from "./__internal__/__next__/text-input.component";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import useCharacterCount from "../../hooks/useCharacterCount";
import useUniqueId from "../../hooks/__internal__/useUniqueId";
import combineRefs from "../../__internal__/utils/helpers/combine-refs";

export const SIZE_DEFAULT = "medium";
export const LABEL_WIDTH_DEFAULT = 30;
export const LABEL_VALIDATION_DEFAULT = false;

export interface CommonTextboxProps
  extends Pick<ValidationProps, "error" | "warning">,
    MarginProps,
    Omit<CommonInputProps, "size" | "inputBorderRadius">,
    TagProps {
  /** Prop to specify the aria-labelledby property of the component */
  "aria-labelledby"?: string;
  /** @deprecated `adaptiveLabelBreakpoint` has been deprecated, the functionality will no longer work. */
  adaptiveLabelBreakpoint?: number;
  /** Integer to determine a timeout for the deferred callback */
  deferTimeout?: number;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /**
   * @deprecated `fieldHelp` has been deprecated, `inputHint` should be used instead.
   *  [Legacy] Help content to be displayed under an input. */
  fieldHelp?: React.ReactNode;
  /**
   * An optional alternative for props.value, this is useful if the
   * real value is an ID but you want to show a human-readable version.
   */
  formattedValue?: string;
  /**
   * Unique identifier for the input.
   * Label id will be based on it, using following pattern: [id]-label.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: IconType | React.ReactNode;
  /** Optional handler for click event on Textbox icon */
  iconOnClick?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  /** Optional handler for mouse down event on Textbox icon */
  iconOnMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Overrides the default tabindex of the component */
  iconTabIndex?: number;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /**
   * Prop for specifying the max width of the input.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** Additional child elements to display before the input */
  leftChildren?: React.ReactNode;
  /** Label content */
  label?: string;
  /** @deprecated `labelAlign` has been deprecated, the functionality will no longer work. */
  labelAlign?: "left" | "right";
  /**
   * @deprecated `labelHelp` has been deprecated, `inputHint` should be used instead.
   * [Legacy] Text applied to label help tooltip. When opted into new design validations
   * string values will render as a hint above the input, unless an `inputHint`
   * prop is also passed.
   */
  labelHelp?: React.ReactNode;
  /** When true label is inline. */
  labelInline?: boolean;
  /** @deprecated `labelSpacing` has been deprecated, the functionality will no longer work.*/
  labelSpacing?: 1 | 2;
  /** @deprecated `labelWidth` has been deprecated, the functionality will no longer work. */
  labelWidth?: number;
  /** Specify a callback triggered on change */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Deferred callback to be called after the onChange event */
  onChangeDeferred?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on click */
  onClick?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  /** Event handler for the focus event */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Event handler for the blur event */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Event handler for the mouse down event */
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Emphasized part of the displayed text */
  prefix?: string;
  /** @deprecated `reverse` has been deprecated, the functionality will no longer work. */
  reverse?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** @deprecated `validationOnLabel` has been deprecated, the functionality will no longer work. */
  validationOnLabel?: boolean;
  /** @deprecated `tooltipPosition` has been deprecated, the functionality will no longer work. */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** @deprecated `helpAriaLabel` has been deprecated, the functionality will no longer work. */
  helpAriaLabel?: string;
  /** @deprecated `tooltipId` has been deprecated, the functionality will no longer work. */
  tooltipId?: string;
  /** @private @internal @ignore */
  "data-component"?: string;
  /** Render the ValidationMessage above the Textbox input when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
  /** @deprecated `info` has been deprecated, the functionality will no longer work. */
  info?: string | boolean;
}

export interface TextboxProps extends Omit<CommonTextboxProps, "defaultValue"> {
  /** Content to be rendered next to the input */
  children?: React.ReactNode;
  /** Container for DatePicker or SelectList components */
  positionedChildren?: React.ReactNode;
  /** Character limit of the textarea */
  characterLimit?: number;
}

const NON_FUNCTIONING_PROPS = new Set([
  "adaptiveLabelBreakpoint",
  "info",
  "helpAriaLabel",
  "labelAlign",
  "labelWidth",
  "labelSpacing",
  "labelId",
  "reverse",
  "tooltipPosition",
  "tooltipId",
  "validationOnLabel",
]);

/*
 * Filters out props that are not supported by the TextInput component to avoid React warnings about unknown props.
 * These props are still accepted by the Textbox component for backwards compatibility, but are not passed down to the TextInput component.
 */
const filterNonFunctioningProps = (
  props: Record<string, unknown>,
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !NON_FUNCTIONING_PROPS.has(key)),
  );
};

/*
 * This component is an adapter that maps the legacy Textbox props to the new TextInput component.
 */
export const Textbox = React.forwardRef(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      characterLimit,
      children,
      "data-component": dataComponent,
      "data-element": dataElement,
      "data-role": dataRole,
      deferTimeout,
      disabled,
      error,
      formattedValue,
      fieldHelp,
      iconOnClick,
      iconOnMouseDown,
      iconTabIndex,
      id,
      inputHint,
      inputIcon,
      inputWidth,
      label,
      labelHelp,
      labelInline,
      leftChildren,
      maxWidth,
      name,
      onBlur,
      onFocus,
      onChange,
      onChangeDeferred,
      onClick,
      onMouseDown,
      placeholder,
      positionedChildren,
      prefix,
      readOnly,
      required,
      size = SIZE_DEFAULT,
      warning,
      validationMessagePositionTop = true,
      value,
      ...rest
    }: TextboxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const [uniqueId, uniqueName] = useUniqueId(id, name);
    const deferredTimeout = useRef<NodeJS.Timeout | null>(null);
    const localRef = useRef<HTMLInputElement>(null);
    const combinedRef = combineRefs(ref, localRef);

    const iconClickHandler = useCallback(
      (
        ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      ) => {
        if (disabled || readOnly) return;

        const callbackToCall = iconOnClick ?? onClick;
        callbackToCall?.(ev);
      },
      [iconOnClick, onClick, disabled, readOnly],
    );

    const iconMouseDownHandler = useCallback(
      (ev: React.MouseEvent<HTMLElement>) => {
        if (disabled || readOnly) return;

        const callbackToCall = iconOnMouseDown ?? onMouseDown;
        callbackToCall?.(ev);
      },
      [iconOnMouseDown, onMouseDown, disabled, readOnly],
    );

    const iconToRender =
      typeof inputIcon === "string" ? (
        <InputIconToggle
          inputIcon={inputIcon as IconType}
          disabled={disabled}
          error={error}
          iconTabIndex={iconTabIndex}
          onClick={iconClickHandler}
          onMouseDown={iconMouseDownHandler}
          readOnly={readOnly}
          size={size}
          warning={warning}
          blockFocusStyling
        />
      ) : null;

    const handleDeferred = useCallback(
      (ev: React.ChangeEvent<HTMLInputElement>) => {
        /* istanbul ignore else */
        if (onChangeDeferred) {
          if (deferredTimeout.current) {
            clearTimeout(deferredTimeout.current);
          }
          deferredTimeout.current = setTimeout(() => {
            onChangeDeferred(ev);
          }, deferTimeout || 750);
        }
      },
      [onChangeDeferred, deferTimeout],
    );

    const handleChange = useCallback(
      (ev: React.ChangeEvent<HTMLInputElement>) => {
        onChange(ev);
        handleDeferred(ev);
      },
      [onChange, handleDeferred],
    );

    const characterCountValue = typeof value === "string" ? value : "";

    const [characterCountAriaLive, setCharacterCountAriaLive] = useState<
      "off" | "polite"
    >("off");
    // This block of code has been covered in a Playwright test.
    // istanbul ignore next
    const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (characterLimit) setCharacterCountAriaLive("polite");
      onFocus?.(ev);
    };

    // This block of code has been covered in a Playwright test.
    // istanbul ignore next
    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (characterLimit) setCharacterCountAriaLive("off");
      onBlur?.(ev);
    };

    const [characterCount, visuallyHiddenHintId] = useCharacterCount(
      characterCountValue,
      characterLimit,
      characterCountAriaLive,
    );
    const combinedAriaDescribedByString = [
      ariaDescribedBy,
      visuallyHiddenHintId,
      fieldHelp ? `${uniqueId}-field-help` : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    const labelHelpString =
      typeof labelHelp === "string" ? labelHelp : undefined;

    return (
      <>
        <TextInput
          {...filterNonFunctioningProps(rest)}
          id={uniqueId}
          label={label || ""}
          labelInline={labelInline}
          disabled={disabled}
          readOnly={readOnly}
          size={size}
          prefix={prefix}
          inputHint={inputHint || labelHelpString}
          inputIcon={iconToRender}
          placeholder={placeholder}
          value={
            typeof formattedValue === "string" ? formattedValue : (value ?? "")
          }
          inputWidth={inputWidth}
          error={error}
          warning={warning}
          aria-describedby={combinedAriaDescribedByString}
          aria-labelledby={ariaLabelledBy}
          required={required}
          name={uniqueName}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onClick={onClick}
          onMouseDown={onMouseDown}
          ref={combinedRef}
          maxWidth={maxWidth}
          data-component={dataComponent}
          data-element={dataElement}
          data-role={dataRole}
          validationMessagePositionTop={validationMessagePositionTop}
          leftChildren={leftChildren || positionedChildren}
        >
          {children}
        </TextInput>
        {characterCount}
        {fieldHelp && (
          <span
            data-element="help"
            style={{
              display: "block",
              marginTop: "8px",
              whiteSpace: "pre-wrap",
            }}
            id={`${uniqueId}-field-help`}
          >
            {fieldHelp}
          </span>
        )}
      </>
    );
  },
);

export default Textbox;
