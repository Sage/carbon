/**
 * Functional toolbar tests. For button state tests, see the buttons/buttons.test.tsx file.
 */
import { createHeadlessEditor } from "@lexical/headless";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen, waitFor } from "@testing-library/react";
import { FORMAT_TEXT_COMMAND, LexicalEditor, TextFormatType } from "lexical";
import React from "react";

import userEvent from "@testing-library/user-event";
import { ToolbarPlugin } from "..";
import TextEditor from "../../../text-editor.component";
import { createFromHTML } from "../../__utils__/helpers";
import { COMPONENT_PREFIX } from "../../__utils__/constants";

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
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        Underline
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

describe("Typography dropdown styling", () => {
  test("should change the text formatting when an option is selected in the dropdown", async () => {
    const user = userEvent.setup();

    // render the TextEditor component
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

    // Click the editor space and send a few key presses
    const editor = screen.getByRole(`textbox`);
    await user.click(editor);
    await user.keyboard("Sample text");

    // expect the editor to be rendered with the default value
    expect(screen.getByText("Sample text")).toBeVisible();
    expect(screen.getByText("Sample text")).toHaveStyle("font-size: 14px");

    await user.tripleClick(editor);

    const typographyButton = screen.getByTestId(
      `${COMPONENT_PREFIX}-typography-dropdown`,
    );

    await user.click(typographyButton);
    await waitFor(async () => {
      await user.click(screen.getByText("Title"));
    });

    expect(screen.getByText("Sample text abc")).toHaveStyle("font-size: 30px");
  });
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
  const typographyButton = screen.getByTestId("test-typography-dropdown");
  const boldButton = screen.getByTestId("test-bold-button");
  const italicButton = screen.getByTestId("test-italic-button");
  const underlineButton = screen.getByTestId("test-underline-button");
  const olButton = screen.getByTestId("test-ordered-list-button");
  const ulButton = screen.getByTestId("test-unordered-list-button");
  const hyperlinkButton = screen.getByTestId("test-hyperlink-button");

  await user.click(textbox);
  // Focus on typography button
  await user.tab();
  // Typography -> Bold
  expect(typographyButton).toHaveFocus();
  await user.keyboard("{arrowright}");
  expect(typographyButton).not.toHaveFocus();
  expect(boldButton).toHaveFocus();
  // Bold -> Italic
  await user.keyboard("{arrowright}");
  expect(boldButton).not.toHaveFocus();
  expect(italicButton).toHaveFocus();
  // Italic -> Underline
  await user.keyboard("{arrowright}");
  expect(italicButton).not.toHaveFocus();
  expect(underlineButton).toHaveFocus();
  // Underline -> Unordered list
  await user.keyboard("{arrowright}");
  expect(underlineButton).not.toHaveFocus();
  expect(ulButton).toHaveFocus();
  // Unordered list -> Ordered list
  await user.keyboard("{arrowright}");
  expect(ulButton).not.toHaveFocus();
  expect(olButton).toHaveFocus();
  // Ordered list -> Hyperlink
  await user.keyboard("{arrowright}");
  expect(olButton).not.toHaveFocus();
  expect(hyperlinkButton).toHaveFocus();
  // Hyperlink -> Typography (loops back to start)
  await user.keyboard("{arrowright}");
  expect(hyperlinkButton).not.toHaveFocus();
  expect(typographyButton).toHaveFocus();
  // Now test left arrow key
  // Typography -> Hyperlink
  await user.keyboard("{arrowleft}");
  expect(hyperlinkButton).toHaveFocus();
  expect(typographyButton).not.toHaveFocus();
  // Hyperlink -> Ordered list
  await user.keyboard("{arrowleft}");
  expect(olButton).toHaveFocus();
  expect(hyperlinkButton).not.toHaveFocus();
  // Ordered list -> Unordered list
  await user.keyboard("{arrowleft}");
  expect(ulButton).toHaveFocus();
  expect(olButton).not.toHaveFocus();
  // Unordered list -> Underline
  await user.keyboard("{arrowleft}");
  expect(underlineButton).toHaveFocus();
  expect(ulButton).not.toHaveFocus();
  // Underline -> Italic
  await user.keyboard("{arrowleft}");
  expect(italicButton).toHaveFocus();
  expect(underlineButton).not.toHaveFocus();
  // Italic -> Bold
  await user.keyboard("{arrowleft}");
  expect(boldButton).toHaveFocus();
  expect(italicButton).not.toHaveFocus();
  // Bold -> Typography
  await user.keyboard("{arrowleft}");
  expect(typographyButton).toHaveFocus();
  expect(boldButton).not.toHaveFocus();
  // Typography -> Hyperlink (loops back to end)
  await user.keyboard("{arrowleft}");
  expect(hyperlinkButton).toHaveFocus();
  expect(typographyButton).not.toHaveFocus();
});

