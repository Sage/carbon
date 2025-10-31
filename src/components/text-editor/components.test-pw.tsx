import React from "react";
import TextEditor from "./text-editor.component";
import MentionsPlugin from "./__internal__";

const TextEditorDefaultComponent = ({ ...props }) => {
  return (
    <TextEditor labelText="Playwright Example" namespace="pw-rte" {...props} />
  );
};

export default TextEditorDefaultComponent;

export const TextEditorWithHeader = () => {
  const headerButtons = (
    <>
      <button type="button">foo</button>
      <button type="button">bar</button>
      <button type="button">baz</button>
    </>
  );
  return (
    <TextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      header={headerButtons}
    />
  );
};

export const TextEditorWithHeaderOnSave = () => {
  const headerButtons = (
    <>
      <button type="button">foo</button>
      <button type="button">bar</button>
      <button type="button">baz</button>
    </>
  );
  return (
    <TextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      header={headerButtons}
      onSave={() => {}}
    />
  );
};

export const TextEditorWithHeaderOnCancel = () => {
  const headerButtons = (
    <>
      <button type="button">foo</button>
      <button type="button">bar</button>
      <button type="button">baz</button>
    </>
  );
  return (
    <TextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      header={headerButtons}
      onCancel={() => {}}
    />
  );
};

export const TextEditorWithFooter = () => {
  const footerButtons = (
    <>
      <button type="button">foo</button>
      <button type="button">bar</button>
      <button type="button">baz</button>
    </>
  );
  return (
    <TextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      footer={footerButtons}
    />
  );
};

export const TextEditorWithFooterOnSave = () => {
  const footerButtons = (
    <>
      <button type="button">foo</button>
      <button type="button">bar</button>
      <button type="button">baz</button>
    </>
  );
  return (
    <TextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      footer={footerButtons}
      onSave={() => {}}
    />
  );
};

export const TextEditorWithFooterOnCancel = () => {
  const footerButtons = (
    <>
      <button type="button">foo</button>
      <button type="button">bar</button>
      <button type="button">baz</button>
    </>
  );
  return (
    <TextEditor
      labelText="Playwright Example"
      namespace="pw-rte"
      footer={footerButtons}
      onCancel={() => {}}
    />
  );
};

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
