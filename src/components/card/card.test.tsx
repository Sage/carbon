import React from "react";
import { screen } from "@testing-library/react";
import { Card, CardProps, CardRow, CardFooter } from ".";
import { render } from "../../__spec_helper__/__internal__/test-utils";

test("renders with correct data attributes", () => {
  render(
    <Card data-element="foo" data-role="bar">
      <CardRow>Row</CardRow>
    </Card>,
  );

  const card = screen.getByTestId("bar");

  expect(card).toHaveAttribute("data-element", "foo");
  expect(card).toHaveAttribute("data-role", "bar");
});

test("child content is rendered inside the card", () => {
  const text = "foobar";

  render(
    <Card data-element="foo" data-role="bar">
      {text}
    </Card>,
  );

  const card = screen.getByTestId("bar");

  expect(card).toHaveTextContent(text);
});

test.each<CardProps["roundness"]>(["default", "large"])(
  "renders with the expected border radius styling when roundness is %s and no footer passed",
  (roundness) => {
    render(
      <Card roundness={roundness} data-role="card">
        Content
      </Card>,
    );
    const borderRadiusValue = roundness === "default" ? "100" : "200";
    const radius = `var(--borderRadius${borderRadiusValue})`;

    const cardElement = screen.getByTestId("card");

    expect(cardElement).toHaveStyleRule("border-radius", radius);
  },
);

test("when width prop is not passed, component width fills containing element", () => {
  render(<Card data-role="card">Foobar</Card>);

  const cardElement = screen.getByTestId("card");

  expect(cardElement).toHaveStyle({ width: "500px" });
});

test.each([
  ["percentage", "50%"],
  ["pixel", "100px"],
])(
  "render with correct width when width prop is passed as a %s value",
  (_, width) => {
    render(
      <Card width={width} data-role="card">
        Foobar
      </Card>,
    );

    const cardElement = screen.getByTestId("card");

    expect(cardElement).toHaveStyle({ width });
  },
);

test("underlying element for Card should have data-element and data-role attributes when provided", () => {
  const dataElement = "foo";
  const dataRole = "baz";

  render(
    <Card data-element={dataElement} data-role={dataRole}>
      Foobar
    </Card>,
  );

  const cardElement = screen.getByTestId(dataRole);

  expect(cardElement).toHaveAttribute("data-element", dataElement);
  expect(cardElement).toHaveAttribute("data-role", dataRole);
});

test.each([
  ["onClick", { onClick: () => {} }],
  ["href", { href: "foo" }],
])(
  "should warn when CardFooter is passed as children and Card has %s passed",
  (_, props) => {
    const consoleSpy = jest
      .spyOn(global.console, "warn")
      .mockImplementation(() => {});

    render(
      <Card {...props}>
        <CardRow>foo</CardRow>
        <CardFooter>foo</CardFooter>
      </Card>,
    );

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockReset();
  },
);

test("when draggable prop is true cursor changes to move icon when Card is hovered over", () => {
  render(
    <Card draggable data-role="card">
      Content
    </Card>,
  );

  const cardElement = screen.getByTestId("card");

  expect(cardElement).toHaveStyle({ cursor: "move" });
});
