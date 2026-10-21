import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileUploadStatus from ".";
import type { FileUploadStatusProps } from ".";

test("requires a status-specific primary callback or deprecated fallback", () => {
  const acceptsStatus: (status: FileUploadStatusProps) => void = () => {};

  acceptsStatus({ status: "uploading", filename: "a.pdf", onCancel: () => {} });
  acceptsStatus({ status: "completed", filename: "a.pdf", onAction: () => {} });
  acceptsStatus({ status: "error", filename: "a.pdf", onRemove: () => {} });
  acceptsStatus({
    status: "previously",
    filename: "a.pdf",
    onAction: () => {},
  });

  // PrimaryAction<Action> requires either the status-specific callback or
  // the deprecated onAction fallback, never neither - each line below is a
  // compile-time check of that constraint, not a runtime assertion.
  // @ts-expect-error uploading statuses require onCancel or onAction
  acceptsStatus({ status: "uploading", filename: "a.pdf" });
  // @ts-expect-error completed statuses require onDelete or onAction
  acceptsStatus({ status: "completed", filename: "a.pdf" });
  // @ts-expect-error error statuses require onRemove or onAction
  acceptsStatus({ status: "error", filename: "a.pdf" });
});

test("does not render an inert primary action when a runtime caller omits its callback", () => {
  const statusWithoutCallback = {
    status: "completed",
    filename: "a.pdf",
  } as unknown as FileUploadStatusProps;

  render(<FileUploadStatus {...statusWithoutCallback} />);

  expect(
    screen.queryByRole("button", { name: "Delete a.pdf" }),
  ).not.toBeInTheDocument();
});

test("uploading shows status, a numeric progress ring, and status-specific Cancel when a thumbnail is supported", async () => {
  const onCancel = jest.fn();
  const fallback = jest.fn();
  const moveFocusAfterAction = jest.fn();
  render(
    <FileUploadStatus
      status="uploading"
      filename="a.pdf"
      progress={30}
      thumbnailSrc="preview.png"
      onCancel={onCancel}
      onAction={fallback}
      moveFocusAfterAction={moveFocusAfterAction}
    />,
  );
  expect(screen.getByText("Uploading…")).toBeVisible();
  expect(screen.getByRole("progressbar", { name: "a.pdf" })).toHaveAttribute(
    "aria-valuenow",
    "30",
  );
  expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  const cancelButton = screen.getByRole("button", { name: "Cancel a.pdf" });
  await userEvent.click(cancelButton);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(fallback).not.toHaveBeenCalled();
  expect(moveFocusAfterAction).toHaveBeenCalledWith(
    cancelButton,
    "Upload cancelled: a.pdf.",
  );
});

test("without a thumbnailSrc, every status renders a compact status indicator", () => {
  const { rerender } = render(
    <FileUploadStatus
      status="uploading"
      filename="a.pdf"
      progress={30}
      onCancel={() => {}}
    />,
  );
  expect(screen.getByText("Uploading…")).toBeVisible();
  expect(screen.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "30",
  );

  rerender(
    <FileUploadStatus
      status="completed"
      filename="a.pdf"
      onDelete={() => {}}
    />,
  );
  expect(screen.getByTestId("icon")).toHaveAttribute(
    "data-element",
    "file_generic",
  );
  expect(screen.getByTestId("icon")).toHaveAttribute("data-color", "neutral");

  rerender(
    <FileUploadStatus
      status="error"
      filename="a.pdf"
      message="oops"
      onRemove={() => {}}
    />,
  );
  expect(screen.getByTestId("icon")).toHaveAttribute("data-element", "error");
  expect(screen.getByTestId("icon")).toHaveAttribute("data-color", "negative");

  rerender(
    <FileUploadStatus
      status="previously"
      filename="a.pdf"
      message="Uploaded by Jo yesterday"
    />,
  );
  expect(screen.getByTestId("icon")).toHaveAttribute(
    "data-element",
    "file_generic",
  );
});

