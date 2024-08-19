import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Logger from "__internal__/utils/logger";
import SimpleSelect from ".";
import Option from "../option";
import mockDOMRect from "../../../__spec_helper__/mock-dom-rect";

beforeEach(() => {
  jest.useFakeTimers();
  // Mock non-zero dimensions for the scrollable container. To ensure react-virtual renders the list options correctly.
  mockDOMRect(40, 100, "select-list-scrollable-container");
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

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

test("open dropdown list of options when overlay is clicked", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  const overlay = screen.getByText("Please Select...");
  await user.click(overlay);

  expect(await screen.findByRole("listbox")).toBeVisible();
});

test("does not open dropdown list when combobox is focused", () => {
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  const combobox = screen.getByRole("combobox");
  combobox.focus();

  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

test.each(["Space", "ArrowDown", "ArrowUp"])(
  "opens dropdown list when combobox is focused and %s key is pressed",
  async (key) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <SimpleSelect label="Colour" onChange={() => {}} value="">
        <Option text="amber" value="amber" />
      </SimpleSelect>
    );

    const combobox = screen.getByRole("combobox");
    combobox.focus();
    await user.keyboard(`[${key}]`);

    expect(await screen.findByRole("listbox")).toBeVisible();
  }
);

test("closes dropdown list when an option is clicked", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  const combobox = screen.getByText("Please Select...");
  await user.click(combobox);

  const option = await screen.findByRole("option", { name: "amber" });
  await user.click(option);

  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  );
});

test("closes dropdown list when the user clicks outside it", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <SimpleSelect label="Colour" onChange={() => {}} value="">
      <Option text="amber" value="amber" />
    </SimpleSelect>
  );

  const combobox = screen.getByText("Please Select...");
  await user.click(combobox);
  await user.click(document.body);

  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  );
});

test("displays deprecation warning for uncontrolled usage", () => {
  const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  const loggerSpy = jest.spyOn(Logger, "deprecate");

  render(
    <SimpleSelect defaultValue="apple">
      <Option text="apple" value="apple" />
    </SimpleSelect>
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "Uncontrolled behaviour in `Simple Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
  );

  loggerSpy.mockRestore();
  consoleSpy.mockRestore();
});
