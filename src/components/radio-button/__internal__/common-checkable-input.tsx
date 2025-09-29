/**
 * Currently only passes relevant props to FormField and HiddenCheckableInput.
 * Progressive disclosure & shared styles with Checkbox could be added here too.
 */

import React, { useRef } from "react";
import HiddenCheckableInput, {
  CommonHiddenCheckableInputProps,
} from "../../../__internal__/checkable-input/hidden-checkable-input.component";
import guid from "../../../__internal__/utils/helpers/guid";
import { InputBehaviour } from "../../../__internal__/input-behaviour";
import FormField from "../../../__internal__/form-field";

export interface CommonCheckableInputProps
  extends CommonHiddenCheckableInputProps {
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id?: string;
  /** Label content */
  label?: React.ReactNode;
  /** Additional hint text rendered below the label */
  inputHint?: string;
  /** If true, the component will be disabled */
  disabled?: boolean;
}

export interface CheckableInputProps extends CommonCheckableInputProps {
  /** Used to set the visible aspect of the input (i.e. the checkbox sprite, input slider etc) */
  children?: React.ReactNode;
  /** HTML type attribute of the input */
  type: string;
  /** Value passed to the input */
  value?: string;
  /** Checked state of the input */
  checked?: boolean;
  /** If true, the label switches position with the input */
  reverse?: boolean;
}

const CheckableInput = React.forwardRef(
  (
    {
      children,
      disabled,
      id: inputId,
      name,
      type,
      value,
      label,
      inputHint,
      checked,
      reverse,
      onBlur,
      onChange,
      onFocus,
      ...props
    }: CheckableInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { current: id } = useRef(inputId || guid());

    return (
      <InputBehaviour>
        <FormField
          id={id}
          label={label}
          inputHint={inputHint}
          disabled={disabled}
          reverse={reverse}
          labelInline={true}
          labelAlign="left"
          my={0}
        >
          <HiddenCheckableInput
            id={id}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            checked={checked}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            ref={ref}
            {...props}
          />
          {children}
        </FormField>
      </InputBehaviour>
    );
  },
);

CheckableInput.displayName = "CommonCheckableInput";

export default CheckableInput;
