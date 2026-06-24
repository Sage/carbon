import { render, screen } from "@testing-library/react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import React from "react";

import ContentEditor from "./content-editor.component";

test("previews are rendered correctly if provided", () => {
  const previews = [<div key="preview-1">Preview 1</div>];
  const initialConfig = {
    namespace: "test-content",
    nodes: [],
    onError: () => {},
  };

  render(
    <LexicalComposer initialConfig={initialConfig}>
      <ContentEditor namespace="test-content" previews={previews} />
    </LexicalComposer>,
  );

  const preview = screen.getByText("Preview 1");

  expect(preview).toBeVisible();
});

test("no previews are rendered if the prop is not provided", () => {
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

  const preview = screen.queryByText("Preview 1");

  expect(preview).not.toBeInTheDocument();
});
