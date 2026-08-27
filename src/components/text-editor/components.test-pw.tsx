import React from "react";
import TextEditor from "./text-editor.component";
import MentionsPlugin from "./__internal__";
import { createFromHTML } from "./__internal__/__utils__/helpers";

const TextEditorDefaultComponent = ({ ...props }) => {
  return (
    <TextEditor labelText="Playwright Example" namespace="pw-rte" {...props} />
  );
};

export default TextEditorDefaultComponent;

export const TextEditorWithMentions = ({ ...args }) => (
  <TextEditor
    labelText="Playwright Example"
    namespace="pw-rte"
    {...args}
    customPlugins={
      <MentionsPlugin
        namespace="pw-rte-mentions"
        searchOptions={[
          {
            id: "1",
            name: "Amanda Ball",
          },
          {
            id: "2",
            name: "Anaya Underwood",
          },
          {
            id: "3",
            name: "Tylar Cox",
          },
          {
            id: "4",
            name: "Ibrahim Abbasov",
          },
        ]}
      />
    }
  />
);

export const TextEditorWithOrderedListInitialValue = () => (
  <TextEditor
    labelText="Playwright Example"
    namespace="pw-rte"
    initialValue={createFromHTML(
      `<p>Some text.</p><ol><li value="1">A list item</li></ol>`,
    )}
  />
);
