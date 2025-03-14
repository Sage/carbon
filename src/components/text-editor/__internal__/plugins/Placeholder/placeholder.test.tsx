/**
 * Placeholder can be tested in isolation as it is a simple component with no
 * depencies on the parent TextEditor.
 */
import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../../../__spec_helper__/__internal__/test-utils";

import Placeholder from "./placeholder.component";

describe("Placeholder", () => {
  it("should render the placeholder text", () => {
    render(<Placeholder namespace="test" text="This is a placeholder" />);
    const placeholder = screen.getByText("This is a placeholder");
    expect(placeholder).toBeInTheDocument();
  });

  it("should not render the placeholder text if nothing is provided", () => {
    render(<Placeholder namespace="test" text="" />);
    expect(screen.queryByText("This is a placeholder")).not.toBeInTheDocument();
  });
});
