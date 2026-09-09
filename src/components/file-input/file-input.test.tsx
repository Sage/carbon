import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import I18nProvider from "../i18n-provider";
import enGB from "../../locales/en-gb";
import FileInput, { FileUploadStatusProps } from ".";

test("renders a plural, vertical, single file picker by default", () => {
  render(<FileInput label="Files" onChange={() => {}} />);
  expect(
    screen.getByRole("button", { name: "Files Select files" }),
  ).toBeVisible();
  expect(
    screen.getByText(
      "Drag and drop your files, or click Select files to choose them",
    ),
  ).toBeVisible();
  expect(
    screen.getByLabelText("Files", { selector: "input" }),
  ).not.toHaveAttribute("multiple");
  expect(screen.getByTestId("file-input-presentation")).toHaveStyleRule(
    "flex-direction",
    "column",
  );
});

test("uses a custom picker label in the default drag-and-drop instruction", () => {
  render(<FileInput buttonText="Browse" label="Files" onChange={() => {}} />);

  expect(
    screen.getByText(
      "Drag and drop your files, or click Browse to choose them",
    ),
  ).toBeVisible();
});

test("renders a horizontal drop zone", () => {
  render(<FileInput isVertical={false} label="Files" onChange={() => {}} />);

  expect(screen.getByTestId("file-input-presentation")).toHaveStyleRule(
    "flex-direction",
    "row",
  );
});

test("connects the visible label to the file input", () => {
  render(<FileInput label="Files" onChange={() => {}} />);

  const input = screen.getByLabelText("Files", { selector: "input" });
  const label = screen.getByText("Files", { selector: "label" });

  expect(label).toHaveAttribute("for", input.id);
});

test("opens the native file picker from Select files", async () => {
  render(<FileInput label="Files" onChange={() => {}} />);

  const input = screen.getByLabelText("Files", { selector: "input" });
  const click = jest.spyOn(input, "click");

  await userEvent.click(screen.getByRole("button", { name: /Select files$/ }));

  expect(click).toHaveBeenCalledTimes(1);
});

test("forwards every selected file", async () => {
  const onChange = jest.fn();
  const files = [new File(["a"], "a.txt"), new File(["b"], "b.txt")];
  // multiple lets the native picker accept more than one file to begin with.
  render(<FileInput label="Files" onChange={onChange} multiple />);
  await userEvent.upload(
    screen.getByLabelText("Files", { selector: "input" }),
    files,
  );
  expect(onChange.mock.calls[0][0]).toHaveLength(2);
});

test("allows a selected file to be selected again after its status is removed", async () => {
  const onChange = jest.fn();
  const file = new File(["a"], "a.txt");

  const SelectionHarness = () => {
    const [uploadStatus, setUploadStatus] =
      React.useState<FileUploadStatusProps>();

    return (
      <FileInput
        label="Files"
        uploadStatus={uploadStatus}
        onChange={(files) => {
          onChange(files);
          setUploadStatus({
            status: "completed",
            filename: files[0].name,
            onDelete: () => setUploadStatus(undefined),
          });
        }}
      />
    );
  };

  render(<SelectionHarness />);

  const input = screen.getByLabelText("Files", { selector: "input" });
  await userEvent.upload(input, file);
  await userEvent.click(screen.getByRole("button", { name: "Delete a.txt" }));

  await userEvent.upload(input, file);
  expect(onChange).toHaveBeenCalledTimes(2);
});

test("accepts every dropped file and returns focus to Select files", () => {
  const onChange = jest.fn();
  const files = [new File(["a"], "a.txt"), new File(["b"], "b.txt")];
  render(<FileInput onChange={onChange} />);
  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files, types: ["Files"] },
  });
  expect(onChange.mock.calls[0][0]).toHaveLength(2);
  expect(screen.getByRole("button", { name: /Select files$/ })).toHaveFocus();
  expect(screen.getByText("Files added: a.txt, b.txt")).toBeInTheDocument();
});

