import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { screen } from "@testing-library/react";
import { render } from "../../../../../__spec_helper__/__internal__/test-utils";

import ContentEditor from "./content-editor.component";

test("previews are rendered correctly if provided", () => {
  const previews = [<div key="preview-1">Preview 1</div>];
  render(
    <LexicalComposer
      initialConfig={{
        nodes: [],
        onError: () => {},
        namespace: "test",
      }}
    >
      <ContentEditor namespace="test" previews={previews} />
    </LexicalComposer>,
  );

  const preview = screen.getByText("Preview 1");

  // expect the preview to be rendered
  expect(preview).toBeInTheDocument();
});

test("no previews are rendered if the prop is not provided", () => {
  render(
    <LexicalComposer
      initialConfig={{
        nodes: [],
        onError: () => {},
        namespace: "test",
      }}
    >
      <ContentEditor namespace="test" />
    </LexicalComposer>,
  );

  const preview = screen.queryByText("Preview 1");

  // expect the preview not to be rendered
  expect(preview).not.toBeInTheDocument();
});
