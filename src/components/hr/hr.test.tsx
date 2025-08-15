import React from "react";
import { render, screen } from "@testing-library/react";
import {
  mockMatchMedia,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";

import Hr from "./hr.component";

testStyledSystemMargin(
  (props) => <Hr {...props} />,
  () => screen.getByRole("separator"),
);

test("should render with default margin when no margin props are passed", () => {
  render(<Hr />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyleRule("margin-top", "var(--spacing300)");
  expect(hr).toHaveStyleRule("margin-bottom", "var(--spacing300)");
});

test("should render with a small height", () => {
  render(<Hr height="small" />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle("height: 1px");
});

test("should render with a medium height", () => {
  render(<Hr height="medium" />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle("height: 2px");
});

test("should render with a large height", () => {
  render(<Hr height="large" />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle("height: 3px");
});

test("should render with the correct background-color when the type prop is inverse", () => {
  render(<Hr type="inverse" />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle("background-color: var(--colorsActionMajorYang030)");
});

test("should apply the expected margin top", () => {
  render(<Hr mt={7} />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyleRule("margin-top", "var(--spacing700)");
});

test("should apply the expected margin bottom", () => {
  render(<Hr mb={7} />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyleRule("margin-bottom", "var(--spacing700)");
});

test("should apply the expected margin left", () => {
  render(<Hr ml="100px" />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({ marginLeft: "100px" });
});

test("should apply the expected margin right", () => {
  render(<Hr ml="100px" />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({ marginLeft: "100px" });
});

test("when adaptiveMxBreakpoint prop is set and when screen bigger than breakpoint it should pass the correct margin styles", () => {
  mockMatchMedia(true);
  render(<Hr ml="10%" mr="20%" adaptiveMxBreakpoint={1000} />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyle({ marginLeft: "10%", marginRight: "20%" });
});

test("when adaptiveMxBreakpoint prop is set and when screen smaller than breakpoint it should pass the correct margin styles", () => {
  mockMatchMedia(false);
  render(<Hr ml="10%" mr="20%" adaptiveMxBreakpoint={1000} />);
  const hr = screen.getByRole("separator");

  expect(hr).toHaveStyleRule("margin-left", "var(--spacing000)");
  expect(hr).toHaveStyleRule("margin-right", "var(--spacing000)");
});

test("should apply the 'aria-hidden' attribute when the `aria-hidden` prop is true", () => {
  render(<Hr data-role="hr" aria-hidden="true" />);
  const hr = screen.getByTestId("hr");

  expect(hr).toHaveAttribute("aria-hidden", "true");
});
