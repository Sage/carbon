import React from "react";
import { render, screen } from "@testing-library/react";

import SimpleSelect from ".";
import Option from "../option";

test("renders combobox and text overlay that is hidden from assistive technologies", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </SimpleSelect>
  );

  expect(screen.getByRole("combobox")).toBeInTheDocument();

  const textOverlay = screen.getByTestId("select-text");
  expect(textOverlay).toBeVisible();
  expect(textOverlay).toHaveAttribute("aria-hidden", "true");
});

test("initially renders text overlay with placeholder text", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </SimpleSelect>
  );

  expect(screen.getByTestId("select-text")).toHaveTextContent(
    "Please Select..."
  );
});

test("renders text overlay with custom placeholder when placeholder prop is passed", () => {
  render(
    <SimpleSelect
      label="Colour"
      onChange={() => {}}
      value=""
      placeholder="Select a colour"
    >
      <Option text="Amber" value="1" />
    </SimpleSelect>
  );

  expect(screen.getByTestId("select-text")).toHaveTextContent(
    "Select a colour"
  );
});

test("combobox has correct accessible name when label prop is provided", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </SimpleSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
});

test("combobox has correct accessible name when aria-label prop is provided", () => {
  render(
    <SimpleSelect aria-label="Colour" onChange={() => {}} value="">
      <Option text="Amber" value="1" />
    </SimpleSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
});

test("combobox has correct accessible name when aria-labelledby prop is provided", () => {
  render(
    <>
      <h2 id="my-select-heading">My Select</h2>
      <SimpleSelect
        aria-labelledby="my-select-heading"
        onChange={() => {}}
        value=""
      >
        <Option text="Amber" value="1" />
      </SimpleSelect>
    </>
  );

  expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
});
