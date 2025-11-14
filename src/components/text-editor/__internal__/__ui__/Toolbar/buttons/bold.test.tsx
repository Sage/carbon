import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { $getRoot, LexicalEditor, TextNode, ParagraphNode } from "lexical";
import React from "react";

import { TestEditor, TestEditorHelpers } from "../../../TestEditor.component";

import { BoldButton } from ".";

describe("Bold button", () => {
  it("should render the bold button correctly if inactive", () => {
    render(
      <TestEditor>
        <BoldButton isActive={false} namespace="test" />
      </TestEditor>,
    );
    const boldButton = screen.getByRole("button");
    expect(boldButton).toBeInTheDocument();
    expect(boldButton).toHaveStyleRule("background-color", "transparent");
    expect(boldButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should render the bold button correctly if active", () => {
    render(
      <TestEditor>
        <BoldButton isActive namespace="test" />
      </TestEditor>,
    );
    const boldButton = screen.getByRole("button");
    expect(boldButton).toBeInTheDocument();
    expect(boldButton).toHaveStyleRule(
      "background-color",
      "var(--colorsActionMajor600)",
    );
    expect(boldButton).toHaveAttribute("aria-pressed", "true");
  });

  it("applies bold formatting when BoldButton is clicked", async () => {
    let editorRef: LexicalEditor;
    let textEditorHelpers: TestEditorHelpers;

    render(
      <TestEditor
        onEditorReady={(editor, helpers) => {
          editorRef = editor;
          textEditorHelpers = helpers;
        }}
      >
        <BoldButton isActive={false} namespace="test" />
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

    const boldButton = screen.getByRole("button", { name: /bold/i });

    await userEvent.click(boldButton);

    act(() => {
      editorRef.getEditorState().read(() => {
        const root = $getRoot();
        const paragraph = root.getFirstChild() as ParagraphNode;
        const textNode = paragraph?.getFirstChild() as TextNode;
        expect(textNode?.hasFormat("bold")).toBe(true);
      });
    });
  });
});
