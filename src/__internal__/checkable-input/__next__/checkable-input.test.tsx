import React from "react";
import { render, screen } from "@testing-library/react";
import CommonCheckableInput from "./checkable-input.component";
import useMediaQuery from "../../../hooks/useMediaQuery";

jest.mock("../../../hooks/useMediaQuery");

test("renders input with provided `type`", () => {
  render(<CommonCheckableInput type="radio" />);

  expect(screen.getByRole("radio")).toBeInTheDocument();
});

test("renders with provided children", () => {
  render(<CommonCheckableInput type="radio">Foo</CommonCheckableInput>);

  expect(screen.getByText("Foo")).toBeVisible();
});

test("renders input with provided `name`", () => {
  render(<CommonCheckableInput type="radio" name="test-name" />);

  expect(screen.getByRole("radio")).toHaveAttribute("name", "test-name");
});

test("renders input with provided `value`", () => {
  render(<CommonCheckableInput type="radio" value="test-value" />);

  // toHaveValue() does not work with radio or checkbox inputs
  // eslint-disable-next-line jest-dom/prefer-to-have-value
  expect(screen.getByRole("radio")).toHaveAttribute("value", "test-value");
});

test("renders input checked when `checked` prop is true", () => {
  render(<CommonCheckableInput type="radio" checked onChange={() => {}} />);

  expect(screen.getByRole("radio")).toBeChecked();
});

test("renders with provided `label`", () => {
  render(<CommonCheckableInput type="radio" label="Test Label" />);

  expect(screen.getByText("Test Label")).toBeVisible();
  expect(screen.getByRole("radio")).toHaveAccessibleName("Test Label");
});

test("renders with provided `inputHint`", () => {
  render(<CommonCheckableInput type="radio" inputHint="Test Hint Text" />);

  expect(screen.getByText("Test Hint Text")).toBeVisible();
  expect(screen.getByRole("radio")).toHaveAccessibleDescription(
    "Test Hint Text",
  );
});

test("renders input disabled when `disabled` prop is true", () => {
  render(<CommonCheckableInput type="radio" disabled />);

  expect(screen.getByRole("radio")).toBeDisabled();
});

test("displays progressive disclosure content when provided and input is checked", () => {
  render(
    <CommonCheckableInput
      type="radio"
      checked
      progressiveDisclosure={<div>Progressive disclosure content</div>}
      onChange={() => {}}
    />,
  );

  expect(screen.getByText("Progressive disclosure content")).toBeVisible();
});

test("does not display progressive disclosure content when input is not checked", () => {
  render(
    <CommonCheckableInput
      type="radio"
      progressiveDisclosure={<div>Progressive disclosure content</div>}
      onChange={() => {}}
    />,
  );

  expect(
    screen.queryByText("Progressive disclosure content"),
  ).not.toBeVisible();
});

test("applies accordion animation when reduced motion is not preferred", () => {
  const mockedUseMediaQuery = jest.mocked(useMediaQuery);
  mockedUseMediaQuery.mockReturnValue(true);

  render(
    <CommonCheckableInput
      type="radio"
      progressiveDisclosure={<div>Progressive disclosure content</div>}
      onChange={() => {}}
    />,
  );

  expect(screen.getByTestId("progressive-disclosure-accordion")).toHaveStyle(
    "transition: all 0.4s;",
  );
});
