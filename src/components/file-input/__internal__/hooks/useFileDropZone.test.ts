import { renderHook, act } from "@testing-library/react";
import useFileDropZone from "./useFileDropZone";

const dragEvent = (
  types: string[] = ["Files"],
  {
    currentTarget = document.createElement("div"),
    relatedTarget = null,
  }: { currentTarget?: HTMLElement; relatedTarget?: EventTarget | null } = {},
) => {
  const preventDefault = jest.fn();
  return {
    preventDefault,
    currentTarget,
    relatedTarget,
    dataTransfer: { types },
  } as unknown as React.DragEvent<HTMLDivElement>;
};

const dropEvent = (files: File[]) => {
  const preventDefault = jest.fn();
  return {
    preventDefault,
    dataTransfer: { files },
  } as unknown as React.DragEvent<HTMLDivElement>;
};

describe("useFileDropZone", () => {
  it("is not dragged over by default", () => {
    const { result } = renderHook(() =>
      useFileDropZone({ onFilesDropped: jest.fn() }),
    );
    expect(result.current.isDraggedOver).toBe(false);
  });

  it("becomes dragged-over when an eligible file is dragged over the zone", () => {
    const { result } = renderHook(() =>
      useFileDropZone({ onFilesDropped: jest.fn() }),
    );
    const event = dragEvent(["Files"]);

    act(() => result.current.onDragOver(event));

    expect(result.current.isDraggedOver).toBe(true);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("ignores a drag over that isn't carrying files", () => {
    const { result } = renderHook(() =>
      useFileDropZone({ onFilesDropped: jest.fn() }),
    );

    act(() => result.current.onDragOver(dragEvent(["text/plain"])));

    expect(result.current.isDraggedOver).toBe(false);
  });

  it("ignores a drag over while disabled", () => {
    const { result } = renderHook(() =>
      useFileDropZone({ disabled: true, onFilesDropped: jest.fn() }),
    );

    act(() => result.current.onDragOver(dragEvent(["Files"])));

    expect(result.current.isDraggedOver).toBe(false);
  });

  it("clears the dragged-over state when the drag leaves the zone", () => {
    const { result } = renderHook(() =>
      useFileDropZone({ onFilesDropped: jest.fn() }),
    );
    act(() => result.current.onDragOver(dragEvent()));
    expect(result.current.isDraggedOver).toBe(true);

    const leaveEvent = dragEvent();
    act(() => result.current.onDragLeave(leaveEvent));

    expect(result.current.isDraggedOver).toBe(false);
    expect(leaveEvent.preventDefault).toHaveBeenCalled();
  });

  it("keeps the dragged-over state when the drag moves onto a child of the zone", () => {
    const { result } = renderHook(() =>
      useFileDropZone({ onFilesDropped: jest.fn() }),
    );
    const zone = document.createElement("div");
    const child = document.createElement("button");
    zone.appendChild(child);
    act(() => result.current.onDragOver(dragEvent()));

    const leaveEvent = dragEvent(["Files"], {
      currentTarget: zone,
      relatedTarget: child,
    });
    act(() => result.current.onDragLeave(leaveEvent));

    expect(result.current.isDraggedOver).toBe(true);
    expect(leaveEvent.preventDefault).toHaveBeenCalled();
  });

  it("clears the dragged-over state on drop even when the drop is rejected", () => {
    const onFilesDropped = jest.fn();
    const { result, rerender } = renderHook(
      ({ disabled }) => useFileDropZone({ disabled, onFilesDropped }),
      { initialProps: { disabled: false } },
    );
    act(() => result.current.onDragOver(dragEvent()));
    expect(result.current.isDraggedOver).toBe(true);

    rerender({ disabled: true });
    act(() => result.current.onDrop(dropEvent([new File(["a"], "a.txt")])));

    expect(result.current.isDraggedOver).toBe(false);
    expect(onFilesDropped).not.toHaveBeenCalled();
  });
});