test("hides an indeterminate spinner from assistive technology when the status message is visible", () => {
  render(
    <FileUploadStatus
      status="uploading"
      filename="a.pdf"
      onCancel={() => {}}
    />,
  );

  expect(screen.getByText("Uploading…")).toBeVisible();
  expect(
    screen.queryByRole("status", { name: /a\.pdf/ }),
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});

test.each(["", " "])(
  "names an indeterminate spinner with the filename and localized upload state when the status message is %j",
  (message) => {
    render(
      <FileUploadStatus
        status="uploading"
        filename="a.pdf"
        message={message}
        onCancel={() => {}}
      />,
    );

    expect(
      screen.getByRole("img", { name: "a.pdf: Uploading…" }),
    ).toBeInTheDocument();
  },
);

test("completed keeps filename as text and provides Preview and Delete", async () => {
  const onDelete = jest.fn();
  const moveFocusAfterAction = jest.fn();
  render(
    <FileUploadStatus
      status="completed"
      filename="a.pdf"
      href="/preview"
      onDelete={onDelete}
      moveFocusAfterAction={moveFocusAfterAction}
    />,
  );
  expect(screen.getByText("File uploaded")).toBeVisible();
  expect(screen.queryByRole("link", { name: "a.pdf" })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Preview a.pdf" })).toHaveAttribute(
    "href",
    "/preview",
  );
  const deleteButton = screen.getByRole("button", { name: "Delete a.pdf" });
  await userEvent.click(deleteButton);
  expect(onDelete).toHaveBeenCalled();
  expect(moveFocusAfterAction).toHaveBeenCalledWith(
    deleteButton,
    "File deleted: a.pdf.",
  );
});

test("forwards remaining Link props (target, rel, onClick) to the Preview link", async () => {
  const onLinkClick = jest.fn();
  const onPreviewActivate = jest.fn();
  render(
    <FileUploadStatus
      status="completed"
      filename="a.pdf"
      href="/preview"
      target="_blank"
      rel="noreferrer"
      onClick={onLinkClick}
      onDelete={() => {}}
      onPreviewActivate={onPreviewActivate}
    />,
  );
  const link = screen.getByRole("link", { name: "Preview a.pdf" });
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
  await userEvent.click(link);
  expect(onPreviewActivate).toHaveBeenCalledTimes(1);
  expect(onLinkClick).toHaveBeenCalledTimes(1);
});

test("does not forward the status key `id` to the Preview link", () => {
  render(
    <FileUploadStatus
      id="upload-1"
      status="completed"
      filename="a.pdf"
      href="/preview"
      onDelete={() => {}}
    />,
  );
  expect(
    screen.getByRole("link", { name: "Preview a.pdf" }),
  ).not.toHaveAttribute("id");
});

test("previously renders caller metadata without reformatting", () => {
  render(
    <FileUploadStatus
      status="previously"
      filename="old.pdf"
      message="Uploaded by Jo yesterday"
    />,
  );
  expect(screen.getByText("Uploaded by Jo yesterday")).toBeVisible();
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

test("previously has no default status message", () => {
  render(<FileUploadStatus status="previously" filename="old.pdf" />);

  expect(screen.getByText("old.pdf")).toBeVisible();
  expect(screen.queryByText("File uploaded")).not.toBeInTheDocument();
});

test("offers Delete for a single previously uploaded file with onDelete, but not in multiple mode", async () => {
  const onDelete = jest.fn();
  const { rerender } = render(
    <FileUploadStatus
      status="previously"
      filename="old.pdf"
      onDelete={onDelete}
    />,
  );

  await userEvent.click(screen.getByRole("button", { name: "Delete old.pdf" }));
  expect(onDelete).toHaveBeenCalledTimes(1);

  rerender(
    <FileUploadStatus
      status="previously"
      filename="old.pdf"
      onDelete={onDelete}
      multiple
    />,
  );
  expect(
    screen.queryByRole("button", { name: "Delete old.pdf" }),
  ).not.toBeInTheDocument();
});

test("keeps the deprecated Delete action for a removable single previously uploaded file", async () => {
  const onAction = jest.fn();
  const { rerender } = render(
    <FileUploadStatus
      status="previously"
      filename="old.pdf"
      onAction={onAction}
    />,
  );

  await userEvent.click(screen.getByRole("button", { name: "Delete old.pdf" }));
  expect(onAction).toHaveBeenCalledTimes(1);

  rerender(
    <FileUploadStatus
      status="previously"
      filename="old.pdf"
      onAction={onAction}
      multiple
    />,
  );
  expect(
    screen.queryByRole("button", { name: "Delete old.pdf" }),
  ).not.toBeInTheDocument();
});

test("an empty message suppresses the default status message", () => {
  render(
    <FileUploadStatus
      status="completed"
      filename="a.pdf"
      message=""
      onDelete={() => {}}
    />,
  );

  expect(screen.queryByText("File uploaded")).not.toBeInTheDocument();
});

test("exposes error details through a status while keeping actions outside it", async () => {
  const onRemove = jest.fn();
  const onRetry = jest.fn();
  const moveFocusAfterAction = jest.fn();
  render(
    <FileUploadStatus
      status="error"
      filename="bad.pdf"
      message="Virus found"
      onRemove={onRemove}
      onRetry={onRetry}
      moveFocusAfterAction={moveFocusAfterAction}
    />,
  );
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.queryByRole("group")).not.toBeInTheDocument();
  const status = screen.getByRole("status");
  expect(status).toHaveTextContent("bad.pdf: Virus found");
  expect(status).not.toContainElement(
    screen.getByRole("button", { name: "Retry bad.pdf" }),
  );
  expect(status).not.toContainElement(
    screen.getByRole("button", { name: "Remove bad.pdf" }),
  );
  expect(
    screen.getByRole("button", { name: "Remove bad.pdf" }),
  ).not.toHaveAttribute("aria-describedby");
  expect(
    screen.getByRole("button", { name: "Retry bad.pdf" }),
  ).not.toHaveAttribute("aria-describedby");
  expect(screen.getByText("Virus found")).toBeVisible();
  await userEvent.click(screen.getByRole("button", { name: "Retry bad.pdf" }));
  await userEvent.click(screen.getByRole("button", { name: "Remove bad.pdf" }));
  expect(onRetry).toHaveBeenCalled();
  expect(onRemove).toHaveBeenCalled();
  expect(moveFocusAfterAction).toHaveBeenLastCalledWith(
    screen.getByRole("button", { name: "Remove bad.pdf" }),
    "File removed: bad.pdf.",
  );
});

test.each([
  ["uploading", "Cancel"],
  ["completed", "Delete"],
  ["error", "Remove"],
] as const)(
  "uses deprecated onAction as the primary-action fallback for %s files",
  async (status, actionName) => {
    const onAction = jest.fn();
    render(
      <FileUploadStatus status={status} filename="a.pdf" onAction={onAction} />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: `${actionName} a.pdf` }),
    );

    expect(onAction).toHaveBeenCalledTimes(1);
  },
);

