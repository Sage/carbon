import React from "react";
import TextEditor from "./text-editor.component";

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
