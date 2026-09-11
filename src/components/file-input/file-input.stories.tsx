import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import FileInput, { FileUploadStatusProps } from ".";
import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof FileInput> = {
  title: "File Input",
  component: FileInput,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: {
      chromatic: {
        theme: "sage",
      },
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = () => {
  return <FileInput label="File input" onChange={() => {}} />;
};
Default.storyName = "Default";

export const WithInputHint: Story = () => {
  return (
    <FileInput label="File input" inputHint="Hint text" onChange={() => {}} />
  );
};
WithInputHint.storyName = "With Input Hint";

export const Required: Story = () => {
  return <FileInput label="File input" required onChange={() => {}} />;
};
Required.storyName = "Required";
Required.parameters = {
  chromatic: { disableSnapshot: false },
};

export const RequiredFieldValidation: Story = () => {
  const [error, setError] = useState<string | undefined>(
    "The file is required and no file has been uploaded on submission.",
  );
  const onChange = (files: FileList) => {
    if (files.length > 0) setError(undefined);
  };
  return (
    <FileInput label="File input" required error={error} onChange={onChange} />
  );
};
RequiredFieldValidation.storyName = "Required Field Validation";
RequiredFieldValidation.parameters = {
  chromatic: { disableSnapshot: false },
};

export const IncreasedHeight: Story = () => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      minHeight="200px"
      onChange={() => {}}
    />
  );
};
IncreasedHeight.storyName = "Increased Height";

export const ResponsiveWidth: Story = () => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="min(800px, 100%)"
      minWidth="250px"
      onChange={() => {}}
    />
  );
};
ResponsiveWidth.storyName = "Responsive Width";
ResponsiveWidth.parameters = {
  chromatic: { disableSnapshot: false },
};

export const IncreasedBoth: Story = () => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="500px"
      minHeight="200px"
      onChange={() => {}}
    />
  );
};
IncreasedBoth.storyName = "Increased Width and Height";
IncreasedBoth.parameters = {
  chromatic: { disableSnapshot: false },
};

export const FullWidth: Story = () => {
  return <FileInput label="File input" maxWidth="100%" onChange={() => {}} />;
};
FullWidth.storyName = "Full Width";
FullWidth.parameters = {
  chromatic: { disableSnapshot: false },
};

export const Layout: Story = () => {
  return (
    <>
      <FileInput label="Vertical (default)" onChange={() => {}} />
      <FileInput
        label="Horizontal"
        isVertical={false}
        maxWidth="450px"
        onChange={() => {}}
      />
    </>
  );
};
Layout.storyName = "Layout";
Layout.parameters = {
  chromatic: { disableSnapshot: false },
};

export const FileTypeValidation: Story = () => {
  const [error, setError] = useState<string | undefined>();
  const onChange = (files: FileList) => {
    let errorMessage;
    if (files.length > 0) {
      const fileType = files[0].type;
      if (!fileType.startsWith("image/")) {
        errorMessage = "Please choose an image file to upload";
      }
    }
    setError(errorMessage);
  };
  return (
    <FileInput
      label="Only accepts image files"
      accept="image/*"
      error={error}
      onChange={onChange}
    />
  );
};
FileTypeValidation.storyName = "File Type Validation";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_FILE_SIZE_BYTES = 500 * 1024;

