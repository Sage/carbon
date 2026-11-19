import { renderHook } from "@testing-library/react";
import useUploadCompletionAnnouncement from "./useUploadCompletionAnnouncement";
import { type FileUploadStatusProps } from "../file-upload-status";

const uploading = (filename: string, id?: string): FileUploadStatusProps => ({
  status: "uploading",
  filename,
  id,
  onCancel: () => {},
});
const completed = (filename: string, id?: string): FileUploadStatusProps => ({
  status: "completed",
  filename,
  id,
  onDelete: () => {},
});

const renderCompletionHook = (
  initialStatuses: FileUploadStatusProps[],
  onFilesCompleted = jest.fn(),
) => {
  const utils = renderHook(
    ({ statuses, callback }) =>
      useUploadCompletionAnnouncement(statuses, callback),
    { initialProps: { statuses: initialStatuses, callback: onFilesCompleted } },
  );
  const update = (
    statuses: FileUploadStatusProps[],
    callback = onFilesCompleted,
  ) => utils.rerender({ statuses, callback });

  return { ...utils, update, onFilesCompleted };
};

test("does not announce statuses that are already completed on first render", () => {
  const { onFilesCompleted } = renderCompletionHook([completed("a.pdf")]);

  expect(onFilesCompleted).not.toHaveBeenCalled();
});

test("announces a file that changes to completed", () => {
  const { update, onFilesCompleted } = renderCompletionHook([
    uploading("a.pdf"),
  ]);

  update([completed("a.pdf")]);

  expect(onFilesCompleted).toHaveBeenCalledTimes(1);
  expect(onFilesCompleted).toHaveBeenCalledWith(["a.pdf"]);
});

test("announces every file that completes in the same update together", () => {
  const { update, onFilesCompleted } = renderCompletionHook([
    uploading("a.pdf"),
    uploading("b.pdf"),
    uploading("c.pdf"),
  ]);

  update([completed("a.pdf"), uploading("b.pdf"), completed("c.pdf")]);

  expect(onFilesCompleted).toHaveBeenCalledTimes(1);
  expect(onFilesCompleted).toHaveBeenCalledWith(["a.pdf", "c.pdf"]);
});

test("does not repeat an announcement when the same completed statuses rerender", () => {
  const { update, onFilesCompleted } = renderCompletionHook([
    uploading("a.pdf"),
  ]);

  update([completed("a.pdf")]);
  update([completed("a.pdf")]);

  expect(onFilesCompleted).toHaveBeenCalledTimes(1);
});

test("does not announce when only the callback changes", () => {
  const { update, onFilesCompleted } = renderCompletionHook([
    completed("a.pdf"),
  ]);
  const nextCallback = jest.fn();

  update([completed("a.pdf")], nextCallback);

  expect(onFilesCompleted).not.toHaveBeenCalled();
  expect(nextCallback).not.toHaveBeenCalled();
});

test("uses ids to tell apart completed files with the same name", () => {
  const { update, onFilesCompleted } = renderCompletionHook([
    completed("a.pdf", "first"),
    uploading("a.pdf", "second"),
  ]);

  update([completed("a.pdf", "first"), completed("a.pdf", "second")]);

  expect(onFilesCompleted).toHaveBeenCalledWith(["a.pdf"]);

  update([completed("a.pdf", "second"), completed("a.pdf", "first")]);

  expect(onFilesCompleted).toHaveBeenCalledTimes(1);
});

test("counts same-named files without ids to find the newly completed one", () => {
  const { update, onFilesCompleted } = renderCompletionHook([
    completed("a.pdf"),
    uploading("a.pdf"),
  ]);

  update([completed("a.pdf"), completed("a.pdf")]);

  expect(onFilesCompleted).toHaveBeenCalledTimes(1);
  expect(onFilesCompleted).toHaveBeenCalledWith(["a.pdf"]);
});

test("announces a file again when it completes after being removed", () => {
  const { update, onFilesCompleted } = renderCompletionHook([
    uploading("a.pdf"),
  ]);

  update([completed("a.pdf")]);
  update([]);
  update([completed("a.pdf")]);

  expect(onFilesCompleted).toHaveBeenCalledTimes(2);
});
