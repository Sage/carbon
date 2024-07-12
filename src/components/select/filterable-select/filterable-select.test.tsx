import React from "react";
import { render, screen } from "@testing-library/react";
import FilterableSelect from ".";
import Option from "../option";

test("renders combobox without text overlay", () => {
  render(
    <FilterableSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </FilterableSelect>
  );

  expect(screen.getByRole("combobox")).toBeInTheDocument();
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
