import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../__spec_helper__/__internal__/test-utils";

import FileUploadStatus from ".";

test("when `status` is uploading, the component renders the provided status message", () => {
  render(
    <FileUploadStatus
      status="uploading"
      filename="foo.pdf"
      onAction={() => {}}
      progress={30}
      message="my status message"
    />,
  );

  expect(screen.getByText("my status message")).toBeVisible();
});

test("when `status` is uploading, the component renders the default status message if none is provided", () => {
  render(
    <FileUploadStatus
      status="uploading"
      filename="foo.pdf"
      onAction={() => {}}
      progress={30}
    />,
  );

  expect(screen.getByText("File upload status")).toBeVisible();
});

test("when `status` is uploading, the component renders a button with the cancel text, which performs the onAction function prop on click", async () => {
  const onAction = jest.fn();
  const user = userEvent.setup();
  render(
    <FileUploadStatus
      status="uploading"
      filename="foo.pdf"
      onAction={onAction}
      progress={30}
    />,
  );

  const actionButton = screen.getByRole("button", {
    name: "Cancel upload",
  });
  await user.click(actionButton);

  expect(onAction).toHaveBeenCalledTimes(1);
});

test("when `status` is uploading, the component renders the file name, but not as a link", () => {
  render(
    <FileUploadStatus
      status="uploading"
      filename="foo.pdf"
      onAction={() => {}}
      progress={30}
    />,
  );

  expect(screen.getByText("foo.pdf")).toBeVisible();
  expect(
    screen.queryByRole("link", { name: "foo.pdf" }),
  ).not.toBeInTheDocument();
});

test("when `status` is uploading, the component renders a progress tracker bar with the provided progress percentage if progress is set", () => {
  render(
    <FileUploadStatus
      status="uploading"
      filename="foo.pdf"
      onAction={() => {}}
      progress={30}
    />,
  );

  expect(screen.getByTestId("progress-tracker-bar")).toBeVisible();
  expect(screen.getByTestId("inner-bar")).toHaveStyle({ width: "30%" });
});

test("when `status` is uploading, the component renders a loader bar if the progress prop is not provided", () => {
  render(
    <FileUploadStatus
      status="uploading"
      filename="foo.pdf"
      onAction={() => {}}
    />,
  );

  expect(screen.getByRole("progressbar")).toBeVisible();
});

test("when `status` is completed, the component renders the provided status message", () => {
  render(
    <FileUploadStatus
      status="completed"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      onAction={() => {}}
      message="my status message"
    />,
  );

  expect(screen.getByText("my status message")).toBeVisible();
});

test("when `status` is completed, the component renders the default status message if none is provided", () => {
  render(
    <FileUploadStatus
      status="completed"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      onAction={() => {}}
    />,
  );

  expect(screen.getByText("File upload status")).toBeVisible();
});

test("when `status` is completed, the component renders a button with the delete text, which performs the onAction function prop on click", async () => {
  const onAction = jest.fn();
  const user = userEvent.setup();
  render(
    <FileUploadStatus
      status="completed"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      onAction={onAction}
    />,
  );

  const actionButton = screen.getByRole("button", { name: "Delete file" });
  await user.click(actionButton);

  expect(onAction).toHaveBeenCalledTimes(1);
});

test("when `status` is completed, the component renders the file name as a link with the provided props", () => {
  render(
    <FileUploadStatus
      status="completed"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      target="_blank"
      rel="noreferrer"
      onAction={() => {}}
    />,
  );

  const link = screen.queryByRole("link", { name: "foo.pdf" });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "http://carbon.sage.com");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});

test("when `status` is completed, the component does not render a progress bar", () => {
  render(
    <FileUploadStatus
      status="completed"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      onAction={() => {}}
    />,
  );

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});

test("when `status` is previously, the component does not render a status message", () => {
  render(
    <FileUploadStatus
      status="previously"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      onAction={() => {}}
      message="my status message"
    />,
  );

  expect(screen.queryByText("my status message")).not.toBeInTheDocument();
});

test("when `status` is previously, the component renders the file name as a link with the provided props", () => {
  render(
    <FileUploadStatus
      status="previously"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      target="_blank"
      rel="noreferrer"
      onAction={() => {}}
    />,
  );

  const link = screen.queryByRole("link", { name: "foo.pdf" });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "http://carbon.sage.com");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});

test("when `status` is previously, the component renders a button with the delete text, which performs the onAction function prop on click", async () => {
  const onAction = jest.fn();
  const user = userEvent.setup();
  render(
    <FileUploadStatus
      status="previously"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      onAction={onAction}
    />,
  );

  const actionButton = screen.getByRole("button", { name: "Delete file" });
  await user.click(actionButton);

  expect(onAction).toHaveBeenCalledTimes(1);
});

test("when `status` is previously, the component does not render a progress bar", () => {
  render(
    <FileUploadStatus
      status="previously"
      filename="foo.pdf"
      href="http://carbon.sage.com"
      onAction={() => {}}
    />,
  );

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});

test("when `status` is error, the component renders the provided status message", () => {
  render(
    <FileUploadStatus
      status="error"
      filename="foo.pdf"
      onAction={() => {}}
      message="my status message"
    />,
  );

  expect(screen.getByText("my status message")).toBeVisible();
});

test("when `status` is error, the component renders the default status message if none is provided", () => {
  render(
    <FileUploadStatus status="error" filename="foo.pdf" onAction={() => {}} />,
  );

  expect(screen.getByText("File upload status")).toBeVisible();
});

test("when `status` is error, the component renders a button with the clear text, which performs the onAction function prop on click", async () => {
  const onAction = jest.fn();
  const user = userEvent.setup();
  render(
    <FileUploadStatus
      status="error"
      filename="foo.pdf"
      onAction={onAction}
      message="my status message"
    />,
  );

  const actionButton = screen.getByRole("button", { name: "Clear" });
  await user.click(actionButton);

  expect(onAction).toHaveBeenCalledTimes(1);
});

test("when `status` is error, the component renders the file name, but not as a link", () => {
  render(
    <FileUploadStatus status="error" filename="foo.pdf" onAction={() => {}} />,
  );

  expect(screen.getByText("foo.pdf")).toBeVisible();
  expect(
    screen.queryByRole("link", { name: "foo.pdf" }),
  ).not.toBeInTheDocument();
});

test("when `status` is error, the component does not render a progress bar", () => {
  render(
    <FileUploadStatus status="error" filename="foo.pdf" onAction={() => {}} />,
  );

  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});
