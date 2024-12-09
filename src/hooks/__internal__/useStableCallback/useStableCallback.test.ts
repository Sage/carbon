import { renderHook } from "@testing-library/react";
import useStableCallback from "./useStableCallback";

test("ensures the callback reference does not change across re-renders", () => {
  const { result, rerender } = renderHook(() => useStableCallback(() => {}));
  const { current: callback1 } = result;

  rerender();
  const { current: callback2 } = result;

  expect(callback1).toBe(callback2);
});

test("should return undefined if no callback is provided", () => {
  const { result } = renderHook(() => useStableCallback());
  const { current } = result;

  expect(current).toBeUndefined();
});
