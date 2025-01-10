import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import RichTextEditor, { CreateFromHTML } from ".";
import { componentPrefix } from "./constants";

/**
 * Mock the OnChangePlugin whilst testing the full editor. This is to prevent
 * the editor from attempting to repeatedly create update listeners when the
 * tests are run, which causes errors to be thrown by Jest.
 *
 * The onChange prop is tested in the OnChangePlugin tests.
 */
jest.mock("./plugins/OnChange/on-change.plugin", () => {
  return jest.fn().mockReturnValue(null);
});

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
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

test("rendering and basic functionality", async () => {
  const user = userEvent.setup();
  const mockCancel = jest.fn();
  const mockSave = jest.fn();
  const value = JSON.stringify(initialValue);

  // render the RichTextEditor component
  render(
    <RichTextEditor
      labelText="Example"
      onCancel={() => mockCancel()}
      onSave={() => mockSave()}
      value={value}
    />,
  );

  // expect the editor to be rendered with the default value
  expect(screen.getByText("Sample text")).toBeInTheDocument();

  // Click the editor space and send a few key presses
  const editor = screen.getByRole(`textbox`);
  await user.click(editor);
  await user.keyboard(" abc");

  // expect the edited value to be visible
  expect(screen.getByText("Sample text abc")).toBeInTheDocument();

  // expect the label to be rendered
  expect(screen.getByText("Example")).toBeInTheDocument();

  // expect the toolbar to be rendered
  expect(screen.getByTestId(`${componentPrefix}-toolbar`)).toBeInTheDocument();

  // expect the character counter to be rendered
  const characterCounter = screen.getByTestId(
    `${componentPrefix}-character-limit`,
  );
  expect(characterCounter).toBeInTheDocument();
  expect(characterCounter).toHaveTextContent("3000 characters remaining");

  // get both command buttons
  const cancelButton = screen.getByText("Cancel");
  const saveButton = screen.getByText("Save");

  // click each button and expect the respective callback to be called
  await user.click(saveButton);
  expect(mockSave).toHaveBeenCalledTimes(1);
  await user.click(cancelButton);
  expect(mockCancel).toHaveBeenCalledTimes(1);

  // highlight all of the text and click the bold button
  await user.tripleClick(editor);
  const boldButton = screen.getByTestId(`${componentPrefix}-bold-button`);
  await user.click(boldButton);

  // expect the text to be bold
  expect(screen.getByText("Sample text abc")).toHaveStyle("font-weight: bold");

  // click the bold button again and expect the text to be normal
  await user.click(boldButton);
  expect(screen.getByText("Sample text abc")).not.toHaveStyle(
    "font-weight: bold",
  );

  // click the italic button
  const italicButton = screen.getByTestId(`${componentPrefix}-italic-button`);
  await user.click(italicButton);

  // expect the text to be italic
  expect(screen.getByText("Sample text abc")).toHaveStyle("font-style: italic");

  // click the italic button again and expect the text to be normal
  await user.click(italicButton);
  expect(screen.getByText("Sample text abc")).not.toHaveStyle(
    "font-style: italic",
  );

  // click the ordered list button
  const olButton = screen.getByTestId(`${componentPrefix}-ordered-list-button`);
  await user.click(olButton);

  // Variable to store list for checks
  let list;

  // expect the text to be in an ordered list
  list = screen.getByRole("list");
  expect(list).toBeInstanceOf(HTMLOListElement);
  expect(within(list).getByText("Sample text abc")).toBeInTheDocument();

  // click the ordered list button again and expect the text to be normal
  await user.click(olButton);
  expect(list).not.toBeInTheDocument();

  // click the unordered list button
  const ulButton = screen.getByTestId(
    `${componentPrefix}-unordered-list-button`,
  );
  await user.click(ulButton);

  // expect the text to be in an unordered list
  list = screen.getByRole("list");
  expect(list).toBeInstanceOf(HTMLUListElement);
  expect(within(list).getByText("Sample text abc")).toBeInTheDocument();

  // click the unordered list button again and expect the text to be normal
  await user.click(ulButton);
  expect(list).not.toBeInTheDocument();
});

test("input hint renders correctly when inputHint prop is provided", () => {
  // render the RichTextEditor component with an input hint
  render(
    <RichTextEditor inputHint="This is an input hint" labelText="Example" />,
  );

  // expect the input hint to be rendered
  expect(screen.getByText("This is an input hint")).toBeInTheDocument();
});

test("character limit renders correctly when characterLimit prop is provided", () => {
  // render the RichTextEditor component with a character limit
  render(<RichTextEditor characterLimit={100} labelText="Example" />);

  // expect the character counter to be rendered
  const characterCounter = screen.getByTestId(
    `${componentPrefix}-character-limit`,
  );
  expect(characterCounter).toBeInTheDocument();
  expect(characterCounter).toHaveTextContent("100 characters remaining");
});

test("character limit is not rendered when characterLimit prop is provided with a value of 0", () => {
  // render the RichTextEditor component with a character limit
  render(<RichTextEditor characterLimit={0} labelText="Example" />);

  // expect the character counter to be rendered
  const characterCounter = screen.queryByTestId(
    `${componentPrefix}-character-limit`,
  );
  expect(characterCounter).not.toBeInTheDocument();
});

