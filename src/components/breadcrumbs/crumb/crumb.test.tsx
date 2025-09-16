import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Crumb from "./crumb.component";
import Logger from "../../../__internal__/utils/logger";
import Breadcrumbs from "../breadcrumbs.component";

test("logs warning when not used within Breadcrumbs", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(<Crumb href="#">Link text</Crumb>);

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon Breadcrumbs: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerSpy.mockRestore();
});

test("passes href to the anchor element when isCurrent is false", () => {
  render(
    <Breadcrumbs>
      <Crumb href="foo">Link text</Crumb>
    </Breadcrumbs>,
  );

  const link = screen.getByRole("link", { name: "Link text" });
  expect(link).toHaveAttribute("href", "foo");
});

test("does not pass href when isCurrent is true (renders a non-link current crumb)", () => {
  render(
    <Breadcrumbs>
      <Crumb href="foo" isCurrent>
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  const el = screen.getByText("Link text");
  expect(el).not.toHaveAttribute("href");
});

test("invokes onClick when the crumb link is clicked (not current)", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();

  render(
    <Breadcrumbs>
      <Crumb href="#" onClick={onClick}>
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  await user.click(screen.getByRole("link", { name: "Link text" }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("does not invoke onClick when isCurrent is true", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();

  render(
    <Breadcrumbs>
      <Crumb href="#" onClick={onClick} isCurrent>
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  await user.click(screen.getByText("Link text"));
  expect(
    screen.queryByRole("link", { name: "Link text" }),
  ).not.toBeInTheDocument();
  expect(onClick).not.toHaveBeenCalled();
});

test("forwards provided data- attributes", () => {
  render(
    <Breadcrumbs>
      <Crumb href="#" data-element="bar" data-role="baz">
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("calls focus({ preventScroll: true }) on Safari when not current", async () => {
  const originalUA = window.navigator.userAgent;
  Object.defineProperty(window.navigator, "userAgent", {
    value:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15",
    configurable: true,
  });

  const onClick = jest.fn();
  const user = userEvent.setup();

  render(
    <Breadcrumbs>
      <Crumb href="#" onClick={onClick}>
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  const link = screen.getByRole("link", { name: "Link text" });
  const focusSpy = jest.spyOn(link, "focus");

  await user.click(link);

  expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
  expect(onClick).toHaveBeenCalled();

  focusSpy.mockRestore();
  Object.defineProperty(window.navigator, "userAgent", {
    value: originalUA,
    configurable: true,
  });
});

test("does not render a link or call onClick on Safari when current", async () => {
  const originalUA = window.navigator.userAgent;
  Object.defineProperty(window.navigator, "userAgent", {
    value:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15",
    configurable: true,
  });

  const onClick = jest.fn();
  const user = userEvent.setup();

  render(
    <Breadcrumbs>
      <Crumb href="#" onClick={onClick} isCurrent>
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  await user.click(screen.getByText("Link text"));
  expect(
    screen.queryByRole("link", { name: "Link text" }),
  ).not.toBeInTheDocument();
  expect(onClick).not.toHaveBeenCalled();

  Object.defineProperty(window.navigator, "userAgent", {
    value: originalUA,
    configurable: true,
  });
});

test("adds aria-current='page' on the current crumb", () => {
  render(
    <Breadcrumbs>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>,
  );

  const el = screen.getByText("Current Page");
  expect(el).toHaveAttribute("aria-current", "page");
});

test("isSafari returns false when navigator is undefined (no preventScroll focus call)", () => {
  const originalDesc = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  Object.defineProperty(globalThis, "navigator", {
    value: undefined,
    configurable: true,
  });

  const onClick = jest.fn();

  render(
    <Breadcrumbs>
      <Crumb href="#" onClick={onClick}>
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  const link = screen.getByRole("link", { name: "Link text" });
  const focusSpy = jest.spyOn(link, "focus");

  fireEvent.click(link);

  expect(focusSpy).not.toHaveBeenCalledWith({ preventScroll: true });
  expect(onClick).toHaveBeenCalled();

  if (originalDesc) {
    Object.defineProperty(globalThis, "navigator", originalDesc);
  }
});
