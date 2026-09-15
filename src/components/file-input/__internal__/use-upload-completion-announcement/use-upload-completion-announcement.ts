import { useEffect, useRef } from "react";
import { type FileUploadStatusProps } from "../file-upload-status";

/**
 * Calls `onFilesCompleted` with the filenames that have newly transitioned
 * to `"completed"` since the last render, so the caller can announce them
 * (e.g. to a live region) without renaming this on every render.
 *
 * Statuses that are already `"completed"` on the very first render are
 * treated as a starting snapshot, not a new completion, so mounting a
 * `FileInput` with already-uploaded files never fires an announcement.
 */
export default function useUploadCompletionAnnouncement(
  activeStatuses: FileUploadStatusProps[],
  onFilesCompleted: (filenames: string[]) => void,
): void {
  const isInitialSnapshot = useRef(true);
  const previouslyCompletedStatuses = useRef<
    Pick<FileUploadStatusProps, "filename" | "id">[]
  >([]);

  useEffect(() => {
    const completedStatuses = activeStatuses.filter(
      ({ status }) => status === "completed",
    );
    // `id` distinguishes otherwise-identical files across controlled updates.
    // For statuses without an id, retain the filename multiset fallback.
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
  }, [activeStatuses, onFilesCompleted]);
}
