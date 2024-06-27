import React from "react";
import { screen, render } from "@testing-library/react";

import Weekday from "./weekday.component";

test("should render the passed `title` as the attribute on the `abbr` element", () => {
  render(<Weekday title="title">Foo</Weekday>);
  const abbr = screen.getByTitle("title");

  expect(abbr).toBeInTheDocument();
  expect(abbr.tagName).toBe("ABBR");
});

test("should render the passed `className` on the `div` element", () => {
  render(<Weekday className="custom-class">Foo</Weekday>);
  const weekday = screen.getByRole("columnheader", { name: "Foo" });

  expect(weekday).toHaveClass("custom-class");
});
