/**
 * Functional toolbar tests. For button state tests, see the buttons/buttons.test.tsx file.
 */
import { createHeadlessEditor } from "@lexical/headless";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen } from "@testing-library/react";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

import userEvent from "@testing-library/user-event";
import { ToolbarPlugin } from "..";

function headlessEditor() {
  const editor = createHeadlessEditor({
    nodes: [],
    onError: () => {},
  });
  return editor;
}

/** Owing to the nature of the Lexical structure, the toolbar is mocked below with default buttons.
 * This allows us to test the toolbar's functionality without needing to test the buttons themselves;
 * all we care about here is that the buttons correctly dispatch their commands when clicked, and with the
 * correct parameters.
 */
const MockToolbar = ({
  editor,
  namespace,
}: {
  editor: any;
  namespace: string;
}) => {
  return (
    <div data-testid={`${namespace}-toolbar`}>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "number")}
      >
        Ordered List
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bullet")}
      >
        Unordered List
      </button>
    </div>
  );
};

describe("Toolbar", () => {
  describe("Rendering", () => {
    /** This test renders the actual toolbar instead of using the mocked one to ensure
     * that the toolbar renders correctly with the default buttons.
     */
    test("renders the toolbar", () => {
      render(
        <LexicalComposer
          initialConfig={{
            nodes: [],
            onError: () => {},
            namespace: "test",
          }}
        >
          <RichTextPlugin
            contentEditable={
              <div role="textbox" contentEditable aria-label="test" />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ToolbarPlugin namespace="test" />
        </LexicalComposer>,
      );
      const toolbar = screen.getByTestId("test-toolbar");
      expect(toolbar).toBeInTheDocument();
    });
  });

  describe("Events", () => {
    /** Using the mocked toolbar, test that clicking the bold button fires the correct event */
    test("dispatches the 'bold' event when the bold button is clicked", async () => {
      const user = userEvent.setup();
      const editor = headlessEditor();
      const dispatchSpy = jest.spyOn(editor, "dispatchCommand");

      render(
        <LexicalComposer
          initialConfig={{
            nodes: [],
            onError: () => {},
            namespace: "test",
          }}
        >
          <RichTextPlugin
            contentEditable={
              <div role="textbox" contentEditable aria-label="test" />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MockToolbar editor={editor} namespace="carbon-rte" />
        </LexicalComposer>,
      );
      const boldButton = screen.getByRole("button", { name: "Bold" });
      await user.click(boldButton);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(FORMAT_TEXT_COMMAND, "bold");
    });

    /** Using the mocked toolbar, test that clicking the italic button fires the correct event */
    test("dispatches the 'italic' event when the italic button is clicked", async () => {
      const user = userEvent.setup();
      const editor = headlessEditor();
      const dispatchSpy = jest.spyOn(editor, "dispatchCommand");

      render(
        <LexicalComposer
          initialConfig={{
            nodes: [],
            onError: () => {},
            namespace: "test",
          }}
        >
          <RichTextPlugin
            contentEditable={
              <div role="textbox" contentEditable aria-label="test" />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MockToolbar editor={editor} namespace="carbon-rte" />
        </LexicalComposer>,
      );
      const italicButton = screen.getByRole("button", { name: "Italic" });
      await user.click(italicButton);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(FORMAT_TEXT_COMMAND, "italic");
    });

    /** Using the mocked toolbar, test that clicking the ordered list button fires the correct event */
    test("dispatches the 'ordered list' event when the ordered list button is clicked", async () => {
      const user = userEvent.setup();
      const editor = headlessEditor();
      const dispatchSpy = jest.spyOn(editor, "dispatchCommand");

      render(
        <LexicalComposer
          initialConfig={{
            nodes: [],
            onError: () => {},
            namespace: "test",
          }}
        >
          <RichTextPlugin
            contentEditable={
              <div role="textbox" contentEditable aria-label="test" />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MockToolbar editor={editor} namespace="carbon-rte" />
        </LexicalComposer>,
      );
      const olButton = screen.getByRole("button", { name: "Ordered List" });
      await user.click(olButton);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(FORMAT_TEXT_COMMAND, "number");
    });

    /** Using the mocked toolbar, test that clicking the unordered list button fires the correct event */
    test("dispatches the 'unordered list' event when the unordered list button is clicked", async () => {
      const user = userEvent.setup();
      const editor = headlessEditor();
      const dispatchSpy = jest.spyOn(editor, "dispatchCommand");

      render(
        <LexicalComposer
          initialConfig={{
            nodes: [],
            onError: () => {},
            namespace: "test",
          }}
        >
          <RichTextPlugin
            contentEditable={
              <div role="textbox" contentEditable aria-label="test" />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MockToolbar editor={editor} namespace="carbon-rte" />
        </LexicalComposer>,
      );
      const ulButton = screen.getByRole("button", { name: "Unordered List" });
      await user.click(ulButton);
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(FORMAT_TEXT_COMMAND, "bullet");
    });
  });
});
