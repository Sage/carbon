/**
 * Functional toolbar tests. For button state tests, see the buttons/buttons.test.tsx file.
 */
import React from "react";
import { createHeadlessEditor } from "@lexical/headless";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FORMAT_TEXT_COMMAND, LexicalEditor, TextFormatType } from "lexical";
import { render } from "../../../../../__spec_helper__/__internal__/test-utils";

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
  editor: LexicalEditor;
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
        onClick={() =>
          editor.dispatchCommand(
            FORMAT_TEXT_COMMAND,
            "number" as TextFormatType,
          )
        }
      >
        Ordered List
      </button>
      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(
            FORMAT_TEXT_COMMAND,
            "bullet" as TextFormatType,
          )
        }
      >
        Unordered List
      </button>
    </div>
  );
};

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

test("allows the buttons to be navigated with the arrow keys", async () => {
  const user = userEvent.setup();
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
  const textbox = screen.getByRole("textbox");
  const boldButton = screen.getByTestId("test-bold-button");
  const italicButton = screen.getByTestId("test-italic-button");
  const olButton = screen.getByTestId("test-ordered-list-button");
  const ulButton = screen.getByTestId("test-unordered-list-button");
  await user.click(textbox);
  await user.tab();
  expect(boldButton).toHaveFocus();
  await user.keyboard("{arrowright}");
  expect(boldButton).not.toHaveFocus();
  expect(italicButton).toHaveFocus();
  await user.keyboard("{arrowright}");
  expect(italicButton).not.toHaveFocus();
  expect(ulButton).toHaveFocus();
  await user.keyboard("{arrowright}");
  expect(ulButton).not.toHaveFocus();
  expect(olButton).toHaveFocus();
  await user.keyboard("{arrowright}");
  expect(olButton).not.toHaveFocus();
  expect(boldButton).toHaveFocus();
  await user.keyboard("{arrowleft}");
  expect(olButton).toHaveFocus();
  expect(boldButton).not.toHaveFocus();
  await user.keyboard("{arrowleft}");
  expect(ulButton).toHaveFocus();
  expect(olButton).not.toHaveFocus();
  await user.keyboard("{arrowleft}");
  expect(italicButton).toHaveFocus();
  expect(ulButton).not.toHaveFocus();
  await user.keyboard("{arrowleft}");
  expect(boldButton).toHaveFocus();
  expect(italicButton).not.toHaveFocus();
});

describe("Events", () => {
  /** Using the mocked toolbar, test that clicking the bold button fires the correct event */
  it("dispatches the 'bold' event when the bold button is clicked", async () => {
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
  it("dispatches the 'italic' event when the italic button is clicked", async () => {
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
  it("dispatches the 'ordered list' event when the ordered list button is clicked", async () => {
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
  it("dispatches the 'unordered list' event when the unordered list button is clicked", async () => {
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
