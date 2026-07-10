import React from "react";
import { render, screen } from "@testing-library/react";
import Logger from "../../../__internal__/utils/logger";

import CardRow from "./card-row.component";

import Card from "../card.component";

test("logs console error if not wrapped in Card", () => {
  const loggerErrorSpy = jest
    .spyOn(Logger, "error")
    .mockImplementation(() => {});

  render(<CardRow>content</CardRow>);

  expect(loggerErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon Card: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerErrorSpy.mockRestore();
});

test("renders content correctly when children are passed into CardRow", () => {
  const content = (
    <div>
      <span>content</span>
    </div>
  );
  render(
    <Card>
      <CardRow>{content}</CardRow>
    </Card>,
  );

  expect(screen.getByText("content")).toBeInTheDocument();
});

test.each([
  ["small", "var(--spacing200)"],
  ["medium", "var(--spacing300)"],
  ["large", "var(--spacing400)"],
] as const)(
  "should receive spacing prop %s from parent via context setting top and bottom padding to %s",
  (spacing, expected) => {
    render(
      <Card spacing={spacing}>
        <CardRow data-role="card-row">
          <div />
        </CardRow>
      </Card>,
    );

    const cardRowElement = screen.getByTestId("card-row");
    expect(cardRowElement).toHaveStyleRule("padding-top", expected);
    expect(cardRowElement).toHaveStyleRule("padding-bottom", expected);
  },
);

test("should have expected data attributes", () => {
  render(
    <Card>
      <CardRow data-element="card-row" data-role="card-row">
        <div />
      </CardRow>
    </Card>,
  );

  const cardRowElement = screen.getByTestId("card-row");
  expect(cardRowElement).toHaveAttribute("data-element", "card-row");
  expect(cardRowElement).toHaveAttribute("data-role", "card-row");

  render(
    <Card>
      <CardRow data-element="foo" data-role="bar">
        <div />
      </CardRow>
    </Card>,
  );

  const cardRowElementWithAttributes = screen.getByTestId("bar");
  expect(cardRowElementWithAttributes).toHaveAttribute("data-element", "foo");
  expect(cardRowElementWithAttributes).toHaveAttribute("data-role", "bar");
});
