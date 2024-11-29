import React from "react";
import { render, screen } from "@testing-library/react";

import RichTextEditor from "./rich-text-editor.component";

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
});

test("renders a rich text editor", async () => {
  const mockSaveFn = jest.fn();
  render(
    <RichTextEditor
      label="Rich Text Editor"
      showCommandButtons
      onSave={(v) => mockSaveFn(v)}
    />,
  );

  expect(screen.getByTestId("rte-placeholder")).toHaveTextContent(
    "Enter some text...",
  );
});
