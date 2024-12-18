/* eslint-disable no-console */
import { Meta, StoryObj } from "@storybook/react";
import React, { useCallback, useEffect, useState } from "react";

import TextEditor, { createFromHTML, TextEditorProps } from ".";
import Box from "../box";
import Typography from "../typography";

import useDebounce from "../../hooks/__internal__/useDebounce";
import ReadOnlyEditor from "./__internal__";
import { SaveCallbackProps } from "./__internal__/plugins/Toolbar/buttons/save.component";

const meta: Meta<typeof TextEditor> = {
  title: "Text Editor/Test",
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
  const handleSave = useCallback(({ htmlString, json }: SaveCallbackProps) => {
    console.log("Save", { htmlString, json });
  }, []);
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
