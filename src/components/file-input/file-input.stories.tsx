/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import FileInput, { FileUploadStatusProps } from ".";
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

export const IsOptional: Story = () => {
  return <FileInput label="File input" isOptional onChange={() => {}} />;
};
IsOptional.storyName = "isOptional";

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

export const FullWidth: Story = () => {
  return <FileInput label="File input" maxWidth="100%" onChange={() => {}} />;
};
FullWidth.storyName = "Full Width";

export const Vertical: Story = () => {
  return <FileInput label="File input" isVertical onChange={() => {}} />;
};
Vertical.storyName = "Vertical";

export const Accept: Story = () => {
  return (
    <FileInput
      label="Only accepts image files"
      accept="image/*"
      onChange={() => {}}
    />
  );
};
Accept.storyName = "Accept";

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

export const UploadStatusClient: Story = () => {
  const [error, setError] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();
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
    // as this is a single file input there will only ever be (at most) 1 file
    const fileUploaded = files[0];

    // abandon with error if the file is too big
    if (fileUploaded.size > 5 * 1024 * 1024) {
      setError("This file is too big to be uploaded - maximum size 5MB");
      return;
    }

    setError(undefined);

    const fileReader = getReader();

    const handleLoad = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "uploading",
        filename: fileUploaded.name,
        onAction: () => fileReader.abort(),
        progress: 0,
      };
      setUploadStatus(uploadProps);
    };

    const handleProgress = (e: ProgressEvent) => {
      const progress = (100 * e.loaded) / e.total;
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

    const handleError = () => {
      const uploadProps: FileUploadStatusProps = {
        status: "error",
        filename: fileUploaded.name,
        onAction: () => removeFile(),
        message: "failed to upload",
      };
      setUploadStatus(uploadProps);
      removeListeners();
    };

    const handleAbort = () => {
      removeFile();
      removeListeners();
    };

    const removeListeners = () => {
      fileReader.removeEventListener("loadstart", handleLoad);
      fileReader.removeEventListener("load", handleLoad);
      fileReader.removeEventListener("loadend", handleProgress);
      fileReader.removeEventListener("progress", handleProgress);
      fileReader.removeEventListener("error", handleError);
      fileReader.removeEventListener("abort", handleAbort);
    };

    fileReader.addEventListener("loadstart", handleLoad);
    fileReader.addEventListener("load", handleProgress);
    fileReader.addEventListener("loadend", handleProgress);
    fileReader.addEventListener("progress", handleProgress);
    fileReader.addEventListener("error", handleError);
    fileReader.addEventListener("abort", handleAbort);

    fileReader.readAsDataURL(fileUploaded);
  };

  return (
    <FileInput
      label="Upload status example"
      inputHint="Maximum size 5MB"
      onChange={onChange}
      uploadStatus={uploadStatus}
      error={error}
    />
  );
};
UploadStatusClient.storyName = "Upload Status (Client)";

export const UploadStatusAlternative: Story = () => {
  const [uploadStatus, setUploadStatus] = useState<
    FileUploadStatusProps | undefined
  >();

  const removeFile = () => setUploadStatus(undefined);

  const onChange = (files: FileList) => {
    if (!files.length) {
      removeFile();
      return;
    }
    // as this is a single file input there will only ever be (at most) 1 file
    const fileUploaded = files[0];

    setUploadStatus({
      status: "uploading",
      filename: fileUploaded.name,
      onAction: () => {
        // in practice you might need to send a new request to the server here to ensure nothing of the file gets stored
        removeFile();
      },
      progress: 0,
    });

    // mock progress, and possibility of error, at regular intervals. In practice you could poll an endpoint to monitor progress,
    // or use a WebSocket connection for the server to give regular updates.
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 20);
      // mock possiblity of server error
      if (randomNumber === 0) {
        setUploadStatus({
          status: "error",
          filename: fileUploaded.name,
          onAction: () => {
            // in practice you might need to send a new request to the server here to ensure nothing of the file gets stored
            removeFile();
          },
          message:
            "something went wrong with uploading the file - please try again",
        });
        clearInterval(interval);
      } else {
        setUploadStatus((currentStatus) => {
          if (currentStatus?.status !== "uploading") {
            return currentStatus;
          }
          const currentProgress = currentStatus.progress as number;
          const newProgress = currentProgress + randomNumber;
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              status: "completed",
              filename: fileUploaded.name,
              onAction: () => {
                // in practice you might need to send a new request to the server here to ensure nothing of the file gets stored
                removeFile();
              },
              href: "https://carbon.sage.com/", // real href will be whatever URL the file is stored at
              message: "File uploaded",
            };
          }
          return {
            ...currentStatus,
            progress: newProgress,
            message: `${newProgress} percent uploaded`,
          };
        });
      }
    }, 100);
  };

  return (
    <FileInput
      label="Upload status example"
      onChange={onChange}
      uploadStatus={uploadStatus}
    />
  );
};
UploadStatusAlternative.storyName = "Upload Status (Alternative)";

export const UploadStatusNoProgress: Story = () => {
  return (
    <FileInput
      uploadStatus={{
        status: "uploading",
        filename: "foo.pdf",
        onAction: () => {},
      }}
      onChange={() => {}}
    />
  );
};
UploadStatusNoProgress.storyName = "Upload Status (No Progress)";
