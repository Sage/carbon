import React, { useState } from "react";
import TextEditor, {
  TextEditorState as EditorState,
  TextEditorContentState as ContentState,
  TextEditorProps,
} from "./text-editor.component";
import Button from "../button";
import CarbonProvider from "../carbon-provider";
import Box from "../box";

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
        toolbarElements={[
          <Button key="cancel button" buttonType="tertiary" onClick={() => {}}>
            Cancel
          </Button>,
          <Button
            key="save button"
            buttonType="primary"
            type="button"
            onClick={() => {}}
          >
            Save
          </Button>,
        ]}
        {...props}
      />
    </div>
  );
};

export const TextEditorCustomValidation = (props: Partial<TextEditorProps>) => {
  const [value, setValue] = React.useState(
    EditorState.createWithContent(ContentState.createFromText("Add content")),
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

export const TextEditorNewValidation = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("Add content")),
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box padding={2}>
        <TextEditor
          onChange={(newValue) => {
            setValue(newValue);
          }}
          value={value}
          labelText="Text Editor Label"
          characterLimit={limit}
          error={limit - contentLength <= 5 ? "There is an error" : undefined}
          warning={
            limit - contentLength <= 10 ? "There is a warning" : undefined
          }
          inputHint="Some additional hint text"
        />
      </Box>
    </CarbonProvider>
  );
};

export const TextEditorCharacterCount = ({
  onChange,
  onLinkAdded,
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
        toolbarElements={[
          <Button key="cancel button" buttonType="tertiary" onClick={() => {}}>
            Cancel
          </Button>,
          <Button
            key="save button"
            buttonType="primary"
            type="button"
            onClick={() => {}}
          >
            Save
          </Button>,
        ]}
        characterLimit={69}
      />
      <button type="button" onClick={() => {}}>
        Click Me
      </button>
    </div>
  );
};
