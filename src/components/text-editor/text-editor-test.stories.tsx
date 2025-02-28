/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import TextEditor, {
  createFromHTML,
  TextEditorProps,
  EditorFormattedValues,
} from ".";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

import Box from "../box";
import Typography from "../typography";

import useDebounce from "../../hooks/__internal__/useDebounce";
import ReadOnlyEditor from "./__internal__";

const meta: Meta<typeof TextEditor> = {
  title: "Text Editor/Test",
  excludeStories: ["meta"],
  component: TextEditor,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;

type Story = StoryObj<typeof TextEditor>;

export const Playground: Story = {
  args: {
    characterLimit: 3000,
    error: "",
    inputHint: "",
    isOptional: false,
    labelText: "Text Editor",
    namespace: "carbon-storybook-rte",
    placeholder: "Enter text here",
    readOnly: false,
    required: false,
    rows: 10,
    warning: "",
  },
};
Playground.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Functions = ({ ...props }: Partial<TextEditorProps>) => {
  const initialValue = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const defaultValue = createFromHTML(initialValue);

  const [debouncedValue, setDebouncedValue] = useState(null);
  const debounceWaitTime = 2000;

  const handleChange = useDebounce((newValue) => {
    setDebouncedValue(newValue);
  }, debounceWaitTime);

  const handleCancel = useCallback(() => {
    console.log("Cancel");
  }, []);
  const handleSave = useCallback(
    ({ htmlString, json }: EditorFormattedValues) => {
      console.log("Save", { htmlString, json });
    },
    [],
  );
  const handleLinkAdded = useCallback((value: string) => {
    console.log("Link Added", value);
  }, []);

  useEffect(() => {
    console.log("Debounced Value (via onChange)", debouncedValue);
  }, [debouncedValue]);

  return (
    <Box p={1}>
      <TextEditor
        labelText="Text Editor"
        {...props}
        onCancel={handleCancel}
        onChange={handleChange}
        onLinkAdded={handleLinkAdded}
        onSave={handleSave}
        value={defaultValue}
      />
    </Box>
  );
};

Functions.storyName = "Functions";
Functions.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ReadOnlyEditorForNotes = () => {
  const defaultValue = `This is a plain text example`;

  const htmlValue = createFromHTML(
    `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists <strong>and formatting</strong>!</span></li></ol>`,
  );

  return (
    <Box p={1}>
      <Typography>
        This version of the editor is provided exclusively for use in the `Note`
        component and as such is not available to consumers. It is
        stripped-down, simplified implementation akin to Lexical's most basic
        editor, and it's sole purpose is to display the content of `Note` in the
        correct display format. The light gray background is used to indicate
        the position of the editor, and is purely decorative for this story; it
        will not appear in the actual component.
      </Typography>
      <Box p={1} display="flex" gap={2} flexDirection="column">
        <Box p={1} backgroundColor="lightgray">
          <ReadOnlyEditor value={defaultValue} />
        </Box>
        <Box p={1} backgroundColor="lightgray">
          <ReadOnlyEditor value={htmlValue} />
        </Box>
      </Box>
    </Box>
  );
};

export const WithMargin: Story = () => {
  return (
    <TextEditor m={5} namespace="storybook-margin" labelText="Text Editor" />
  );
};
WithMargin.storyName = "With Margin";

export const OnChangeFormattedValues: Story = () => {
  const [valueJSON, setValueJSON] = React.useState<string | undefined>(
    undefined,
  );
  const [valueHTML, setValueHTML] = React.useState<string | undefined>(
    undefined,
  );
  return (
    <>
      <TextEditor
        namespace="storybook-onchange-formatted-values"
        labelText="Text Editor"
        onChange={(_, { htmlString, json }) => {
          setValueJSON(JSON.stringify(json, null, 2));
          setValueHTML(htmlString);
        }}
      />
      <div>
        <b>JSON formatted content:</b>
        <br /> {valueJSON}
      </div>
      <br />
      <br />
      <div>
        <b>HTML formatted content:</b>
        <br />
        {valueHTML}
      </div>
    </>
  );
};
OnChangeFormattedValues.storyName = "Change Handler With Formatted Values";
OnChangeFormattedValues.parameters = {
  chromatic: { disableSnapshot: true },
};

// Play Functions

export { meta };

const TextEditorDefaultComponent = () => {
  return <TextEditor namespace="storybook-default" labelText="Text Editor" />;
};

// For some unexplained reason, the Bold and Italic styles are not being applied.
export const TextEditorTyping: Story = {
  render: () => <TextEditorDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textEditor = canvas.getByTestId("storybook-default-editor-wrapper");
    const textArea = within(textEditor).getByRole("textbox");

    // Focus the text editor
    await userEvent.click(textArea);
    await userInteractionPause(300);
    // Type some text
    await userEvent.type(textArea, "Hello World");
    await userInteractionPause(300);
    // click bold button
    const boldButton = canvas.getByRole("button", { name: "Bold" });
    await userEvent.click(boldButton);
    await userInteractionPause(300);
    // Type some more text
    await userEvent.type(textArea, "This is bold text");
    await userInteractionPause(300);
    // click italic button
    const italicButton = canvas.getByRole("button", { name: "Italic" });
    await userEvent.click(italicButton);
    await userInteractionPause(300);
    // Type some more text
    await userEvent.type(textArea, "This is italic text");
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};
TextEditorTyping.parameters = {
  chromatic: { disableSnapshot: false },
};

// This example works for the unordered list but not the ordered list. Not sure why and it wil need investigating.
export const TextEditorLists: Story = {
  render: () => <TextEditorDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textEditor = canvas.getByTestId("storybook-default-editor-wrapper");
    const textArea = within(textEditor).getByRole("textbox");

    // Focus the text editor
    await userEvent.click(textArea);
    await userInteractionPause(300);
    // Type some text
    await userEvent.type(textArea, "Hello World");
    await userInteractionPause(300);
    // click Unordered List button
    const unorderedListButton = canvas.getByRole("button", {
      name: "Unordered list",
    });
    await userEvent.click(unorderedListButton);
    await userInteractionPause(300);
    // Type some more text
    await userEvent.type(textArea, "This is list text");
    await userInteractionPause(300);
    // press enter to start a new line
    await userEvent.keyboard("{Enter}");
    await userInteractionPause(300);
    // click ordered list button
    const orderedListButton = canvas.getByRole("button", {
      name: "Ordered list",
    });
    await userEvent.click(orderedListButton);
    await userInteractionPause(300);
    // Type some more text
    await userEvent.type(textArea, "This is more text");
    await userInteractionPause(300);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};
TextEditorLists.parameters = {
  chromatic: { disableSnapshot: false },
};
