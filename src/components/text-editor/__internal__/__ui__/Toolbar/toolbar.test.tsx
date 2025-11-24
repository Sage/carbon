/**
 * Functional toolbar tests. For button state tests, see the buttons/buttons.test.tsx file.
 */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { render, screen, waitFor, within } from "@testing-library/react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { ToolbarPlugin } from "..";
import TextEditor from "../../../text-editor.component";
import { createFromHTML } from "../../__utils__/helpers";

/** This test renders the actual toolbar instead of using the mocked one to ensure
 * that the toolbar renders correctly with the default buttons.
 */
test("renders the toolbar", () => {
  const ref = React.createRef<HTMLDivElement>();
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
          <div role="textbox" contentEditable aria-label="test" ref={ref} />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ToolbarPlugin namespace="test" contentEditorRef={ref} />
    </LexicalComposer>,
  );
  const toolbar = screen.getByTestId("test-toolbar");
  expect(toolbar).toBeInTheDocument();
});

test("does not render the toolbar if the editor is disabled", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <LexicalComposer
      initialConfig={{
        nodes: [],
        onError: () => {},
        namespace: "test",
        editable: false,
      }}
    >
      <RichTextPlugin
        contentEditable={
          <div role="textbox" contentEditable aria-label="test" ref={ref} />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ToolbarPlugin namespace="test" contentEditorRef={ref} />
    </LexicalComposer>,
  );
  const toolbar = screen.queryByTestId("test-toolbar");
  expect(toolbar).not.toBeInTheDocument();
});

test("allows the buttons to be navigated with the arrow keys", async () => {
  const user = userEvent.setup();
  const ref = React.createRef<HTMLDivElement>();
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
          <div role="textbox" contentEditable aria-label="test" ref={ref} />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ToolbarPlugin namespace="test" contentEditorRef={ref} />
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
  const ref = React.createRef<HTMLDivElement>();

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
          <div role="textbox" contentEditable aria-label="test" ref={ref} />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ToolbarPlugin namespace="test" contentEditorRef={ref} />
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
  const ref = React.createRef<HTMLDivElement>();

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
          <div role="textbox" contentEditable aria-label="test" ref={ref} />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ToolbarPlugin namespace="test" contentEditorRef={ref} />
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
  const ref = React.createRef<HTMLDivElement>();

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
          <div role="textbox" contentEditable aria-label="test" ref={ref} />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ToolbarPlugin
        namespace="test"
        toolbarControls={[]}
        contentEditorRef={ref}
      />
    </LexicalComposer>,
  );
  const textbox = screen.getByRole("textbox");
  const toolbar = screen.getByTestId("test-toolbar");

  await user.click(textbox);

  await user.tab();

  expect(toolbar).not.toHaveFocus();

  await user.click(toolbar);

  expect(toolbar).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(toolbar).toHaveFocus();
});

describe("Events", () => {
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
      const ref = { current: null };
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
              <div role="textbox" contentEditable aria-label="test" ref={ref} />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ToolbarPlugin
            namespace="test"
            size={size as "small" | "medium" | "large"}
            contentEditorRef={ref}
          />
        </LexicalComposer>,
      );
      const toolbar = screen.getByTestId("test-toolbar-wrapper");
      expect(toolbar).toHaveStyle({
        padding: paddingMap[size],
      });
    });
  });
});

