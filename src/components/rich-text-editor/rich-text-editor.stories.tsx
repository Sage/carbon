import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import RichTextEditor, { CreateFromHTML } from "./rich-text-editor.component";

import Box from "../box";
import Button from "../button";
import Typography from "../typography";

const meta: Meta<typeof RichTextEditor> = {
  title: "Rich Text Editor",
  component: RichTextEditor,
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" />;
};
Default.storyName = "Default";

export const Required: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" required />;
};
Required.storyName = "Required";

export const Optional: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" isOptional />;
};
Optional.storyName = "Optional";

export const CharacterLimit: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" characterLimit={50} />;
};
CharacterLimit.storyName = "With Character Limit";

export const CommandButtons: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      onCancel={() => alert("Cancelled")}
      onSave={(values) => alert(values)}
    />
  );
};
CommandButtons.storyName = "With Command Buttons";

export const OnChange: Story = () => {
  const [state, setState] = React.useState<string | undefined>(undefined);
  return (
    <>
      <RichTextEditor labelText="Rich Text Editor" onChange={setState} />
      <div>Content: {state || "No content"}</div>
    </>
  );
};
OnChange.storyName = "With onChange Handler";

export const OnSave: Story = () => {
  const [data, setData] = useState({ htmlString: "<p><br></p>", json: {} });
  const [showData, setShowData] = useState(false);
  return (
    <>
      <>
        <RichTextEditor
          labelText="Rich Text Editor"
          onSave={(value) => value && setData(value)}
        />
      </>
      <Button
        buttonType="primary"
        size="small"
        my={2}
        onClick={() => setShowData(!showData)}
      >
        Show Data Formats
      </Button>
      {showData && (
        <Box
          display="flex"
          flexDirection="row"
          gap={4}
          justifyContent="space-around"
        >
          <Box maxWidth="30%">
            <Typography variant="h4" mb={1}>
              HTML
            </Typography>
            {data?.htmlString || "No content"}
          </Box>
          <Box maxWidth="30%">
            <Typography variant="h4" mb={1}>
              JSON
            </Typography>
            {JSON.stringify(data?.json, null, 2) || "No content"}
          </Box>
        </Box>
      )}
    </>
  );
};
OnSave.storyName = "With onSave Handler";

export const WithError: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      error="error"
      characterLimit={100}
    />
  );
};
WithError.storyName = "With Error";

export const WithWarning: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      warning="warning"
      characterLimit={100}
    />
  );
};
WithWarning.storyName = "With Warning";

export const WithJSONValue: Story = () => {
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
              text: "Sample text with ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "some formatting",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: " ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 2,
              mode: "normal",
              style: "",
              text: "applied",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: ".",
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
  const value = JSON.stringify(initialValue);
  return <RichTextEditor labelText="Rich Text Editor" value={value} />;
};
WithJSONValue.storyName = "With JSON As Initial Value";

export const WithHTMLValue: Story = () => {
  const initialValue = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = CreateFromHTML(initialValue);
  return <RichTextEditor labelText="Rich Text Editor" value={value} />;
};
WithHTMLValue.storyName = "With HTML As Initial Value";
