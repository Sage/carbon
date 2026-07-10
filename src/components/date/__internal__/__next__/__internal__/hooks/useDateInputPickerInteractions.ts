import React, { useCallback, useContext, useRef, useState } from "react";

import Events from "../../../../../../__internal__/utils/helpers/events";
import guid from "../../../../../../__internal__/utils/helpers/guid";
import useClickAwayListener from "../../../../../../hooks/__internal__/useClickAwayListener";
import DateRangeContext from "../../../../../date-range/__internal__/date-range.context";
import type {
  DateChangeEvent,
  DateInputLegacyProps,
} from "../../../../date-legacy.component";

interface CustomDateEvent {
  type: string;
  target: {
    id?: string;
    name?: string;
    value: string;
  };
}

interface UseDateInputPickerInteractionsProps {
  buildCustomEvent: (ev: CustomDateEvent) => DateChangeEvent;
  disabled?: boolean;
  disablePortal?: boolean;
  formatDate: (date?: Date) => string;
  getCurrentMatchedValue: () => string;
  getInvalidRawValue: (inputValue: string) => string | null;
  inputId: string;
  inputName?: DateInputLegacyProps["inputName"];
  isSelectedDateValid: () => boolean;
  markInitialValueChanged: () => void;
  onBlur?: DateInputLegacyProps["onBlur"];
  onChange: DateInputLegacyProps["onChange"];
  onClick?: DateInputLegacyProps["onClick"];
  onFocus?: DateInputLegacyProps["onFocus"];
  onKeyDown?: DateInputLegacyProps["onKeyDown"];
  onPickerClose?: DateInputLegacyProps["onPickerClose"];
  onPickerOpen?: DateInputLegacyProps["onPickerOpen"];
  readOnly?: boolean;
  ref: React.ForwardedRef<HTMLInputElement>;
  selectedDays?: Date;
  setSelectedDays: React.Dispatch<React.SetStateAction<Date | undefined>>;
  uniqueName: string;
}

const useDateInputPickerInteractions = ({
  buildCustomEvent,
  disabled,
  disablePortal,
  formatDate,
  getCurrentMatchedValue,
  getInvalidRawValue,
  inputId,
  inputName,
  isSelectedDateValid,
  markInitialValueChanged,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  onPickerClose,
  onPickerOpen,
  readOnly,
  ref,
  selectedDays,
  setSelectedDays,
  uniqueName,
}: UseDateInputPickerInteractionsProps) => {
  const parentRef = useRef<HTMLElement | null>(null);
  const internalInputRef = useRef<HTMLInputElement | null>(null);
  const alreadyFocused = useRef(false);
  const isBlurBlocked = useRef(false);
  const focusedViaPicker = useRef(false);
  const { inputRefMap, setInputRefMap } = useContext(DateRangeContext);
  const [open, setOpen] = useState(false);
  const pickerTabGuardId = useRef(guid());
  const pickerId = useRef(`date-picker-${guid()}`);

  const handleClickAway = () => {
    if (open) {
      alreadyFocused.current = true;
      internalInputRef.current?.focus();
      isBlurBlocked.current = false;
      internalInputRef.current?.blur();
      setOpen(false);
      onPickerClose?.();
      alreadyFocused.current = false;
    }
  };

  const handleClickInside = useClickAwayListener(handleClickAway, "mousedown");

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    markInitialValueChanged();
    onChange(buildCustomEvent(ev));
  };

  const focusInput = () => {
    focusedViaPicker.current = true;
    internalInputRef.current?.focus();
  };

  const handleDayClick = (day: Date, ev: React.MouseEvent<HTMLDivElement>) => {
    const { id: eventId, name: eventName } = ev.target as HTMLInputElement;

    setSelectedDays(day);
    onChange(
      buildCustomEvent({
        type: ev.type,
        target: {
          ...(eventName && { name: eventName }),
          ...(eventId && { id: eventId }),
          value: formatDate(day),
        },
      }),
    );
    focusInput();
    setOpen(false);
  };

  const handleMonthYearChange = (date: Date) => {
    setSelectedDays(date);
    onChange(
      buildCustomEvent({
        type: "change",
        target: {
          id: inputId,
          name: uniqueName,
          value: formatDate(date),
        },
      }),
    );
  };

  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    if (disabled || readOnly) {
      return;
    }

    let event: DateChangeEvent;

    if (isSelectedDateValid()) {
      event = buildCustomEvent(ev);

      const matchedValue = getCurrentMatchedValue();

      if (formatDate(selectedDays) !== matchedValue) {
        onChange(event);
      }
    } else {
      const { id: eventId, name: eventName } = ev.target;

      event = {
        target: {
          ...(eventName && { name: eventName }),
          ...(eventId && { id: eventId }),
          value: {
            formattedValue: ev.target.value,
            rawValue: getInvalidRawValue(ev.target.value),
          },
        },
      };
    }

    if (isBlurBlocked.current) {
      return;
    }

    onBlur?.(event);
  };

  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
    if (disabled || readOnly) {
      return;
    }

    isBlurBlocked.current = false;
    onFocus?.(ev);
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(ev);

    if (open && Events.isTabKey(ev)) {
      if (Events.isShiftKey(ev)) {
        setOpen(false);
        onPickerClose?.();
      } else if (!disablePortal) {
        ev.preventDefault();
        (
          document?.querySelector(
            `[id="${pickerTabGuardId.current}"]`,
          ) as HTMLElement
        )?.focus();
      }
      alreadyFocused.current = false;
    }
  };

  const handleInputMouseClick = (ev: React.MouseEvent<HTMLInputElement>) => {
    onClick?.(ev);
  };

  const handleIconClick = (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    isBlurBlocked.current = true;
    alreadyFocused.current = true;
    onClick?.(ev);

    if (open) {
      setOpen(false);
      onPickerClose?.();
    } else {
      setOpen(true);
      onPickerOpen?.();
    }
  };

  const handleMouseDown = () => {
    if (setInputRefMap) {
      isBlurBlocked.current = true;
    }

    if (open && disablePortal) {
      setOpen(false);
      onPickerClose?.();
    } else if (!open) {
      onPickerOpen?.();
    }
  };

  const handlePickerMouseDown = () => {
    isBlurBlocked.current = true;
  };

  const assignInput = useCallback(
    (inputElement: HTMLInputElement) => {
      internalInputRef.current = inputElement;
      parentRef.current = inputElement?.parentElement;

      if (ref) {
        if (typeof ref === "function") {
          ref(inputElement);
        } else {
          ref.current = inputElement;
        }
      }

      if (
        inputName &&
        inputRefMap?.[inputName as keyof typeof inputRefMap]?.setOpen !==
          setOpen
      ) {
        setInputRefMap?.({
          [inputName]: { isBlurBlocked, setOpen },
        });
      }
    },
    [inputName, inputRefMap, setInputRefMap, ref],
  );

  return {
    applyDateRangeStyling: !!inputRefMap,
    assignInput,
    handleBlur,
    handleChange,
    handleClickInside,
    handleDayClick,
    handleFocus,
    handleIconClick,
    handleInputMouseClick,
    handleKeyDown,
    handleMonthYearChange,
    handleMouseDown,
    handlePickerMouseDown,
    open,
    parentRef,
    pickerId: pickerId.current,
    pickerTabGuardId: pickerTabGuardId.current,
    setOpen,
  };
};

export default useDateInputPickerInteractions;
