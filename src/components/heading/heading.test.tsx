import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CarbonProvider from "../carbon-provider";
import Pill from "../pill";
import Heading, { HeadingType } from ".";

test("renders with custom data tags", () => {
  render(
    <Heading
      title="foo"
      data-role="heading"
      data-component="heading"
      data-element="heading"
    />,
  );

  const headingWrapper = screen.getByTestId("heading");
  expect(headingWrapper).toHaveAttribute("data-component", "heading");
  expect(headingWrapper).toHaveAttribute("data-element", "heading");
});

test("renders a custom title node within the heading using the `title` prop", () => {
  const title = <span>title node</span>;
  render(<Heading title={title} />);

  const heading = screen.getByRole("heading", { level: 1 });
  const titleNode = screen.getByText("title node");
  expect(heading).toHaveAttribute("data-element", "title");
  expect(heading).toContainElement(titleNode);
  expect(titleNode).toBeVisible();
});

test("should render with an 'id' attribute on the heading node, via the `titleId` prop", () => {
  const title = <span>title node</span>;
  render(<Heading titleId="1973" title={title} />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveAttribute("id", "1973");
});

test("should render with children", () => {
  render(<Heading title="foo">text children</Heading>);

  const childrenText = screen.getByText("text children");
  expect(childrenText).toBeVisible();
});

test("should render with a custom subheader node as a descendant of the subtitle node, via the `subheader` prop", () => {
  const subheader = <span>subheader node</span>;
  render(<Heading title="foo" subheader={subheader} />);

  const subtitle = screen.getByTestId("subtitle");
  const subheaderNode = screen.getByText("subheader node");
  expect(subtitle).toHaveAttribute("data-element", "subtitle");
  expect(subtitle).toContainElement(subheaderNode);
  expect(subheaderNode).toBeVisible();
});

test("should render with an 'id' attribute on the custom subheader node, via the `subtitleId` prop", () => {
  const subheader = <span>subheader node</span>;
  render(<Heading title="foo" subheader={subheader} subtitleId="1973" />);

  const subtitle = screen.getByTestId("subtitle");
  expect(subtitle).toHaveAttribute("id", "1973");
});

test.each([
  ["h1", 1],
  ["h2", 2],
  ["h3", 3],
  ["h4", 4],
  ["h5", 5],
] as [HeadingType, number][])(
  "renders the correct heading element when the `headingType` prop is passed as %s",
  (headingType, level) => {
    render(<Heading title="foo" headingType={headingType} />);

    const heading = screen.getByRole("heading", { level });
    expect(heading).toBeVisible();
  },
);

test("renders with custom help text, via the `help` prop", async () => {
  render(
    <Heading title="foo" help="help text" helpAriaLabel="help-aria-label" />,
  );

  const user = userEvent.setup();
  const helpIconButton = screen.getByRole("button", {
    name: "help-aria-label",
  });
  await user.hover(helpIconButton);
  const helpText = await screen.findByText("help text");

  expect(helpIconButton).toHaveAttribute("data-element", "help");
  expect(helpText).toBeVisible();
});

test("renders with a custom help text link, via the `helpLink` prop", () => {
  render(
    <Heading
      title="foo"
      help="help text"
      helpAriaLabel="help-aria-label"
      helpLink="https://www.warnerbros.com/movies/heat"
    />,
  );

  const helpIconLink = screen.getByRole("link", { name: "help-aria-label" });
  expect(helpIconLink).toHaveAttribute(
    "href",
    "https://www.warnerbros.com/movies/heat",
  );
});

test("renders with an 'aria-label' attribute on the help, via the `aria-label` prop", () => {
  render(
    <Heading
      title="foo"
      help="help text"
      helpAriaLabel="help-aria-label"
      helpLink="https://www.warnerbros.com/movies/heat"
    />,
  );

  const helpIconLink = screen.getByRole("link", { name: "help-aria-label" });
  expect(helpIconLink).toBeVisible();
});

test("renders a back link, when the `backLink` prop is a string", () => {
  render(
    <Heading title="foo" backLink="https://www.warnerbros.com/movies/heat" />,
  );

  const backLink = screen.getByRole("link", { name: "Back" });
  expect(backLink).toHaveAttribute(
    "href",
    "https://www.warnerbros.com/movies/heat",
  );
});

test("focuses the back link on mousedown", () => {
  render(
    <Heading title="foo" backLink="https://www.warnerbros.com/movies/heat" />,
  );

  const backLink = screen.getByRole("link", { name: "Back" });
  fireEvent.mouseDown(backLink);

  expect(backLink).toHaveFocus();
});

test("renders a back button, when the `backLink` prop is a function", () => {
  render(<Heading title="foo" backLink={() => {}} />);

  const backLink = screen.getByRole("button", { name: "Back" });
  expect(backLink).toBeVisible();
});

test("focuses the back button on mousedown", async () => {
  const user = userEvent.setup();
  render(<Heading title="foo" backLink={() => {}} />);

  const backLink = screen.getByRole("button", { name: "Back" });
  await user.click(backLink);

  expect(backLink).toHaveFocus();
});

test("renders a divider when the `divider` prop is true", () => {
  render(<Heading title="foo" divider />);

  const divider = screen.getByTestId("heading-divider");
  expect(divider).toBeVisible();
});

test("renders a separator when the `separator` prop is true", () => {
  render(<Heading title="foo" separator />);

  const separator = screen.getByTestId("heading-separator");
  expect(separator).toBeVisible();
});

test("renders `Pill` component nodes after the title, via the `pills` prop", () => {
  const pillsNode = (
    <>
      <Pill data-role="pill-1">Pill one</Pill>
      <Pill data-role="pill-2">Pill two</Pill>
    </>
  );

  render(<Heading title="foo" pills={pillsNode} />);

  const pill1 = screen.getByTestId("pill-2");
  const pill2 = screen.getByTestId("pill-1");

  expect(pill1).toBeVisible();
  expect(pill2).toBeVisible();
});

/* styling test for coverage */
test("alters the grid-column property on the subtitle node, when a back link/button is rendered", () => {
  render(
    <Heading
      title="foo"
      subheader="bar"
      backLink="https://www.warnerbros.com/movies/heat"
    />,
  );

  const subtitle = screen.getByTestId("subtitle");

  expect(subtitle).toHaveStyle("grid-column: 2");
});

/* styling test for coverage */
test("alters the outline property on the back link/button, when the back link is focused and consumers opt out of the focus redesign", () => {
  render(
    <CarbonProvider focusRedesignOptOut>
      <Heading title="foo" backLink="https://www.warnerbros.com/movies/heat" />
    </CarbonProvider>,
  );

  const backLink = screen.getByTestId("heading-back-button");
  backLink.focus();

  expect(backLink).toHaveStyleRule(
    "outline",
    "3px solid var(--colorsSemanticFocus500)",
    { modifier: "button:focus" },
  );
});
