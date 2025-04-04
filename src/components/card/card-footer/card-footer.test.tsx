import React from "react";
import { render, screen } from "@testing-library/react";
import Logger from "../../../__internal__/utils/logger";

import CardFooter from ".";

import Card from "../card.component";

test("logs console error if not wrapped in Card", () => {
  const loggerErrorSpy = jest
    .spyOn(Logger, "error")
    .mockImplementation(() => {});

  render(<CardFooter>content</CardFooter>);

  expect(loggerErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon Card: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerErrorSpy.mockRestore();
});

test("when variant prop is `transparent`, render with transparent background", () => {
  render(
    <Card>
      <CardFooter variant="transparent" data-role="card-footer">
        <div id="non-interactive">View Stripe Dashboard</div>
      </CardFooter>
    </Card>,
  );

  const cardFooterElement = screen.getByTestId("card-footer");
  expect(cardFooterElement).toHaveStyle({
    "background-color": "transparent",
  });
});

test.each(["default", "large"] as const)(
  "renders with the expected border radius styling when roundness is %s",
  (roundness) => {
    render(
      <Card roundness={roundness} spacing="medium">
        <CardFooter data-role="card-footer">foo</CardFooter>
      </Card>,
    );

    const cardFooterElement = screen.getByTestId("card-footer");
    expect(cardFooterElement).toHaveStyleRule(
      "border-bottom-left-radius",
      `var(--borderRadius${roundness === "default" ? "1" : "2"}00)`,
    );
    expect(cardFooterElement).toHaveStyleRule(
      "border-bottom-right-radius",
      `var(--borderRadius${roundness === "default" ? "1" : "2"}00)`,
    );
  },
);

test("has the expected data attributes when they are passed in", () => {
  render(
    <Card>
      <CardFooter data-element="foo" data-role="bar">
        <div />
      </CardFooter>
    </Card>,
  );

  const cardFooterElementWithAttributes = screen.getByTestId("bar");
  expect(cardFooterElementWithAttributes).toHaveAttribute(
    "data-element",
    "foo",
  );
  expect(cardFooterElementWithAttributes).toHaveAttribute("data-role", "bar");
});
