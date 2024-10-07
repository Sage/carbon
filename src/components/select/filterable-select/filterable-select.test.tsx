import React from "react";
import { render, screen } from "@testing-library/react";
import FilterableSelect from ".";
import Option from "../option";
import Logger from "../../../__internal__/utils/logger";

test("renders combobox without text overlay", () => {
  render(
    <FilterableSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>
  );

  expect(screen.getByRole("combobox")).toBeVisible();
  expect(screen.queryByTestId("select-text")).not.toBeInTheDocument();
});

test("initially renders combobox with placeholder text", () => {
  render(
    <FilterableSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select..."
  );
});

test("initially renders combobox with custom placeholder when placeholder prop is passed", () => {
  render(
    <FilterableSelect
      label="Colour"
      onChange={() => {}}
      value=""
      placeholder="Select a colour"
    >
      <Option text="Amber" value="1" />
    </FilterableSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Select a colour"
  );
});

test("combobox has correct accessible name when label prop is provided", () => {
  render(
    <FilterableSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
});

test("combobox has correct accessible name when aria-label prop is provided", () => {
  render(
    <FilterableSelect aria-label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
});

test("combobox has correct accessible name when aria-labelledby prop is provided", () => {
  render(
    <>
      <h2 id="my-select-heading">My Select</h2>
      <FilterableSelect
        aria-labelledby="my-select-heading"
        onChange={() => {}}
        value=""
      >
        <Option text="Amber" value="1" />
      </FilterableSelect>
    </>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
});

test("should not display deprecation about uncontrolled Textbox when parent component is controlled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <FilterableSelect
      label="Colour"
      onChange={() => {}}
      value="1"
      placeholder="Select a colour"
    >
      <Option text="Amber" value="1" />
    </FilterableSelect>
  );

  expect(loggerSpy).not.toHaveBeenCalled();
  loggerSpy.mockClear();
});

test("should not display deprecation about uncontrolled Textbox when parent component is not controlled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <FilterableSelect label="Colour" placeholder="Select a colour">
      <Option text="Amber" value="1" />
    </FilterableSelect>
  );

  expect(loggerSpy).not.toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
  );
  loggerSpy.mockClear();
});
