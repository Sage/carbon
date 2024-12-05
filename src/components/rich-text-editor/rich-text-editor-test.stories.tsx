import React from "react";
import RichTextEditor, {
  RichTextEditorProps,
} from "./rich-text-editor.component";

export default {
  title: "Rich Text Editor/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = ({
  label,
  isRequired,
  optional,
  showCommandButtons,
  characterLimit,
  ...args
}: RichTextEditorProps) => (
  <RichTextEditor
    label={label}
    isRequired={isRequired}
    optional={optional}
    showCommandButtons={showCommandButtons}
    characterLimit={characterLimit}
    {...args}
  />
);

DefaultStory.story = {
  name: "default",
  args: {
    characterLimit: 0,
    isRequired: false,
    label: "Rich Text Editor",
    optional: false,
    showCommandButtons: false,
  },
};

export const RichTextEditorComponentTest = (
  props: Partial<RichTextEditorProps>,
) => {
  return <RichTextEditor label="Rich Text Editor Test" {...props} />;
};
