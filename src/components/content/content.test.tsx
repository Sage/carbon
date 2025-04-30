import React from "react";
import { render, screen, within } from "@testing-library/react";
import Content from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";
import StyledContent, {
  computePadding,
} from "../dialog-full-screen/content.style";

test("renders the provided `title` as a string", () => {
  render(<Content title="Title" />);

  expect(screen.getByText("Title")).toBeVisible();
});

test("renders the provided `title` as a node", () => {
  render(<Content title={<span>Title</span>} />);

  expect(screen.getByText("Title")).toBeVisible();
});

test("renders children as the body", () => {
  render(<Content>Body</Content>);

  const body = within(screen.getByTestId("content-body")).getByText("Body");

  expect(body).toBeVisible();
});

test("renders with expected data- tags", () => {
  render(<Content data-element="foo" data-role="bar" />);

  expect(screen.getByTestId("bar")).toHaveAttribute("data-element", "foo");
});

// coverage
test("renders with expected styles when `inline` prop is true", () => {
  render(<Content inline />);

  const title = screen.getByTestId("content-title");
  const body = screen.getByTestId("content-body");

  expect(title).toHaveStyle({ display: "inline-block" });
  expect(body).toHaveStyle({ display: "inline-block" });
});

// coverage
test("renders with expected styles when `align` is 'center' and `inline` is true", () => {
  render(<Content align="center" inline />);

  const title = screen.getByTestId("content-title");
  const body = screen.getByTestId("content-body");

  expect(title).toHaveStyle({ textAlign: "right", width: "calc(50% - 30px)" });
  expect(body).toHaveStyle({ width: "50%" });
});

// coverage
test("renders with expected styles when `variant` is 'secondary'", () => {
  render(<Content variant="secondary" />);

  const title = screen.getByTestId("content-title");

  expect(title).toHaveStyle({ fontWeight: "normal" });
  expect(title).toHaveStyleRule("color", "var(--colorsUtilityYin055)");
});

// coverage
test("renders with expected styles when `bodyFullWidth` is true", () => {
  render(<Content data-role="content" bodyFullWidth />);

  const content = screen.getByTestId("content");
  const body = screen.getByTestId("content-body");

  expect(content).toHaveStyle({ textAlign: "left" });
  expect(body).toHaveStyle({ width: "100%" });
});

// coverage
test("renders with expected styles when `titleWidth` is set", () => {
  render(<Content titleWidth="70" />);

  const title = screen.getByTestId("content-title");
  const body = screen.getByTestId("content-body");

  expect(title).toHaveStyle({ width: "calc(70% - 30px)" });
  expect(body).toHaveStyle({ width: "30%" });
});

// coverage
test("returns 0 padding when disableContentPadding is true", () => {
  expect(computePadding({ disableContentPadding: true, hasHeader: true })).toBe(
    "padding: 0;",
  );
});

test("returns responsive padding when disableContentPadding is false", () => {
  const result = computePadding({
    disableContentPadding: false,
    hasHeader: true,
  });

  expect(result.toString()).toContain("padding: 0 16px");
  expect(result.toString()).toContain("min-width: 600px");
});

// coverage
it("applies padding-top: 0 when hasHeader is false", () => {
  const { container } = render(<StyledContent hasHeader={false} />);
  // eslint-disable-next-line testing-library/no-node-access
  const content = container.firstChild;
  expect(content).toHaveStyleRule("padding-top", "0");
});

it("does not set padding-top: 0 when hasHeader is true", () => {
  render(<Content hasHeader />);
  const title = screen.getByTestId("content-title");
  expect(title).not.toHaveStyle("padding-top: 0");
});

// coverage
test("renders with expected styles when `inline` is true and `bodyFullWidth` is true", () => {
  render(<Content inline bodyFullWidth />);

  const body = screen.getByTestId("content-body");

  expect(body).toHaveStyle({ marginTop: "15px" });
});

testStyledSystemMargin(
  (props) => (
    <Content data-role="content" {...props}>
      Foo
    </Content>
  ),
  () => screen.getByTestId("content"),
);
