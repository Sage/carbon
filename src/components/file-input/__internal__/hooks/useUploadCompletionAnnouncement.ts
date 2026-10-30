import { useEffect, useRef } from "react";
import { type FileUploadStatusProps } from "../file-upload-status";

/**
 * Calls `onFilesCompleted` with the filenames that have newly transitioned
 * to `"completed"` since the last render, so the caller can announce them
 * through one persistent live region.
 *
 * Statuses that are already `"completed"` on the first render are treated as a
 * starting snapshot, so mounting a `FileInput` with existing statuses never
 * fires an announcement.
 */
export default function useUploadCompletionAnnouncement(
  currentStatuses: FileUploadStatusProps[],
  onFilesCompleted: (filenames: string[]) => void,
): void {
  const isInitialSnapshot = useRef(true);
  const previouslyCompletedStatuses = useRef<
    Pick<FileUploadStatusProps, "filename" | "id">[]
  >([]);

  useEffect(() => {
    const completedStatuses = currentStatuses.filter(
      ({ status }) => status === "completed",
    );
    // Match completions by `id` when there is one. Without an id, match by
    // filename and count duplicates, so a second "a.pdf" completing is still
    // new.
    const previouslyCompletedIds = new Set(
      previouslyCompletedStatuses.current.flatMap(({ id }) => (id ? [id] : [])),
    );
    const remainingPreviousCompletionCounts = new Map<string, number>();
    previouslyCompletedStatuses.current.forEach(({ id, filename }) => {
      if (id) return;
      remainingPreviousCompletionCounts.set(
        filename,
        (remainingPreviousCompletionCounts.get(filename) ?? 0) + 1,
      );
    });
    const newlyCompletedFilenames = completedStatuses.flatMap(
      ({ id, filename }) => {
        if (id) return previouslyCompletedIds.has(id) ? [] : [filename];

        const remaining = remainingPreviousCompletionCounts.get(filename) ?? 0;
        if (remaining === 0) return [filename];

        remainingPreviousCompletionCounts.set(filename, remaining - 1);
        return [];
      },
    );

    if (!isInitialSnapshot.current && newlyCompletedFilenames.length) {
      onFilesCompleted(newlyCompletedFilenames);
    }

    previouslyCompletedStatuses.current = completedStatuses;
    isInitialSnapshot.current = false;
  }, [currentStatuses, onFilesCompleted]);
}
