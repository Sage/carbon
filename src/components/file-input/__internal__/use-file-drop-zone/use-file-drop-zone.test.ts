import { renderHook, act } from "@testing-library/react";
import useFileDropZone from ".";

const dragEvent = (types: string[] = ["Files"]) => {
  const preventDefault = jest.fn();
  const stopPropagation = jest.fn();
  return {
    preventDefault,
    stopPropagation,
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

  it("clears the dragged-over state on drag leave and stops it reaching the document listener", () => {
    const { result } = renderHook(() =>
      useFileDropZone({ onFilesDropped: jest.fn() }),
    );
    act(() => result.current.onDragOver(dragEvent()));
    expect(result.current.isDraggedOver).toBe(true);

    const leaveEvent = dragEvent();
    act(() => result.current.onDragLeave(leaveEvent));

    expect(result.current.isDraggedOver).toBe(false);
    expect(leaveEvent.preventDefault).toHaveBeenCalled();
    // Without this, the bubbled dragleave would also hit
    // useIsFileDraggedOverDocument's document-level listener and wrongly
    // report the drag as having left the page entirely.
    expect(leaveEvent.stopPropagation).toHaveBeenCalled();
  });

  it("clears the dragged-over state on drop even when the drop is rejected", () => {
    const { result } = renderHook(() =>
      useFileDropZone({ disabled: true, onFilesDropped: jest.fn() }),
    );
    act(() => result.current.onDragOver(dragEvent()));

    act(() => result.current.onDrop(dropEvent([new File(["a"], "a.txt")])));

    expect(result.current.isDraggedOver).toBe(false);
  });
});
