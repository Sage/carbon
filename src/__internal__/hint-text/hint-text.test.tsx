import React from "react";
import { screen } from "@testing-library/react";

import HintText, { HintTextProps } from "./hint-text.component";
import CarbonProvider from "../../components/carbon-provider";
import { render } from "../../__spec_helper__/__internal__/test-utils";

test("renders with children", () => {
  render(<HintText>foo</HintText>);

  expect(screen.getByText("foo")).toBeVisible();
  expect(screen.getByText("foo")).toHaveStyleRule(
    `color`,
    "var(--colorsUtilityYin055)",
  );
});

["left", "right"].forEach((align) => {
  test(`align="${align}"`, () => {
    render(<HintText align={align as HintTextProps["align"]}>foo</HintText>);

    expect(screen.getByText("foo")).toHaveStyleRule(
      `justify-content`,
      align === "left" ? "flex-start" : "flex-end",
    );
  });
});

test("does not render if isComponentInline is true and not using the new validation redesign opt-in", () => {
  render(<HintText isComponentInline>foo</HintText>);

  expect(screen.queryByText("foo")).not.toBeInTheDocument();
});

test("renders if isComponentInline is true and using the new validation redesign opt-in", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <HintText isComponentInline>foo</HintText>
    </CarbonProvider>,
  );

  expect(screen.getByText("foo")).toBeInTheDocument();
});

test("renders correctly with a dark background", () => {
  render(<HintText isDarkBackground>foo</HintText>);

  expect(screen.getByText("foo")).toBeVisible();
  expect(screen.getByText("foo")).toHaveStyleRule(
    `color`,
    "var(--colorsUtilityYang080)",
  );
});

test("renders correctly when disabled", () => {
  render(<HintText isDisabled>foo</HintText>);

  expect(screen.getByText("foo")).toBeVisible();
  expect(screen.getByText("foo")).toHaveStyleRule(
    `color`,
    "var(--colorsUtilityYin030)",
  );
});

test("renders correctly with the appropriate font weight", () => {
  render(<HintText fontWeight="400">foo</HintText>);

  expect(screen.getByText("foo")).toBeVisible();
  expect(screen.getByText("foo")).toHaveStyleRule(`font-weight`, "400");
});

test("renders correctly with the appropriate max width", () => {
  render(<HintText maxWidth="160px">foo</HintText>);

  expect(screen.getByText("foo")).toBeVisible();
  expect(screen.getByText("foo")).toHaveStyleRule(`max-width`, "160px");
});

test("renders correctly with the appropriate bottom margin", () => {
  render(<HintText marginBottom="16px">foo</HintText>);

  expect(screen.getByText("foo")).toBeVisible();
  expect(screen.getByText("foo")).toHaveStyleRule(`margin-bottom`, "16px");
});

test("renders correctly with the appropriate top margin", () => {
  render(<HintText marginTop="16px">foo</HintText>);

  expect(screen.getByText("foo")).toBeVisible();
  expect(screen.getByText("foo")).toHaveStyleRule(`margin-top`, "16px");
});
