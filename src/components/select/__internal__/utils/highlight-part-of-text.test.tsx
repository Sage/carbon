import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../../__spec_helper__/__internal__/test-utils";

import highlightPartOfText from "./highlight-part-of-text";

test("returns same text back when there are no matching parts", () => {
  render(<main>{highlightPartOfText("abcdef", "foo")}</main>);

  expect(screen.getByRole("main")).toHaveTextContent("abcdef");
  expect(screen.queryByTestId("matching-text")).not.toBeInTheDocument();
});

test("returns same React element back when there are no matching parts", () => {
  render(<main>{highlightPartOfText(<div>abcdef</div>, "foo")}</main>);

  expect(screen.getByRole("main")).toHaveTextContent("abcdef");
  expect(screen.queryByTestId("matching-text")).not.toBeInTheDocument();
});

test("returns same text back when highlight pattern is an empty string", () => {
  render(<main>{highlightPartOfText("abcdef", "")}</main>);

  expect(screen.getByRole("main")).toHaveTextContent("abcdef");
  expect(screen.queryByTestId("matching-text")).not.toBeInTheDocument();
});

test("returns React element with a matching part highlighted", () => {
  render(<main>{highlightPartOfText("abcfoodef", "foo")}</main>);

  expect(screen.getByRole("main")).toHaveTextContent("abcfoodef");
  const matchedText = screen.getByTestId("matching-text");
  expect(matchedText).toHaveTextContent("foo");
  expect(matchedText).toHaveStyle({
    fontWeight: 500,
    textDecoration: "underline",
  });
});

test("returns React element with all matching parts highlighted", () => {
  render(<main>{highlightPartOfText("abcfoodeffoo", "foo")}</main>);

  expect(screen.getByRole("main")).toHaveTextContent("abcfoodeffoo");
  expect(screen.getAllByTestId("matching-text")).toHaveLength(2);
});
