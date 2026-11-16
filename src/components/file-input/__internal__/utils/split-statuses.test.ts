import splitStatuses, { countStatuses } from "./split-statuses";
import { type FileUploadStatusProps } from "../file-upload-status";

const uploading: FileUploadStatusProps = {
  status: "uploading",
  filename: "uploading.pdf",
  onCancel: () => {},
};
const completed: FileUploadStatusProps = {
  status: "completed",
  filename: "completed.pdf",
  onDelete: () => {},
};
const failed: FileUploadStatusProps = {
  status: "error",
  filename: "failed.pdf",
  onRemove: () => {},
};
const previous: FileUploadStatusProps = {
  status: "previously",
  filename: "previous.pdf",
};
const otherPrevious: FileUploadStatusProps = {
  status: "previously",
  filename: "other-previous.pdf",
};

test("returns empty lists when there are no statuses", () => {
  expect(splitStatuses(undefined)).toEqual({
    currentStatuses: [],
    previouslyUploadedStatuses: [],
  });
});

test("accepts a single current status", () => {
  expect(splitStatuses(completed)).toEqual({
    currentStatuses: [completed],
    previouslyUploadedStatuses: [],
  });
});

test("accepts a single previously uploaded status", () => {
  expect(splitStatuses(previous)).toEqual({
    currentStatuses: [],
    previouslyUploadedStatuses: [previous],
  });
});

test("splits mixed statuses into current and previously uploaded, keeping their order", () => {
  expect(
    splitStatuses([previous, failed, uploading, otherPrevious, completed]),
  ).toEqual({
    currentStatuses: [failed, uploading, completed],
    previouslyUploadedStatuses: [previous, otherPrevious],
  });
});

test("counts statuses by state", () => {
  expect(countStatuses([failed, uploading, completed, failed])).toEqual({
    totalCount: 4,
    uploadingCount: 1,
    completedCount: 1,
    errorCount: 2,
  });
});

test("returns zero counts when there are no statuses", () => {
  expect(countStatuses([])).toEqual({
    totalCount: 0,
    uploadingCount: 0,
    completedCount: 0,
    errorCount: 0,
  });
});
