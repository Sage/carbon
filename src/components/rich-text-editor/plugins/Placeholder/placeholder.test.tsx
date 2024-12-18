/**
 * Placeholder can be tested in isolation as it is a simple component with no
 * depencies on the parent RichTextEditor.
 */
import { render, screen } from "@testing-library/react";
import React from "react";
import Placeholder from "./placeholder.component";

describe("Placeholder", () => {
  test("should render the placeholder text", () => {
    render(<Placeholder namespace="test" text="This is a placeholder" />);
    const placeholder = screen.getByText("This is a placeholder");
    expect(placeholder).toBeInTheDocument();
  });

  test("should not render the placeholder text if nothing is provided", () => {
    render(<Placeholder namespace="test" text="" />);
    expect(screen.queryByText("This is a placeholder")).not.toBeInTheDocument();
  });
});
