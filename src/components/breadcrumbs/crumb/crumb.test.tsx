import React from "react";
import { render, screen } from "@testing-library/react";
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
