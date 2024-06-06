import React, { useState } from "react";
import TextEditor, {
  TextEditorState as EditorState,
  TextEditorProps,
} from "./text-editor.component";
import Button from "../button";
import Box from "../box";

export default {
  title: "Text Editor/Test",
  excludeStories: ["TextEditorCustom", "TextEditorCustomValidation"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    labelText: {
      control: {
        type: "text",
      },
    },
    characterLimit: {
      control: {
        type: "number",
      },
    },
    rows: {
      control: {
        type: "number",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
    previews: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = ({ onChange, ...props }: Partial<TextEditorProps>) => {
  const [value, setValue] = useState(EditorState.createEmpty());
  return (
    <Box p={1}>
      <TextEditor
        onChange={(newValue) => {
          if (onChange) {
            onChange(newValue);
          }
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        {...props}
      />
    </Box>
  );
};

Default.storyName = "default";

export const WithCustomToolbarContent = () => {
  const [value, setValue] = useState(EditorState.createEmpty());
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        toolbarElements={[
          <Button aria-label="drucken" iconType="print" />,
          <Button buttonType="secondary" destructive onClick={() => {}}>
            Kündigen
          </Button>,
          <Button buttonType="primary" type="button" onClick={() => {}}>
            Speichern und beenden
          </Button>,
        ]}
        labelText="Text Editor Label"
      />
    </Box>
  );
};

WithCustomToolbarContent.storyName = "with custom toolbar content";
