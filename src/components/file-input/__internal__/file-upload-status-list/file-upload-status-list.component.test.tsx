import React from "react";
import { render, screen } from "@testing-library/react";
import FileUploadStatusList from ".";

const items = [
  { status: "completed" as const, filename: "a.pdf", onDelete: () => {} },
];

test("keeps the single-file status-list label accessible", () => {
  render(
    <FileUploadStatusList
      multiple={false}
      items={items}
      label="Current file (1)"
      onActionFocusFallback={() => {}}
    />,
  );

  expect(
    screen.getByRole("list", { name: "Current file (1)" }),
  ).toHaveAttribute("tabindex", "-1");
});

test("preserves focus when a file changes status without an explicit id", () => {
  const { rerender } = render(
    <FileUploadStatusList
      items={[{ status: "uploading", filename: "a.pdf", onCancel: () => {} }]}
      label="Current file (1)"
      onActionFocusFallback={() => {}}
    />,
  );
  screen.getByRole("button", { name: "Cancel a.pdf" }).focus();

  rerender(
    <FileUploadStatusList
      items={[{ status: "completed", filename: "a.pdf", onDelete: () => {} }]}
      label="Current file (1)"
      onActionFocusFallback={() => {}}
    />,
  );

  expect(screen.getByRole("button", { name: "Delete a.pdf" })).toHaveFocus();
});

test("expands the scroller when the status list overflows", () => {
  jest.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(200);
  jest.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);

  render(
    <FileUploadStatusList
      items={items}
      label="Current file (1)"
      onActionFocusFallback={() => {}}
    />,
  );

  expect(
    screen.getByTestId("file-upload-status-list-scroller"),
  ).toHaveStyleRule("width", "calc(100% + 12px)");

  jest.restoreAllMocks();
});
