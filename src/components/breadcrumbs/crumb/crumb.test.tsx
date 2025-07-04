import React from "react";
import { render, screen, within } from "@testing-library/react";
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

test("does not pass href to the anchor element when isCurrent is true", () => {
  render(
    <Breadcrumbs>
      <Crumb href="foo" data-role="crumb" isCurrent>
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  const anchor = screen.getByTestId("link-anchor");

  expect(anchor).not.toHaveAttribute("href", "foo");
});

test("calls onClick callback when the crumb link is clicked", async () => {
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
  await user.click(link);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("does not call onClick callback when isCurrent is true", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <Breadcrumbs>
      <Crumb href="#" onClick={onClick} isCurrent>
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  const link = screen.getByText("Link text");
  await user.click(link);

  expect(onClick).toHaveBeenCalledTimes(0);
});

test("renders with provided data- attributes", () => {
  render(
    <Breadcrumbs>
      <Crumb href="#" data-element="bar" data-role="baz">
        Link text
      </Crumb>
    </Breadcrumbs>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("renders `isCurrent` correctly", () => {
  render(
    <Breadcrumbs aria-label="Default breadcrumbs">
      <Crumb href="#" data-role="bc-1">
        Breadcrumb 1
      </Crumb>
      <Crumb href="#" data-role="bc-2">
        Breadcrumb 2
      </Crumb>
      <Crumb href="#" data-role="bc-3">
        Breadcrumb 3
      </Crumb>
      <Crumb href="#" data-role="bc-4" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>,
  );

  const currentCrumb = screen.getByTestId("bc-4");
  const anchor = within(currentCrumb).getByTestId("link-anchor");

  expect(currentCrumb).toHaveTextContent("Current Page");
  expect(anchor).toHaveStyle("text-decoration: none");
});