test("required prop renders correctly when required prop is provided", () => {
  // render the RichTextEditor component with the required prop
  render(<RichTextEditor labelText="Example" required />);

  const label = screen.getByText("Example");
  // expect the required indicator to be rendered
  expect(label).toHaveStyleRule("content", '"*"', {
    modifier: "::after",
  });
});

test("optional prop renders correctly when optional prop is provided", () => {
  // render the RichTextEditor component with the optional prop
  render(<RichTextEditor labelText="Example" isOptional />);

  const label = screen.getByTestId("label-container");

  // expect the optional indicator to be rendered
  expect(label).toHaveStyleRule("content", '"(optional)"', {
    modifier: "::after",
  });
});

test("placeholder prop renders correctly when placeholder prop is provided", () => {
  // render the RichTextEditor component with a placeholder
  render(
    <RichTextEditor
      labelText="Example"
      placeholder="This is a nice placeholder"
    />,
  );

  // expect the placeholder to be rendered
  expect(screen.getByText("This is a nice placeholder")).toBeInTheDocument();
});

test("rows prop renders correctly when rows prop is provided", () => {
  // render the RichTextEditor component with a rows prop
  render(<RichTextEditor labelText="Example" rows={20} />);

  // expect the editor to have the correct number of rows
  const editor = screen.getByTestId(`${componentPrefix}-editable`);
  expect(editor).toHaveStyle("min-height: 420px");
});

test("validation renders correctly when error prop is provided", () => {
  // render the RichTextEditor component with an error
  render(<RichTextEditor error="This is an error" labelText="Example" />);

  const errorMessage = screen.getByText("This is an error");

  // expect the error message to be rendered
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveStyle("color: var(--colorsSemanticNegative500)");
});

test("validation renders correctly when warning prop is provided", () => {
  // render the RichTextEditor component with an error
  render(<RichTextEditor warning="This is a warning" labelText="Example" />);

  const warningMessage = screen.getByText("This is a warning");

  // expect the warning message to be rendered
  expect(warningMessage).toBeInTheDocument();
  expect(warningMessage).toHaveStyle("color: var(--colorsSemanticCaution500)");
});

test("serialisation of editor", async () => {
  const user = userEvent.setup();
  const mockSave = jest.fn();
  render(
    <RichTextEditor
      labelText="Rich Text Editor"
      onSave={(values) => mockSave(values)}
      value={JSON.stringify(initialValue)}
    />,
  );

  const saveButton = screen.getByText("Save");

  // click the save button and expect the callback to be called
  await user.click(saveButton);
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave.mock.calls[0][0]).toMatchSnapshot();
});

test("valid data is parsed when HTML is passed into the CreateFromHTML function", async () => {
  const html = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = CreateFromHTML(html);
  expect(value).toMatchSnapshot();
});

test("previews are rendered correctly if provided", () => {
  const previews = [<div>Preview 1</div>];
  render(<RichTextEditor previews={previews} labelText="Example" />);

  const preview = screen.getByText("Preview 1");

  // expect the preview to be rendered
  expect(preview).toBeInTheDocument();
});

test("no previews are rendered if the prop is not provided", () => {
  render(<RichTextEditor labelText="Example" />);

  const preview = screen.queryByText("Preview 1");

  // expect the preview not to be rendered
  expect(preview).not.toBeInTheDocument();
});

test("should reset the content to default if resetOnCancel is true", async () => {
  const user = userEvent.setup();
  const mockCancel = jest.fn();
  const mockSave = jest.fn();
  const value = JSON.stringify(initialValue);

  // render the RichTextEditor component
  render(
    <RichTextEditor
      labelText="Example"
      onCancel={() => mockCancel()}
      onSave={() => mockSave()}
      resetOnCancel
      value={value}
    />,
  );

  // Click the editor space and send a few key presses
  const editor = screen.getByRole(`textbox`);
  await user.click(editor);
  await user.keyboard(" abc");

  // expect the edited value to be visible
  expect(screen.getByText("Sample text abc")).toBeInTheDocument();

  // Click the cancel button
  const cancelButton = screen.getByText("Cancel");
  await user.click(cancelButton);

  // expect the editor to be rendered with the default value
  expect(screen.getByText("Sample text")).toBeInTheDocument();
});

test("should not reset the content to default if resetOnCancel is false", async () => {
  const user = userEvent.setup();
  const mockCancel = jest.fn();
  const mockSave = jest.fn();
  const value = JSON.stringify(initialValue);

  // render the RichTextEditor component
  render(
    <RichTextEditor
      labelText="Example"
      onCancel={() => mockCancel()}
      onSave={() => mockSave()}
      resetOnCancel={false}
      value={value}
    />,
  );

  // Click the editor space and send a few key presses
  const editor = screen.getByRole(`textbox`);
  await user.click(editor);
  await user.keyboard(" abc");

  // expect the edited value to be visible
  expect(screen.getByText("Sample text abc")).toBeInTheDocument();

  // Click the cancel button
  const cancelButton = screen.getByText("Cancel");
  await user.click(cancelButton);

  // expect the editor to be rendered with the default value
  expect(screen.getByText("Sample text abc")).toBeInTheDocument();
});

test("readOnly prop renders correctly when readOnly prop is provided", () => {
  // render the RichTextEditor component with the readOnly prop
  render(<RichTextEditor labelText="Example" readOnly />);

  // expect the editor to be read-only
  const editor = screen.getByTestId(`${componentPrefix}-editable`);
  expect(editor).toHaveAttribute("contenteditable", "false");
});
