import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../../../__spec_helper__/__internal__/test-utils";

import LinkPreviewer from "./link-previewer.component";

test("renders the link previewer component", () => {
  const previews = [<div key="1">Preview 1</div>, <div key="2">Preview 2</div>];
  render(<LinkPreviewer previews={previews} />);
  expect(screen.getByText("Preview 1")).toBeInTheDocument();
  expect(screen.getByText("Preview 2")).toBeInTheDocument();
});

test("renders an empty link previewer component if no previews are provided", () => {
  render(<LinkPreviewer />);
  expect(screen.queryByText("Preview 1")).not.toBeInTheDocument();
  expect(screen.queryByText("Preview 2")).not.toBeInTheDocument();
});
