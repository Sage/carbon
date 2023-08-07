import React, { useState } from "react";

import Textbox, { TextboxProps } from "../textbox";
import { generateGroups, toSum } from "./grouped-character.utils";
import Logger from "../../__internal__/utils/logger";

type EventValue = {
  formattedValue: string;
  rawValue: string;
};

type CustomTarget = {
  name?: string;
  id?: string;
  value: EventValue;
};

export interface CustomEvent
  extends Omit<React.ChangeEvent<HTMLInputElement>, "target"> {
  target: CustomTarget;
}

const buildCustomTarget = (
  { target }: React.ChangeEvent<HTMLInputElement>,
  value: EventValue
): CustomTarget => {
  const { name, id } = target;
  return {
    ...(name && { name }),
    ...(id && { id }),
    value,
  };
};

export interface GroupedCharacterProps
  extends Omit<TextboxProps, "onChange" | "onBlur"> {
  /** Default input value if component is meant to be used as an uncontrolled component */
  defaultValue?: string;
  /** pattern by which input value should be grouped */
  groups: number[];
  /** Handler for blur event */
  onBlur?: (ev: CustomEvent) => void;
  /** Handler for change event if input is meant to be used as a controlled component */
  onChange?: (ev: CustomEvent) => void;
  /** character to be used as separator - has to be a 1 character string */
  separator: string;
  /** Input value if component is meant to be used as a controlled component */
  value?: string;
}

let deprecateInputRefWarnTriggered = false;
let deprecateUncontrolledWarnTriggered = false;

export const GroupedCharacter = React.forwardRef(
  (
    {
      defaultValue,
      groups,
      onBlur,
      onChange,
      separator: rawSeparator,
      value: externalValue,
      inputRef,
      ...rest
    }: GroupedCharacterProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");

    const isControlled = externalValue !== undefined;

    const separator = rawSeparator.substring(0, 1); // Ensure max length is 1

    const maxRawLength = groups.reduce(toSum);

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `GroupedCharacter` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    if (!deprecateUncontrolledWarnTriggered && !isControlled) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Grouped Character` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );
    }

    const formatValue = (val: string) =>
      generateGroups(groups, val).join(separator);

    const sanitizeValue = (val: string) =>
      val.split(separator).join("").substring(0, maxRawLength);

    const value = isControlled ? externalValue : internalValue;

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = ev;
      const { selectionEnd } = target as HTMLInputElement;

      let newCursorPos = selectionEnd ?? 0;

      const rawValue = sanitizeValue(target.value);
      const formattedValue = formatValue(rawValue);

      const isLastPosition = target.value.length === newCursorPos;
      const isAtOneBeyondSeparator =
        formattedValue[newCursorPos - 1] === separator;

      if (isLastPosition) {
        const targetValSeparatorCount =
          target.value.split(separator).length - 1;
        const formatValSeparatorCount =
          formattedValue.split(separator).length - 1;
        const separatorDiff = formatValSeparatorCount - targetValSeparatorCount;
        newCursorPos += separatorDiff;
      } else if (isAtOneBeyondSeparator) {
        const isDeleting = value.length > rawValue.length;
        newCursorPos += isDeleting ? -1 : 1;
      }

      const modifiedEvent = (ev as unknown) as CustomEvent;
      modifiedEvent.target = buildCustomTarget(ev, {
        rawValue,
        formattedValue,
      });

      onChange?.(modifiedEvent);
      if (!isControlled) {
        setInternalValue(rawValue);
      }
      setTimeout(() => target.setSelectionRange(newCursorPos, newCursorPos));
    };

    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        const { target } = ev;
        const rawValue = sanitizeValue(target.value);
        const formattedValue = formatValue(rawValue);

        const modifiedEvent = (ev as unknown) as CustomEvent;
        modifiedEvent.target = buildCustomTarget(ev, {
          rawValue,
          formattedValue,
        });
        onBlur(modifiedEvent);
      }
    };

    const handleKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      const { selectionStart, selectionEnd } = ev.target as HTMLInputElement;

      /* istanbul ignore next */
      const hasSelection = (selectionEnd ?? 0) - (selectionStart ?? 0) > 0;

      if (maxRawLength === value.length && !hasSelection) {
        ev.preventDefault();
      }
    };

    return (
      <Textbox
        {...rest}
        value={value}
        formattedValue={formatValue(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        inputRef={inputRef}
        ref={ref}
      />
    );
  }
);

GroupedCharacter.displayName = "GroupedCharacter";

export default GroupedCharacter;
