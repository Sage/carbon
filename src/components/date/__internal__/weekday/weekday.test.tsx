import React from "react";
import { screen, render } from "@testing-library/react";

import Weekday from "./weekday.component";

const Component = (props: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => (
  <table>
    <thead>
      <tr>
        <Weekday {...props}>Foo</Weekday>
      </tr>
    </thead>
  </table>
);

test("should render the passed `title` as the attribute on the `abbr` element", () => {
  render(<Component title="title">Foo</Component>);
  const abbr = screen.getByTitle("title");

  expect(abbr).toBeInTheDocument();
  expect(abbr.tagName).toBe("ABBR");
});

test("should render the passed `className` on the `div` element", () => {
  render(<Component className="custom-class">Foo</Component>);
  const weekday = screen.getByRole("columnheader", { name: "Foo" });

  expect(weekday).toHaveClass("custom-class");
});
