import { renderHook } from "@testing-library/react-hooks";
import useStableCallback from "./useStableCallback";

describe("useStableCallback", () => {
  it("should return a stable callback", () => {
    const { result, rerender } = renderHook(() => useStableCallback(() => {}));
    const { current: callback1 } = result;

    rerender();
    const { current: callback2 } = result;

    expect(callback1).toBe(callback2);
  });

  it("should return undefined if no callback is provided", () => {
    const { result } = renderHook(() => useStableCallback());
    const { current } = result;

    expect(current).toBeUndefined();
  });
});