export const SingleFile: Story = () => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const objectUrlRef = useRef<string>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const removeFile = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = undefined;
    }
    setUploadStatus(undefined);
  };

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  const onChange = (files: FileList) => {
    if (files.length > 1) {
      setError("Select only one file");
      return;
    }
    const fileUploaded = files[0];
    if (!fileUploaded) return;

    if (!ACCEPTED_FILE_TYPES.includes(fileUploaded.type)) {
      setError("Select a jpg, png, or pdf file");
      return;
    }
    if (fileUploaded.size > MAX_FILE_SIZE_BYTES) {
      setError("Select a file smaller than 500KB");
      return;
    }

    setError(undefined);
    removeFile();
    const objectUrl = URL.createObjectURL(fileUploaded);
    objectUrlRef.current = objectUrl;
    const thumbnailSrc = fileUploaded.type.startsWith("image/")
      ? objectUrl
      : undefined;
    setUploadStatus({
      status: "uploading",
      filename: fileUploaded.name,
      onCancel: removeFile,
      progress: 0,
      message: "0% uploaded",
      thumbnailSrc,
    });

    const interval = setInterval(() => {
      setUploadStatus((currentStatus) => {
        if (currentStatus?.status !== "uploading") return currentStatus;
        const newProgress = (currentStatus.progress as number) + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          if (intervalRef.current === interval) {
            intervalRef.current = undefined;
          }
          return {
            status: "completed",
            filename: fileUploaded.name,
            onDelete: removeFile,
            message: "File uploaded",
            thumbnailSrc,
            href: objectUrl,
            target: "_blank",
            rel: "noreferrer",
          };
        }
        return {
          ...currentStatus,
          progress: newProgress,
          message: `${newProgress}% uploaded`,
        };
      });
    }, 200);
    intervalRef.current = interval;
  };

  return (
    <FileInput
      label="Upload invoice document"
      inputHint="Maximum size: 500KB. Supported file types: jpg, png, pdf."
      required
      multiple={false}
      accept="image/jpeg,image/png,application/pdf"
      buttonText="Select file"
      dragAndDropText="or drag and drop your file"
      onChange={onChange}
      error={error}
      uploadStatus={uploadStatus}
    />
  );
};
SingleFile.storyName = "Single File";
SingleFile.parameters = {
  chromatic: { disableSnapshot: false },
};

let multipleFilesIdCounter = 0;

// PDFs simulate a retryable upload error; images upload successfully.
const SIMULATED_UPLOAD_ERROR_TYPE = "application/pdf";

const initialItems: FileUploadStatusProps[] = [
  {
    id: "seed-previous-1",
    status: "previously",
    filename: "vendor-agreement.pdf",
    href: "http://carbon.sage.com/",
    target: "_blank",
    rel: "noreferrer",
    message: "Uploaded by Jane Doe on 4 Sep 2026",
  },
];

export const MultipleFiles: Story = () => {
  const [items, setItems] = useState<FileUploadStatusProps[]>(initialItems);
  const intervals = useRef<Record<string, ReturnType<typeof setInterval>>>({});
  const objectUrls = useRef<Record<string, string>>({});

  const removeItem = (id: string) => {
    clearInterval(intervals.current[id]);
    delete intervals.current[id];
    if (objectUrls.current[id]) {
      URL.revokeObjectURL(objectUrls.current[id]);
      delete objectUrls.current[id];
    }
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const runUpload = (
    id: string,
    filename: string,
    shouldFail: boolean,
    thumbnailSrc: string | undefined,
    objectUrl: string,
  ) => {
    intervals.current[id] = setInterval(() => {
      setItems((current) =>
        current.map((item) => {
          if (item.id !== id || item.status !== "uploading") return item;
          const newProgress = (item.progress ?? 0) + 20;
          if (shouldFail && newProgress >= 40) {
            clearInterval(intervals.current[id]);
            return {
              id,
              status: "error",
              filename,
              onRemove: () => removeItem(id),
              onRetry: () => {
                setItems((withRetry) =>
                  withRetry.map((retryItem) =>
                    retryItem.id === id
                      ? {
                          id,
                          status: "uploading",
                          filename,
                          onCancel: () => removeItem(id),
                          progress: 0,
                          message: "0% uploaded",
                          thumbnailSrc,
                        }
                      : retryItem,
                  ),
                );
                // Retrying always succeeds, so the demo has a clear end state.
                runUpload(id, filename, false, thumbnailSrc, objectUrl);
              },
              thumbnailSrc,
              message: "Upload failed - check your connection and try again",
            };
          }
          if (newProgress >= 100) {
            clearInterval(intervals.current[id]);
            return {
              id,
              status: "completed",
              filename,
              onDelete: () => removeItem(id),
              thumbnailSrc,
              href: objectUrl,
              target: "_blank",
              rel: "noreferrer",
              message: "File uploaded",
            };
          }
          return {
            ...item,
            id,
            progress: newProgress,
            message: `${newProgress}% uploaded`,
          };
        }),
      );
    }, 400);
  };

  const onChange = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const id = `multi-file-${multipleFilesIdCounter}`;
      multipleFilesIdCounter += 1;
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setItems((current) => [
          ...current,
          {
            id,
            status: "error",
            filename: file.name,
            onRemove: () => removeItem(id),
            message: "This file type is not supported",
          },
        ]);
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      objectUrls.current[id] = objectUrl;
      const thumbnailSrc = file.type.startsWith("image/")
        ? objectUrl
        : undefined;
      setItems((current) => [
        ...current,
        {
          id,
          status: "uploading",
          filename: file.name,
          onCancel: () => removeItem(id),
          progress: 0,
          message: "0% uploaded",
          thumbnailSrc,
        },
      ]);
      const shouldFail = file.type === SIMULATED_UPLOAD_ERROR_TYPE;
      runUpload(id, file.name, shouldFail, thumbnailSrc, objectUrl);
    });
  };

  return (
    <FileInput
      label="Upload supporting documents"
      inputHint="jpg, png, or pdf"
      multiple
      accept="image/jpeg,image/png,application/pdf"
      onChange={onChange}
      uploadStatus={items}
    />
  );
};
MultipleFiles.storyName = "Multiple Files";
MultipleFiles.parameters = {
  chromatic: { disableSnapshot: false },
};

