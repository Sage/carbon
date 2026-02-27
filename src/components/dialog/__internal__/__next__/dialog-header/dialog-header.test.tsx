import React, { createRef, forwardRef } from "react";
import { render, screen, within } from "@testing-library/react";

import Dialog, { DialogHandle, DialogProps } from "../dialog.component";
import withDialogHeader from "./dialog-header.component";

const DialogWithHeadingVariant = withDialogHeader(Dialog);

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("withDialogHeader", () => {
  describe("without renderHeading", () => {
    test("renders the default title as a heading", () => {
      render(<DialogWithHeadingVariant open title="Default Title" />);

      const dialog = screen.getByRole("dialog", { name: /Default Title/i });
      const heading = within(dialog).getByRole("heading", {
        level: 1,
        name: /Default Title/i,
      });

      expect(heading).toBeVisible();
    });

    test("renders the default subtitle", () => {
      render(
        <DialogWithHeadingVariant
          open
          title="My Title"
          subtitle="My Subtitle"
        />,
      );

      const dialog = screen.getByRole("dialog", {
        description: /My Subtitle/i,
      });

      expect(dialog).toHaveTextContent("My Subtitle");
    });
  });

  describe("with renderHeading", () => {
    test("calls renderHeading with the title and subtitle", () => {
      const renderHeading = jest.fn(
        (title: React.ReactNode, subtitle: React.ReactNode) => (
          <div data-role="custom-heading">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        ),
      );

      render(
        <DialogWithHeadingVariant
          open
          title="Custom Title"
          subtitle="Custom Subtitle"
          renderHeading={renderHeading}
        />,
      );

      expect(renderHeading).toHaveBeenCalledWith(
        "Custom Title",
        "Custom Subtitle",
      );
    });

    test("renders the custom heading output", () => {
      render(
        <DialogWithHeadingVariant
          open
          title="Custom Title"
          subtitle="Custom Subtitle"
          renderHeading={(title, subtitle) => (
            <div data-role="custom-heading">
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
          )}
        />,
      );

      const customHeading = screen.getByTestId("custom-heading");
      expect(customHeading).toBeVisible();
      expect(
        within(customHeading).getByRole("heading", {
          level: 1,
          name: /Custom Title/i,
        }),
      ).toBeVisible();
      expect(customHeading).toHaveTextContent("Custom Subtitle");
    });

    test("does not render subtitle separately when renderHeading is provided", () => {
      render(
        <DialogWithHeadingVariant
          open
          title="Title"
          subtitle="Subtitle"
          renderHeading={(title) => <h1>{title}</h1>}
        />,
      );

      expect(
        screen.queryByTestId("subtitle") ??
          screen.queryByText("Subtitle", {
            selector: '[data-element="subtitle"]',
          }),
      ).not.toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    test("forwards the ref to the underlying Dialog", () => {
      const ref = createRef<DialogHandle>();

      render(<DialogWithHeadingVariant open title="Ref Test" ref={ref} />);

      expect(ref.current).not.toBeNull();
      expect(ref.current).toHaveProperty("focus");
    });
  });

  describe("with statusIcon", () => {
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
          <DialogWithHeadingVariant
            open
            title={`${status} Title`}
            subtitle="Subheading"
            statusIcon={status}
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
        <DialogWithHeadingVariant
          open
          title="Dialog title with positive icon"
          statusIcon="positive"
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
        <DialogWithHeadingVariant
          open
          title="Title"
          subtitle="Subheading"
          statusIcon="negative"
        />,
      );

      const statusHeading = screen.getByTestId("status-heading");
      expect(within(statusHeading).getByText("Subheading")).toBeVisible();
    });

    test("does not render subtitle separately from the status heading", () => {
      render(
        <DialogWithHeadingVariant
          open
          title="Title"
          subtitle="Subheading"
          statusIcon="caution"
        />,
      );

      // Subtitle should only appear inside the status heading, not as a
      // separate element rendered by the base Dialog
      const subtitleElements = screen.getAllByText("Subheading");
      expect(subtitleElements).toHaveLength(1);

      const statusHeading = screen.getByTestId("status-heading");
      expect(within(statusHeading).getByText("Subheading")).toBeVisible();
    });

    test("renders without subtitle when subtitle is not provided", () => {
      render(
        <DialogWithHeadingVariant open title="Title Only" statusIcon="info" />,
      );

      const statusHeading = screen.getByTestId("status-heading");
      expect(statusHeading).toBeVisible();
      expect(
        within(statusHeading).queryByTestId("subtitle"),
      ).not.toBeInTheDocument();
    });
  });

  describe("displayName", () => {
    test("sets the correct displayName", () => {
      expect(DialogWithHeadingVariant.displayName).toBe(
        "withDialogHeader(Dialog)",
      );
    });

    test("falls back to 'Component' when displayName is not set", () => {
      const AnonymousDialog = forwardRef<DialogHandle, DialogProps>(
        (props, ref) => <Dialog {...props} ref={ref} />,
      );
      delete (AnonymousDialog as unknown as Record<string, unknown>)
        .displayName;

      const Wrapped = withDialogHeader(AnonymousDialog as typeof Dialog);

      expect(Wrapped.displayName).toBe("withDialogHeader(Component)");
    });
  });
});