test("allows the buttons to be navigated with the Home and End keys", async () => {
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
  const typographyButton = screen.getByTestId("test-typography-dropdown");
  const hyperlinkButton = screen.getByTestId("test-hyperlink-button");

  await user.click(textbox);
  // Focus on typography button
  await user.tab();
  // Press End - focus should move to last button (hyperlink)
  expect(typographyButton).toHaveFocus();
  await user.keyboard("{End}");
  expect(typographyButton).not.toHaveFocus();
  expect(hyperlinkButton).toHaveFocus();
  // Press Home - focus should move to first button (typography)
  await user.keyboard("{Home}");
  expect(typographyButton).toHaveFocus();
  expect(hyperlinkButton).not.toHaveFocus();
});

test("does not allow the buttons to be navigated with other keys", async () => {
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
  const typographyButton = screen.getByTestId("test-typography-dropdown");
  const boldButton = screen.getByTestId("test-bold-button");

  await user.click(textbox);
  // Focus on typography button
  await user.tab();
  expect(typographyButton).toHaveFocus();
  // Pressing other keys should not change focus
  await user.keyboard("a");
  expect(typographyButton).toHaveFocus();
  await user.keyboard("1");
  expect(typographyButton).toHaveFocus();
  // Focus should still move with arrow keys
  await user.keyboard("{arrowright}");
  expect(boldButton).toHaveFocus();
});

test("does not fire any navigation events when the toolbar is empty", async () => {
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
      <ToolbarPlugin namespace="test" toolbarControls={[]} />
    </LexicalComposer>,
  );
  const textbox = screen.getByRole("textbox");
  const toolbar = screen.getByTestId("test-toolbar");

  await user.click(textbox);
  // Focus on toolbar (there are no buttons in it)
  await user.tab();
  expect(toolbar).toHaveFocus();
  // Pressing arrow keys should not change focus or throw any errors
  await user.keyboard("{arrowright}");
  expect(toolbar).toHaveFocus();
  await user.keyboard("{arrowleft}");
  expect(toolbar).toHaveFocus();
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

  it("calls 'onChange' when the bold button is clicked while text is selected", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <TextEditor
        labelText="foo"
        onChange={mockOnChange}
        initialValue={createFromHTML("<p>Hello world!</p>")}
      />,
    );

    const editor = screen.getByRole("textbox");
    await user.tripleClick(editor); // Select the text

    const boldButton = screen.getByRole("button", { name: "Bold" });
    await user.click(boldButton);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
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

  it("calls 'onChange' when the italic button is clicked while text is selected", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <TextEditor
        labelText="foo"
        onChange={mockOnChange}
        initialValue={createFromHTML("<p>Hello world!</p>")}
      />,
    );

    const editor = screen.getByRole("textbox");
    await user.tripleClick(editor); // Select the text

    const italicButton = screen.getByRole("button", { name: "Italic" });
    await user.click(italicButton);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });

  /** Using the mocked toolbar, test that clicking the underline button fires the correct event */
  it("dispatches the 'bold' event when the underline button is clicked", async () => {
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
    const boldButton = screen.getByRole("button", { name: "Underline" });
    await user.click(boldButton);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(FORMAT_TEXT_COMMAND, "underline");
  });

  it("calls 'onChange' when the underline button is clicked while text is selected", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <TextEditor
        labelText="foo"
        onChange={mockOnChange}
        initialValue={createFromHTML("<p>Hello world!</p>")}
      />,
    );

    const editor = screen.getByRole("textbox");
    await user.tripleClick(editor); // Select the text

    const boldButton = screen.getByRole("button", { name: "Underline" });
    await user.click(boldButton);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
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

  it("calls 'onChange' when the ordered list button is clicked within the TextEditor", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <TextEditor
        labelText="foo"
        onChange={mockOnChange}
        initialValue={createFromHTML("<p>Hello world!</p>")}
      />,
    );

    const editor = screen.getByRole("textbox");
    await user.tripleClick(editor); // Select the text

    const orderedListButton = screen.getByRole("button", {
      name: "Ordered list",
    });
    await user.click(orderedListButton);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
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

  it("calls 'onChange' when the unordered ordered list button is clicked within the TextEditor", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <TextEditor
        labelText="foo"
        onChange={mockOnChange}
        initialValue={createFromHTML("<p>Hello world!</p>")}
      />,
    );

    const editor = screen.getByRole("textbox");
    await user.tripleClick(editor); // Select the text

    const unorderedListButton = screen.getByRole("button", {
      name: "Unordered list",
    });
    await user.click(unorderedListButton);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Styling", () => {
  ["small", "medium", "large"].forEach((size) => {
    it(`applies the correct padding for size=${size}`, () => {
      const paddingMap: { [key: string]: string } = {
        small: "8px",
        medium: "12px",
        large: "16px",
      };
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
          <ToolbarPlugin
            namespace="test"
            size={size as "small" | "medium" | "large"}
          />
        </LexicalComposer>,
      );
      const toolbar = screen.getByTestId("test-toolbar");
      expect(toolbar).toHaveStyle({
        padding: paddingMap[size],
      });
    });
  });
});
