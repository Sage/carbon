import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import styled from "styled-components";
import FileInput, { FileInputProps, FileUploadStatusProps } from ".";
import Box from "../box";
import Divider from "../divider";
import Button from "../button/__next__";
import Sidebar from "../sidebar";
import isChromatic from "../../../.storybook/isChromatic";
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

const ParentContainer = styled.div<{ $width: string }>`
  box-sizing: border-box;
  width: ${({ $width }) => $width};
  max-width: 100%;
  padding: var(--global-space-comp-m);
  border: var(--global-borderwidth-xs) solid var(--input-typical-border-default);
`;

const ParentContainerLabel = styled.p`
  margin: 0 0 var(--global-space-comp-s);
`;

type SelectedFileInputProps = Omit<FileInputProps, "onChange" | "uploadStatus">;

const SelectedFileInput = (props: SelectedFileInputProps) => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();

  const onChange = (files: FileList) => {
    action("onChange")(files);
    const file = files[0];
    if (!file) return;

    setUploadStatus({
      status: "completed",
      filename: file.name,
      message: "File uploaded",
      onDelete: () => setUploadStatus(undefined),
    });
  };

  return (
    <FileInput {...props} onChange={onChange} uploadStatus={uploadStatus} />
  );
};

export const Default: Story = () => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const onChange = (files: FileList) => {
    action("onChange")(files);
    if (files.length > 1) {
      setError("Select only one file");
      return;
    }
    const file = files[0];
    if (!file) return;
    setError(undefined);
    setUploadStatus({
      status: "completed",
      filename: file.name,
      onDelete: () => setUploadStatus(undefined),
    });
  };

  return (
    <FileInput
      label="File input"
      onChange={onChange}
      uploadStatus={uploadStatus}
      error={error}
    />
  );
};
Default.storyName = "Default";

export const WithInputHint: Story = () => {
  return <SelectedFileInput label="File input" inputHint="Hint text" />;
};
WithInputHint.storyName = "With Input Hint";

export const Required: Story = () => {
  return <SelectedFileInput label="File input" required />;
};
Required.storyName = "Required";

export const RequiredFieldValidation: Story = () => {
  const requiredError =
    "The file is required and no file has been uploaded on submission.";
  const [error, setError] = useState<string | undefined>(requiredError);
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const onChange = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    setError(undefined);
    setUploadStatus({
      status: "completed",
      filename: file.name,
      message: "File uploaded",
      onDelete: () => {
        setUploadStatus(undefined);
        setError(requiredError);
      },
    });
  };
  return (
    <FileInput
      label="File input"
      required
      error={error}
      onChange={onChange}
      uploadStatus={uploadStatus}
    />
  );
};
RequiredFieldValidation.storyName = "Required Field Validation";

export const IncreasedHeight: Story = () => {
  return (
    <SelectedFileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      minHeight="200px"
    />
  );
};
IncreasedHeight.storyName = "Increased Height";

export const WidthConstraints: Story = () => {
  return (
    <SelectedFileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="min(800px, 100%)"
      minWidth="250px"
    />
  );
};
WidthConstraints.storyName = "Width Constraints";
WidthConstraints.parameters = {
  chromatic: { disableSnapshot: false, viewports: [320, 1200] },
};

export const IncreasedBoth: Story = () => {
  return (
    <SelectedFileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="500px"
      minHeight="200px"
    />
  );
};
IncreasedBoth.storyName = "Increased Width and Height";
IncreasedBoth.parameters = {
  chromatic: { disableSnapshot: false },
};

const sidebarPreviousItems: FileUploadStatusProps[] = [
  {
    id: "sidebar-previous-1",
    status: "previously",
    filename: "lease-agreement.pdf",
    message: "Uploaded by Jane Doe on 4 Sep 2026",
  },
  {
    id: "sidebar-previous-2",
    status: "previously",
    filename: "proof-of-address.png",
    message: "Uploaded by Jane Doe on 4 Sep 2026",
  },
];

