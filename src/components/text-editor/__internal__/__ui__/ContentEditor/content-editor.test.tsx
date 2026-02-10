import { render, screen } from "@testing-library/react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import React from "react";

import TextEditor from "../../../text-editor.component";
import ContentEditor from "./content-editor.component";

test("previews are rendered correctly if provided", () => {
  const previews = [<div key="preview-1">Preview 1</div>];
  render(<TextEditor previews={previews} labelText="Example" />);

  const preview = screen.getByText("Preview 1");

  expect(preview).toBeVisible();
});

test("no previews are rendered if the prop is not provided", () => {
  render(<TextEditor labelText="Example" />);

  const preview = screen.queryByText("Preview 1");

  expect(preview).not.toBeInTheDocument();
});

test("defaults previews and size when rendered in a minimal lexical composer", () => {
  const initialConfig = {
    namespace: "test-content",
    nodes: [],
    onError: () => {},
  };

  render(
    <LexicalComposer initialConfig={initialConfig}>
      <ContentEditor namespace="test-content" />
    </LexicalComposer>,
  );

  const wrapper = screen.getByTestId("test-content-content-editable");
  expect(wrapper).toHaveStyleRule("padding", "12px", {
    modifier: ".test-content-editable",
  });
});
