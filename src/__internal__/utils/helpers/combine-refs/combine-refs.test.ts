import combineRefs from ".";
import { renderHook } from "@testing-library/react";

describe("combineRefs", () => {
  it("combines multiple refs into one", () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();

    const { result } = renderHook(() => combineRefs(ref1, ref2));
    const combinedRef = result.current;

    const element = document.createElement("div");
    combinedRef(element);

    expect(ref1).toHaveBeenCalledWith(element);
    expect(ref2).toHaveBeenCalledWith(element);
  });

  it("handles null and undefined refs gracefully", () => {
    const ref1 = jest.fn();
    const ref2 = null;
    const ref3 = undefined;

    const { result } = renderHook(() => combineRefs(ref1, ref2, ref3));
    const combinedRef = result.current;

    const element = document.createElement("div");
    combinedRef(element);

    expect(ref1).toHaveBeenCalledWith(element);
    expect(ref2).toBeNull();
    expect(ref3).toBeUndefined();
  });

  it("handles a mix of function and object refs", () => {
    const ref1 = jest.fn();
    const ref2 = { current: null };

    const { result } = renderHook(() => combineRefs(ref1, ref2));
    const combinedRef = result.current;

    const element = document.createElement("div");
    combinedRef(element);

    expect(ref1).toHaveBeenCalledWith(element);
    expect(ref2.current).toBe(element);
  });
});