const SidebarMultipleFileInput = () => {
  const [items, setItems] =
    useState<FileUploadStatusProps[]>(sidebarPreviousItems);
  const idCounter = useRef(0);

  const onChange = (files: FileList) => {
    action("onChange")(files);
    const newItems = Array.from(files).map((file): FileUploadStatusProps => {
      idCounter.current += 1;
      const id = `sidebar-file-${idCounter.current}`;
      return {
        id,
        status: "completed",
        filename: file.name,
        message: "File uploaded",
        onDelete: () =>
          setItems((current) => current.filter((item) => item.id !== id)),
      };
    });
    setItems((current) => [...current, ...newItems]);
  };

  return (
    <FileInput
      label="Supporting documents"
      multiple
      onChange={onChange}
      uploadStatus={items}
    />
  );
};

export const ParentContainerWidths: Story = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isChromatic());

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      minHeight={isChromatic() ? "900px" : undefined}
    >
      <div>
        <ParentContainerLabel>
          Inside a 400px-wide container
        </ParentContainerLabel>
        <ParentContainer $width="400px">
          <SelectedFileInput label="File input" />
        </ParentContainer>
      </div>
      <div>
        <ParentContainerLabel>Inside a Sidebar</ParentContainerLabel>
        <Button onClick={() => setIsSidebarOpen(true)}>
          Show file input in a sidebar
        </Button>
        <Sidebar
          aria-label="Upload documents"
          header="Upload documents"
          open={isSidebarOpen}
          onCancel={() => setIsSidebarOpen(false)}
        >
          <SidebarMultipleFileInput />
        </Sidebar>
      </div>
    </Box>
  );
};
ParentContainerWidths.storyName = "Parent Container Widths";
ParentContainerWidths.parameters = {
  chromatic: { disableSnapshot: false },
};

