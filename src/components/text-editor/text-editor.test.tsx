import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React, { act, createRef } from "react";

import TextEditor, {
  EditorFormattedValues,
  TextEditorHandle,
  createEmpty,
  createFromHTML,
} from ".";

import Logger from "../../__internal__/utils/logger";
import { COMPONENT_PREFIX } from "./__internal__/__utils__/constants";

jest.mock("../../__internal__/utils/logger");

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

test("should display deprecation warning once when rendered with value prop", async () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");

  render(
    <>
      <TextEditor labelText="label" value={JSON.stringify(initialValue)} />
      <TextEditor labelText="label" value={JSON.stringify(initialValue)} />
    </>,
  );

  await waitFor(() =>
    expect(loggerSpy).toHaveBeenNthCalledWith(
      1,
      "`value` is deprecated in TextEditor and support will soon be removed. Please use `initialValue` instead.",
    ),
  );

  loggerSpy.mockRestore();
});

test("rendering and basic functionality", async () => {
  const user = userEvent.setup();
  const mockCancel = jest.fn();
  const mockSave = jest.fn();

  // render the TextEditor component
  render(
    <TextEditor
      labelText="Example"
      onCancel={() => mockCancel()}
      onSave={() => mockSave()}
      initialValue={JSON.stringify(initialValue)}
      characterLimit={20}
    />,
  );

  // expect the editor to be rendered with the default value
  expect(screen.getByText("Sample text")).toBeVisible();

  // Click the editor space and send a few key presses
  const editor = screen.getByRole(`textbox`);
  await user.click(editor);
  await user.keyboard(" abc");

  // expect the edited value to be visible
  expect(screen.getByText("Sample text abc")).toBeVisible();

  // expect the label to be rendered
  expect(screen.getByText("Example")).toBeVisible();

  // expect the toolbar to be rendered
  expect(screen.getByTestId(`${COMPONENT_PREFIX}-toolbar`)).toBeVisible();

  // expect the character counter to be rendered
  const characterCounter = screen.getByTestId(
    `${COMPONENT_PREFIX}-character-limit`,
  );

  expect(characterCounter).toBeVisible();
  expect(characterCounter).toHaveTextContent("5 characters remaining");

  await user.click(editor);
  await user.keyboard("defghijklmnopqrstuvwxyz");
  expect(characterCounter).toHaveTextContent("0 characters remaining");

  // get both command buttons
  const cancelButton = screen.getByText("Cancel");
  const saveButton = screen.getByText("Save");

  // click each button and expect the respective callback to be called
  await user.click(saveButton);
  expect(mockSave).toHaveBeenCalledTimes(1);
  await user.click(cancelButton);
  expect(mockCancel).toHaveBeenCalledTimes(1);

  // expect the text to have been reset to the default value because of the above Cancel click
  expect(screen.getByText("Sample text")).toBeVisible();
});

test("does not call onChange on initial render", async () => {
  const onChange = jest.fn();

  render(
    <TextEditor
      labelText="foo"
      onChange={onChange}
      initialValue={JSON.stringify(initialValue)}
    />,
  );

  await waitFor(() => {
    expect(onChange).not.toHaveBeenCalled();
  });
});

test("does not call onChange when editor is focused", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <TextEditor
      labelText="foo"
      onChange={onChange}
      initialValue={JSON.stringify(initialValue)}
    />,
  );

  const editor = screen.getByRole("textbox", { name: "foo" });
  await user.click(editor);

  await waitFor(() => {
    expect(onChange).not.toHaveBeenCalled();
  });
});

test("calls onChange each time a character is typed", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <TextEditor
      labelText="foo"
      onChange={onChange}
      initialValue={JSON.stringify(initialValue)}
    />,
  );

  const editor = screen.getByRole("textbox", { name: "foo" });
  await user.type(editor, "bar");

  await waitFor(() => {
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});

