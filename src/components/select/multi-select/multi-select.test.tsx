import React from "react";
import { render, screen } from "@testing-library/react";
import MultiSelect from ".";
import Option from "../option";

test("renders combobox without text overlay", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="Amber" value="1" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.queryByTestId("select-text")).not.toBeInTheDocument();
});

test("initially renders combobox with placeholder text", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="Amber" value="1" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select..."
  );
});

test("initially renders combobox with custom placeholder when placeholder prop is passed", () => {
  render(
    <MultiSelect
      label="Colour"
      onChange={() => {}}
      value={[]}
      placeholder="Select a colour"
    >
      <Option text="Amber" value="1" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Select a colour"
  );
});

test("combobox has correct accessible name when label prop is provided", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="Amber" value="1" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
});

test("combobox has correct accessible name when aria-labelledby prop is provided", () => {
  render(
    <>
      <h2 id="my-select-heading">My Select</h2>
      <MultiSelect
        aria-labelledby="my-select-heading"
        onChange={() => {}}
        value={[]}
      >
        <Option text="Amber" value="1" />
      </MultiSelect>
    </>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
});