export const FileTypeValidation: Story = () => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const onChange = (files: FileList) => {
    action("onChange")(files);
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file to upload");
      setUploadStatus(undefined);
      return;
    }
    setError(undefined);
    setUploadStatus({
      status: "completed",
      filename: file.name,
      message: "File uploaded",
      onDelete: () => setUploadStatus(undefined),
    });
  };
  return (
    <FileInput
      label="Only accepts image files"
      accept="image/*"
      error={error}
      onChange={onChange}
      uploadStatus={uploadStatus}
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
  const [customHeightUploadStatus, setCustomHeightUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
  const objectUrlRef = useRef<string>();
  const customHeightObjectUrlRef = useRef<string>();
  const existingUploadObjectUrlRef = useRef<string>();
  const [existingUpload, setExistingUpload] = useState<
    { filename: string; href: string } | undefined
  >();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const previewFile = new File(
      [
        '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><rect width="100%" height="100%" fill="#f5f5f5"/><text x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-size="24">Document preview</text></svg>',
      ],
      "document-preview.svg",
      { type: "image/svg+xml" },
    );
    const href = URL.createObjectURL(previewFile);
    existingUploadObjectUrlRef.current = href;
    setExistingUpload({
      filename: previewFile.name,
      href,
    });

    return () => {
      if (existingUploadObjectUrlRef.current === href) {
        URL.revokeObjectURL(href);
        existingUploadObjectUrlRef.current = undefined;
      }
    };
  }, []);

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
      if (customHeightObjectUrlRef.current) {
        URL.revokeObjectURL(customHeightObjectUrlRef.current);
      }
      if (existingUploadObjectUrlRef.current) {
        URL.revokeObjectURL(existingUploadObjectUrlRef.current);
      }
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

  const existingUploadStatus: FileUploadStatusProps | undefined = existingUpload
    ? {
        status: "completed",
        filename: existingUpload.filename,
        href: existingUpload.href,
        target: "_blank",
        rel: "noreferrer",
        message: "File uploaded",
        onDelete: () => {
          if (existingUploadObjectUrlRef.current) {
            URL.revokeObjectURL(existingUploadObjectUrlRef.current);
            existingUploadObjectUrlRef.current = undefined;
          }
          setExistingUpload(undefined);
        },
      }
    : undefined;

  const onExistingUploadChange = (files: FileList) => {
    const fileUploaded = files[0];
    if (!fileUploaded) return;
    if (existingUploadObjectUrlRef.current) {
      URL.revokeObjectURL(existingUploadObjectUrlRef.current);
    }
    const href = URL.createObjectURL(fileUploaded);
    existingUploadObjectUrlRef.current = href;
    setExistingUpload({ filename: fileUploaded.name, href });
  };

  const onCustomHeightChange = (files: FileList) => {
    const fileUploaded = files[0];
    if (!fileUploaded) return;
    if (customHeightObjectUrlRef.current) {
      URL.revokeObjectURL(customHeightObjectUrlRef.current);
    }
    const href = URL.createObjectURL(fileUploaded);
    customHeightObjectUrlRef.current = href;
    setCustomHeightUploadStatus({
      status: "completed",
      filename: fileUploaded.name,
      message: "File uploaded",
      href,
      target: "_blank",
      rel: "noreferrer",
      onDelete: () => {
        if (customHeightObjectUrlRef.current) {
          URL.revokeObjectURL(customHeightObjectUrlRef.current);
          customHeightObjectUrlRef.current = undefined;
        }
        setCustomHeightUploadStatus(undefined);
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <FileInput
        label="Upload invoice document (default height)"
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
      <Divider type="horizontal" my={0} />
      <FileInput
        label="Previously uploaded invoice document"
        inputHint="Maximum size: 500KB. Supported file types: jpg, png, pdf."
        required
        multiple={false}
        accept="image/jpeg,image/png,application/pdf"
        buttonText="Select file"
        dragAndDropText="or drag and drop your file"
        onChange={onExistingUploadChange}
        uploadStatus={existingUploadStatus}
      />
      <Divider type="horizontal" my={0} />
      <FileInput
        label="Upload invoice document (custom height)"
        inputHint="Maximum size: 500KB. Supported file types: jpg, png, pdf."
        required
        multiple={false}
        accept="image/jpeg,image/png,application/pdf"
        minHeight="150px"
        buttonText="Select file"
        dragAndDropText="Drag and drop a jpg, png, or pdf file here, or use Select file to browse your device."
        onChange={onCustomHeightChange}
        uploadStatus={customHeightUploadStatus}
      />
    </Box>
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

const ScrollContainer = styled.div`
  box-sizing: border-box;
  width: 500px;
  max-width: 100%;
  height: 400px;
  overflow-y: auto;
  padding: var(--global-space-comp-m);
  border: var(--global-borderwidth-xs) solid var(--input-typical-border-default);
  border-radius: var(--global-radius-container-m);
`;

export const ConsumerScrollContainer: Story = () => (
  <ScrollContainer>
    <FileInput
      label="Uploaded supporting documents"
      inputHint="Example only: these files are static, so selecting files and Delete have no effect"
      multiple
      onChange={() => {}}
      uploadStatus={scrollableStatusItems}
    />
  </ScrollContainer>
);
ConsumerScrollContainer.storyName = "Consumer Scroll Container";
ConsumerScrollContainer.parameters = {
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

export const UploadStatusTracked: Story = () => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >({
    status: "uploading",
    filename: "example.pdf",
    progress: 56,
    message: "Loaded 56%",
    onCancel: () => setUploadStatus(undefined),
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
        onCancel: () => fileReader.abort(),
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
            onDelete: () => removeFile(),
            href: fileReader.result as string,
            message: "File uploaded",
          }
        : {
            status: "uploading",
            filename: fileUploaded.name,
            onCancel: () => fileReader.abort(),
            progress,
            message: `${progress} percent uploaded`,
          };
      setUploadStatus(uploadProps);
    };

    handlers.handleError = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "error",
        filename: fileUploaded.name,
        onRemove: () => removeFile(),
        message: "The file couldn't be read. Remove it and select it again.",
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
