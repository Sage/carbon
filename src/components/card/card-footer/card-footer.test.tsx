import React from "react";
import { screen } from "@testing-library/react";
import CardFooter, { CardFooterProps } from ".";
import CardContext from "../__internal__/card.context";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

test("when variant prop is `transparent`, render with transparent background", () => {
  render(
    <CardFooter variant="transparent" data-role="card-footer">
      <div id="non-interactive">View Stripe Dashboard</div>
    </CardFooter>,
  );

  const cardFooterElement = screen.getByTestId("card-footer");
  expect(cardFooterElement).toHaveStyle({
    "background-color": "transparent",
  });
});

test.each<CardFooterProps["roundness"]>(["default", "large"])(
  "renders with the expected border radius styling when roundness is %s",
  (roundness) => {
    render(
      <CardContext.Provider
        value={{
          roundness,
          spacing: "medium",
        }}
      >
        <CardFooter data-role="card-footer">foo</CardFooter>
      </CardContext.Provider>,
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
    <CardFooter data-element="foo" data-role="bar">
      <div />
    </CardFooter>,
  );

  const cardFooterElementWithAttributes = screen.getByTestId("bar");
  expect(cardFooterElementWithAttributes).toHaveAttribute(
    "data-element",
    "foo",
  );
  expect(cardFooterElementWithAttributes).toHaveAttribute("data-role", "bar");
});