describe("Customisation", () => {
  it("renders only the buttons passed in the 'toolbarControls' prop", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={["bold", "italic"]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const toolbar = screen.getByTestId("test-toolbar");

    expect(within(toolbar).getAllByRole("button").length).toEqual(2);
    expect(screen.getByTestId("test-bold-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-italic-button")).toBeInTheDocument();
    expect(
      screen.queryByTestId("test-underline-button"),
    ).not.toBeInTheDocument();
  });

  it("does not render the typography formatting section if the typography button is not set", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={[
            "bold",
            "italic",
            "underline",
            "ordered-list",
            "unordered-list",
            "link",
          ]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const toolbar = screen.getByTestId("test-toolbar");
    const buttonGroups = screen.getAllByTestId(/btg-test/i);
    expect(buttonGroups.length).toEqual(3);

    expect(within(toolbar).getAllByRole("button").length).toEqual(6);
    expect(
      screen.queryByTestId("test-typography-dropdown"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("test-bold-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-italic-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-underline-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-ordered-list-button")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-unordered-list-button"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("test-hyperlink-button")).toBeInTheDocument();
  });

  it("does not render the text formatting section if no text formatting buttons are set", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={[
            "typography",
            "ordered-list",
            "unordered-list",
            "link",
          ]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const toolbar = screen.getByTestId("test-toolbar");
    const buttonGroups = screen.getAllByTestId(/btg-test/i);
    expect(buttonGroups.length).toEqual(3);

    expect(within(toolbar).getAllByRole("combobox").length).toEqual(1);
    expect(within(toolbar).getAllByRole("button").length).toEqual(3);
    expect(screen.getByTestId("test-typography-dropdown")).toBeInTheDocument();
    expect(screen.queryByTestId("test-bold-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("test-italic-button")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("test-underline-button"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("test-ordered-list-button")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-unordered-list-button"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("test-hyperlink-button")).toBeInTheDocument();
  });

  it("does not render the list formatting section if no list formatting buttons are set", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={[
            "typography",
            "bold",
            "italic",
            "underline",
            "link",
          ]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const toolbar = screen.getByTestId("test-toolbar");
    const buttonGroups = screen.getAllByTestId(/btg-test/i);
    expect(buttonGroups.length).toEqual(3);

    expect(within(toolbar).getAllByRole("combobox").length).toEqual(1);
    expect(within(toolbar).getAllByRole("button").length).toEqual(4);
    expect(screen.getByTestId("test-typography-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("test-bold-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-italic-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-underline-button")).toBeInTheDocument();
    expect(
      screen.queryByTestId("test-ordered-list-button"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("test-unordered-list-button"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("test-hyperlink-button")).toBeInTheDocument();
  });

  it("does not render the hyperlink formatting section if the link button is not set", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={[
            "typography",
            "bold",
            "italic",
            "underline",
            "ordered-list",
            "unordered-list",
          ]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const toolbar = screen.getByTestId("test-toolbar");
    const buttonGroups = screen.getAllByTestId(/btg-test/i);
    expect(buttonGroups.length).toEqual(3);

    expect(within(toolbar).getAllByRole("combobox").length).toEqual(1);
    expect(within(toolbar).getAllByRole("button").length).toEqual(5);
    expect(screen.getByTestId("test-typography-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("test-bold-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-italic-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-underline-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-ordered-list-button")).toBeInTheDocument();
    expect(
      screen.getByTestId("test-unordered-list-button"),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("test-hyperlink-button"),
    ).not.toBeInTheDocument();
  });

  it("shows dividers between button groups, except after the last group", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={[
            "typography",
            "bold",
            "italic",
            "underline",
            "ordered-list",
            "unordered-list",
            "link",
          ]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const buttonGroups = screen.getAllByTestId(/btg-test/i);
    expect(buttonGroups.length).toEqual(4);

    // Because the separator is hidden via aria-hidden we need to use the container
    // to find it instead of screen.getByRole
    const dividers = screen.queryAllByRole("separator", { hidden: true });
    expect(dividers.length).toEqual(3);
  });

  it("only shows a single divider when there are two adjacent button groups", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={["typography", "link"]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const buttonGroups = screen.getAllByTestId(/btg-test/i);
    expect(buttonGroups.length).toEqual(2);

    // Because the separator is hidden via aria-hidden we need to use the container
    // to find it instead of screen.getByRole
    const dividers = screen.queryAllByRole("separator", { hidden: true });
    expect(dividers.length).toEqual(1);
  });

  it("marks the typography button as the first button by default", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin namespace="test" contentEditorRef={ref} />
      </LexicalComposer>,
    );
    const typographyButton = screen.getByTestId("test-typography-dropdown");
    expect(typographyButton).toHaveAttribute("tabindex", "0");
  });

  it("marks the bold button as the first button if the preceding buttons are not present", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={[
            "bold",
            "italic",
            "underline",
            "ordered-list",
            "unordered-list",
            "link",
          ]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const boldButton = screen.getByTestId("test-bold-button");
    expect(boldButton).toHaveAttribute("tabindex", "0");
  });

  it("marks the italic button as the first button if the preceding buttons are not present", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={[
            "italic",
            "underline",
            "ordered-list",
            "unordered-list",
            "link",
          ]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const italicButton = screen.getByTestId("test-italic-button");
    expect(italicButton).toHaveAttribute("tabindex", "0");
  });

  it("marks the underline button as the first button if the preceding buttons are not present", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={[
            "underline",
            "ordered-list",
            "unordered-list",
            "link",
          ]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const underlineButton = screen.getByTestId("test-underline-button");
    expect(underlineButton).toHaveAttribute("tabindex", "0");
  });

  it("marks the unordered list button as the first button if the preceding buttons are not present", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={["unordered-list", "ordered-list", "link"]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const unorderedListButton = screen.getByTestId(
      "test-unordered-list-button",
    );
    expect(unorderedListButton).toHaveAttribute("tabindex", "0");
  });

  it("marks the ordered list button as the first button if the preceding buttons are not present", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={["ordered-list", "link"]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const orderedListButton = screen.getByTestId("test-ordered-list-button");
    expect(orderedListButton).toHaveAttribute("tabindex", "0");
  });

  it("marks the link button as the first button if all other buttons are not present", () => {
    const ref = { current: null };
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
            <div role="textbox" contentEditable aria-label="test" ref={ref} />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ToolbarPlugin
          namespace="test"
          toolbarControls={["link"]}
          contentEditorRef={ref}
        />
      </LexicalComposer>,
    );
    const linkButton = screen.getByTestId("test-hyperlink-button");
    expect(linkButton).toHaveAttribute("tabindex", "0");
  });
});
