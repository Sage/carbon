import { render, screen } from "@testing-library/react";
import React, { act } from "react";
import TestEditor, { TestEditorHelpers } from "../../../TestEditor.component";

import { ItalicButton } from ".";
import { $getRoot, LexicalEditor, ParagraphNode, TextNode } from "lexical";
import userEvent from "@testing-library/user-event";

describe("Italic button", () => {
  it("should render the italic button correctly if inactive", () => {
    render(
      <TestEditor>
        <ItalicButton isActive={false} namespace="test" />
      </TestEditor>,
    );
    const italicButton = screen.getByRole("button");
    expect(italicButton).toBeInTheDocument();
    expect(italicButton).toHaveStyleRule("background-color", "transparent");
    expect(italicButton).toHaveAttribute("aria-pressed", "false");
  });

  it("should render the italic button correctly if active", () => {
    render(
      <TestEditor>
        <ItalicButton isActive namespace="test" />
      </TestEditor>,
    );
    const italicButton = screen.getByRole("button");
    expect(italicButton).toBeInTheDocument();
    expect(italicButton).toHaveStyleRule(
      "background-color",
      "var(--colorsActionMajor600)",
    );
    expect(italicButton).toHaveAttribute("aria-pressed", "true");
  });

  it("applies italic formatting when ItalicButton is clicked", async () => {
    let editorRef: LexicalEditor;
    let textEditorHelpers: TestEditorHelpers;

    render(
      <TestEditor
        onEditorReady={(editor, helpers) => {
          editorRef = editor;
          textEditorHelpers = helpers;
        }}
      >
        <ItalicButton isActive={false} namespace="test" />
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

    const italicButton = screen.getByRole("button", { name: /italic/i });

    await userEvent.click(italicButton);

    act(() => {
      editorRef.getEditorState().read(() => {
        const root = $getRoot();
        const paragraph = root.getFirstChild() as ParagraphNode;
        const textNode = paragraph?.getFirstChild() as TextNode;
        expect(textNode?.hasFormat("italic")).toBe(true);
      });
    });
  });
});
