import React from "react";
import { render, screen } from "@testing-library/react";
import FileUploadStatusList from ".";

const items = [
  { status: "completed" as const, filename: "a.pdf", onDelete: () => {} },
];

test("keeps an explicitly hidden status-list label accessible", () => {
  render(
    <FileUploadStatusList
      hideLabel
      items={items}
      label="Current file (1)"
      onActionFocusFallback={() => {}}
    />,
  );

  expect(
    screen.getByRole("list", { name: "Current file (1)" }),
  ).toBeInTheDocument();
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
