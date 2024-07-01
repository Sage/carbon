import React from "react";
import { render, screen } from "@testing-library/react";
import Alert from ".";

test("include correct component, element and role data tags", () => {
  render(
    <Alert
      open
      onCancel={() => undefined}
      title="Alert title"
      subtitle="Alert Subtitle"
      data-element="bar"
      data-role="baz"
      closeButtonDataProps={{
        "data-element": "foo",
        "data-role": "bar",
      }}
    />
  );

  const alert = screen.getByRole("alertdialog", { name: "Alert title" });

  expect(alert).toBeInTheDocument();
  expect(alert).toHaveAttribute("data-role", "baz");
  expect(alert).toHaveAttribute("data-element", "bar");
  // TODO FE-6670 - During this piece of work, change value from "dialog" to "alert".
  expect(alert).toHaveAttribute("data-component", "dialog");
});

test("has the expected border radius styling", () => {
  render(
    <Alert
      open
      onCancel={() => undefined}
      title="Alert title"
      subtitle="Alert Subtitle"
      data-element="bar"
      data-role="baz"
      closeButtonDataProps={{
        "data-element": "foo",
        "data-role": "bar",
      }}
    />
  );

  const dialog = screen.getByRole("alertdialog", { name: "Alert title" });

  expect(dialog).toHaveStyle({ borderRadius: "var(--borderRadius200)" });
});

test("should allow custom data props on close button to be assigned", () => {
  render(
    <Alert
      open
      onCancel={() => undefined}
      title="Alert title"
      subtitle="Alert Subtitle"
      data-element="bar"
      data-role="baz"
      closeButtonDataProps={{
        "data-element": "foo",
        "data-role": "bar",
      }}
    />
  );

  const closeButton = screen.getByRole("button", { name: /close/i });

  expect(closeButton).toHaveAttribute("data-element", "foo");
  expect(closeButton).toHaveAttribute("data-role", "bar");
});
