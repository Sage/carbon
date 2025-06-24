import React, { useState } from "react";
import TextEditor, { createFromHTML } from ".";

const TextEditorDefaultComponent = ({ ...props }) => {
  return (
    <TextEditor labelText="Playwright Example" namespace="pw-rte" {...props} />
  );
};

export default TextEditorDefaultComponent;

export const TextEditorControlled = ({
  onChange,
}: {
  onChange?: () => void;
}) => {
  const [value, setValue] = useState<string>(
    createFromHTML("<p>Initial controlled text</p>"),
  );

  const handleChange = (newValue: string) => {
    if (onChange) onChange();
    setValue(createFromHTML(newValue));
  };

  return (
    <TextEditor
      labelText="Playwright Example (Controlled)"
      namespace="pw-rte"
      value={value}
      onChange={handleChange}
    />
  );
};
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
