import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Confirm from "../confirm";

jest.mock("../../__internal__/utils/helpers/guid", () => () => "guid-12345");

test("should render the component with expected title and subtitle", () => {
  render(
    <Confirm open title="Title" subtitle="Subtitle" onConfirm={() => {}} />,
  );

  expect(screen.getByText("Title")).toBeVisible();
  expect(screen.getByText("Subtitle")).toBeVisible();
});

test("should render the confirm button if onConfirm is set and call the function when clicked", async () => {
  const onConfirm = jest.fn();
  const user = userEvent.setup();
  render(<Confirm open onConfirm={onConfirm} />);

  expect(screen.getByRole("button", { name: "Yes" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "Yes" }));
  expect(onConfirm).toHaveBeenCalledTimes(1);
});

test("should render the cancel button if onCancel is set and call the function when clicked", async () => {
  const onCancel = jest.fn();
  const user = userEvent.setup();
  render(<Confirm open onConfirm={() => {}} onCancel={onCancel} />);

  expect(screen.getByRole("button", { name: "No" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "No" }));
  expect(onCancel).toHaveBeenCalledTimes(1);
});

test("should render the confirm and cancel buttons with the provided labels", () => {
  render(
    <Confirm
      open
      onConfirm={() => {}}
      onCancel={() => {}}
      confirmLabel="Confirm"
      cancelLabel="Cancel"
    />,
  );

  expect(screen.getByRole("button", { name: "Confirm" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeVisible();
});

test("should render the close icon if showCloseIcon is set", () => {
  render(
    <Confirm open onConfirm={() => {}} onCancel={() => {}} showCloseIcon />,
  );

  expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
});

test("should call onCancel when close icon button is clicked", async () => {
  const onCancel = jest.fn();
  const user = userEvent.setup();
  render(
    <Confirm open onConfirm={() => {}} onCancel={onCancel} showCloseIcon />,
  );

  await user.click(screen.getByRole("button", { name: "Close" }));
  expect(onCancel).toHaveBeenCalledTimes(1);
});

test("should render disabled confirm button when disableConfirm is set", () => {
  render(<Confirm open onConfirm={() => {}} disableConfirm />);

  expect(screen.getByRole("button", { name: "Yes" })).toBeDisabled();
});

test("calls onCancel when Escape key is pressed", async () => {
  const onCancel = jest.fn();
  const user = userEvent.setup();

  render(<Confirm open onConfirm={() => {}} onCancel={onCancel} />);

  await user.keyboard("{Escape}");

  expect(onCancel).toHaveBeenCalledTimes(1);
});

test("should render disabled confirm button with Loader if isLoadingConfirm is set", () => {
  render(
    <Confirm
      open
      onConfirm={() => {}}
      isLoadingConfirm
      confirmButtonDataProps={{ "data-role": "confirm-button" }}
    />,
  );

  expect(screen.queryByRole("button", { name: "Yes" })).not.toBeInTheDocument();
  expect(screen.getByTestId("confirm-loader")).toBeVisible();
  expect(screen.getByTestId("confirm-button")).toBeDisabled();
});

test('should render with expected styles when iconType is set to "warning"', () => {
  render(<Confirm open iconType="warning" onConfirm={() => {}} />);

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveStyle({ color: "var(--colorsSemanticCaution500)" });
});

test('should render with expected styles when iconType is set to "error"', () => {
  render(<Confirm open iconType="error" onConfirm={() => {}} />);

  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon).toHaveStyle({ color: "var(--colorsSemanticNegative500)" });
});

test("should render dialog with expected data tags", () => {
  render(
    <Confirm open onConfirm={() => {}} data-element="foo" data-role="bar" />,
  );

  expect(screen.getByRole("alertdialog")).toHaveAttribute(
    "data-element",
    "foo",
  );
  expect(screen.getByRole("alertdialog")).toHaveAttribute("data-role", "bar");
});

test("should render buttons with expected data tags", () => {
  render(
    <Confirm
      open
      onConfirm={() => {}}
      onCancel={() => {}}
      showCloseIcon
      confirmButtonDataProps={{
        "data-role": "confirm-button",
        "data-element": "foo",
      }}
      cancelButtonDataProps={{
        "data-role": "cancel-button",
        "data-element": "bar",
      }}
      closeButtonDataProps={{
        "data-role": "close-button",
        "data-element": "baz",
      }}
    />,
  );

  expect(screen.getByRole("button", { name: "Yes" })).toHaveAttribute(
    "data-role",
    "confirm-button",
  );
  expect(screen.getByRole("button", { name: "Yes" })).toHaveAttribute(
    "data-element",
    "foo",
  );

  expect(screen.getByRole("button", { name: "No" })).toHaveAttribute(
    "data-role",
    "cancel-button",
  );
  expect(screen.getByRole("button", { name: "No" })).toHaveAttribute(
    "data-element",
    "bar",
  );

  expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
    "data-role",
    "close-button",
  );
  expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
    "data-element",
    "baz",
  );
});

test("should render with aria-labelledby set to the title's id when title and iconType props are set", () => {
  render(
    <Confirm open title="Title" iconType="warning" onConfirm={() => {}} />,
  );
  expect(screen.getByText("Title")).toHaveAttribute("id", "guid-12345");
  expect(screen.getByRole("alertdialog")).toHaveAttribute(
    "aria-labelledby",
    "guid-12345",
  );
});

test("should render with aria-describedby set to the subtitle's id when subtitle and iconType props are set", () => {
  render(
    <Confirm
      open
      title="Title"
      subtitle="Subtitle"
      iconType="warning"
      onConfirm={() => {}}
    />,
  );

  expect(screen.getByText("Subtitle")).toHaveAttribute("id", "guid-12345");
  expect(screen.getByRole("alertdialog")).toHaveAttribute(
    "aria-describedby",
    "guid-12345",
  );
});
