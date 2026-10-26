import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import I18nProvider from "../i18n-provider";
import enGB from "../../locales/en-gb";
import FileInput, { FileUploadStatusProps } from ".";

afterEach(() => {
  jest.useRealTimers();
});

test("renders a singular, vertical, single file picker by default", () => {
  render(<FileInput label="Files" onChange={() => {}} />);
  expect(
    screen.getByRole("button", { name: "Files Select file" }),
  ).toBeVisible();
  expect(
    screen.getByText(
      "Drag and drop your file, or use Select file to choose it",
    ),
  ).toBeVisible();
  expect(
    screen.getByLabelText("Files", { selector: "input" }),
  ).not.toHaveAttribute("multiple");
});

test("uses a custom picker label in the default drag-and-drop instruction", () => {
  render(<FileInput buttonText="Browse" label="Files" onChange={() => {}} />);

  expect(
    screen.getByText("Drag and drop your file, or use Browse to choose it"),
  ).toBeVisible();
});

test("preserves the legacy no-argument picker locale copy", () => {
  expect(enGB.fileInput.selectFile()).toBe("Select file");
  expect(enGB.fileInput.dragAndDrop()).toBe("or drag and drop your file");
});

test("forwards an object ref to the native file input", () => {
  const ref = React.createRef<HTMLInputElement>();

  render(<FileInput ref={ref} label="Files" onChange={() => {}} />);

  expect(ref.current).toBe(
    screen.getByLabelText("Files", { selector: "input" }),
  );
});

test("forwards a callback ref to the native file input", () => {
  const ref = jest.fn();

  render(<FileInput ref={ref} label="Files" onChange={() => {}} />);

  expect(ref).toHaveBeenCalledWith(
    screen.getByLabelText("Files", { selector: "input" }),
  );
});

test("forwards Carbon data tags to the root", () => {
  render(
    <FileInput
      data-role="custom-file-input"
      data-element="custom-element"
      onChange={() => {}}
    />,
  );

  expect(screen.getByTestId("custom-file-input")).toHaveAttribute(
    "data-component",
    "file-input",
  );
  expect(screen.getByTestId("custom-file-input")).toHaveAttribute(
    "data-element",
    "custom-element",
  );
});

test("opens the native file picker from Select file", async () => {
  render(<FileInput label="Files" onChange={() => {}} />);

  const input = screen.getByLabelText("Files", { selector: "input" });
  const click = jest.spyOn(input, "click");

  await userEvent.click(screen.getByRole("button", { name: /Select file$/ }));

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

test("ignores an empty native file selection", () => {
  const onChange = jest.fn();
  render(<FileInput label="Files" onChange={onChange} />);

  fireEvent.change(screen.getByLabelText("Files", { selector: "input" }), {
    target: { files: [] },
  });

  expect(onChange).not.toHaveBeenCalled();
});

test("disabled prevents picker and drop callbacks", async () => {
  const onChange = jest.fn();
  render(<FileInput disabled label="Files" onChange={onChange} />);
  const input = screen.getByLabelText("Files", { selector: "input" });
  expect(input).toBeDisabled();
  expect(screen.getByRole("button", { name: /Select file$/ })).toBeDisabled();
  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files: [new File(["a"], "a.txt")], types: ["Files"] },
  });
  fireEvent.change(input, {
    target: { files: [new File(["a"], "a.txt")] },
  });
  expect(onChange).not.toHaveBeenCalled();
});

test("multiple=false forwards every dropped file without announcing acceptance and returns focus to the picker", () => {
  // Drag and drop bypasses the native `multiple` attribute, so FileInput
  // must still forward every file itself.
  const onChange = jest.fn();
  const files = [new File(["a"], "a.txt"), new File(["b"], "b.txt")];
  render(<FileInput onChange={onChange} multiple={false} />);
  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files, types: ["Files"] },
  });
  expect(onChange.mock.calls[0][0]).toHaveLength(2);
  expect(screen.getByRole("button", { name: /Select file$/ })).toHaveFocus();
  expect(
    screen.queryByText("Selected files: a.txt, b.txt."),
  ).not.toBeInTheDocument();
});

test("passes a dropped file to onChange while a field error is present", () => {
  const onChange = jest.fn();
  render(<FileInput error="Select at least one file" onChange={onChange} />);

  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files: [new File(["a"], "a.txt")], types: ["Files"] },
  });

  expect(onChange).toHaveBeenCalledTimes(1);
});

