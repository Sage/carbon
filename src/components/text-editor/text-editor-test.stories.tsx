import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TextEditor, { createFromHTML, TextEditorProps } from ".";
import Box from "../box";
import Typography from "../typography";
import CarbonProvider from "../carbon-provider";
import Textbox from "../textbox";

import useDebounce from "../../hooks/__internal__/useDebounce";
import ReadOnlyEditor from "./__internal__";

const meta: Meta<typeof TextEditor> = {
  title: "Text Editor/Test",
  component: TextEditor,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;

type Story = StoryObj<typeof TextEditor>;

export const NewValidation: Story = () => {
  return (
    <>
      <TextEditor
        namespace="storybook-witherror"
        labelText="Text Editor"
        inputHint="Hint text"
        error="error"
        characterLimit={100}
        mb={2}
      />
      <TextEditor
        namespace="storybook-withwarning"
        labelText="Text Editor"
        warning="warning"
        characterLimit={100}
      />
    </>
  );
};
NewValidation.storyName = "New Validation";

export const MultipleInputs: Story = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Textbox mb={2} label="Textbox" inputHint="Hint Text" error="error" />
      <TextEditor
        namespace="storybook-witherror"
        labelText="Text Editor"
        inputHint="Hint text"
        error="error"
        characterLimit={100}
        mb={2}
      />
      <Textbox mb={2} label="Textbox" inputHint="Hint Text" />
      <TextEditor
        namespace="storybook"
        labelText="Text Editor"
        inputHint="Hint text"
        characterLimit={100}
      />
    </CarbonProvider>
  );
};
MultipleInputs.storyName = "Multiple Inputs";

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

  const handleChange = useDebounce<NonNullable<TextEditorProps["onChange"]>>(
    (...args) => {
      action("onChange")(args);
    },
    2000,
  );

  return (
    <Box p={1}>
      <TextEditor
        labelText="Text Editor"
        {...props}
        onCancel={action("onCancel")}
        onChange={handleChange}
        onLinkAdded={action("onLinkAdded")}
        onSave={action("onSave")}
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
