import React, { createRef } from "react";
import { render, screen, within } from "@testing-library/react";

import Dialog from "../dialog.component";
import DialogHeadingStatus from "./dialog-header.component";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("DialogHeader", () => {
  test.each([
    ["subtle", "info"],
    ["positive", "tick_circle"],
    ["negative", "error"],
    ["caution", "warning"],
    ["info", "info"],
  ] as const)(
    "renders the %s status icon with the correct icon type",
    (status, expectedIconType) => {
      render(
        <DialogHeadingStatus
          title={`${status} Title`}
          subtitle="Subheading"
          status={status}
        />,
      );

      const statusHeading = screen.getByTestId("status-heading");
      expect(statusHeading).toBeVisible();

      const icon = within(statusHeading).getByTestId("icon");
      expect(icon).toHaveAttribute("type", expectedIconType);
    },
  );

  test("renders the title text inside the status heading", () => {
    render(
      <DialogHeadingStatus
        title="Dialog title with positive icon"
        status="positive"
      />,
    );

    const statusHeading = screen.getByTestId("status-heading");
    expect(
      within(statusHeading).getByRole("heading", {
        level: 1,
        name: /Dialog title with positive icon/i,
      }),
    ).toBeVisible();
  });

  test("renders the subtitle inside the status heading", () => {
    render(
      <DialogHeadingStatus
        title="Title"
        subtitle="Subheading"
        status="negative"
      />,
    );

    const statusHeading = screen.getByTestId("status-heading");
    expect(within(statusHeading).getByText("Subheading")).toBeVisible();
  });

  test("renders without subtitle when subtitle is not provided", () => {
    render(<DialogHeadingStatus title="Title Only" status="info" />);

    const statusHeading = screen.getByTestId("status-heading");
    expect(statusHeading).toBeVisible();
    expect(
      within(statusHeading).queryByTestId("subtitle"),
    ).not.toBeInTheDocument();
  });

  test("forwards ref to the container element", () => {
    const ref = createRef<HTMLDivElement>();

    render(<DialogHeadingStatus title="Title" status="positive" ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  test("works when passed as title prop to Dialog", () => {
    render(
      <Dialog
        open
        title={
          <DialogHeadingStatus
            title="Dialog with status"
            subtitle="Subtitle text"
            status="positive"
          />
        }
      />,
    );

    const dialog = screen.getByRole("dialog");
    const statusHeading = within(dialog).getByTestId("status-heading");
    expect(statusHeading).toBeVisible();
    expect(
      within(statusHeading).getByRole("heading", {
        level: 1,
        name: /Dialog with status/i,
      }),
    ).toBeVisible();
    expect(within(statusHeading).getByText("Subtitle text")).toBeVisible();
  });

  test("displayName is set correctly", () => {
    expect(DialogHeadingStatus.displayName).toBe("DialogHeadingStatus");
  });
});
