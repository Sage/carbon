import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import userEvent from "@testing-library/user-event";

import TextEditor from "../../../../text-editor.component";
import UnderlineButton from "./underline.component";

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

describe("Underline button", () => {
  it("should render the underline button correctly if inactive", () => {
    render(<TextEditor labelText="Test Editor" namespace="test-rte" />);

    const underlineButton = screen.getByRole("button", { name: "Underline" });
    expect(underlineButton).toBeInTheDocument();
    expect(underlineButton).toHaveStyleRule("background-color", "transparent");
    expect(underlineButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should render the underline button correctly if active", async () => {
    render(
      <TextEditor
        labelText="Test Editor"
        initialValue={JSON.stringify(initialValue)}
      />,
    );

    const editor = screen.getByRole("textbox");
    await userEvent.click(editor);
    await userEvent.type(editor, " underline");

    const underlineButton = screen.getByRole("button", { name: "Underline" });
    await userEvent.click(underlineButton);

    expect(underlineButton).toBeInTheDocument();
    expect(underlineButton).toHaveStyleRule(
      "background-color",
      "var(--colorsActionMajor600)",
    );
    expect(underlineButton).toHaveAttribute("aria-pressed", "true");
  });

  it("applies underline formatting when UnderlineButton is clicked", async () => {
    render(
      <TextEditor
        labelText="Example"
        initialValue={JSON.stringify(initialValue)}
      />,
    );

    const editor = screen.getByRole("textbox");
    await userEvent.tripleClick(editor);

    const underlineButton = screen.getByRole("button", { name: "Underline" });
    await userEvent.click(underlineButton);

    await waitFor(() => {
      expect(screen.getByText("Sample text")).toHaveStyle(
        "text-decoration: underline",
      );
    });
  });

  it("defaults isFirstButton to false when rendered with LexicalComposer", () => {
    const initialConfig = {
      namespace: "test-underline-composer",
      nodes: [],
      onError: () => {},
    };

    render(
      <LexicalComposer initialConfig={initialConfig}>
        <UnderlineButton
          isActive={false}
          namespace="test-underline-composer"
        />
      </LexicalComposer>,
    );

    const underlineButton = screen.getByRole("button", { name: "Underline" });
    expect(underlineButton).toHaveAttribute("tabindex", "-1");
  });
});
