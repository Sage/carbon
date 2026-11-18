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
 * Drop-zone handlers for FileInput. `isDraggedOver` is true while files are
 * dragged over the zone. A drop passes the files to `onFilesDropped`, then
 * calls `onDropComplete`. Nothing happens while `disabled` or when no files
 * were dropped.
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
    const { currentTarget, relatedTarget } = event;
    // Moving onto a child, such as the Select file button, also fires
    // `dragleave`; keep the highlight while the drag is still inside the zone.
    if (
      relatedTarget instanceof Node &&
      currentTarget.contains(relatedTarget)
    ) {
      return;
    }
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
