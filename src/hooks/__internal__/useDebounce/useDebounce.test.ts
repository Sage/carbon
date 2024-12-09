import { renderHook, act } from "@testing-library/react";
import useDebounce from "./useDebounce";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});

test("debounces the callback correctly over the specified interval", () => {
  const callback = jest.fn();
  const debounceTime = 2000;
  const { result } = renderHook(() => useDebounce(callback, debounceTime));

  act(() => {
    result.current();
    result.current();
    result.current();
  });

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(callback).not.toHaveBeenCalled();

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(callback).toHaveBeenCalledTimes(1);
});
