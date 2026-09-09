import React, { useState } from "react";

interface UseFileDropZoneArgs {
  disabled?: boolean;
  onFilesDropped: (files: FileList) => void;
  onDropComplete?: () => void;
}

interface UseFileDropZoneResult {
  isDraggedOver: boolean;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

/**
 * Tracks whether a file is currently being dragged over a drop zone, and
 * wires up the `onDragOver`/`onDragLeave`/`onDrop` handlers needed to
 * maintain that state and hand off dropped files.
 */
export default function useFileDropZone({
  disabled,
  onFilesDropped,
  onDropComplete,
}: UseFileDropZoneArgs): UseFileDropZoneResult {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled && event.dataTransfer.types.includes("Files")) {
      setIsDraggedOver(true);
    }
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Don't let this reach the document-level dragleave listener in
    // useIsFileDraggedOverDocument - it would wrongly report the drag as over.
    event.stopPropagation();
    setIsDraggedOver(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggedOver(false);
    if (!disabled && event.dataTransfer.files.length) {
      onFilesDropped(event.dataTransfer.files);
      onDropComplete?.();
    }
  };

  return { isDraggedOver, onDragOver, onDragLeave, onDrop };
}
