/**
 * The CharacterCounterPlugin component is a plugin for the RichTextEditor. It can be unit tested in isolation
 * as it has no direct dependencies on the RichTextEditor component itself and the state can easily be mocked using the
 * headless editor.
 */
import { createHeadlessEditor } from "@lexical/headless";
import { render, screen } from "@testing-library/react";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import React from "react";

import CharacterCounterPlugin from "./character-counter.component";

function interactWith(sampleText = "Hello world") {
  const editor = createHeadlessEditor({
    nodes: [],
    onError: () => {},
    namespace: "test",
  });

  editor.update(
    () => {
      $getRoot().append(
        $createParagraphNode().append($createTextNode(sampleText)),
      );
    },
    { discrete: true },
  );

  const editorState = editor.getEditorState();
  return editorState;
}

describe("CharacterCounterPlugin", () => {
  test("should render with the correct default text", () => {
    render(
      <CharacterCounterPlugin
        editorState={undefined}
        maxChars={100}
        namespace="test"
      />,
    );
    const content = screen.getByTestId("test-character-limit");
    expect(content).toBeInTheDocument();
  });

  test("should update the text correctly when the user types into the editor", () => {
    const editorState = interactWith();
    render(
      <CharacterCounterPlugin
        editorState={editorState}
        maxChars={100}
        namespace="test"
      />,
    );
    const content = screen.getByTestId("test-character-limit");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("89 characters remaining");
  });

  test("should handle excessive characters correctly", () => {
    const editorState = interactWith("abcdefghijklmnopqrstuvwxyz0123456789");
    render(
      <CharacterCounterPlugin
        editorState={editorState}
        maxChars={30}
        namespace="test"
      />,
    );
    const content = screen.getByTestId("test-character-limit");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("0 characters remaining");
  });
});
