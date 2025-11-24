import { act, render, screen, waitFor } from "@testing-library/react";
import { LexicalEditor } from "lexical";
import React from "react";

import CharacterCounterPlugin from "./character-counter.component";
import TestEditor, { TestEditorHelpers } from "../../TestEditor.component";

describe("CharacterCounterPlugin", () => {
  it("correctly updates character count when editor state changes", async () => {
    let editorRef: LexicalEditor;
    let textEditorHelpers: TestEditorHelpers;

    render(
      <TestEditor
        onEditorReady={(editor, helpers) => {
          editorRef = editor;
          textEditorHelpers = helpers;
        }}
      >
        <CharacterCounterPlugin maxChars={100} namespace="test" />
      </TestEditor>,
    );

    const visibleCounter = screen.getByTestId("test-character-limit");
    expect(visibleCounter).toHaveTextContent("100");

    act(() => {
      textEditorHelpers.setEditorContent(editorRef, "Hello World!");
    });

    await waitFor(() => {
      expect(visibleCounter).toHaveTextContent("88");
    });
  });

  it("caps the character count at 0 when text is added and maxChars is exceeded", async () => {
    let editorRef: LexicalEditor;
    let textEditorHelpers: TestEditorHelpers;

    render(
      <TestEditor
        onEditorReady={(editor, helpers) => {
          editorRef = editor;
          textEditorHelpers = helpers;
        }}
      >
        <CharacterCounterPlugin maxChars={10} namespace="test" />
      </TestEditor>,
    );

    const visibleCounter = screen.getByTestId("test-character-limit");
    expect(visibleCounter).toHaveTextContent("10");

    act(() => {
      textEditorHelpers.setEditorContent(editorRef, "Hello World!");
    });

    await waitFor(() => {
      expect(visibleCounter).toHaveTextContent("0");
    });
  });
});