test("keeps Select files focused after a controlled drop, with the new file action next in tab order", async () => {
  const DropHarness = () => {
    const [uploadStatus, setUploadStatus] =
      React.useState<FileUploadStatusProps>();

    return (
      <FileInput
        label="Files"
        onChange={(files) =>
          setUploadStatus({
            status: "completed",
            filename: files[0].name,
            onDelete: () => setUploadStatus(undefined),
          })
        }
        uploadStatus={uploadStatus}
      />
    );
  };

  render(<DropHarness />);
  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: {
      files: [new File(["a"], "a.txt")],
      types: ["Files"],
    },
  });

  expect(screen.getByRole("button", { name: /Select files$/ })).toHaveFocus();
  await userEvent.tab();
  expect(screen.getByRole("button", { name: "Delete a.txt" })).toHaveFocus();
});

test("announces a single added file using the singular form", () => {
  const onChange = jest.fn();
  const files = [new File(["a"], "a.txt")];
  render(<FileInput onChange={onChange} />);
  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files, types: ["Files"] },
  });
  expect(screen.getByText("File added: a.txt")).toBeInTheDocument();
});

test("disabled prevents picker and drop callbacks", async () => {
  const onChange = jest.fn();
  render(<FileInput disabled label="Files" onChange={onChange} />);
  const input = screen.getByLabelText("Files", { selector: "input" });
  expect(input).toBeDisabled();
  expect(screen.getByRole("button", { name: /Select files$/ })).toBeDisabled();
  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files: [new File(["a"], "a.txt")], types: ["Files"] },
  });
  fireEvent.change(input, {
    target: { files: [new File(["a"], "a.txt")] },
  });
  expect(onChange).not.toHaveBeenCalled();
});

test("ignores an empty native file selection", () => {
  const onChange = jest.fn();
  render(<FileInput label="Files" onChange={onChange} />);

  fireEvent.change(screen.getByLabelText("Files", { selector: "input" }), {
    target: { files: [] },
  });

  expect(onChange).not.toHaveBeenCalled();
});

