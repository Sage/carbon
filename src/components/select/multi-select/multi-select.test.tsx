import React from "react";
import { render, screen } from "@testing-library/react";
import MultiSelect from ".";
import Option from "../option";
import Logger from "../../../__internal__/utils/logger";

afterEach(() => {
  jest.restoreAllMocks();
});

test("displays input", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toBeVisible();
});

test("displays default placeholder text when no value is selected", () => {
  render(
    <MultiSelect label="Colour" onChange={() => {}} value={[]}>
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Please Select..."
  );
});

test("displays custom text when placeholder prop is provided and no value is selected", () => {
  render(
    <MultiSelect
      label="Colour"
      onChange={() => {}}
      value={[]}
      placeholder="Select a colour"
    >
      <Option text="amber" value="amber" />
    </MultiSelect>
  );

  expect(screen.getByRole("combobox")).toHaveAttribute(
    "placeholder",
    "Select a colour"
  );
});

describe("accessible name of the input", () => {
  it("is set to the label prop when provided", () => {
    render(
      <MultiSelect label="Colour" onChange={() => {}} value={[]}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("Colour");
  });

  it("is set to the text referenced by the aria-labelledby prop when provided", () => {
    render(
      <>
        <h2 id="my-select-heading">My Select</h2>
        <MultiSelect
          aria-labelledby="my-select-heading"
          onChange={() => {}}
          value={[]}
        >
          <Option text="amber" value="amber" />
        </MultiSelect>
      </>
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleName("My Select");
  });
});

describe("deprecation warnings", () => {
  it("raises deprecation warning when component is used with defaultValue and no onChange (uncontrolled usage)", () => {
    jest.spyOn(console, "warn").mockImplementation(() => {});

    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <MultiSelect label="Colour" onChange={undefined} defaultValue={["amber"]}>
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(loggerSpy).toHaveBeenNthCalledWith(
      1,
      "Uncontrolled behaviour in `Multi Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
  });

  it("should not display deprecation about uncontrolled Textbox when parent component is controlled", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <MultiSelect
        label="Colour"
        onChange={() => {}}
        value={["amber"]}
        placeholder="Select a colour"
      >
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(loggerSpy).not.toHaveBeenCalled();
  });

  it("should not display deprecation about uncontrolled Textbox when parent component is not controlled", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(
      <MultiSelect label="Colour" placeholder="Select a colour">
        <Option text="amber" value="amber" />
      </MultiSelect>
    );

    expect(loggerSpy).not.toHaveBeenCalledWith(
      "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
  });
});
