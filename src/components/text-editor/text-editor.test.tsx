import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";

import TextEditor, { createEmpty, createFromHTML } from ".";
import { COMPONENT_PREFIX } from "./__internal__/constants";

/**
 * Mock the OnChangePlugin whilst testing the full editor. This is to prevent
 * the editor from attempting to repeatedly create update listeners when the
 * tests are run, which causes errors to be thrown by Jest.
 *
 * The onChange prop is tested in the OnChangePlugin tests.
 */
jest.mock("./__internal__/plugins/OnChange/on-change.plugin", () => {
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

  // render the TextEditor component
  render(
    <TextEditor
      labelText="Example"
      onCancel={() => mockCancel()}
      onSave={() => mockSave()}
      value={value}
      characterLimit={20}
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
  expect(screen.getByTestId(`${COMPONENT_PREFIX}-toolbar`)).toBeInTheDocument();

  // expect the character counter to be rendered
  const characterCounter = screen.getByTestId(
    `${COMPONENT_PREFIX}-character-limit`,
  );

  expect(characterCounter).toBeInTheDocument();
  expect(characterCounter).toHaveTextContent("5 characters remaining");

  await user.click(editor);
  await user.keyboard("defghijklmnopqrstuvwxyz");
  expect(characterCounter).toHaveTextContent("0 characters remaining");

  // highlight all of the text and click the bold button
  await user.tripleClick(editor);
  const boldButton = screen.getByTestId(`${COMPONENT_PREFIX}-bold-button`);
  await user.click(boldButton);

  // expect the text to be bold
  expect(
    screen.getByText("Sample text abcdefghijklmnopqrstuvwxyz"),
  ).toHaveStyle("font-weight: bold");

  // click the bold button again and expect the text to be normal
  await user.click(boldButton);
  expect(
    screen.getByText("Sample text abcdefghijklmnopqrstuvwxyz"),
  ).not.toHaveStyle("font-weight: bold");

  // click the italic button
  const italicButton = screen.getByTestId(`${COMPONENT_PREFIX}-italic-button`);
  await user.click(italicButton);

  // expect the text to be italic
  expect(
    screen.getByText("Sample text abcdefghijklmnopqrstuvwxyz"),
  ).toHaveStyle("font-style: italic");

  // click the italic button again and expect the text to be normal
  await user.click(italicButton);
  expect(
    screen.getByText("Sample text abcdefghijklmnopqrstuvwxyz"),
  ).not.toHaveStyle("font-style: italic");

  // click the ordered list button
  const olButton = screen.getByTestId(
    `${COMPONENT_PREFIX}-ordered-list-button`,
  );
  await user.click(olButton);

  // Variable to store list for checks
  let list;

  // expect the text to be in an ordered list
  list = screen.getByRole("list");
  expect(list).toBeInstanceOf(HTMLOListElement);
  expect(
    within(list).getByText("Sample text abcdefghijklmnopqrstuvwxyz"),
  ).toBeInTheDocument();

  // click the ordered list button again and expect the text to be normal
  await user.click(olButton);
  expect(list).not.toBeInTheDocument();

  // click the unordered list button
  const ulButton = screen.getByTestId(
    `${COMPONENT_PREFIX}-unordered-list-button`,
  );
  await user.click(ulButton);

  // expect the text to be in an unordered list
  list = screen.getByRole("list");
  expect(list).toBeInstanceOf(HTMLUListElement);
  expect(
    within(list).getByText("Sample text abcdefghijklmnopqrstuvwxyz"),
  ).toBeInTheDocument();

  // click the unordered list button again and expect the text to be normal
  await user.click(ulButton);
  expect(list).not.toBeInTheDocument();

  // get both command buttons
  const cancelButton = screen.getByText("Cancel");
  const saveButton = screen.getByText("Save");

  // click each button and expect the respective callback to be called
  await user.click(saveButton);
  expect(mockSave).toHaveBeenCalledTimes(1);
  await user.click(cancelButton);
  expect(mockCancel).toHaveBeenCalledTimes(1);

  // expect the text to have been reset to the default value because of the above Cancel click
  expect(screen.getByText("Sample text")).toBeInTheDocument();
});

test("input hint renders correctly when inputHint prop is provided", () => {
  // render the TextEditor component with an input hint
  render(<TextEditor inputHint="This is an input hint" labelText="Example" />);

  // expect the input hint to be rendered
  expect(screen.getByText("This is an input hint")).toBeInTheDocument();
});

test("character limit renders correctly when characterLimit prop is provided", () => {
  // render the TextEditor component with a character limit
  render(<TextEditor characterLimit={100} labelText="Example" />);

  // expect the character counter to be rendered
  const characterCounter = screen.getByTestId(
    `${COMPONENT_PREFIX}-character-limit`,
  );
  expect(characterCounter).toBeInTheDocument();
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

test("required prop renders correctly when required prop is provided", () => {
  // render the TextEditor component with the required prop
  render(<TextEditor labelText="Example" required />);

  const label = screen.getByText("Example");
  // expect the required indicator to be rendered
  expect(label).toHaveStyleRule("content", '"*"', {
    modifier: "::after",
  });
});

test("optional prop renders correctly when optional prop is provided", () => {
  // render the TextEditor component with the optional prop
  render(<TextEditor labelText="Example" isOptional />);

  const label = screen.getByTestId("label-container");

  // expect the optional indicator to be rendered
  expect(label).toHaveStyleRule("content", '"(optional)"', {
    modifier: "::after",
  });
});

test("placeholder prop renders correctly when placeholder prop is provided", () => {
  // render the TextEditor component with a placeholder
  render(
    <TextEditor labelText="Example" placeholder="This is a nice placeholder" />,
  );

  // expect the placeholder to be rendered
  expect(screen.getByText("This is a nice placeholder")).toBeInTheDocument();
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

  const errorMessage = screen.getByText("This is an error");

  // expect the error message to be rendered
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveStyle("color: var(--colorsSemanticNegative500)");
});

test("validation renders correctly when warning prop is provided", () => {
  // render the TextEditor component with an error
  render(<TextEditor warning="This is a warning" labelText="Example" />);

  const warningMessage = screen.getByText("This is a warning");

  // expect the warning message to be rendered
  expect(warningMessage).toBeInTheDocument();
  expect(warningMessage).toHaveStyle("color: var(--colorsSemanticCaution500)");
});

test("serialisation of editor", async () => {
  const user = userEvent.setup();
  const mockSave = jest.fn();

  render(
    <TextEditor
      labelText="Text Editor"
      onSave={(values) => mockSave(values)}
      value={JSON.stringify(initialValue)}
    />,
  );

  const saveButton = screen.getByText("Save");

  // click the save button and expect the callback to be called
  await user.click(saveButton);
  expect(mockSave).toHaveBeenCalledTimes(1);
});

test("valid data is parsed when HTML is passed into the createFromHTML function", async () => {
  const html = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = createFromHTML(html);
  expect(JSON.parse(value)).toEqual({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "This is a HTML example.",
              type: "text",
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
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Look, it has lists!",
                  type: "text",
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

test("valid state is created when the CreateEmpty function is called", async () => {
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
  render(<TextEditor labelText="Text Editor" value={value} />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveTextContent("");
});

test("previews are rendered correctly if provided", () => {
  const previews = [<div key="preview-1">Preview 1</div>];
  render(<TextEditor previews={previews} labelText="Example" />);

  const preview = screen.getByText("Preview 1");

  // expect the preview to be rendered
  expect(preview).toBeInTheDocument();
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

test("readOnly prop renders correctly when readOnly prop is provided", () => {
  // render the TextEditor component with the readOnly prop
  render(<TextEditor labelText="Example" readOnly />);

  // expect the editor to be read-only
  const editor = screen.getByTestId(`${COMPONENT_PREFIX}-editable`);
  expect(editor).toHaveAttribute("contenteditable", "false");
});

test("should toggle the list type when a list is active and the alternate list type is clicked", async () => {
  const user = userEvent.setup();
  const value = createFromHTML(
    `<ul><li value="1"><span style="white-space: pre-wrap;">Example List</span></li></ul>`,
  );
  // render the TextEditor component
  render(<TextEditor labelText="Example" namespace="test" value={value} />);
  const olButton = screen.getByTestId(`test-ordered-list-button`);
  const ulButton = screen.getByTestId(`test-unordered-list-button`);
  expect(olButton).toBeInTheDocument();
  expect(ulButton).toBeInTheDocument();
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByRole("list").tagName).toBe("UL");
  const listText = screen.getByText("Example List");
  await user.click(listText);
  await user.click(olButton);
  expect(screen.getByRole("list").tagName).toBe("OL");
  await user.click(listText);
  await user.click(ulButton);
  expect(screen.getByRole("list").tagName).toBe("UL");
});

test("should toggle the an indiviual list item's type when a list is active and the alternate list type is clicked", async () => {
  const user = userEvent.setup();
  const value = createFromHTML(
    `<ul><li value="1"><span style="white-space: pre-wrap;">Example List</span></li><li value="2"><span style="white-space: pre-wrap;">Change Me</span></li><li value="3"><span style="white-space: pre-wrap;">Example List</span></li></ul>`,
  );
  // render the TextEditor component
  render(<TextEditor labelText="Example" namespace="test" value={value} />);
  const olButton = screen.getByTestId(`test-ordered-list-button`);
  const ulButton = screen.getByTestId(`test-unordered-list-button`);
  expect(olButton).toBeInTheDocument();
  expect(ulButton).toBeInTheDocument();
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByRole("list").tagName).toBe("UL");
  const listText = screen.getByText("Change Me");
  await user.click(listText);
  await user.click(olButton);
  expect(screen.queryAllByRole("list").length).toBe(3);
  await user.click(listText);
  await user.click(ulButton);
  expect(screen.queryAllByRole("list").length).toBe(1);
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
        value={value}
        characterLimit={20}
      />,
    );

    // Click the editor space and send a few key presses
    const editor = screen.getByRole(`textbox`);
    await user.click(editor);
    await user.keyboard(" not bold");

    // expect the edited value to be visible
    expect(screen.getByText("Sample text not bold")).toBeInTheDocument();
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
        value={value}
        characterLimit={20}
      />,
    );

    // Click the editor space and send a few key presses
    const editor = screen.getByRole(`textbox`);
    await user.click(editor);
    await user.keyboard(" not italic");

    // expect the edited value to be visible
    expect(screen.getByText("Sample text not italic")).toBeInTheDocument();
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
});