const scrollableStatusItems: FileUploadStatusProps[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `scrollable-file-${index + 1}`,
    status: "completed",
    filename: `supporting-document-${index + 1}.pdf`,
    onDelete: () => {},
    message: "File uploaded",
  }),
);

export const ScrollableStatusList: Story = () => (
  <Box width="500px" height="600px">
    <FileInput
      label="Uploaded supporting documents"
      multiple
      onChange={() => {}}
      uploadStatus={scrollableStatusItems}
    />
  </Box>
);
ScrollableStatusList.storyName = "Scrollable Status List";
ScrollableStatusList.parameters = {
  chromatic: { disableSnapshot: false },
};

const errorStatusSummaryItems: FileUploadStatusProps[] = [
  {
    id: "upload-error-summary-completed",
    status: "completed",
    filename: "invoice.pdf",
    onDelete: () => {},
  },
  {
    id: "upload-error-summary-failed",
    status: "error",
    filename: "receipt.pdf",
    message: "The upload failed. Try again.",
    onRemove: () => {},
    onRetry: () => {},
  },
];

export const UploadErrorSummary: Story = () => (
  <FileInput
    label="Supporting documents"
    multiple
    onChange={() => {}}
    uploadStatus={errorStatusSummaryItems}
  />
);
UploadErrorSummary.storyName = "Upload Error Summary";
UploadErrorSummary.parameters = {
  chromatic: { disableSnapshot: false },
};

export const UploadStatusTracked: Story = () => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >({
    status: "uploading",
    filename: "example.pdf",
    progress: 56,
    message: "Loaded 56%",
    onAction: () => setUploadStatus(undefined),
  });
  const reader = useRef<FileReader>();

  const getReader = () => {
    if (!reader.current) {
      reader.current = new FileReader();
    }
    return reader.current;
  };

  const removeFile = () => setUploadStatus(undefined);

  const onChange = (files: FileList) => {
    if (!files.length) {
      setError(undefined);
      removeFile();
      return;
    }
    const fileUploaded = files[0];

    if (fileUploaded.size > 5 * 1024 * 1024) {
      setError("This file is too big to be uploaded - maximum size 5MB");
      return;
    }

    setError(undefined);

    const fileReader = getReader();

    const handlers: {
      handleLoad: () => void;
      handleProgress: (event: ProgressEvent) => void;
      handleError: () => void;
      handleAbort: () => void;
    } = {
      handleLoad: () => {},
      handleProgress: () => {},
      handleError: () => {},
      handleAbort: () => {},
    };

    const removeListeners = () => {
      fileReader.removeEventListener("loadstart", handlers.handleLoad);
      fileReader.removeEventListener("load", handlers.handleLoad);
      fileReader.removeEventListener("loadend", handlers.handleProgress);
      fileReader.removeEventListener("progress", handlers.handleProgress);
      fileReader.removeEventListener("error", handlers.handleError);
      fileReader.removeEventListener("abort", handlers.handleAbort);
    };

    handlers.handleLoad = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "uploading",
        filename: fileUploaded.name,
        onAction: () => fileReader.abort(),
        progress: 0,
      };
      setUploadStatus(uploadProps);
    };

    handlers.handleProgress = (e: ProgressEvent) => {
      const progress = Math.round((100 * e.loaded) / e.total);
      const isComplete = e.type === "loadend" || progress >= 100;
      if (isComplete) {
        removeListeners();
      }
      const uploadProps: FileUploadStatusProps = isComplete
        ? {
            status: "completed",
            filename: fileUploaded.name,
            onAction: () => removeFile(),
            href: fileReader.result as string,
            message: "File uploaded",
          }
        : {
            status: "uploading",
            filename: fileUploaded.name,
            onAction: () => fileReader.abort(),
            progress,
            message: `${progress} percent uploaded`,
          };
      setUploadStatus(uploadProps);
    };

    handlers.handleError = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "error",
        filename: fileUploaded.name,
        onAction: () => removeFile(),
        message: "failed to upload",
      };
      setUploadStatus(uploadProps);
      removeListeners();
    };

    handlers.handleAbort = () => {
      removeFile();
      removeListeners();
    };

    fileReader.addEventListener("loadstart", handlers.handleLoad);
    fileReader.addEventListener("load", handlers.handleProgress);
    fileReader.addEventListener("loadend", handlers.handleProgress);
    fileReader.addEventListener("progress", handlers.handleProgress);
    fileReader.addEventListener("error", handlers.handleError);
    fileReader.addEventListener("abort", handlers.handleAbort);

    fileReader.readAsDataURL(fileUploaded);
  };

  return (
    <FileInput
      label="Upload status example"
      inputHint="Maximum size 5MB"
      multiple={false}
      onChange={onChange}
      uploadStatus={uploadStatus}
      error={error}
    />
  );
};
UploadStatusTracked.storyName = "Upload Status (Tracked)";

