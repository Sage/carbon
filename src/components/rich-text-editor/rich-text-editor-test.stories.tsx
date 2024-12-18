/* eslint-disable no-console */
import { Meta, StoryObj } from "@storybook/react";
import React, { useCallback, useEffect, useState } from "react";

import RichTextEditor, {
  CreateFromHTML,
  RichTextEditorProps,
} from "./rich-text-editor.component";
import Box from "../box";
import Button from "../button";
import Typography from "../typography";

import useDebounce from "../../hooks/__internal__/useDebounce";
import ReadOnlyEditor from "./__internal__";

const meta: Meta<typeof RichTextEditor> = {
  title: "Rich Text Editor/Test",
  component: RichTextEditor,
};

export default meta;

type Story = StoryObj<typeof RichTextEditor>;

export const Playground: Story = {
  args: {
    characterLimit: 3000,
    error: "",
    inputHint: "",
    isOptional: false,
    labelText: "Rich Text Editor",
    namespace: "carbon-storybook-rte",
    placeholder: "Enter text here",
    readOnly: false,
    required: false,
    resetOnCancel: false,
    rows: 10,
    warning: "",
  },
};

export const Functions = ({ ...props }: Partial<RichTextEditorProps>) => {
  const initialValue = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const defaultValue = CreateFromHTML(initialValue);

  const [resetOnCancel, setResetOnCancel] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(null);
  const debounceWaitTime = 2000;

  const handleChange = useDebounce((newValue) => {
    setDebouncedValue(newValue);
  }, debounceWaitTime);

  const handleCancel = useCallback(() => {
    console.log("Cancel");
  }, []);
  const handleSave = useCallback(({ htmlString, json }) => {
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
      <RichTextEditor
        labelText="Rich Text Editor"
        {...props}
        onCancel={handleCancel}
        onChange={handleChange}
        onLinkAdded={handleLinkAdded}
        onSave={handleSave}
        resetOnCancel={resetOnCancel}
        value={defaultValue}
      />
      <Typography>
        Reset On Cancel: {resetOnCancel ? "true" : "false"}
      </Typography>
      <Button onClick={() => setResetOnCancel(!resetOnCancel)}>
        Reset On Cancel
      </Button>
    </Box>
  );
};

Functions.storyName = "Functions";

export const ReadOnlyEditorForNotes = () => {
  const defaultValue = `This is a plain text example`;

  const htmlValue = CreateFromHTML(
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