test("retains a native selection until a controlled status is supplied", async () => {
  let showCompletedStatus = () => {};
  const ControlledFileInput = () => {
    const [uploadStatus, setUploadStatus] =
      React.useState<FileUploadStatusProps>();
    showCompletedStatus = () =>
      setUploadStatus({
        status: "completed",
        filename: "a.txt",
        onDelete: () => setUploadStatus(undefined),
      });

    return (
      <form aria-label="File upload form">
        <FileInput
          required
          label="Files"
          name="attachment"
          onChange={() => {}}
          uploadStatus={uploadStatus}
        />
      </form>
    );
  };

  render(<ControlledFileInput />);
  const input = screen.getByLabelText("Files", {
    selector: "input",
  }) as HTMLInputElement;
  await userEvent.upload(input, new File(["a"], "a.txt"));

  expect(input.files).toHaveLength(1);
  act(showCompletedStatus);
  expect(screen.getByRole("button", { name: "Delete a.txt" })).toBeVisible();
  expect(input.files).toHaveLength(0);
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

test("announces a single selected file using the singular form", () => {
  const onChange = jest.fn();
  const files = [new File(["a"], "a.txt")];
  render(<FileInput onChange={onChange} />);
  fireEvent.drop(screen.getByTestId("file-input-presentation"), {
    dataTransfer: { files, types: ["Files"] },
  });
  expect(screen.getByText("Selected file: a.txt.")).toBeInTheDocument();
});

test("describes the multi-file picker with the latest result and clears it when reopened", () => {
  const files = [new File(["a"], "a.pdf"), new File(["b"], "b.pdf")];
  render(
    <FileInput
      multiple
      required
      label="Files"
      inputHint="PDF files only"
      onChange={() => {}}
    />,
  );
  const input = screen.getByLabelText("Files", {
    selector: 'input[type="file"]',
  });
  const button = screen.getByRole("button", { name: "Files Select files" });

  fireEvent.change(input, { target: { files } });

  expect(button).toHaveAccessibleDescription(
    "Selected files: a.pdf, b.pdf. This field is required. PDF files only",
  );

  fireEvent.click(button);

  expect(button).toHaveAccessibleDescription(
    "This field is required. PDF files only",
  );

  fireEvent.change(input, { target: { files } });
  fireEvent.click(screen.getByText("Files"));

  expect(button).toHaveAccessibleDescription(
    "This field is required. PDF files only",
  );
});

test("stops describing the multi-file picker with the selection result when it loses focus", () => {
  render(<FileInput multiple label="Files" onChange={() => {}} />);
  const input = screen.getByLabelText("Files", {
    selector: 'input[type="file"]',
  });
  const button = screen.getByRole("button", { name: "Files Select files" });

  fireEvent.change(input, { target: { files: [new File(["a"], "a.pdf")] } });

  expect(button).toHaveAccessibleDescription("Selected file: a.pdf.");

  fireEvent.blur(button);

  expect(button).toHaveAccessibleDescription("");
  expect(screen.getByText("Selected file: a.pdf.")).toBeInTheDocument();
});

test("announces an upload completion without describing the multi-file picker with it", () => {
  const { rerender } = render(
    <FileInput
      multiple
      label="Files"
      onChange={() => {}}
      uploadStatus={[
        { status: "uploading", filename: "a.pdf", onCancel: () => {} },
      ]}
    />,
  );
  const input = screen.getByLabelText("Files", {
    selector: 'input[type="file"]',
  });
  fireEvent.change(input, { target: { files: [new File(["b"], "b.pdf")] } });

  rerender(
    <FileInput
      multiple
      label="Files"
      onChange={() => {}}
      uploadStatus={[
        { status: "completed", filename: "a.pdf", onDelete: () => {} },
      ]}
    />,
  );

  expect(screen.getByText("Upload complete: a.pdf.")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Files Select files" }),
  ).toHaveAccessibleDescription("");
});

test("moves focus to the next file action and describes it with the deletion result", () => {
  jest.useFakeTimers();
  const MultipleFileInput = () => {
    const [filenames, setFilenames] = React.useState(["a.pdf", "b.pdf"]);

    return (
      <FileInput
        multiple
        onChange={() => {}}
        uploadStatus={filenames.map((filename) => ({
          status: "completed",
          filename,
          onDelete: () =>
            setFilenames((current) => current.filter((f) => f !== filename)),
        }))}
      />
    );
  };

  render(<MultipleFileInput />);
  fireEvent.click(screen.getByRole("button", { name: "Delete a.pdf" }));
  act(() => jest.runAllTimers());

  const nextAction = screen.getByRole("button", { name: "Delete b.pdf" });
  expect(nextAction).toHaveFocus();
  expect(nextAction).toHaveAccessibleDescription(
    "File deleted: a.pdf. File uploaded",
  );
});

test("multiple=false replaces the picker with a removable file and restores it after deletion", async () => {
  const onChange = jest.fn();
  const file = new File(["a"], "a.txt");
  const SingleFileInput = () => {
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

  render(<SingleFileInput />);
  const input = screen.getByLabelText("Files", { selector: "input" });
  expect(input).not.toHaveAttribute("multiple");
  await userEvent.upload(input, file);

  expect(
    screen.queryByRole("button", { name: /Select file$/ }),
  ).not.toBeInTheDocument();
  expect(screen.getByText("a.txt")).toBeVisible();

  fireEvent.change(input, { target: { files: [file] } });
  expect(onChange).toHaveBeenCalledTimes(1);

  await userEvent.click(screen.getByRole("button", { name: "Delete a.txt" }));
  expect(screen.getByRole("button", { name: /Select file$/ })).toBeVisible();
});

test.each([
  { status: "previously" as const, message: "Uploaded yesterday" },
  { status: "error" as const, onRemove: () => {} },
])("hides the picker while a $status file is present", (uploadStatus) => {
  render(
    <FileInput
      label="Files"
      onChange={() => {}}
      uploadStatus={{ filename: "a.pdf", ...uploadStatus }}
    />,
  );
  expect(
    screen.queryByRole("button", { name: /Select file$/ }),
  ).not.toBeInTheDocument();
  expect(screen.getByText("a.pdf")).toBeInTheDocument();
});

test("associates a single-file status with the field label when it replaces the picker", () => {
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

  const fieldGroup = screen.getByRole("group", { name: "Files" });
  expect(
    within(fieldGroup).getByRole("list", { name: "Current file (1)" }),
  ).toBeVisible();
});

test("does not associate the label with the input when a single-file status replaces the drop zone", () => {
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
    screen.queryByLabelText("Files", { selector: "input" }),
  ).not.toBeInTheDocument();
});

test.each([
  ["no file is present", false, undefined],
  [
    "multiple files are allowed and a status is present",
    true,
    { status: "completed", filename: "a.pdf", onDelete: () => {} } as const,
  ],
])("associates the label with the input when %s", (_, multiple, status) => {
  render(
    <FileInput
      label="Files"
      multiple={multiple}
      onChange={() => {}}
      uploadStatus={status}
    />,
  );

  expect(
    screen.getByLabelText("Files", { selector: "input" }),
  ).toBeInTheDocument();
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
  expect(
    screen.getByText(
      "Drag and drop your files, or use Select files to choose them",
    ),
  ).toBeVisible();
  expect(
    screen.getByRole("list", {
      name: "Current files (2) 1 file uploading. 1 file couldn't be uploaded.",
    }),
  ).toBeVisible();
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

  expect(screen.getByText("1 file couldn't be uploaded.")).toBeVisible();
  expect(
    screen.getByRole("list", {
      name: "Current files (2) 1 of 2 files uploaded successfully. 1 file couldn't be uploaded.",
    }),
  ).toBeInTheDocument();

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

  expect(screen.getByText("1 file couldn't be uploaded.")).toBeVisible();
  expect(
    screen.getByRole("list", {
      name: "Current file (1) 1 file couldn't be uploaded.",
    }),
  ).toBeInTheDocument();
});

describe("default current-files summaries", () => {
  const uploading = (filename: string): FileUploadStatusProps => ({
    status: "uploading",
    filename,
    onCancel: () => {},
  });
  const completed = (filename: string): FileUploadStatusProps => ({
    status: "completed",
    filename,
    onDelete: () => {},
  });
  const failed = (filename: string): FileUploadStatusProps => ({
    status: "error",
    filename,
    onRemove: () => {},
  });

  test.each([
    {
      scenario: "one completed file",
      statuses: [completed("a.pdf")],
      visibleSummaries: ["1 file uploaded successfully."],
      listName: "Current file (1) 1 file uploaded successfully.",
    },
    {
      scenario: "several uploading files",
      statuses: [uploading("a.pdf"), uploading("b.pdf")],
      visibleSummaries: ["2 files uploading."],
      listName: "Current files (2) 2 files uploading.",
    },
    {
      scenario: "uploading and completed files",
      statuses: [uploading("a.pdf"), completed("b.pdf"), completed("c.pdf")],
      visibleSummaries: [
        "1 file uploading, 2 of 3 files uploaded successfully.",
      ],
      listName:
        "Current files (3) 1 file uploading, 2 of 3 files uploaded successfully.",
    },
    {
      scenario: "uploading, completed, and failed files",
      statuses: [
        uploading("a.pdf"),
        uploading("b.pdf"),
        completed("c.pdf"),
        failed("d.pdf"),
        failed("e.pdf"),
      ],
      visibleSummaries: [
        "2 files uploading, 1 of 5 files uploaded successfully.",
        "2 files couldn't be uploaded.",
      ],
      listName:
        "Current files (5) 2 files uploading, 1 of 5 files uploaded successfully. 2 files couldn't be uploaded.",
    },
    {
      scenario: "only failed files",
      statuses: [failed("a.pdf"), failed("b.pdf")],
      visibleSummaries: ["2 files couldn't be uploaded."],
      listName: "Current files (2) 2 files couldn't be uploaded.",
    },
  ])(
    "punctuates and joins the summaries for $scenario",
    ({ statuses, visibleSummaries, listName }) => {
      render(
        <FileInput multiple onChange={() => {}} uploadStatus={statuses} />,
      );

      visibleSummaries.forEach((summary) => {
        expect(screen.getByText(summary)).toBeVisible();
      });
      expect(screen.getByRole("list", { name: listName })).toBeVisible();
    },
  );
});

test("does not add collection summaries in single-file mode", () => {
  render(
    <FileInput
      onChange={() => {}}
      uploadStatus={{
        status: "error",
        filename: "failed.pdf",
        onRemove: () => {},
      }}
    />,
  );

  expect(
    screen.queryByText("1 file couldn't be uploaded."),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("list", { name: "Current file (1)" }),
  ).toBeInTheDocument();
});

test("provides all current status counts to the summaries", () => {
  const currentFilesErrorSummary = jest.fn(
    ({ errorCount, totalCount }) => `${errorCount} out of ${totalCount} failed`,
  );
  const currentFilesProgressSummary = jest.fn(
    ({ uploadingCount, completedCount }) =>
      `${uploadingCount} uploading, ${completedCount} uploaded`,
  );

  render(
    <I18nProvider
      locale={{
        ...enGB,
        fileInput: {
          ...enGB.fileInput,
          currentFilesErrorSummary,
          currentFilesProgressSummary,
        },
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
  expect(currentFilesProgressSummary).toHaveBeenCalledWith({
    totalCount: 3,
    uploadingCount: 1,
    completedCount: 1,
  });
  expect(
    screen.getByRole("list", {
      name: "Current files (3) 1 uploading, 1 uploaded 1 out of 3 failed",
    }),
  ).toBeVisible();
});

test("accepts legacy locale keys without using them at runtime", () => {
  render(
    <I18nProvider
      locale={{
        ...enGB,
        fileInput: {
          ...enGB.fileInput,
          fileUploadStatus: () => "Legacy upload status",
          actions: {
            ...enGB.fileInput.actions,
            clear: () => "Legacy clear",
          },
        },
      }}
    >
      <FileInput
        onChange={() => {}}
        uploadStatus={{
          status: "error",
          filename: "failed.pdf",
          onRemove: () => {},
        }}
      />
    </I18nProvider>,
  );

  expect(screen.getByText("Error details")).toBeVisible();
  expect(
    screen.getByRole("button", { name: "Remove failed.pdf" }),
  ).toBeVisible();
  expect(screen.queryByText("Legacy upload status")).not.toBeInTheDocument();
  expect(screen.queryByText("Legacy clear")).not.toBeInTheDocument();
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

test("exposes an error that is already present on initial render", () => {
  render(
    <FileInput
      onChange={() => {}}
      uploadStatus={{
        status: "error",
        filename: "invoice.pdf",
        onRemove: () => {},
      }}
    />,
  );

  expect(
    within(screen.getByRole("list")).getByRole("status"),
  ).toHaveTextContent("invoice.pdf: Error details");
});

test("politely announces a file that transitions to an error", () => {
  const { rerender } = render(
    <FileInput
      onChange={() => {}}
      uploadStatus={{
        status: "uploading",
        filename: "invoice.pdf",
        onCancel: () => {},
      }}
    />,
  );
  const persistentStatus = screen.getByTestId("file-upload-error-status");
  expect(persistentStatus).toBeEmptyDOMElement();

  rerender(
    <FileInput
      onChange={() => {}}
      uploadStatus={{
        status: "error",
        filename: "invoice.pdf",
        message: "Check your connection and try again",
        onRemove: () => {},
        onRetry: () => {},
      }}
    />,
  );

  const announcement = screen.getByTestId("file-upload-error-status");
  expect(announcement).toBe(persistentStatus);
  expect(announcement).toHaveTextContent(
    "invoice.pdf: Check your connection and try again",
  );
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("exposes each file that transitions to an error through its own status", () => {
  const { rerender } = render(
    <FileInput
      multiple
      onChange={() => {}}
      uploadStatus={[
        { id: "a", status: "uploading", filename: "a.pdf", onCancel: () => {} },
        { id: "b", status: "uploading", filename: "b.pdf", onCancel: () => {} },
      ]}
    />,
  );

  rerender(
    <FileInput
      multiple
      onChange={() => {}}
      uploadStatus={[
        { id: "a", status: "error", filename: "a.pdf", onRemove: () => {} },
        { id: "b", status: "error", filename: "b.pdf", onRemove: () => {} },
      ]}
    />,
  );

  const announcements = within(screen.getByRole("list")).getAllByRole("status");
  expect(announcements).toHaveLength(2);
  expect(announcements[0]).toHaveTextContent("a.pdf: Error details");
  expect(announcements[1]).toHaveTextContent("b.pdf: Error details");
});

test("announces a status added in error after the field has rendered", async () => {
  const { rerender } = render(<FileInput multiple onChange={() => {}} />);

  rerender(
    <FileInput
      multiple
      onChange={() => {}}
      uploadStatus={{ status: "error", filename: "a.pdf", onRemove: () => {} }}
    />,
  );
  const errorStatus = within(screen.getByRole("list")).getByRole("status");

  expect(errorStatus).toBeEmptyDOMElement();
  await waitFor(() =>
    expect(errorStatus).toHaveTextContent("a.pdf: Error details"),
  );
});

test("exposes controlled field error semantics without deriving an error", () => {
  const { rerender } = render(
    <FileInput required label="Files" onChange={() => {}} />,
  );
  expect(
    screen.getByRole("button", { name: "Files Select file" }),
  ).toHaveAccessibleDescription("This field is required.");
  const validationRegion = screen.getByRole("status");
  expect(validationRegion).toBeEmptyDOMElement();
  rerender(
    <FileInput
      required
      label="Files"
      error="Select at least one file"
      onChange={() => {}}
    />,
  );
  expect(validationRegion).toHaveTextContent("Select at least one file");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Files Select file" }),
  ).toBeInvalid();
});

test("marks the picker button invalid for a boolean error with no message", () => {
  const { rerender } = render(<FileInput label="Files" onChange={() => {}} />);
  const button = screen.getByRole("button", { name: "Files Select file" });
  expect(button).toBeValid();

  rerender(<FileInput label="Files" error onChange={() => {}} />);
  expect(button).toBeInvalid();
});

test("does not let native validation of the hidden input block form submission when required and empty", () => {
  render(
    <form aria-label="File upload form">
      <FileInput required label="Files" onChange={() => {}} />
    </form>,
  );
  const form = screen.getByRole("form", {
    name: "File upload form",
  }) as HTMLFormElement;

  expect(
    screen.getByLabelText("Files", { selector: "input" }),
  ).not.toBeRequired();
  expect(form.checkValidity()).toBe(true);
});

test.each([true, undefined])(
  "renders the input error after the label and hint, before the drop zone, with validationMessagePositionTop=%s",
  (validationMessagePositionTop) => {
    render(
      <FileInput
        label="Files"
        inputHint="PNG up to 2MB"
        error="Choose an image"
        validationMessagePositionTop={validationMessagePositionTop}
        onChange={() => {}}
      />,
    );

    const label = screen.getByText("Files", { selector: "label" });
    const hint = screen.getByText("PNG up to 2MB");
    const error = screen.getByRole("status");
    const dropZone = screen.getByTestId("file-input-presentation");

    expect(label.compareDocumentPosition(hint)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(hint.compareDocumentPosition(error)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(error.compareDocumentPosition(dropZone)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  },
);

test("keeps the deprecated bottom validation placement when validationMessagePositionTop is false", () => {
  render(
    <FileInput
      label="Files"
      inputHint="PNG up to 2MB"
      error="Choose an image"
      validationMessagePositionTop={false}
      onChange={() => {}}
    />,
  );

  const hint = screen.getByText("PNG up to 2MB");
  const error = screen.getByRole("status");
  const dropZone = screen.getByTestId("file-input-presentation");

  expect(hint.compareDocumentPosition(dropZone)).toBe(
    Node.DOCUMENT_POSITION_FOLLOWING,
  );
  expect(dropZone.compareDocumentPosition(error)).toBe(
    Node.DOCUMENT_POSITION_FOLLOWING,
  );
});

test("renders the input error between the label and the drop zone without a hint", () => {
  render(<FileInput label="Files" error="Choose a file" onChange={() => {}} />);

  const error = screen.getByRole("status");

  expect(
    screen
      .getByText("Files", { selector: "label" })
      .compareDocumentPosition(error),
  ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(
    error.compareDocumentPosition(
      screen.getByTestId("file-input-presentation"),
    ),
  ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test("renders the input error before the drop zone without a label or hint", () => {
  render(<FileInput error="Choose a file" onChange={() => {}} />);

  expect(
    screen
      .getByRole("status")
      .compareDocumentPosition(screen.getByTestId("file-input-presentation")),
  ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test("applies accept and associates Select file with hint and validation", () => {
  render(
    <FileInput
      label="Files"
      accept="image/*"
      inputHint="PNG up to 2MB"
      error="Choose an image"
      buttonText="Choose"
      onChange={() => {}}
    />,
  );
  const input = screen.getByLabelText("Files", { selector: "input" });
  expect(input).toHaveAttribute("accept", "image/*");
  expect(
    screen.getByRole("button", { name: "Files Choose" }),
  ).toHaveAccessibleDescription("PNG up to 2MB Choose an image");
});

test("renders and associates an input hint without a label", () => {
  render(<FileInput inputHint="PNG up to 2MB" onChange={() => {}} />);

  const hint = screen.getByText("PNG up to 2MB");
  const button = screen.getByRole("button", { name: "Select file" });

  expect(hint).toBeVisible();
  expect(button).toHaveAccessibleDescription("PNG up to 2MB");
});

// coverage
test("renders with a horizontal layout and a minimum width", () => {
  render(
    <FileInput
      multiple
      isVertical={false}
      minWidth="320px"
      onChange={() => {}}
      uploadStatus={{
        status: "completed",
        filename: "a.pdf",
        onDelete: () => {},
      }}
    />,
  );

  expect(screen.getByTestId("file-input-presentation")).toBeVisible();
  expect(screen.getByTestId("file-status-lists")).toBeVisible();
});

test("moves focus to a previously uploaded file and describes it with the deletion result", () => {
  jest.useFakeTimers();
  const MultipleFileInput = () => {
    const [isCurrentFileShown, setIsCurrentFileShown] = React.useState(true);
    const previousStatus: FileUploadStatusProps = {
      status: "previously",
      filename: "b.pdf",
      href: "/b.pdf",
    };

    return (
      <FileInput
        multiple
        onChange={() => {}}
        uploadStatus={
          isCurrentFileShown
            ? [
                {
                  status: "completed",
                  filename: "a.pdf",
                  onDelete: () => setIsCurrentFileShown(false),
                },
                previousStatus,
              ]
            : previousStatus
        }
      />
    );
  };

  render(<MultipleFileInput />);
  fireEvent.click(screen.getByRole("button", { name: "Delete a.pdf" }));
  act(() => jest.runAllTimers());

  const previewLink = screen.getByRole("link", { name: "Preview b.pdf" });
  expect(previewLink).toHaveFocus();
  expect(previewLink).toHaveAccessibleDescription("File deleted: a.pdf.");
});

test("moves focus from Retry to the file's remaining action without a removal result", () => {
  jest.useFakeTimers();
  const RetryFileInput = () => {
    const [isUploading, setIsUploading] = React.useState(false);

    return (
      <FileInput
        multiple
        onChange={() => {}}
        uploadStatus={
          isUploading
            ? { status: "uploading", filename: "a.pdf", onCancel: () => {} }
            : {
                status: "error",
                filename: "a.pdf",
                onRemove: () => {},
                onRetry: () => setIsUploading(true),
              }
        }
      />
    );
  };

  render(<RetryFileInput />);
  fireEvent.click(screen.getByRole("button", { name: "Retry a.pdf" }));
  act(() => jest.runAllTimers());

  expect(screen.getByRole("button", { name: "Cancel a.pdf" })).toHaveFocus();
  expect(screen.queryByText("File removed: a.pdf.")).not.toBeInTheDocument();
});
