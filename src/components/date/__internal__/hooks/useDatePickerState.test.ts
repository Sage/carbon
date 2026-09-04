import { act, renderHook } from "@testing-library/react";

import useDatePickerState from "./useDatePickerState";

test("opens the picker and calls onPickerOpen", () => {
  const onPickerOpen = jest.fn();
  const { result } = renderHook(() => useDatePickerState({ onPickerOpen }));

  act(() => result.current.openPicker());

  expect(result.current.open).toBe(true);
  expect(onPickerOpen).toHaveBeenCalledTimes(1);

  act(() => result.current.openPicker());
  expect(onPickerOpen).toHaveBeenCalledTimes(1);
});

test("closes the picker and calls onPickerClose", () => {
  const onPickerClose = jest.fn();
  const { result } = renderHook(() => useDatePickerState({ onPickerClose }));

  act(() => result.current.setOpen(true));
  act(() => result.current.closePicker());

  expect(result.current.open).toBe(false);
  expect(onPickerClose).toHaveBeenCalledTimes(1);

  act(() => result.current.closePicker());
  expect(onPickerClose).toHaveBeenCalledTimes(1);
});

test("toggles the picker and calls the matching callback", () => {
  const onPickerOpen = jest.fn();
  const onPickerClose = jest.fn();
  const { result } = renderHook(() =>
    useDatePickerState({ onPickerOpen, onPickerClose }),
  );

  act(() => result.current.togglePicker());
  expect(result.current.open).toBe(true);
  expect(onPickerOpen).toHaveBeenCalledTimes(1);

  act(() => result.current.togglePicker());
  expect(result.current.open).toBe(false);
  expect(onPickerClose).toHaveBeenCalledTimes(1);
});

test("supports state updates without firing lifecycle callbacks", () => {
  const onPickerOpen = jest.fn();
  const onPickerClose = jest.fn();
  const { result } = renderHook(() =>
    useDatePickerState({ onPickerOpen, onPickerClose }),
  );

  act(() => result.current.setOpen((isOpen) => !isOpen));

  expect(result.current.open).toBe(true);
  expect(onPickerOpen).not.toHaveBeenCalled();
  expect(onPickerClose).not.toHaveBeenCalled();
});
