import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RichTextEditor from "./rich-text-editor.component";

test("renders a rich text editor", async () => {
  const mockSaveFn = jest.fn();
  const user = userEvent.setup();

  render(
    <RichTextEditor
      label="Rich Text Editor"
      showCommandButtons
      onSave={(v) => mockSaveFn(v)}
    />,
  );

  const element = screen.getByRole("textbox");
  await user.click(element);
  await user.keyboard("edited-text");
  expect(element).toHaveTextContent("edited-text");
});
