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
      moveFocusAfterAction={() => {}}
    />,
  );

  expect(
    screen.getByRole("list", { name: "Current file (1)" }),
  ).toHaveAttribute("tabindex", "-1");
});
