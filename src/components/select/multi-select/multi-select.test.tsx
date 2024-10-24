import React from "react";
import { act, render, screen } from "@testing-library/react";
import MultiSelect from ".";
import Option from "../option";
import Logger from "../../../__internal__/utils/logger";
import Modal from "../../modal";

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

test("should not display deprecation about uncontrolled Textbox when parent component is controlled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <MultiSelect
      label="Colour"
      onChange={() => {}}
      value={["1"]}
      placeholder="Select a colour"
    >
      <Option text="Amber" value="1" />
    </MultiSelect>
  );

  expect(loggerSpy).not.toHaveBeenCalled();
  loggerSpy.mockClear();
});

test("should not display deprecation about uncontrolled Textbox when parent component is not controlled", () => {
  const loggerSpy = jest.spyOn(Logger, "deprecate");
  render(
    <MultiSelect label="Colour" placeholder="Select a colour">
      <Option text="Amber" value="1" />
    </MultiSelect>
  );

  expect(loggerSpy).not.toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
  );
  loggerSpy.mockClear();
});

test("dropdown list is open on initial render, when autoFocus and openOnFocus props are true, and component is inside a Carbon Modal", () => {
  jest.useFakeTimers();
  render(
    <Modal open>
      <MultiSelect label="Colour" onChange={() => {}} autoFocus openOnFocus>
        <Option text="amber" value="amber" />
      </MultiSelect>
    </Modal>
  );

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("combobox")).toHaveFocus();
  expect(screen.getByRole("listbox")).toBeInTheDocument();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
