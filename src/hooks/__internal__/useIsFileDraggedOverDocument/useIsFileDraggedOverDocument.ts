import { useEffect, useState } from "react";

/**
 * Tracks whether a file is currently being dragged anywhere on the page,
 * not just over a particular drop zone. Consumers typically use this to
 * widen a drop zone's border as soon as a drag starts, before the pointer
 * has actually entered the zone.
 *
 * This is distinct from a drop zone's own `onDragOver`/`onDragLeave`
 * handlers, which only fire while the pointer is directly over that
 * element - this hook listens on `document` so it also covers drags that
 * start or end elsewhere on the page.
 */
export default function useIsFileDraggedOverDocument(): boolean {
  const [isFileDraggedOverDocument, setIsFileDraggedOverDocument] =
    useState(false);

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      if (event.dataTransfer?.types.includes("Files")) {
        event.preventDefault();
        setIsFileDraggedOverDocument(true);
      }
    };
    const handleDragEnd = () => setIsFileDraggedOverDocument(false);

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDragEnd);
    document.addEventListener("dragleave", handleDragEnd);
    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDragEnd);
      document.removeEventListener("dragleave", handleDragEnd);
    };
  }, []);

  return isFileDraggedOverDocument;
}
