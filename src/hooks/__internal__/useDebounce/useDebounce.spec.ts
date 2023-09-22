import { renderHook } from "@testing-library/react-hooks";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  it("should debounce the callback", () => {
    const callback = jest.fn();
    jest.useFakeTimers();
    const { result } = renderHook(() => useDebounce(callback, 2000));

    result.current();
    result.current();
    result.current();

    jest.advanceTimersByTime(2000);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("callback should not be debounced", () => {
    const callback = jest.fn();
    jest.useFakeTimers();
    const { result } = renderHook(() => useDebounce(callback, 1000));

    result.current();
    result.current();
    result.current();

    jest.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