test("keeps the drop zone and renders named current and previous lists", () => {
  render(
    <FileInput
      onChange={() => {}}
      multiple
      uploadStatus={[
        {
          status: "uploading",
          filename: "a.pdf",
          progress: 20,
          onCancel: () => {},
        },
        {
          status: "error",
          filename: "b.pdf",
          message: "Failed",
          onRemove: () => {},
        },
        {
          status: "previously",
          filename: "c.pdf",
          message: "Uploaded yesterday",
        },
      ]}
    />,
  );
  expect(screen.getByRole("button", { name: /Select files$/ })).toBeVisible();
  expect(screen.getByRole("list", { name: "Current files (2)" })).toBeVisible();
  expect(
    screen.getByRole("list", { name: "Previously uploaded file (1)" }),
  ).toBeVisible();
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("shows an error summary when any of multiple current files fails", () => {
  const { rerender } = render(
    <FileInput
      onChange={() => {}}
      multiple
      uploadStatus={[
        {
          status: "error",
          filename: "failed.pdf",
          onRemove: () => {},
        },
        {
          status: "completed",
          filename: "uploaded.pdf",
          onDelete: () => {},
        },
      ]}
    />,
  );

  expect(screen.getByText("1 file couldn't be uploaded")).toBeVisible();

  rerender(
    <FileInput
      onChange={() => {}}
      multiple
      uploadStatus={{
        status: "error",
        filename: "failed.pdf",
        onRemove: () => {},
      }}
    />,
  );

  expect(
    screen.queryByText("1 file couldn't be uploaded"),
  ).not.toBeInTheDocument();
});

test("provides all current status counts to the error-summary translation", () => {
  const currentFilesErrorSummary = jest.fn(
    ({ errorCount, totalCount }) => `${errorCount} out of ${totalCount} failed`,
  );

  render(
    <I18nProvider
      locale={{
        ...enGB,
        fileInput: { ...enGB.fileInput, currentFilesErrorSummary },
      }}
    >
      <FileInput
        onChange={() => {}}
        multiple
        uploadStatus={[
          { status: "error", filename: "failed.pdf", onRemove: () => {} },
          {
            status: "uploading",
            filename: "uploading.pdf",
            onCancel: () => {},
          },
          {
            status: "completed",
            filename: "uploaded.pdf",
            onDelete: () => {},
          },
        ]}
      />
    </I18nProvider>,
  );

  expect(currentFilesErrorSummary).toHaveBeenCalledWith({
    totalCount: 3,
    uploadingCount: 1,
    completedCount: 1,
    errorCount: 1,
  });
  expect(screen.getByText("1 out of 3 failed")).toBeVisible();
});

test("renders a thumbnail for a completed file", () => {
  render(
    <FileInput
      onChange={() => {}}
      uploadStatus={{
        status: "completed",
        filename: "receipt.png",
        thumbnailSrc: "https://example.com/receipt.png",
        onDelete: () => {},
      }}
    />,
  );

  expect(screen.getByAltText("")).toHaveAttribute(
    "src",
    "https://example.com/receipt.png",
  );
});

test("uses singular collection labels for a single current or previous file", () => {
  render(
    <FileInput
      onChange={() => {}}
      uploadStatus={[
        {
          status: "uploading",
          filename: "a.pdf",
          progress: 20,
          onCancel: () => {},
        },
        {
          status: "previously",
          filename: "c.pdf",
          message: "Uploaded yesterday",
        },
      ]}
    />,
  );
  expect(screen.getByRole("list", { name: "Current file (1)" })).toBeVisible();
  expect(
    screen.getByRole("list", { name: "Previously uploaded file (1)" }),
  ).toBeVisible();
});

test("renders a labelled list for multiple current files", () => {
  render(
    <FileInput
      onChange={() => {}}
      multiple
      uploadStatus={Array.from({ length: 10 }, (_, index) => ({
        id: `file-${index}`,
        status: "completed" as const,
        filename: `file-${index}.pdf`,
        onDelete: () => {},
      }))}
    />,
  );

  const list = screen.getByRole("list", { name: "Current files (10)" });
  expect(list).toBeVisible();
  expect(list).toHaveProperty("tagName", "UL");
  expect(screen.getAllByRole("listitem")[0]).toHaveProperty("tagName", "LI");
});

test("announces the first upload completion after the initial status snapshot", () => {
  const { rerender } = render(
    <FileInput
      onChange={() => {}}
      uploadStatus={{
        status: "uploading",
        filename: "a.pdf",
        onCancel: () => {},
      }}
    />,
  );

  rerender(
    <FileInput
      onChange={() => {}}
      uploadStatus={{
        status: "completed",
        filename: "a.pdf",
        onDelete: () => {},
      }}
    />,
  );

  expect(screen.getByText("Upload complete: a.pdf")).toBeInTheDocument();
});

test("announces a later completion when an identically named file is already complete", () => {
  const { rerender } = render(
    <FileInput
      onChange={() => {}}
      multiple
      uploadStatus={[
        {
          status: "completed",
          filename: "invoice.pdf",
          onDelete: () => {},
        },
        {
          status: "uploading",
          filename: "invoice.pdf",
          onCancel: () => {},
        },
      ]}
    />,
  );

  rerender(
    <FileInput
      onChange={() => {}}
      multiple
      uploadStatus={[
        {
          status: "completed",
          filename: "invoice.pdf",
          onDelete: () => {},
        },
        {
          status: "completed",
          filename: "invoice.pdf",
          onDelete: () => {},
        },
      ]}
    />,
  );

  expect(screen.getByText("Upload complete: invoice.pdf")).toBeInTheDocument();
});

test("announces a completion that replaces an identically named completed file", () => {
  const { rerender } = render(
    <FileInput
      onChange={() => {}}
      multiple
      uploadStatus={[
        {
          id: "old-upload",
          status: "completed",
          filename: "invoice.pdf",
          onDelete: () => {},
        },
        {
          id: "new-upload",
          status: "uploading",
          filename: "invoice.pdf",
          onCancel: () => {},
        },
      ]}
    />,
  );

  rerender(
    <FileInput
      onChange={() => {}}
      multiple
      uploadStatus={[
        {
          id: "new-upload",
          status: "completed",
          filename: "invoice.pdf",
          onDelete: () => {},
        },
      ]}
    />,
  );

  expect(screen.getByText("Upload complete: invoice.pdf")).toBeInTheDocument();
});

test("does not announce statuses that are already completed on initial render", () => {
  render(
    <FileInput
      onChange={() => {}}
      uploadStatus={{
        status: "completed",
        filename: "a.pdf",
        onDelete: () => {},
      }}
    />,
  );

  expect(screen.queryByText("Upload complete: a.pdf")).not.toBeInTheDocument();
});

test("does not repeat an upload-complete announcement on rerender", () => {
  const uploadingStatus = {
    status: "uploading" as const,
    filename: "a.pdf",
    onCancel: () => {},
  };
  const completedStatus = {
    status: "completed" as const,
    filename: "a.pdf",
    onDelete: () => {},
  };
  const { rerender } = render(
    <FileInput onChange={() => {}} uploadStatus={uploadingStatus} />,
  );
  rerender(<FileInput onChange={() => {}} uploadStatus={completedStatus} />);

  const announcement = screen.getByText("Upload complete: a.pdf");
  rerender(<FileInput onChange={() => {}} uploadStatus={completedStatus} />);

  expect(screen.getByText("Upload complete: a.pdf")).toBe(announcement);
});

test("returns focus to the picker after deleting the only status", async () => {
  const CompletedFile = () => {
    const [uploadStatus, setUploadStatus] = React.useState<
      FileUploadStatusProps | undefined
    >({
      status: "completed",
      filename: "a.pdf",
      onDelete: () => setUploadStatus(undefined),
    });
    return <FileInput onChange={() => {}} uploadStatus={uploadStatus} />;
  };
  render(<CompletedFile />);

  await userEvent.click(screen.getByRole("button", { name: "Delete a.pdf" }));
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

  expect(screen.getByRole("button", { name: /Select files$/ })).toHaveFocus();
});

test("exposes controlled field error semantics without deriving an error", () => {
  const { rerender } = render(
    <FileInput required label="Files" onChange={() => {}} />,
  );
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  rerender(
    <FileInput
      required
      label="Files"
      error="Select at least one file"
      onChange={() => {}}
    />,
  );
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Select at least one file",
  );
  expect(screen.getByLabelText("Files", { selector: "input" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(screen.getByLabelText("Files", { selector: "input" })).toBeRequired();
});

test("does not require the native input when files are supplied through statuses", () => {
  const onChange = () => {};
  const { rerender } = render(
    <form aria-label="File upload form">
      <FileInput required label="Files" onChange={onChange} />
    </form>,
  );
  const form = screen.getByRole("form", {
    name: "File upload form",
  }) as HTMLFormElement;

  expect(form.checkValidity()).toBe(false);

  rerender(
    <form aria-label="File upload form">
      <FileInput
        required
        label="Files"
        onChange={onChange}
        uploadStatus={{
          status: "completed",
          filename: "a.pdf",
          onDelete: () => {},
        }}
      />
    </form>,
  );

  expect(form.checkValidity()).toBe(true);

  rerender(
    <form aria-label="File upload form">
      <FileInput
        required
        label="Files"
        onChange={onChange}
        uploadStatus={{ status: "previously", filename: "a.pdf" }}
      />
    </form>,
  );

  expect(form.checkValidity()).toBe(true);
});

test("multiple defaults to false and keeps the picker visible alongside a file", () => {
  render(
    <FileInput
      label="Files"
      onChange={() => {}}
      uploadStatus={{
        status: "completed",
        filename: "a.pdf",
        onDelete: () => {},
      }}
    />,
  );
  expect(
    screen.getByLabelText("Files", { selector: "input" }),
  ).not.toHaveAttribute("multiple");
  expect(screen.getByRole("button", { name: /Select files$/ })).toBeVisible();
  expect(screen.getByText("a.pdf")).toBeInTheDocument();
});

test("keeps the picker visible alongside a previously uploaded file", () => {
  render(
    <FileInput
      label="Files"
      onChange={() => {}}
      uploadStatus={{
        status: "previously",
        filename: "a.pdf",
        message: "Uploaded yesterday",
      }}
    />,
  );
  expect(
    screen.getByRole("button", { name: /Select files$/ }),
  ).toBeInTheDocument();
  expect(screen.getByText("a.pdf")).toBeInTheDocument();
});

test("multiple={true} keeps the drop zone visible alongside statuses", () => {
  render(
    <FileInput
      label="Files"
      onChange={() => {}}
      multiple
      uploadStatus={{
        status: "completed",
        filename: "a.pdf",
        onDelete: () => {},
      }}
    />,
  );
  expect(screen.getByLabelText("Files", { selector: "input" })).toHaveAttribute(
    "multiple",
  );
  expect(screen.getByRole("button", { name: /Select files$/ })).toBeVisible();
  expect(screen.getByText("a.pdf")).toBeInTheDocument();
});

test("multiple=false keeps the picker visible when an error status appears", () => {
  const { rerender } = render(
    <FileInput label="Files" onChange={() => {}} multiple={false} />,
  );
  expect(
    screen.getByLabelText("Files", { selector: "input" }),
  ).not.toHaveAttribute("multiple");
  expect(screen.getByRole("button", { name: /Select files$/ })).toBeVisible();

  rerender(
    <FileInput
      label="Files"
      onChange={() => {}}
      multiple={false}
      uploadStatus={{
        status: "error",
        filename: "a.pdf",
        onRemove: () => {},
      }}
    />,
  );
  expect(screen.getByRole("button", { name: /Select files$/ })).toBeVisible();
  expect(screen.getByText("a.pdf")).toBeInTheDocument();
});

test("multiple=false keeps the picker visible as a file status is removed", () => {
  const { rerender } = render(
    <FileInput
      label="Files"
      onChange={() => {}}
      multiple={false}
      uploadStatus={{
        status: "completed",
        filename: "a.pdf",
        onDelete: () => {},
      }}
    />,
  );
  expect(screen.getByRole("button", { name: /Select files$/ })).toBeVisible();

  rerender(<FileInput label="Files" onChange={() => {}} multiple={false} />);
  expect(screen.getByRole("button", { name: /Select files$/ })).toBeVisible();
});

test("multiple=false still forwards every file from a drop, so the consumer can detect and reject more than one", () => {
  // Drag and drop bypasses the native `multiple` attribute, so FileInput
  // must still forward every file itself.
  const onChange = jest.fn();
  const files = [new File(["a"], "a.txt"), new File(["b"], "b.txt")];
  render(<FileInput onChange={onChange} multiple={false} />);
  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files, types: ["Files"] },
  });
  expect(onChange.mock.calls[0][0]).toHaveLength(2);
});

test("multiple=false: a consumer can surface too-many-files as a Field error, matching the required-and-empty error treatment", () => {
  // Mirrors SingleFile's onChange: rejects more than one file via the same
  // controlled `error` prop used for a required-and-empty input.
  const SingleFileConsumer = () => {
    const [error, setError] = React.useState<string>();
    const onChange = (files: FileList) => {
      if (files.length > 1) {
        setError("Select only one file");
        return;
      }
      setError(undefined);
    };
    return (
      <FileInput
        label="Files"
        required
        multiple={false}
        error={error}
        onChange={onChange}
      />
    );
  };
  render(<SingleFileConsumer />);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();

  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: {
      files: [new File(["a"], "a.txt"), new File(["b"], "b.txt")],
      types: ["Files"],
    },
  });
  expect(screen.getByRole("alert")).toHaveTextContent("Select only one file");
  expect(screen.getByLabelText("Files", { selector: "input" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files: [new File(["a"], "a.txt")], types: ["Files"] },
  });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("constrains the validation message to the same width as the Drop zone, not the full available width", () => {
  // Regression: the message is a block-level <p> with no width of its own,
  // so without this it wraps at FormField's ambient width instead of the
  // Drop zone's narrower maxWidth.
  render(
    <FileInput
      label="Files"
      maxWidth="400px"
      error="Some validation message"
      onChange={() => {}}
    />,
  );
  const dropZone = screen.getByTestId("file-input-presentation");
  expect(dropZone).toHaveStyle({ maxWidth: "400px" });
  // The message shares its immediate parent with the Drop zone, so this
  // also covers the top- and bottom-positioned message cases at once.
  // eslint-disable-next-line testing-library/no-node-access -- no clean alternative in RTL
  const container = dropZone.parentElement as HTMLElement;
  expect(container).toContainElement(
    screen.getByText("Some validation message"),
  );
  expect(container).toHaveStyle({ maxWidth: "400px" });
});

test("applies accept and associates Select files with hint and validation", () => {
  render(
    <FileInput
      label="Files"
      accept="image/*"
      inputHint="PNG up to 2MB"
      error="Choose an image"
      buttonText="Choose"
      dragAndDropText="Drop images"
      onChange={() => {}}
    />,
  );
  const input = screen.getByLabelText("Files", { selector: "input" });
  expect(input).toHaveAttribute("accept", "image/*");
  expect(input).toHaveAccessibleDescription("PNG up to 2MB Choose an image");
  expect(
    screen.getByRole("button", { name: "Files Choose" }),
  ).toHaveAccessibleDescription("PNG up to 2MB Choose an image");
});
