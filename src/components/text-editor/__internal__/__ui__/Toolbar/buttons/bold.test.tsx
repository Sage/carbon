import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";

import BoldButton from "./bold.component";

import TextEditor from "../../../../text-editor.component";

// Reusable JSON object for testing the default state
const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Sample text",
            type: "text",
            version: 1,
          },
        ],
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],

    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

describe("Bold button", () => {
  it("should render the bold button correctly if inactive", () => {
    render(<TextEditor labelText="Test Editor" />);
    const boldButton = screen.getByRole("button", { name: "Bold" });
    expect(boldButton).toBeInTheDocument();
    expect(boldButton).toHaveStyleRule("background-color", "transparent");
    expect(boldButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should render the bold button correctly if active", async () => {
    render(
      <TextEditor
        labelText="Test Editor"
        initialValue={JSON.stringify(initialValue)}
      />,
    );

    const editor = screen.getByRole("textbox");
    await userEvent.click(editor);
    await userEvent.type(editor, " bold");

    const boldButton = screen.getByRole("button", { name: "Bold" });
    await userEvent.click(boldButton);

    expect(boldButton).toBeInTheDocument();
    expect(boldButton).toHaveStyleRule(
      "background-color",
      "var(--colorsActionMajor600)",
    );
    expect(boldButton).toHaveAttribute("aria-pressed", "true");
  });

  it("applies bold formatting when BoldButton is clicked", async () => {
    render(
      <TextEditor
        labelText="Example"
        initialValue={JSON.stringify(initialValue)}
      />,
    );

    const editor = screen.getByRole("textbox");
    await userEvent.tripleClick(editor);

    const boldButton = screen.getByRole("button", { name: "Bold" });
    await userEvent.click(boldButton);

    await waitFor(() => {
      expect(screen.getByText("Sample text")).toHaveStyle("font-weight: bold");
    });
  });

  it("defaults isFirstButton to false when rendered with LexicalComposer", () => {
    const initialConfig = {
      namespace: "test-bold-composer",
      nodes: [],
      onError: () => {},
    };

    render(
      <LexicalComposer initialConfig={initialConfig}>
        <BoldButton isActive={false} namespace="test-bold" />
      </LexicalComposer>,
    );

    const boldButton = screen.getByRole("button", { name: "Bold" });
    expect(boldButton).toHaveAttribute("tabindex", "-1");
  });
});
