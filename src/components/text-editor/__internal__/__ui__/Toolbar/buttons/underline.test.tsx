import { render, screen } from "@testing-library/react";
import React, { act } from "react";
import { TestEditor, TestEditorHelpers } from "../../../TestEditor.component";

import { UnderlineButton } from ".";
import { $getRoot, LexicalEditor, ParagraphNode, TextNode } from "lexical";
import userEvent from "@testing-library/user-event";

describe("Underline button", () => {
  it("should render the underline button correctly if inactive", () => {
    render(
      <TestEditor>
        <UnderlineButton isActive={false} namespace="test" />
      </TestEditor>,
    );
    const underlineButton = screen.getByRole("button");
    expect(underlineButton).toBeInTheDocument();
    expect(underlineButton).toHaveStyleRule("background-color", "transparent");
    expect(underlineButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should render the underline button correctly if active", () => {
    render(
      <TestEditor>
        <UnderlineButton isActive namespace="test" />
      </TestEditor>,
    );
    const underlineButton = screen.getByRole("button");
    expect(underlineButton).toBeInTheDocument();
    expect(underlineButton).toHaveStyleRule(
      "background-color",
      "var(--colorsActionMajor600)",
    );
    expect(underlineButton).toHaveAttribute("aria-pressed", "true");
  });

  it("applies underline formatting when UnderlineButton is clicked", async () => {
    let editorRef: LexicalEditor;
    let textEditorHelpers: TestEditorHelpers;

    render(
      <TestEditor
        onEditorReady={(editor, helpers) => {
          editorRef = editor;
          textEditorHelpers = helpers;
        }}
      >
        <UnderlineButton isActive={false} namespace="test" />
      </TestEditor>,
    );

    act(() => {
      textEditorHelpers.setEditorContent(editorRef, "Hello");

      editorRef.update(() => {
        const root = $getRoot();
        const paragraph = root.getFirstChild() as ParagraphNode;
        const textNode = paragraph?.getFirstChild() as TextNode;

        textNode?.select(0, textNode?.getTextContentSize());
      });
    });

    const underlineButton = screen.getByRole("button", { name: /underline/i });

    await userEvent.click(underlineButton);

    act(() => {
      editorRef.getEditorState().read(() => {
        const root = $getRoot();
        const paragraph = root.getFirstChild() as ParagraphNode;
        const textNode = paragraph?.getFirstChild() as TextNode;
        expect(textNode?.hasFormat("underline")).toBe(true);
      });
    });
  });
});
