import { renderHook } from "@testing-library/react";
import React, { PropsWithChildren } from "react";

import FlatTableContext from "../../../flat-table/__internal__/flat-table.context";
import useDatePickerInFlatTable from "./useDatePickerInFlatTable";

test("updates the FlatTable state when the picker opens and closes", () => {
  const setHasOpenDatePicker = jest.fn();
  const wrapper = ({ children }: PropsWithChildren) => (
    <FlatTableContext.Provider
      value={{ isInFlatTable: true, setHasOpenDatePicker }}
    >
      {children}
    </FlatTableContext.Provider>
  );
  const { rerender } = renderHook(
    ({ open }) => useDatePickerInFlatTable(open),
    { initialProps: { open: true }, wrapper },
  );

  expect(setHasOpenDatePicker).toHaveBeenLastCalledWith(true);

  rerender({ open: false });

  expect(setHasOpenDatePicker).toHaveBeenLastCalledWith(false);
});

test("clears the FlatTable state when the picker unmounts", () => {
  const setHasOpenDatePicker = jest.fn();
  const wrapper = ({ children }: PropsWithChildren) => (
    <FlatTableContext.Provider
      value={{ isInFlatTable: true, setHasOpenDatePicker }}
    >
      {children}
    </FlatTableContext.Provider>
  );
  const { result, unmount } = renderHook(() => useDatePickerInFlatTable(true), {
    wrapper,
  });

  expect(result.current.isInFlatTable).toBe(true);

  unmount();

  expect(setHasOpenDatePicker).toHaveBeenLastCalledWith(false);
});

test("does not update the FlatTable state for a closed picker", () => {
  const setHasOpenDatePicker = jest.fn();
  const wrapper = ({ children }: PropsWithChildren) => (
    <FlatTableContext.Provider
      value={{ isInFlatTable: true, setHasOpenDatePicker }}
    >
      {children}
    </FlatTableContext.Provider>
  );

  const { unmount } = renderHook(() => useDatePickerInFlatTable(false), {
    wrapper,
  });

  unmount();

  expect(setHasOpenDatePicker).not.toHaveBeenCalled();
});
