import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import usePrevious from "./index";

interface MockComponentProps {
  value: string;
}
const MockComponent = ({ value }: MockComponentProps) => {
  const prev = usePrevious(value);
  return (
    <>
      <span data-role="current" data-value={value} />
      <span data-role="previous" data-value={prev} />
    </>
  );
};

test("returns undefined on first render", () => {
  render(<MockComponent value="foo" />);

  const previous = screen.getByTestId("previous").getAttribute("data-value");
  expect(previous).toBeNull();
});

test("when value changes, return the previous value", () => {
  const { rerender } = render(<MockComponent value="foo" />);
  expect(screen.getByTestId("current")).toHaveAttribute("data-value", "foo");

  rerender(<MockComponent value="bar" />);

  expect(screen.getByTestId("current")).toHaveAttribute("data-value", "bar");
  expect(screen.getByTestId("previous")).toHaveAttribute("data-value", "foo");
});
