import React from "react";
import { render, screen } from "@testing-library/react";

import useIsAboveBreakpoint from ".";
import { mockMatchMedia } from "../../../__spec_helper__/__internal__/test-utils";

test("Verifies that the hook returns false when the media query does not match the specified breakpoint", () => {
  mockMatchMedia(false);

  const TestComponent = () => {
    const aboveBreakpoint = useIsAboveBreakpoint(1000);
    return <span>{`${aboveBreakpoint}`}</span>;
  };
  render(<TestComponent />);

  expect(screen.getByText("false")).toBeInTheDocument();
});

test("Confirms that the hook returns true when the media query matches the specified breakpoint", () => {
  mockMatchMedia(true);

  const TestComponent = () => {
    const aboveBreakpoint = useIsAboveBreakpoint(1000);
    return <span>{`${aboveBreakpoint}`}</span>;
  };
  render(<TestComponent />);

  expect(screen.getByText("true")).toBeInTheDocument();
});
