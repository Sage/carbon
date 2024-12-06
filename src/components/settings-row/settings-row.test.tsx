import React from "react";
import { render, screen } from "@testing-library/react";
import { HeadingType } from "../heading";
import SettingsRow from ".";
import Logger from "../../__internal__/utils/logger";

test("renders with children", () => {
  render(<SettingsRow>hello world</SettingsRow>);

  const children = screen.getByText("hello world");
  expect(children).toBeVisible();
});

test("renders with the correct default h3 heading element and text when the `title` prop is passed", () => {
  render(<SettingsRow title="foo" />);

  const heading = screen.getByRole("heading", { level: 3 });
  expect(heading).toBeVisible();
  expect(heading).toHaveTextContent("foo");
});

test("when the title prop is not passed, the h3 heading element does not render", () => {
  render(<SettingsRow />);

  const heading = screen.queryByRole("heading", { level: 3 });
  expect(heading).not.toBeInTheDocument();
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
    render(<SettingsRow title="foo" headingType={headingType} />);

    const heading = screen.getByRole("heading", { level });
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent("foo");
  },
);

test("renders with the correct description text when the `description` prop is passed", () => {
  render(<SettingsRow title="foo" description="bar" />);

  const description = screen.getByText("bar");
  expect(description).toBeVisible();
});

test("renders a separator element when the `description` prop is passed", () => {
  render(<SettingsRow title="foo" description="bar" />);

  const description = screen.getByTestId("heading-separator");
  expect(description).toBeVisible();
});

test("when the `description` prop is not passed, the separator does not render", () => {
  render(<SettingsRow title="foo" />);

  const description = screen.queryByTestId("heading-separator");
  expect(description).not.toBeInTheDocument();
});

test("renders a divider when the `divider` prop is passed", () => {
  render(<SettingsRow divider />);

  const settingsRow = screen.getByTestId("settings-row");
  expect(settingsRow).toHaveStyleRule(
    "border-bottom",
    "1px solid var(--colorsUtilityMajor050)",
  );
  expect(settingsRow).toHaveStyleRule("padding-bottom", "30px");
});

test("throws a deprecation warning if the 'className' prop is set", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});
  render(<SettingsRow className="foo" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'className' prop has been deprecated and will soon be removed from the 'SettingsRow' component.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});
