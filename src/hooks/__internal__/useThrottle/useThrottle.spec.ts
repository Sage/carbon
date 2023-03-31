import { renderHook } from "@testing-library/react-hooks";
import useThrottle from "./useThrottle";

describe("useThrottle", () => {
  it("should throttle the callback", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));

    result.current();
    result.current();
    result.current();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
