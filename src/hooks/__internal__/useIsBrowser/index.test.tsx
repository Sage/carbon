import { renderHook } from "@testing-library/react";
import useIsBrowser from ".";

test("returns isBrowser set to true in a browser environment", () => {
  const { result } = renderHook(() => useIsBrowser());
  expect(result.current.isBrowser).toBeTruthy();
});
