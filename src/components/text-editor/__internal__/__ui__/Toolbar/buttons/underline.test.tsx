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
  /*
   * `getBoundingClientRect` is not implemented on `Range` objects in jsdom.
   * Lexical calls this during DOM selection updates after user interactions.
   * Save the original value to restore it properly after each test.
   */
  const originalGetBoundingClientRect = Range.prototype.getBoundingClientRect;

  beforeEach(() => {
    Range.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }));
  });

  afterEach(() => {
    Range.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it("should render the underline button correctly if inactive", () => {
    render(<TextEditor labelText="Test Editor" />);

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
    await userEvent.tripleClick(editor);

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
        <UnderlineButton isActive={false} namespace="test-underline-composer" />
      </LexicalComposer>,
    );

    const underlineButton = screen.getByRole("button", { name: "Underline" });
    expect(underlineButton).toHaveAttribute("tabindex", "-1");
  });
});
