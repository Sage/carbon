import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card, CardProps, CardFooter } from ".";
import { StyledCard } from "./card.style";

test("renders with correct data attributes", () => {
  render(
    <Card data-element="foo" data-role="bar">
      Row
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

test.each<CardProps["roundness"]>(["moderate", "curved"])(
  "renders with the expected border radius styling when roundness is %s and no footer passed",
  (roundness) => {
    render(
      <Card roundness={roundness} data-role="card">
        Content
      </Card>,
    );
    const radius =
      roundness === "moderate"
        ? "var(--global-radius-container-l)"
        : "var(--global-radius-container-xl)";

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
        foo
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

test("renders rightChildren content when draggable is true", () => {
  render(
    <Card draggable rightChildren={<button type="button">Move up</button>}>
      Content
    </Card>,
  );

  expect(screen.getByRole("button", { name: "Move up" })).toBeInTheDocument();
});

test("drag icon still renders alongside rightChildren when both are provided", () => {
  render(
    <Card draggable rightChildren={<button type="button">Move up</button>}>
      Content
    </Card>,
  );

  expect(screen.getByTestId("icon")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Move up" })).toBeInTheDocument();
});

test("does not render rightChildren when draggable is false", () => {
  render(
    <Card rightChildren={<button type="button">Move up</button>}>Content</Card>,
  );

  expect(
    screen.queryByRole("button", { name: "Move up" }),
  ).not.toBeInTheDocument();
});

test("drag icon is not rendered when draggable is false", () => {
  render(
    <Card rightChildren={<button type="button">Move up</button>}>Content</Card>,
  );

  expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
});

test("should call onClick callback when card is clicked", async () => {
  const handleClick = jest.fn();
  const user = userEvent.setup();

  render(
    <Card onClick={handleClick} data-role="card">
      Content
    </Card>,
  );

  const cardButton = screen.getByRole("button");

  await user.click(cardButton);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders with standard card type box shadow when variant is standard", () => {
  render(
    <Card variant="standard" data-role="card">
      Content
    </Card>,
  );

  const card = screen.getByTestId("card");

  expect(card).toHaveStyleRule("box-shadow", "var(--global-depth-lvl1)");
});

test("renders with outlined card type box shadow", () => {
  render(
    <Card variant="outlined" data-role="card">
      Content
    </Card>,
  );

  const card = screen.getByTestId("card");

  expect(card).toHaveStyleRule("box-shadow", "var(--global-depth-none)");
});

test("renders with no hover box shadow when variant is outlined and card is interactive", () => {
  render(
    <Card variant="outlined" onClick={() => {}} data-role="card">
      Content
    </Card>,
  );

  const card = screen.getByTestId("card");

  expect(card).toHaveStyleRule("box-shadow", "none", { modifier: ":hover" });
});

test("applies flex layout to the content container when spacing is extra-small", () => {
  render(
    <Card spacing="extra-small" onClick={() => {}} data-role="card">
      Content
    </Card>,
  );

  const contentEl = screen.getByRole("button");

  expect(contentEl).toHaveStyleRule("align-items", "stretch");
  expect(contentEl).toHaveStyleRule("align-self", "stretch");
});

test("StyledCard applies standard box shadow by default when variant is not provided", () => {
  render(
    <StyledCard
      $cardWidth="500px"
      $interactive={false}
      $draggable={false}
      $roundness="moderate"
      $spacing="medium"
      data-role="card"
    >
      Content
    </StyledCard>,
  );

  expect(screen.getByTestId("card")).toHaveStyleRule(
    "box-shadow",
    "var(--global-depth-lvl1)",
  );
});

test.each<CardProps["roundness"]>(["moderate", "curved"])(
  "renders content container with the expected border radius when roundness is %s",
  (roundness) => {
    render(
      <Card roundness={roundness} onClick={() => {}} data-role="card">
        Content
      </Card>,
    );

    const contentEl = screen.getByRole("button");
    const radius =
      roundness === "moderate"
        ? "var(--global-radius-container-l)"
        : "var(--global-radius-container-xl)";

    expect(contentEl).toHaveStyleRule("border-top-left-radius", radius);
    expect(contentEl).toHaveStyleRule("border-top-right-radius", radius);
    expect(contentEl).toHaveStyleRule("border-bottom-left-radius", radius);
    expect(contentEl).toHaveStyleRule("border-bottom-right-radius", radius);
  },
);
