import { renderHook, act } from "@testing-library/react";
import useIsFileDraggedOverDocument from ".";

const dragEvent = (type: string, types: string[] = ["Files"]) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", {
    value: { types },
  });
  return event as DragEvent;
};

describe("useIsFileDraggedOverDocument", () => {
  it("is false by default", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());
    expect(result.current).toBe(false);
  });

  it("becomes true when a file is dragged anywhere on the document", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());

    act(() => {
      document.dispatchEvent(dragEvent("dragover"));
    });

    expect(result.current).toBe(true);
  });

  it("ignores a dragover that is not carrying files", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());

    act(() => {
      document.dispatchEvent(dragEvent("dragover", ["text/plain"]));
    });

    expect(result.current).toBe(false);
  });

  it("becomes false again after a drop", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());

    act(() => {
      document.dispatchEvent(dragEvent("dragover"));
    });
    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(dragEvent("drop"));
    });
    expect(result.current).toBe(false);
  });

  it("becomes false again after a dragleave", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());

    act(() => {
      document.dispatchEvent(dragEvent("dragover"));
    });
    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(dragEvent("dragleave"));
    });
    expect(result.current).toBe(false);
  });

  it("removes its listeners on unmount", () => {
    const { result, unmount } = renderHook(() =>
      useIsFileDraggedOverDocument(),
    );
    unmount();

    act(() => {
      document.dispatchEvent(dragEvent("dragover"));
    });

    expect(result.current).toBe(false);
  });
});