test("calls onChange once when selected text content is removed", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render(
    <TextEditor
      labelText="foo"
      onChange={onChange}
      initialValue={JSON.stringify(initialValue)}
    />,
  );

  const editor = screen.getByRole("textbox", { name: "foo" });
  await user.tripleClick(editor); // Select all text
  await user.keyboard("{Delete}");

  await waitFor(() => {
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

test("renders content editor with provided id", () => {
  render(<TextEditor labelText="Example" id="text-editor-id" />);
  const editor = screen.getByRole("textbox", { name: "Example" });

  expect(editor).toHaveAttribute("id", "text-editor-id");
});

test("input hint renders correctly when inputHint prop is provided", () => {
  // render the TextEditor component with an input hint
  render(<TextEditor inputHint="This is an input hint" labelText="Example" />);

  const editor = screen.getByRole("textbox", { name: "Example" });

  // expect the input hint to be rendered
  expect(screen.getByText("This is an input hint")).toBeVisible();
  expect(editor).toHaveAccessibleDescription("This is an input hint");
});

test("wrapper renders with correct when inputHint prop is provided and size is small", () => {
  // render the TextEditor component with an input hint
  render(
    <TextEditor
      inputHint="This is an input hint"
      labelText="Example"
      size="small"
    />,
  );

  const editor = screen.getByRole("textbox", { name: "Example" });

  // expect the input hint to be rendered
  expect(screen.getByText("This is an input hint")).toBeVisible();
  expect(screen.getByText("This is an input hint")).toHaveStyleRule(
    "margin-bottom",
    "var(--spacing050)",
  );
  expect(editor).toHaveAccessibleDescription("This is an input hint");
});

test("wrapper renders with correct when inputHint prop is provided and size is large", () => {
  // render the TextEditor component with an input hint
  render(
    <TextEditor
      inputHint="This is an input hint"
      labelText="Example"
      size="large"
    />,
  );

  const editor = screen.getByRole("textbox", { name: "Example" });

  // expect the input hint to be rendered
  expect(screen.getByText("This is an input hint")).toBeVisible();
  expect(screen.getByText("This is an input hint")).toHaveStyleRule(
    "margin-bottom",
    "var(--spacing150)",
  );
  expect(editor).toHaveAccessibleDescription("This is an input hint");
});

test("character limit renders correctly when characterLimit prop is provided", () => {
  // render the TextEditor component with a character limit
  render(<TextEditor characterLimit={100} labelText="Example" />);

  // expect the character counter to be rendered
  const characterCounter = screen.getByTestId(
    `${COMPONENT_PREFIX}-character-limit`,
  );
  expect(characterCounter).toBeVisible();
  expect(characterCounter).toHaveTextContent("100 characters remaining");
});

test("character limit is not rendered when characterLimit prop is provided with a value of 0", () => {
  // render the TextEditor component with a character limit
  render(<TextEditor characterLimit={0} labelText="Example" />);

  // expect the character counter to be rendered
  const characterCounter = screen.queryByTestId(
    `${COMPONENT_PREFIX}-character-limit`,
  );
  expect(characterCounter).not.toBeInTheDocument();
});

test("renders header content wrapped in a container when the `header` prop is provided", () => {
  render(
    <TextEditor
      characterLimit={0}
      labelText="Example"
      namespace="test"
      header={<span>foo</span>}
    />,
  );

  const headerWrapper = screen.getByTestId("test-header-wrapper");

  expect(headerWrapper).toBeVisible();
  expect(headerWrapper).toHaveTextContent("foo");
});

test("renders footer content wrapped in a container when the `footer` prop is provided", () => {
  render(
    <TextEditor
      characterLimit={0}
      labelText="Example"
      namespace="test"
      footer={<span>foo</span>}
    />,
  );

  const footerWrapper = screen.getByTestId("test-footer-wrapper");

  expect(footerWrapper).toBeVisible();
  expect(footerWrapper).toHaveTextContent("foo");
});

test("renders footer content wrapped in a container when the `footer` prop is provided and size is small", () => {
  render(
    <TextEditor
      characterLimit={0}
      labelText="Example"
      namespace="test"
      footer={<span>foo</span>}
      size="small"
    />,
  );

  const footerWrapper = screen.getByTestId("test-footer-wrapper");

  expect(footerWrapper).toBeVisible();
  expect(footerWrapper).toHaveTextContent("foo");
  expect(footerWrapper).toHaveStyleRule("padding", "var(--spacing100)");
});

test("renders footer content wrapped in a container when the `footer` prop is provided and size is large", () => {
  render(
    <TextEditor
      characterLimit={0}
      labelText="Example"
      namespace="test"
      footer={<span>foo</span>}
      size="large"
    />,
  );

  const footerWrapper = screen.getByTestId("test-footer-wrapper");

  expect(footerWrapper).toBeVisible();
  expect(footerWrapper).toHaveTextContent("foo");
  expect(footerWrapper).toHaveStyleRule("padding", "var(--spacing200)");
});

test("allows the simultaneous rendering of header and footer content wrapped in respective containers when the `header` and `footer` props are provided", () => {
  render(
    <TextEditor
      characterLimit={0}
      labelText="Example"
      namespace="test"
      header={<span>foo</span>}
      footer={<span>bar</span>}
    />,
  );

  const footerWrapper = screen.getByTestId("test-footer-wrapper");
  const headerWrapper = screen.getByTestId("test-header-wrapper");

  expect(headerWrapper).toBeVisible();
  expect(headerWrapper).toHaveTextContent("foo");

  expect(footerWrapper).toBeVisible();
  expect(footerWrapper).toHaveTextContent("bar");
});

test("required prop renders correctly when required prop is provided", () => {
  // render the TextEditor component with the required prop
  render(<TextEditor labelText="Example" required />);

  const editor = screen.getByRole("textbox", { name: "Example" });

  expect(editor).toBeRequired();
});

test("placeholder prop renders correctly when placeholder prop is provided", () => {
  // render the TextEditor component with a placeholder
  render(
    <TextEditor labelText="Example" placeholder="This is a nice placeholder" />,
  );

  // expect the placeholder to be rendered
  expect(screen.getByText("This is a nice placeholder")).toBeVisible();
});

test("rows prop renders correctly when rows prop is provided", () => {
  // render the TextEditor component with a rows prop
  render(<TextEditor labelText="Example" rows={20} />);

  // expect the editor to have the correct number of rows
  const editor = screen.getByTestId(`${COMPONENT_PREFIX}-editable`);
  expect(editor).toHaveStyle("min-height: 420px");
});

test("validation renders correctly when error prop is provided", () => {
  // render the TextEditor component with an error
  render(<TextEditor error="This is an error" labelText="Example" />);

  const editor = screen.getByRole("textbox", { name: "Example" });
  const errorMessage = screen.getByText("This is an error");

  expect(errorMessage).toBeVisible();
  expect(editor).toHaveAccessibleDescription("This is an error");
  expect(editor).not.toBeValid();
});

test("validation renders correctly when error prop is provided and validationMessagePositionTop is false", () => {
  render(
    <TextEditor
      error="This is an error"
      labelText="Example"
      inputHint="Hint"
      validationMessagePositionTop={false}
    />,
  );

  const editor = screen.getByRole("textbox", { name: "Example" });
  const errorMessage = screen.getByText("This is an error");

  expect(errorMessage).toBeVisible();
  expect(editor).toHaveAccessibleDescription("Hint This is an error");
  expect(editor).not.toBeValid();
});

test("validation renders correctly when warning prop is provided and validationMessagePositionTop is false", () => {
  render(
    <TextEditor
      warning="This is an warning"
      labelText="Example"
      inputHint="Hint"
      validationMessagePositionTop={false}
    />,
  );

  const editor = screen.getByRole("textbox", { name: "Example" });
  const warningMessage = screen.getByText("This is an warning");

  expect(warningMessage).toBeVisible();
  expect(editor).toHaveAccessibleDescription("Hint This is an warning");
});

test("validation renders correctly when warning prop is provided and validationMessagePositionTop is true", () => {
  render(
    <TextEditor
      warning="This is an warning"
      labelText="Example"
      inputHint="Hint"
      validationMessagePositionTop
    />,
  );

  const editor = screen.getByRole("textbox", { name: "Example" });
  const warningMessage = screen.getByText("This is an warning");

  expect(warningMessage).toBeVisible();
  expect(editor).toHaveAccessibleDescription("This is an warning Hint");
});

test("validation renders correctly when warning prop is provided", () => {
  // render the TextEditor component with an error
  render(<TextEditor warning="This is a warning" labelText="Example" />);

  const editor = screen.getByRole("textbox", { name: "Example" });
  const warningMessage = screen.getByText("This is a warning");

  expect(warningMessage).toBeVisible();
  expect(editor).toHaveAccessibleDescription("This is a warning");
});

test("renders with expected accessible description when both inputHint and error props are provided", () => {
  // render the TextEditor component with an input hint and error
  render(
    <TextEditor
      inputHint="This is an input hint."
      error="This is an error."
      labelText="Example"
      validationMessagePositionTop
    />,
  );

  const editor = screen.getByRole("textbox", { name: "Example" });

  expect(editor).toHaveAccessibleDescription(
    "This is an error. This is an input hint.",
  );
});

test("serialisation of editor", async () => {
  const user = userEvent.setup();
  const mockSave = jest.fn();

  render(
    <TextEditor
      labelText="Text Editor"
      onSave={(values: EditorFormattedValues) => mockSave(values)}
      initialValue={JSON.stringify(initialValue)}
    />,
  );

  const saveButton = screen.getByText("Save");

  // click the save button and expect the callback to be called
  await user.click(saveButton);
  expect(mockSave).toHaveBeenCalledTimes(1);
});

test("editor is focused when the focus method is invoked via imperative handle", () => {
  const editorRef = createRef<TextEditorHandle>();

  render(<TextEditor labelText="Text Editor" ref={editorRef} />);

  act(() => {
    editorRef.current?.focus();
  });

  const editor = screen.getByRole("textbox");
  expect(editor).toHaveFocus();
});

test("valid data is parsed when HTML is passed into the createFromHTML function", async () => {
  const html = `<p><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = createFromHTML(html);
  expect(JSON.parse(value)).toEqual({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              fontSize: "14px",
              fontWeight: "400",
              format: 0,
              lineHeight: "21px",
              mode: "normal",
              style: "",
              text: "This is a HTML example.",
              type: "styled-span",
              version: 1,
            },
          ],
          direction: null,
          format: "",
          indent: 0,
          textFormat: 0,
          textStyle: "",
          type: "paragraph",
          version: 1,
        },
        {
          children: [
            {
              children: [
                {
                  detail: 0,
                  fontSize: "14px",
                  fontWeight: "400",
                  format: 0,
                  lineHeight: "21px",
                  mode: "normal",
                  style: "",
                  text: "Look, it has lists!",
                  type: "styled-span",
                  version: 1,
                },
              ],
              direction: null,
              format: "",
              indent: 0,
              type: "listitem",
              value: 1,
              version: 1,
            },
          ],
          direction: null,
          format: "",
          indent: 0,
          listType: "number",
          start: 1,
          tag: "ol",
          type: "list",
          version: 1,
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });
});

test("valid state is created when the createEmpty function is called", async () => {
  const value = createEmpty();
  expect(JSON.parse(value)).toEqual({
    root: {
      children: [
        {
          children: [],
          direction: null,
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });
  render(<TextEditor labelText="Text Editor" initialValue={value} />);
  expect(screen.getByRole("textbox")).toBeVisible();
  expect(screen.getByRole("textbox")).toHaveTextContent("");
});

test("previews are rendered correctly if provided", () => {
  const previews = [<div key="preview-1">Preview 1</div>];
  render(<TextEditor previews={previews} labelText="Example" />);

  const preview = screen.getByText("Preview 1");

  // expect the preview to be rendered
  expect(preview).toBeVisible();
});

test("no previews are rendered if the prop is not provided", () => {
  render(<TextEditor labelText="Example" />);

  const preview = screen.queryByText("Preview 1");

  // expect the preview not to be rendered
  expect(preview).not.toBeInTheDocument();
});

test("should reset the content to the default if the Cancel button is pressed", async () => {
  const user = userEvent.setup();
  const mockCancel = jest.fn();
  const mockSave = jest.fn();
  const value = JSON.stringify(initialValue);

  // render the TextEditor component
  render(
    <TextEditor
      labelText="Example"
      onCancel={() => mockCancel()}
      onSave={() => mockSave()}
      initialValue={value}
    />,
  );

  // Click the editor space and send a few key presses
  const editor = screen.getByRole(`textbox`);
  await user.click(editor);
  await user.keyboard(" abc");

  // expect the edited value to be visible
  expect(screen.getByText("Sample text abc")).toBeVisible();

  // Click the cancel button
  const cancelButton = screen.getByText("Cancel");
  await user.click(cancelButton);

  // expect the editor to be rendered with the default value
  expect(screen.getByText("Sample text")).toBeVisible();
});

test("readOnly prop renders correctly when readOnly prop is provided", () => {
  // render the TextEditor component with the readOnly prop
  render(<TextEditor labelText="Example" readOnly />);

  // expect the editor to be read-only
  const editor = screen.getByTestId(
    `${COMPONENT_PREFIX}-readonly-content-editor`,
  );
  expect(editor).toHaveAttribute("contenteditable", "false");
});

describe("shortcut keys", () => {
  it("should toggle bold text when the bold shortcut is pressed", async () => {
    const user = userEvent.setup();
    const mockCancel = jest.fn();
    const mockSave = jest.fn();
    const value = JSON.stringify(initialValue);

    // render the TextEditor component
    render(
      <TextEditor
        labelText="Example"
        onCancel={() => mockCancel()}
        onSave={() => mockSave()}
        initialValue={value}
        characterLimit={20}
      />,
    );

    // Click the editor space and send a few key presses
    const editor = screen.getByRole(`textbox`);
    await user.click(editor);
    await user.keyboard(" not bold");

    // expect the edited value to be visible
    expect(screen.getByText("Sample text not bold")).toBeVisible();
    await user.tripleClick(editor);
    await user.keyboard(`{Control>}b{/Control>}`);

    // expect the text to be bold
    expect(screen.getByText("Sample text not bold")).toHaveStyle(
      "font-weight: bold",
    );
    await user.keyboard(`{Control>}b{/Control>}`);

    // expect the text to be normal
    expect(screen.getByText("Sample text not bold")).not.toHaveStyle(
      "font-weight: bold",
    );
  });

  it("should toggle italic text when the italic shortcut is pressed", async () => {
    const user = userEvent.setup();
    const mockCancel = jest.fn();
    const mockSave = jest.fn();
    const value = JSON.stringify(initialValue);

    // render the TextEditor component
    render(
      <TextEditor
        labelText="Example"
        onCancel={() => mockCancel()}
        onSave={() => mockSave()}
        initialValue={value}
        characterLimit={20}
      />,
    );

    // Click the editor space and send a few key presses
    const editor = screen.getByRole(`textbox`);
    await user.click(editor);
    await user.keyboard(" not italic");

    // expect the edited value to be visible
    expect(screen.getByText("Sample text not italic")).toBeVisible();
    await user.tripleClick(editor);
    await user.keyboard(`{Control>}i{/Control>}`);

    // expect the text to be bold
    expect(screen.getByText("Sample text not italic")).toHaveStyle(
      "font-style: italic",
    );
    await user.keyboard(`{Control>}i{/Control>}`);

    // expect the text to be normal
    expect(screen.getByText("Sample text not italic")).not.toHaveStyle(
      "font-style: italic",
    );
  });

  it("should load a custom plugin correctly", async () => {
    const MockPlugin = () => <div data-role="mock-plugin">Plugin loaded</div>;

    // render the TextEditor component
    render(
      <TextEditor
        labelText="Example"
        characterLimit={20}
        customPlugins={<MockPlugin />}
      />,
    );

    expect(screen.getByTestId("mock-plugin")).toBeInTheDocument();
  });
});
