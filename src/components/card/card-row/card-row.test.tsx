import React from "react";
import { render, screen } from "@testing-library/react";
import CardRow from "./card-row.component";
import CardContext, { CardContextProps } from "../__internal__/card.context";

test("renders content correctly when children are passed into CardRow", () => {
  const content = (
    <div>
      <span>content</span>
    </div>
  );
  render(<CardRow>{content}</CardRow>);

  expect(screen.getByText("content")).toBeInTheDocument();
});

test.each<[Exclude<CardContextProps["spacing"], undefined>, string]>([
  ["small", "var(--spacing200)"],
  ["medium", "var(--spacing300)"],
  ["large", "var(--spacing400)"],
])(
  "should receive spacing prop %s from parent via context setting top and bottom padding to %s",
  (spacing, expected) => {
    render(
      <CardContext.Provider value={{ spacing }}>
        <CardRow data-role="card-row">
          <div />
        </CardRow>
      </CardContext.Provider>,
    );

    const cardRowElement = screen.getByTestId("card-row");
    expect(cardRowElement).toHaveStyleRule("padding-top", expected);
    expect(cardRowElement).toHaveStyleRule("padding-bottom", expected);
  },
);

test("should have expected data attributes", () => {
  render(
    <CardRow data-element="card-row" data-role="card-row">
      <div />
    </CardRow>,
  );

  const cardRowElement = screen.getByTestId("card-row");
  expect(cardRowElement).toHaveAttribute("data-element", "card-row");
  expect(cardRowElement).toHaveAttribute("data-role", "card-row");

  render(
    <CardRow data-element="foo" data-role="bar">
      <div />
    </CardRow>,
  );

  const cardRowElementWithAttributes = screen.getByTestId("bar");
  expect(cardRowElementWithAttributes).toHaveAttribute("data-element", "foo");
  expect(cardRowElementWithAttributes).toHaveAttribute("data-role", "bar");
});
