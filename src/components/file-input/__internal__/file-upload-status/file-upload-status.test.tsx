import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileUploadStatus from ".";
import type { FileUploadStatusProps } from ".";

test("requires a status-specific primary callback or deprecated fallback", () => {
  const acceptsStatus: (status: FileUploadStatusProps) => void = () => {};

  acceptsStatus({ status: "uploading", filename: "a.pdf", onCancel: () => {} });
  acceptsStatus({ status: "completed", filename: "a.pdf", onAction: () => {} });
  acceptsStatus({ status: "error", filename: "a.pdf", onRemove: () => {} });

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

test("uploading shows status, a numeric progress ring, and status-specific Cancel when a thumbnail is supported", async () => {
  const onCancel = jest.fn();
  const fallback = jest.fn();
  render(
    <FileUploadStatus
      status="uploading"
      filename="a.pdf"
      progress={30}
      thumbnailSrc="preview.png"
      onCancel={onCancel}
      onAction={fallback}
    />,
  );
  expect(screen.getByText("Uploading…")).toBeVisible();
  expect(screen.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "30",
  );
  await userEvent.click(screen.getByRole("button", { name: "Cancel a.pdf" }));
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(fallback).not.toHaveBeenCalled();
});

test("without a thumbnailSrc, every status collapses to a single column with a compact status icon before the filename", () => {
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

test("completed keeps filename as text and provides Preview and Delete", async () => {
  const onDelete = jest.fn();
  render(
    <FileUploadStatus
      status="completed"
      filename="a.pdf"
      href="/preview"
      onDelete={onDelete}
    />,
  );
  expect(screen.getByText("File uploaded")).toBeVisible();
  expect(screen.queryByRole("link", { name: "a.pdf" })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Preview a.pdf" })).toHaveAttribute(
    "href",
    "/preview",
  );
  await userEvent.click(screen.getByRole("button", { name: "Delete a.pdf" }));
  expect(onDelete).toHaveBeenCalled();
});

test("forwards remaining Link props (target, rel, onClick) to the Preview link", async () => {
  const onLinkClick = jest.fn();
  render(
    <FileUploadStatus
      status="completed"
      filename="a.pdf"
      href="/preview"
      target="_blank"
      rel="noreferrer"
      onClick={onLinkClick}
      onDelete={() => {}}
    />,
  );
  const link = screen.getByRole("link", { name: "Preview a.pdf" });
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
  await userEvent.click(link);
  expect(onLinkClick).toHaveBeenCalledTimes(1);
});

test("shows a live progress ring and no thumbnail while uploading", () => {
  render(
    <FileUploadStatus
      status="uploading"
      filename="a.pdf"
      progress={10}
      thumbnailSrc="preview.png"
      onCancel={() => {}}
    />,
  );
  expect(
    screen.getByRole("progressbar", { name: "Uploading…" }),
  ).toHaveAttribute("aria-valuenow", "10");
  expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
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

test("error is an alert with Remove and optional Retry", async () => {
  const onRemove = jest.fn();
  const onRetry = jest.fn();
  render(
    <FileUploadStatus
      status="error"
      filename="bad.pdf"
      message="Virus found"
      onRemove={onRemove}
      onRetry={onRetry}
    />,
  );
  expect(screen.getByRole("alert", { name: "bad.pdf" })).toHaveTextContent(
    "Virus found",
  );
  await userEvent.click(screen.getByRole("button", { name: "Retry bad.pdf" }));
  await userEvent.click(screen.getByRole("button", { name: "Remove bad.pdf" }));
  expect(onRetry).toHaveBeenCalled();
  expect(onRemove).toHaveBeenCalled();
});

test("uses deprecated onAction as primary-action fallback", async () => {
  const onAction = jest.fn();
  render(
    <FileUploadStatus status="error" filename="bad.pdf" onAction={onAction} />,
  );
  await userEvent.click(screen.getByRole("button", { name: "Remove bad.pdf" }));
  expect(onAction).toHaveBeenCalled();
});

test("uses deprecated onAction as the primary-action fallback for uploading and completed files", async () => {
  const onAction = jest.fn();
  const { rerender } = render(
    <FileUploadStatus
      status="uploading"
      filename="uploading.pdf"
      onAction={onAction}
    />,
  );

  await userEvent.click(
    screen.getByRole("button", { name: "Cancel uploading.pdf" }),
  );

  rerender(
    <FileUploadStatus
      status="completed"
      filename="completed.pdf"
      onAction={onAction}
    />,
  );

  await userEvent.click(
    screen.getByRole("button", { name: "Delete completed.pdf" }),
  );

  expect(onAction).toHaveBeenCalledTimes(2);
});

test("uses default error text and a fallback error icon when an error thumbnail is supplied", () => {
  render(
    <FileUploadStatus
      status="error"
      filename="bad.pdf"
      thumbnailSrc="preview.png"
      onRemove={() => {}}
    />,
  );

  expect(screen.getByRole("alert", { name: "bad.pdf" })).toHaveTextContent(
    "Error details",
  );
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
