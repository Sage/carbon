import { type CurrentFileStatusCounts } from "../../../../locales/locale";
import { type FileUploadStatusProps } from "../file-upload-status";

/**
 * Normalizes the `uploadStatus` prop to an array and splits it into current
 * and previously uploaded statuses, each in their original order.
 */
export default function splitStatuses(
  uploadStatus: FileUploadStatusProps | FileUploadStatusProps[] | undefined,
): {
  currentStatuses: FileUploadStatusProps[];
  previouslyUploadedStatuses: FileUploadStatusProps[];
} {
  const statuses = (
    Array.isArray(uploadStatus) ? uploadStatus : [uploadStatus]
  ).filter(Boolean) as FileUploadStatusProps[];

  return {
    currentStatuses: statuses.filter(({ status }) => status !== "previously"),
    previouslyUploadedStatuses: statuses.filter(
      ({ status }) => status === "previously",
    ),
  };
}

/** Counts statuses by state, for the current files error summary. */
export function countStatuses(
  statuses: FileUploadStatusProps[],
): CurrentFileStatusCounts {
  const countOf = (state: FileUploadStatusProps["status"]) =>
    statuses.filter(({ status }) => status === state).length;

  return {
    totalCount: statuses.length,
    uploadingCount: countOf("uploading"),
    completedCount: countOf("completed"),
    errorCount: countOf("error"),
  };
}
