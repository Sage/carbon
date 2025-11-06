import React from "react";

import Textbox, { TextboxProps } from "../textbox";
import { generateGroups, toSum } from "./grouped-character.utils";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";

type EventValue = {
  formattedValue: string;
  rawValue: string;
};

type CustomTarget = {
  name?: string;
  id?: string;
  value: EventValue;
};

/**
 * @deprecated `GroupedCharacter` has been deprecated. See the Carbon documentation for migration details.
 */
export interface CustomEvent
  extends Omit<React.ChangeEvent<HTMLInputElement>, "target"> {
  target: CustomTarget;
}

const buildCustomTarget = (
  { target }: React.ChangeEvent<HTMLInputElement>,
  value: EventValue,
): CustomTarget => {
  const { name, id } = target;
  return {
    ...(name && { name }),
    ...(id && { id }),
    value,
  };
};

/**
 * @deprecated `GroupedCharacter` has been deprecated. See the Carbon documentation for migration details.
 */
export interface GroupedCharacterProps
  extends Omit<TextboxProps, "onChange" | "onBlur" | "data-component"> {
  /** pattern by which input value should be grouped */
  groups: number[];
  /** Handler for blur event */
  onBlur?: (ev: CustomEvent) => void;
  /** Handler for change event */
  onChange: (ev: CustomEvent) => void;
  /** character to be used as separator - has to be a 1 character string */
  separator: string;
  /** Input value */
  value: string;
}

/**
 * @deprecated `GroupedCharacter` has been deprecated. See the Carbon documentation for migration details.
 */
export const GroupedCharacter = React.forwardRef(
  (
    {
      groups,
      onBlur,
      onChange,
      onKeyDown,
      separator: rawSeparator,
      value,
      ...rest
    }: GroupedCharacterProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const separator = rawSeparator.substring(0, 1); // Ensure max length is 1

    const maxRawLength = groups.reduce(toSum);

    const formatValue = (val: string) =>
      generateGroups(groups, val).join(separator);

    const sanitizeValue = (val: string) =>
      val.split(separator).join("").substring(0, maxRawLength);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = ev;
      const { selectionEnd } = target as HTMLInputElement;

      let newCursorPos = selectionEnd ?? /* istanbul ignore next */ 0;

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
        if (!isDeleting) {
          newCursorPos += 1;
        }
      }

      const modifiedEvent = ev as unknown as CustomEvent;
      modifiedEvent.target = buildCustomTarget(ev, {
        rawValue,
        formattedValue,
      });

      onChange?.(modifiedEvent);

      setTimeout(() => target.setSelectionRange(newCursorPos, newCursorPos));
    };

    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        const { target } = ev;
        const rawValue = sanitizeValue(target.value);
        const formattedValue = formatValue(rawValue);

        const modifiedEvent = ev as unknown as CustomEvent;
        modifiedEvent.target = buildCustomTarget(ev, {
          rawValue,
          formattedValue,
        });
        onBlur(modifiedEvent);
      }
    };

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      const { selectionStart, selectionEnd } = ev.target as HTMLInputElement;

      /* istanbul ignore next */
      const hasSelection = (selectionEnd ?? 0) - (selectionStart ?? 0) > 0;

      // check if the key pressed is a character key
      const isCharacterKey = ev.key.length === 1;

      if (isCharacterKey && maxRawLength === value.length && !hasSelection) {
        ev.preventDefault();
      }

      if (ev.key === "Delete") {
        const cursorPos = selectionStart ?? /* istanbul ignore next */ 0;
        const rawValue = sanitizeValue(value);
        const formattedValue = formatValue(rawValue);

        if (formattedValue[cursorPos] === separator) {
          ev.preventDefault();
          const target = ev.target as HTMLInputElement;
          setTimeout(() =>
            target.setSelectionRange(cursorPos + 1, cursorPos + 1),
          );
        }
      }

      if (onKeyDown) {
        onKeyDown(ev);
      }
    };

    return (
      <Textbox
        {...rest}
        value={value}
        formattedValue={formatValue(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...tagComponent("grouped-character", rest)}
      />
    );
  },
);

GroupedCharacter.displayName = "GroupedCharacter";

export default GroupedCharacter;
