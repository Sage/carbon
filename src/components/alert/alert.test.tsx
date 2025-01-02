import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Alert, { AlertProps } from ".";

const ControlledAlert = ({ onCancel, ...rest }: Partial<AlertProps>) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Alert
      {...rest}
      open={open}
      onCancel={(ev) => {
        setOpen(false);
        onCancel?.(ev);
      }}
      title="Invalid client"
      subtitle="Please check the client details"
    />
  );
};
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
    />,
  );

  const alert = screen.getByRole("alertdialog", { name: "Alert title" });

  expect(alert).toBeInTheDocument();
  expect(alert).toHaveAttribute("data-role", "baz");
  expect(alert).toHaveAttribute("data-element", "bar");
  expect(alert).toHaveAttribute("data-component", "alert");
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
    />,
  );

  const dialog = screen.getByRole("alertdialog", { name: "Alert title" });

  expect(dialog).toHaveStyleRule("border-radius", "var(--borderRadius200)");
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
    />,
  );

  const closeButton = screen.getByRole("button", { name: /close/i });

  expect(closeButton).toHaveAttribute("data-element", "foo");
  expect(closeButton).toHaveAttribute("data-role", "bar");
});

test("calls onCancel when close button is clicked", async () => {
  const user = userEvent.setup();
  const onCancel = jest.fn();

  render(<ControlledAlert onCancel={onCancel} />);

  const closeButton = screen.getByRole("button", { name: /Close/i });
  await user.click(closeButton);

  expect(onCancel).toHaveBeenCalledTimes(1);
});
