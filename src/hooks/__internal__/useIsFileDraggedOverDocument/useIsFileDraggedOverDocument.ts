import { useEffect, useState } from "react";

/**
 * Returns whether a file is being dragged anywhere on the page. It listens on
 * `document`, unlike a drop zone's own drag handlers, which only fire while
 * the pointer is over that element. FileInput uses it to highlight its drop
 * zone as soon as a drag starts.
 *
 * While mounted, it also stops the browser opening a file dropped outside a
 * drop zone.
 */
export default function useIsFileDraggedOverDocument(): boolean {
  const [isFileDraggedOverDocument, setIsFileDraggedOverDocument] =
    useState(false);

  useEffect(() => {
    // Elements the drag has entered but not yet left. Used when `dragleave`
    // has no `relatedTarget` (as in Safari), to tell moving between elements
    // apart from leaving the page.
    let enteredCount = 0;

    const handleDragEnter = () => {
      enteredCount += 1;
    };
    const handleDragOver = (event: DragEvent) => {
      if (event.dataTransfer?.types.includes("Files")) {
        event.preventDefault();
        setIsFileDraggedOverDocument(true);
      }
    };
    const handleDrop = (event: DragEvent) => {
      const { target } = event;
      const isNativeFileInput =
        target instanceof HTMLInputElement && target.type === "file";

      // `handleDragOver` shows every part of the page as a valid drop target, so
      // stop the browser opening a file dropped outside a drop zone and navigating
      // away. Skip native file inputs so they still receive the dropped file.
      if (event.dataTransfer?.types.includes("Files") && !isNativeFileInput) {
        event.preventDefault();
      }
      enteredCount = 0;
      setIsFileDraggedOverDocument(false);
    };
    const handleDragEnd = () => {
      enteredCount = 0;
      setIsFileDraggedOverDocument(false);
    };
    const handleDragLeave = (event: DragEvent) => {
      const nextTarget = event.relatedTarget;
      enteredCount = Math.max(0, enteredCount - 1);

      if (nextTarget instanceof Node) {
        if (!document.contains(nextTarget)) {
          setIsFileDraggedOverDocument(false);
        }
        return;
      }

      if (enteredCount === 0) {
        setIsFileDraggedOverDocument(false);
      }
    };

    document.addEventListener("dragenter", handleDragEnter);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("dragend", handleDragEnd);
    return () => {
      document.removeEventListener("dragenter", handleDragEnter);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("dragend", handleDragEnd);
    };
  }, []);

  return isFileDraggedOverDocument;
}
