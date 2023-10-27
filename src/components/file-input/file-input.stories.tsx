/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useRef } from "react";
import { ComponentStory } from "@storybook/react";
import useMediaQuery from "../../hooks/useMediaQuery";

import FileInput, { FileUploadStatusProps } from ".";

export const Default: ComponentStory<typeof FileInput> = () => {
  return <FileInput label="File input" onChange={() => {}} />;
};

export const WithInputHint: ComponentStory<typeof FileInput> = () => {
  return (
    <FileInput label="File input" inputHint="Hint text" onChange={() => {}} />
  );
};

export const Required: ComponentStory<typeof FileInput> = () => {
  return <FileInput label="File input" required onChange={() => {}} />;
};

export const IncreasedHeight: ComponentStory<typeof FileInput> = () => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxHeight="200px"
      onChange={() => {}}
    />
  );
};

export const IncreasedWidthResponsive: ComponentStory<
  typeof FileInput
> = () => {
  const isSmallScreen = useMediaQuery("(max-width: 800px)");

  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="min(800px, 100%)"
      maxHeight={isSmallScreen ? "200px" : undefined}
      onChange={() => {}}
    />
  );
};

export const IncreasedBoth: ComponentStory<typeof FileInput> = () => {
  return (
    <FileInput
      label="File input"
      dragAndDropText="You can drag and drop your file here, if that's the way you prefer to interact with the component."
      maxWidth="500px"
      maxHeight="200px"
      onChange={() => {}}
    />
  );
};

export const FullWidth: ComponentStory<typeof FileInput> = () => {
  return <FileInput label="File input" maxWidth="100%" onChange={() => {}} />;
};

export const Vertical: ComponentStory<typeof FileInput> = () => {
  return <FileInput label="File input" isVertical onChange={() => {}} />;
};

export const Validation: ComponentStory<typeof FileInput> = () => {
  return (
    <>
      <FileInput
        m={4}
        label="error as string"
        inputHint="Hint text (optional)"
        error="error message"
        onChange={() => {}}
      />
      <FileInput
        m={4}
        label="error as boolean"
        inputHint="Hint text (optional)"
        error
        onChange={() => {}}
      />
    </>
  );
};

export const Accept: ComponentStory<typeof FileInput> = () => {
  return (
    <FileInput
      label="Only accepts image files"
      accept="image/*"
      onChange={() => {}}
    />
  );
};

export const FileTypeValidation: ComponentStory<typeof FileInput> = () => {
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

export const UploadStatusClient: ComponentStory<typeof FileInput> = () => {
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
      removeFile();
      return;
    }
    // as this is a single file input there will only ever be (at most) 1 file
    const fileUploaded = files[0];
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
      onChange={onChange}
      uploadStatus={uploadStatus}
    />
  );
};

export const UploadStatusAlternative: ComponentStory<typeof FileInput> = () => {
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

export const UploadStatusNoProgress: ComponentStory<typeof FileInput> = () => {
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
