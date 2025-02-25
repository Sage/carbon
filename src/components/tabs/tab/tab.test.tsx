import React from "react";
import { render, screen } from "@testing-library/react";
import Tab from ".";
import Textbox from "../../textbox";
import StyledTab from "./tab.style";
import { testStyledSystemPadding } from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemPadding(
  (props) => (
    <Tab title="Tab Title 1" tabId="foo" isTabSelected {...props}>
      TabContent
    </Tab>
  ),
  () => screen.getByRole("tabpanel"),
);

testStyledSystemPadding(
  (props) => (
    <Tab
      position="left"
      title="Tab Title 1"
      tabId="foo"
      isTabSelected
      {...props}
    >
      TabContent
    </Tab>
  ),
  () => screen.getByRole("tabpanel"),
);

test("has a role of `tabpanel` if none is specified", () => {
  render(<Tab tabId="foo">tab content</Tab>);

  expect(screen.getByText("tab content")).toHaveAttribute("role", "tabpanel");
});

test("is not visible by default", () => {
  render(<Tab tabId="foo">tab content</Tab>);

  expect(screen.getByRole("tabpanel", { hidden: true })).not.toBeVisible();
});

test("is visible when selected", () => {
  render(
    <Tab tabId="foo" isTabSelected>
      tab content
    </Tab>,
  );

  expect(screen.getByRole("tabpanel")).toBeVisible();
});

test("renders its children correctly", () => {
  render(<Tab tabId="foo">tab content</Tab>);

  expect(screen.getByText("tab content")).toBeInTheDocument();
});

test("can be given a custom role via the `role` prop", () => {
  render(
    <Tab tabId="foo" role="article">
      tab content
    </Tab>,
  );

  expect(screen.getByText("tab content")).toHaveAttribute("role", "article");
});

test("accepts an `ariaLabelledBy` prop to set the accessible name", () => {
  render(
    <Tab tabId="foo" ariaLabelledby="bar" isTabSelected>
      tab content
      <p id="bar">an accessible name</p>
    </Tab>,
  );

  expect(screen.getByRole("tabpanel")).toHaveAccessibleName(
    "an accessible name",
  );
});

test("the `title` prop is not passed to the DOM element", () => {
  render(
    <Tab tabId="foo" title="here is a title">
      tab content
    </Tab>,
  );

  expect(screen.getByRole("tabpanel", { hidden: true })).not.toHaveAttribute(
    "title",
  );
});

test("does not render the children if the `href` prop is passed", () => {
  render(
    <Tab tabId="foo" href="#">
      tab content
    </Tab>,
  );

  expect(screen.queryByText("tab content")).not.toBeInTheDocument();
});

test("calls the `updateErrors` function prop when an error is present in a child component", () => {
  const updateErrors = jest.fn();
  render(
    <Tab tabId="foo" updateErrors={updateErrors}>
      <Textbox onChange={() => {}} id="bar" error />
    </Tab>,
  );

  expect(updateErrors).toHaveBeenCalledWith("foo", { bar: true });
});

test("calls the `updateWarnings` function prop when a warning is present in a child component", () => {
  const updateWarnings = jest.fn();
  render(
    <Tab tabId="foo" updateWarnings={updateWarnings}>
      <Textbox onChange={() => {}} id="bar" warning />
    </Tab>,
  );

  expect(updateWarnings).toHaveBeenCalledWith("foo", { bar: true });
});

// coverage - need to render the styled component directly to cover the default prop assignments
test("renders with correct styles", () => {
  render(<StyledTab data-role="styled-component" />);

  expect(screen.getByTestId("styled-component")).toHaveStyle({
    display: "none",
  });
});
