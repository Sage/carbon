import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";

import userEvent from "@testing-library/user-event";

import TextEditor from '../../../../text-editor.component'
import ItalicButton from "./italic.component";

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

describe("Italic button", () => {
  it("should render the italic button correctly if inactive", () => {
    render(
      <TextEditor labelText="Test Editor" />
    );
    const italicButton = screen.getByRole("button", {name: "Italic"});
    expect(italicButton).toBeInTheDocument();
    expect(italicButton).toHaveStyleRule("background-color", "transparent");
    expect(italicButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should render the italic button correctly if active", async () => {
    render(
      <TextEditor labelText="Test Editor" initialValue={JSON.stringify(initialValue)} />,
    );

    const editor = screen.getByRole("textbox");
    await userEvent.click(editor);
    await userEvent.type(editor, " italic");

    const italicButton = screen.getByRole("button", {name: "Italic"});
    await userEvent.click(italicButton);

    expect(italicButton).toBeInTheDocument();
    expect(italicButton).toHaveStyleRule(
      "background-color",
      "var(--colorsActionMajor600)",
    );
    expect(italicButton).toHaveAttribute("aria-pressed", "true");
  });

  it("applies italic formatting when ItalicButton is clicked", async () => {
    render(
      <TextEditor
        labelText="Example"
        initialValue={JSON.stringify(initialValue)}
      />
    );

    const editor = screen.getByRole("textbox");
    await userEvent.tripleClick(editor);

    const italicButton = screen.getByRole("button", { name: "Italic" });
    await userEvent.click(italicButton);

    await waitFor(() => {
      expect(screen.getByText("Sample text")).toHaveStyle("font-style: italic");
    });
  });

  it("defaults isFirstButton to false when rendered with LexicalComposer", () => {
    const initialConfig = {
      namespace: "test-italic-composer",
      nodes: [],
      onError: () => {},
    };

    render(
      <LexicalComposer initialConfig={initialConfig}>
        <ItalicButton isActive={false} namespace="test-italic-composer" />
      </LexicalComposer>,
    );

    const italicButton = screen.getByRole("button", { name: "Italic" });
    expect(italicButton).toHaveAttribute("tabindex", "-1");
  });
});
