import { renderHook } from "@testing-library/react";
import useThrottle from "./useThrottle";

test("should call the callback only once within the throttle period when invoked multiple times", () => {
  const callback = jest.fn();
  const { result } = renderHook(() => useThrottle(callback, 100));

  result.current();
  result.current();
  result.current();
  expect(callback).toHaveBeenCalledTimes(1);
});
