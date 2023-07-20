import React, { useState } from "react";
import TextEditor, {
  TextEditorState as EditorState,
  TextEditorContentState as ContentState,
  TextEditorProps,
} from "./text-editor.component";

export default {
  title: "Text Editor/Test",
  includeStories: ["Default"],
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
  },
};

export const Default = ({ onChange, ...props }: Partial<TextEditorProps>) => {
  const [value, setValue] = useState(EditorState.createEmpty());
  return (
    <div style={{ padding: "4px" }}>
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
    </div>
  );
};

Default.storyName = "default";

const createContent = (text?: string) => {
  if (text) {
    return EditorState.createWithContent(ContentState.createFromText(text));
  }
  return EditorState.createEmpty();
};

export const TextEditorCustom = ({
  onChange,
  onLinkAdded,
  ...props
}: Partial<TextEditorProps>) => {
  const [value, setValue] = React.useState(createContent());
  const ref = React.useRef(null);

  return (
    <div
      style={{
        padding: "4px",
      }}
    >
      <TextEditor
        onChange={(newValue) => {
          if (onChange) {
            onChange(newValue);
          }
          setValue(newValue);
        }}
        value={value}
        ref={ref}
        labelText="Text Editor Label"
        onLinkAdded={onLinkAdded}
        {...props}
      />
    </div>
  );
};

export const TextEditorCustomValidation = (props: Partial<TextEditorProps>) => {
  const [value, setValue] = React.useState(
    EditorState.createWithContent(ContentState.createFromText("Add content"))
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  const ref = React.useRef(null);

  return (
    <div
      style={{
        padding: "4px",
      }}
    >
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        ref={ref}
        labelText="Text Editor Label"
        characterLimit={limit}
        error={limit - contentLength <= 5 ? "There is an error" : undefined}
        warning={limit - contentLength <= 10 ? "There is a warning" : undefined}
        info={limit - contentLength <= 15 ? "There is an info" : undefined}
        {...props}
      />
    </div>
  );
};
