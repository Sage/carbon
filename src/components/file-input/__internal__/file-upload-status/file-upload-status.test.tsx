import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FileUploadStatus from ".";

describe("in uploading state", () => {
  it("renders the provided status message", () => {
    render(
      <FileUploadStatus
        status="uploading"
        filename="foo.pdf"
        onAction={() => {}}
        progress={30}
        message="my status message"
      />
    );
    expect(screen.getByText("my status message")).toBeVisible();
  });

  it("renders the default status message if none is provided", () => {
    render(
      <FileUploadStatus
        status="uploading"
        filename="foo.pdf"
        onAction={() => {}}
        progress={30}
      />
    );
    expect(screen.getByText("File upload status")).toBeVisible();
  });

  it("renders a button with the cancel text, which performs the onAction function prop on click", async () => {
    const onAction = jest.fn();
    const user = userEvent.setup();
    render(
      <FileUploadStatus
        status="uploading"
        filename="foo.pdf"
        onAction={onAction}
        progress={30}
      />
    );
    const actionButton = screen.getByRole("button", {
      name: "Cancel upload",
    });
    await user.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders the file name, but not as a link", () => {
    render(
      <FileUploadStatus
        status="uploading"
        filename="foo.pdf"
        onAction={() => {}}
        progress={30}
      />
    );
    expect(screen.getByText("foo.pdf")).toBeVisible();
    expect(
      screen.queryByRole("link", { name: "foo.pdf" })
    ).not.toBeInTheDocument();
  });

  it("renders a progress bar with progress matching the progress prop", () => {
    render(
      <FileUploadStatus
        status="uploading"
        filename="foo.pdf"
        onAction={() => {}}
        progress={30}
      />
    );
    const progressBar = screen.queryByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "30");
  });

  it("renders a loader bar if the progress prop is not provided", () => {
    render(
      <FileUploadStatus
        status="uploading"
        filename="foo.pdf"
        onAction={() => {}}
      />
    );
    const progressBar = screen.queryByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).not.toHaveAttribute("aria-valuenow");
  });
});

describe("in completed state", () => {
  it("renders the provided status message", () => {
    render(
      <FileUploadStatus
        status="completed"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        onAction={() => {}}
        message="my status message"
      />
    );
    expect(screen.getByText("my status message")).toBeVisible();
  });

  it("renders the default status message if none is provided", () => {
    render(
      <FileUploadStatus
        status="completed"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        onAction={() => {}}
      />
    );
    expect(screen.getByText("File upload status")).toBeVisible();
  });

  it("renders a button with the delete text, which performs the onAction function prop on click", async () => {
    const onAction = jest.fn();
    const user = userEvent.setup();
    render(
      <FileUploadStatus
        status="completed"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        onAction={onAction}
      />
    );
    const actionButton = screen.getByRole("button", { name: "Delete file" });
    await user.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders the file name as a link with the provided props", () => {
    render(
      <FileUploadStatus
        status="completed"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        target="_blank"
        rel="noreferrer"
        onAction={() => {}}
      />
    );
    const link = screen.queryByRole("link", { name: "foo.pdf" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "http://carbon.sage.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("does not render a progress bar", () => {
    render(
      <FileUploadStatus
        status="completed"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        onAction={() => {}}
      />
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});

describe("in previously state", () => {
  it("does not render a status message", () => {
    render(
      <FileUploadStatus
        status="previously"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        onAction={() => {}}
        message="my status message"
      />
    );
    expect(screen.queryByText("my status message")).not.toBeInTheDocument();
  });

  it("renders the file name as a link with the provided props", () => {
    render(
      <FileUploadStatus
        status="previously"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        target="_blank"
        rel="noreferrer"
        onAction={() => {}}
      />
    );
    const link = screen.queryByRole("link", { name: "foo.pdf" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "http://carbon.sage.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("renders a button with the delete text, which performs the onAction function prop on click", async () => {
    const onAction = jest.fn();
    const user = userEvent.setup();
    render(
      <FileUploadStatus
        status="previously"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        onAction={onAction}
      />
    );
    const actionButton = screen.getByRole("button", { name: "Delete file" });
    await user.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("does not render a progress bar", () => {
    render(
      <FileUploadStatus
        status="previously"
        filename="foo.pdf"
        href="http://carbon.sage.com"
        onAction={() => {}}
      />
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});

describe("in error state", () => {
  it("renders the provided status message", () => {
    render(
      <FileUploadStatus
        status="error"
        filename="foo.pdf"
        onAction={() => {}}
        message="my status message"
      />
    );
    expect(screen.getByText("my status message")).toBeVisible();
  });

  it("renders the default status message if none is provided", () => {
    render(
      <FileUploadStatus status="error" filename="foo.pdf" onAction={() => {}} />
    );
    expect(screen.getByText("File upload status")).toBeVisible();
  });

  it("renders a button with the clear text, which performs the onAction function prop on click", async () => {
    const onAction = jest.fn();
    const user = userEvent.setup();
    render(
      <FileUploadStatus
        status="error"
        filename="foo.pdf"
        onAction={onAction}
        message="my status message"
      />
    );
    const actionButton = screen.getByRole("button", { name: "Clear" });
    await user.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders the file name, but not as a link", () => {
    render(
      <FileUploadStatus status="error" filename="foo.pdf" onAction={() => {}} />
    );
    expect(screen.getByText("foo.pdf")).toBeVisible();
    expect(
      screen.queryByRole("link", { name: "foo.pdf" })
    ).not.toBeInTheDocument();
  });

  it("does not render a progress bar", () => {
    render(
      <FileUploadStatus status="error" filename="foo.pdf" onAction={() => {}} />
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