export const UploadStatusUntracked: Story = () => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >({
    status: "uploading",
    filename: "foo.pdf",
    onCancel: () => setUploadStatus(undefined),
  });
  return (
    <FileInput
      label="Upload status example"
      multiple={false}
      uploadStatus={uploadStatus}
      onChange={() => {}}
    />
  );
};
UploadStatusUntracked.storyName = "Upload Status (Untracked)";

// Inline image data keeps this thumbnail demo independent of the network.
const THUMBNAIL_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' rx='4' fill='%236B46C1'/%3E%3Cpath d='M8 28l7-9 5 6 4-5 8 8z' fill='%23FFFFFF' fill-opacity='0.85'/%3E%3Ccircle cx='14' cy='13' r='3' fill='%23FFFFFF' fill-opacity='0.85'/%3E%3C/svg%3E";

export const WithThumbnail: Story = () => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >({
    status: "completed",
    filename: "receipt.png",
    onDelete: () => setUploadStatus(undefined),
    href: "http://carbon.sage.com/",
    target: "_blank",
    rel: "noreferrer",
    message: "File uploaded",
    thumbnailSrc: THUMBNAIL_SRC,
  });
  return (
    <FileInput
      label="Upload a receipt"
      multiple={false}
      uploadStatus={uploadStatus}
      onChange={() => {}}
    />
  );
};
WithThumbnail.storyName = "With Thumbnail";
WithThumbnail.parameters = {
  chromatic: { disableSnapshot: false },
};

export const PreviouslyUploaded: Story = () => {
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusProps>({
    status: "previously",
    filename: "vendor-agreement.pdf",
    href: "http://carbon.sage.com/",
    target: "_blank",
    rel: "noreferrer",
    message: "Uploaded by Jane Doe on 4 Sep 2026",
  });

  const onChange = (files: FileList) => {
    const fileUploaded = files[0];
    if (!fileUploaded) return;
    setUploadStatus({
      status: "completed",
      filename: fileUploaded.name,
      onDelete: () =>
        setUploadStatus({
          status: "previously",
          filename: "vendor-agreement.pdf",
          href: "http://carbon.sage.com/",
          target: "_blank",
          rel: "noreferrer",
          message: "Uploaded by Jane Doe on 4 Sep 2026",
        }),
      message: "File uploaded",
    });
  };

  return (
    <FileInput
      label="Upload invoice document"
      uploadStatus={uploadStatus}
      onChange={onChange}
    />
  );
};
PreviouslyUploaded.storyName = "Previously Uploaded";
PreviouslyUploaded.parameters = {
  chromatic: { disableSnapshot: false },
};
