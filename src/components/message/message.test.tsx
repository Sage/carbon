import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Message from "./message.component";
import I18nProvider from "../i18n-provider";
import enGB from "../../locales/en-gb";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

describe("icon", () => {
  it("renders with 'info' icon when variant is 'info", () => {
    render(<Message variant="info" />);

    const infoIcon = screen.getByTestId("category-icon");

    expect(infoIcon).toBeVisible();
    expect(infoIcon).toHaveAttribute("type", "info");
  });

  it("renders with 'tick_circle' icon when variant is 'success'", () => {
    render(<Message variant="success" />);

    const successIcon = screen.getByTestId("category-icon");

    expect(successIcon).toBeVisible();
    expect(successIcon).toHaveAttribute("type", "tick_circle");
  });

  it("renders with 'info' icon when variant is 'neutral'", () => {
    render(<Message variant="neutral" />);

    const neutralIcon = screen.getByTestId("category-icon");

    expect(neutralIcon).toBeVisible();
    expect(neutralIcon).toHaveAttribute("type", "info");
  });

  it("renders with 'warning' icon when variant is 'warning'", () => {
    render(<Message variant="warning" />);

    const warningIcon = screen.getByTestId("category-icon");

    expect(warningIcon).toBeVisible();
    expect(warningIcon).toHaveAttribute("type", "warning");
  });

  it("renders with 'error' icon when variant is 'error'", () => {
    render(<Message variant="error" />);

    const errorIcon = screen.getByTestId("category-icon");

    expect(errorIcon).toBeVisible();
    expect(errorIcon).toHaveAttribute("type", "error");
  });

  it("renders with 'ai' icon SVG when variant is 'ai", () => {
    render(<Message variant="ai" />);

    const aiSvg = screen.getByTestId("ai-icon");

    expect(aiSvg).toBeVisible();
  });
});

test("renders with provided children", () => {
  render(<Message>Message</Message>);

  expect(screen.getByText("Message")).toBeVisible();
});

test("renders with provided `title`", () => {
  render(<Message title="Title">Message</Message>);

  expect(screen.getByText("Title")).toBeVisible();
});

test("renders with provided data- attributes", () => {
  render(
    <Message data-element="bar" data-role="baz">
      Message
    </Message>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("does not render component when `open` prop is false", () => {
  render(
    <Message data-role="my-message" open={false}>
      Message
    </Message>,
  );

  expect(screen.queryByTestId("my-message")).not.toBeInTheDocument();
});

test("renders with close button if `onDismiss` is provided", () => {
  render(<Message onDismiss={() => {}}>Message</Message>);

  expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
});

test("calls `onDismiss` when close button is clicked", async () => {
  const onDismiss = jest.fn();
  const user = userEvent.setup();
  render(<Message onDismiss={onDismiss}>Message</Message>);

  const closeButton = screen.getByRole("button", { name: "Close" });

  await user.click(closeButton);

  expect(onDismiss).toHaveBeenCalledTimes(1);
});

test("does not render close button if `onDismiss` is not provided", () => {
  render(<Message>Message</Message>);

  expect(
    screen.queryByRole("button", { name: "Close" }),
  ).not.toBeInTheDocument();
});

test("does no render close button if `showCloseIcon` is false", () => {
  render(<Message showCloseIcon={false}>Message</Message>);

  expect(
    screen.queryByRole("button", { name: "Close" }),
  ).not.toBeInTheDocument();
});

test("renders close button aria-label with provided `closeButtonAriaLabel`", () => {
  render(
    <Message onDismiss={() => {}} closeButtonAriaLabel="my close button">
      Message
    </Message>,
  );

  expect(screen.getByRole("button", { name: "my close button" })).toBeVisible();
});

test("renders close button aria-label with default value from translations", () => {
  render(
    <I18nProvider locale={enGB}>
      <Message onDismiss={() => {}}>Message</Message>
    </I18nProvider>,
  );

  expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
});

test("renders close button aria-label with custom value from translations", () => {
  render(
    <I18nProvider
      locale={{
        ...enGB,
        message: {
          info: () => "Information",
          success: () => "Success",
          warning: () => "Warning",
          neutral: () => "Neutral",
          error: () => "Error",
          ai: () => "AI Information",
          closeButtonAriaLabel: () => "test close button",
        },
      }}
    >
      <Message onDismiss={() => {}}>Message</Message>
    </I18nProvider>,
  );

  expect(
    screen.getByRole("button", { name: "test close button" }),
  ).toBeVisible();
});

test("renders with provided `id`", () => {
  render(
    <Message data-role="my-message" id="message-id">
      Message
    </Message>,
  );

  expect(screen.getByTestId("my-message")).toHaveAttribute("id", "message-id");
});

// coverage
test("renders with expected styles when `transparent` is true", () => {
  render(
    <Message data-role="my-message" transparent>
      Message
    </Message>,
  );

  expect(screen.getByTestId("my-message")).toHaveStyle({
    border: "none",
    background: "transparent",
  });
  expect(screen.getByTestId("message-content")).toHaveStyleRule(
    "padding",
    "var(--spacing200)",
  );
});

test("renders with provided width when `width` is provided", () => {
  render(
    <Message data-role="my-message" width="100px">
      Message
    </Message>,
  );

  expect(screen.getByTestId("my-message")).toHaveStyle({
    width: "100px",
  });
});

test("renders with `ref` when provided as an object", () => {
  const ref = { current: null };
  render(<Message ref={ref}>Message</Message>);

  expect(ref.current).not.toBeNull();
});

test("renders with `ref` when passed as a callback", () => {
  const ref = jest.fn();
  render(<Message ref={ref}>Message</Message>);

  expect(ref).toHaveBeenCalled();
});

test("should set `ref` to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(<Message ref={ref}>Message</Message>);

  unmount();

  expect(ref.current).toBeNull();
});

testStyledSystemMargin(
  (props) => (
    <Message data-role="my-message" {...props}>
      Message
    </Message>
  ),
  () => screen.getByTestId("my-message"),
);
