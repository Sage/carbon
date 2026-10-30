import { renderHook, act } from "@testing-library/react";
import useIsFileDraggedOverDocument from ".";

const dragEvent = (
  type: string,
  types: string[] = ["Files"],
  relatedTarget: EventTarget | null = null,
) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", {
    value: { types },
  });
  Object.defineProperty(event, "relatedTarget", {
    value: relatedTarget,
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

  it("prevents the browser opening a file dropped outside a drop zone", () => {
    renderHook(() => useIsFileDraggedOverDocument());
    const event = dragEvent("drop");

    document.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it("keeps the default for a drop that is not carrying files", () => {
    renderHook(() => useIsFileDraggedOverDocument());
    const event = dragEvent("drop", ["text/plain"]);

    document.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });

  it("keeps the default for a file dropped onto a native file input", () => {
    renderHook(() => useIsFileDraggedOverDocument());
    const nativeInput = document.createElement("input");
    nativeInput.type = "file";
    document.body.append(nativeInput);
    const event = dragEvent("drop");

    nativeInput.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    nativeInput.remove();
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

  it("remains true when dragleave bubbles while moving within the document", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());
    const previousTarget = document.createElement("div");
    const nextTarget = document.createElement("div");
    document.body.append(previousTarget, nextTarget);

    act(() => {
      document.dispatchEvent(dragEvent("dragover"));
      previousTarget.dispatchEvent(
        dragEvent("dragleave", ["Files"], nextTarget),
      );
    });

    expect(result.current).toBe(true);

    previousTarget.remove();
    nextTarget.remove();
  });

  it("becomes false when dragleave moves to a node outside the document", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());

    act(() => {
      document.dispatchEvent(dragEvent("dragenter"));
      document.dispatchEvent(dragEvent("dragenter"));
      document.dispatchEvent(dragEvent("dragover"));
      document.dispatchEvent(
        dragEvent("dragleave", ["Files"], document.createElement("div")),
      );
    });

    expect(result.current).toBe(false);
  });

  it("remains true while moving within the document when dragleave has no relatedTarget", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());
    const previousTarget = document.createElement("div");
    const nextTarget = document.createElement("div");
    document.body.append(previousTarget, nextTarget);

    act(() => {
      previousTarget.dispatchEvent(dragEvent("dragenter"));
      document.dispatchEvent(dragEvent("dragover"));
      nextTarget.dispatchEvent(dragEvent("dragenter"));
      previousTarget.dispatchEvent(dragEvent("dragleave"));
    });
    expect(result.current).toBe(true);

    act(() => {
      nextTarget.dispatchEvent(dragEvent("dragleave"));
    });
    expect(result.current).toBe(false);

    previousTarget.remove();
    nextTarget.remove();
  });

  it("becomes false and resets its count when the drag ends", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());

    act(() => {
      document.dispatchEvent(dragEvent("dragenter"));
      document.dispatchEvent(dragEvent("dragover"));
      document.dispatchEvent(dragEvent("dragend"));
    });
    expect(result.current).toBe(false);

    act(() => {
      document.dispatchEvent(dragEvent("dragover"));
      document.dispatchEvent(dragEvent("dragleave"));
    });
    expect(result.current).toBe(false);
  });

  it("resets its count after a drop", () => {
    const { result } = renderHook(() => useIsFileDraggedOverDocument());

    act(() => {
      document.dispatchEvent(dragEvent("dragenter"));
      document.dispatchEvent(dragEvent("drop"));
      document.dispatchEvent(dragEvent("dragover"));
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