test("uses default error text and a fallback error icon when an error thumbnail is supplied", () => {
  render(
    <FileUploadStatus
      status="error"
      filename="bad.pdf"
      thumbnailSrc="preview.png"
      onRemove={() => {}}
    />,
  );

  expect(screen.getByText("Error details")).toBeVisible();
  expect(screen.getByTestId("icon")).toHaveAttribute("data-element", "error");
});

test("uses a decorative thumbnail and falls back after load failure", () => {
  const { rerender } = render(
    <FileUploadStatus
      status="completed"
      filename="image.png"
      thumbnailSrc="broken.png"
      onDelete={() => {}}
    />,
  );
  const image = screen.getByRole("presentation");
  expect(image).toHaveAttribute("alt", "");
  fireEvent.error(image);
  expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");

  rerender(
    <FileUploadStatus
      status="completed"
      filename="image.png"
      thumbnailSrc="working.png"
      onDelete={() => {}}
    />,
  );
  expect(screen.getByRole("presentation")).toHaveAttribute(
    "src",
    "working.png",
  );
});

test("fills a status added in error after its live region mounts, so the error is announced", async () => {
  render(
    <FileUploadStatus
      status="error"
      filename="a.pdf"
      onRemove={() => {}}
      announceInitialError
    />,
  );
  const errorStatus = screen.getByTestId("file-upload-error-status");

  expect(errorStatus).toBeEmptyDOMElement();
  await waitFor(() =>
    expect(errorStatus).toHaveTextContent("a.pdf: Error details"),
  );
});

test("cancels a pending error announcement when a status unmounts first", () => {
  const cancelAnimationFrameSpy = jest.spyOn(window, "cancelAnimationFrame");
  const { unmount } = render(
    <FileUploadStatus
      status="error"
      filename="a.pdf"
      onRemove={() => {}}
      announceInitialError
    />,
  );

  unmount();

  expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  cancelAnimationFrameSpy.mockRestore();
});
