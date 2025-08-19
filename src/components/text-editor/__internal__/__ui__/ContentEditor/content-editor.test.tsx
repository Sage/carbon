import { render, screen } from "@testing-library/react";
import React from "react";

import ContentEditor from "./content-editor.component";
import TestEditor from "../../TestEditor.component";

test("previews are rendered correctly if provided", () => {
  const previews = [<div key="preview-1">Preview 1</div>];

  render(
    <TestEditor>
      <ContentEditor namespace="test" previews={previews} />
    </TestEditor>,
  );

  const preview = screen.getByText("Preview 1");

  // expect the preview to be rendered
  expect(preview).toBeInTheDocument();
});

test("no previews are rendered if the prop is not provided", () => {
  render(
    <TestEditor>
      <ContentEditor namespace="test" />
    </TestEditor>,
  );

  const preview = screen.queryByText("Preview 1");

  // expect the preview not to be rendered
  expect(preview).not.toBeInTheDocument();
});
