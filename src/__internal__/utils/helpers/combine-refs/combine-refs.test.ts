import combineRefs from ".";
import { renderHook } from "@testing-library/react";

describe("combineRefs", () => {
  it("runs consumer cleanup instead of sending null and clears other refs", () => {
    const cleanup = jest.fn();
    const callback = jest.fn(() => cleanup);
    const legacy = jest.fn();
    const objectRef = { current: null as HTMLDivElement | null };
    const combined = combineRefs(objectRef, callback, legacy);
    const node = document.createElement("div");

    expect(combined(node)).toBeUndefined();
    expect(objectRef.current).toBe(node);
    expect(cleanup).not.toHaveBeenCalled();
    expect(combined(null)).toBeUndefined();
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls).toEqual([[node]]);
    expect(legacy.mock.calls).toEqual([[node], [null]]);
    expect(objectRef.current).toBeNull();

    combined(null);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(legacy).toHaveBeenCalledTimes(2);
  });

  it("detaches a previous node before attaching a replacement", () => {
    const events: (HTMLDivElement | null)[] = [];
    const combined = combineRefs<HTMLDivElement>((node) => {
      events.push(node);
    });
    const first = document.createElement("div");
    const second = document.createElement("div");

    combined(first);
    combined(second);
    combined(null);

    expect(events).toEqual([first, null, second, null]);
  });

  it("supports repeated attachment after cleanup", () => {
    const cleanups = [jest.fn(), jest.fn()];
    const callback = jest
      .fn()
      .mockReturnValueOnce(cleanups[0])
      .mockReturnValueOnce(cleanups[1]);
    const combined = combineRefs<HTMLDivElement>(callback);
    const node = document.createElement("div");

    combined(node);
    combined(null);
    combined(node);
    expect(cleanups[1]).not.toHaveBeenCalled();
    combined(null);

    expect(cleanups[0]).toHaveBeenCalledTimes(1);
    expect(cleanups[1]).toHaveBeenCalledTimes(1);
  });

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
