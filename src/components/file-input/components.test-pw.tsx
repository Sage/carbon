import React from "react";
import FileInput, { FileInputProps, FileUploadStatusProps } from ".";

export default (props: Partial<FileInputProps>) => {
  return <FileInput label="File input" onChange={() => {}} {...props} />;
};

export const FocusPreservationHarness = () => {
  const [filenames, setFilenames] = React.useState(["a.pdf", "b.pdf", "c.pdf"]);
  const remove = (filename: string) =>
    setFilenames((current) => current.filter((name) => name !== filename));

  return (
    <FileInput
      label="File input"
      onChange={() => {}}
      uploadStatus={filenames.map((filename) => ({
        status: "error",
        filename,
        message: "Failed",
        onRemove: () => remove(filename),
      }))}
    />
  );
};

export const DuplicateFilenameFocusPreservationHarness = () => {
  const [items, setItems] = React.useState([
    { id: "dup-1", filename: "a.pdf" },
    { id: "dup-2", filename: "a.pdf" },
    { id: "dup-3", filename: "b.pdf" },
  ]);
  const remove = (id: string) =>
    setItems((current) => current.filter((item) => item.id !== id));

  return (
    <FileInput
      label="File input"
      onChange={() => {}}
      uploadStatus={items.map(
        ({ id, filename }): FileUploadStatusProps => ({
          id,
          status: "error",
          filename,
          message: "Failed",
          onRemove: () => remove(id),
        }),
      )}
    />
  );
};

export const SecondaryActionFocusPreservationHarness = () => {
  const [filenames, setFilenames] = React.useState(["a.pdf", "b.pdf"]);
  const remove = (filename: string) =>
    setFilenames((current) => current.filter((name) => name !== filename));

  return (
    <FileInput
      label="File input"
      multiple
      onChange={() => {}}
      uploadStatus={filenames.map((filename) => ({
        status: "completed" as const,
        filename,
        href: `/${filename}`,
        onClick: (event) => event.preventDefault(),
        onDelete: () => remove(filename),
      }))}
    />
  );
};

export const CancelToPickerHarness = () => {
  const [isUploading, setIsUploading] = React.useState(true);

  return (
    <FileInput
      label="File input"
      multiple
      onChange={() => {}}
      uploadStatus={
        isUploading
          ? {
              status: "uploading",
              filename: "a.pdf",
              onCancel: () => setIsUploading(false),
            }
          : undefined
      }
    />
  );
};

export const CrossListFocusPreservationHarness = () => {
  const [hasCurrentFile, setHasCurrentFile] = React.useState(true);

  return (
    <FileInput
      label="File input"
      onChange={() => {}}
      uploadStatus={[
        ...(hasCurrentFile
          ? [
              {
                id: "current-file",
                status: "completed" as const,
                filename: "current.pdf",
                onDelete: () => setHasCurrentFile(false),
              },
            ]
          : []),
        {
          id: "previous-file",
          status: "previously" as const,
          filename: "previous.pdf",
        },
      ]}
    />
  );
};

export const DropFocusHarness = ({
  status = "completed",
}: {
  status?: "uploading" | "completed" | "error";
}) => {
  const [uploadStatus, setUploadStatus] =
    React.useState<FileUploadStatusProps>();

  const showStatus = (files: FileList) => {
    const filename = files[0].name;

    switch (status) {
      case "uploading":
        setUploadStatus({
          status,
          filename,
          onCancel: () => setUploadStatus(undefined),
        });
        break;
      case "error":
        setUploadStatus({
          status,
          filename,
          onRemove: () => setUploadStatus(undefined),
          onRetry: () => {},
        });
        break;
      case "completed":
        setUploadStatus({
          status,
          filename,
          href: `/${filename}`,
          onClick: (event) => event.preventDefault(),
          onDelete: () => setUploadStatus(undefined),
        });
        break;
    }
  };

  return (
    <FileInput
      label="File input"
      onChange={showStatus}
      uploadStatus={uploadStatus}
    />
  );
};

export const DelayedDropFocusHarness = () => {
  const [uploadStatus, setUploadStatus] =
    React.useState<FileUploadStatusProps>();

  return (
    <FileInput
      label="File input"
      onChange={(files) =>
        window.setTimeout(
          () =>
            setUploadStatus({
              status: "completed",
              filename: files[0].name,
              onDelete: () => setUploadStatus(undefined),
            }),
          100,
        )
      }
      uploadStatus={uploadStatus}
    />
  );
};

export const CancelledDelayedDropFocusHarness = () => {
  const [filename, setFilename] = React.useState<string>();
  const [uploadStatus, setUploadStatus] =
    React.useState<FileUploadStatusProps>();

  return (
    <>
      <FileInput
        label="File input"
        onChange={(files) => setFilename(files[0].name)}
        uploadStatus={uploadStatus}
      />
      <button
        type="button"
        onClick={() =>
          filename &&
          setUploadStatus({
            status: "completed",
            filename,
            onDelete: () => setUploadStatus(undefined),
          })
        }
      >
        Show status
      </button>
    </>
  );
};

export const StatusTransitionFocusHarness = () => {
  const [completed, setCompleted] = React.useState(false);

  return (
    <FileInput
      label="File input"
      onChange={() => {}}
      uploadStatus={
        completed
          ? {
              status: "completed",
              filename: "a.pdf",
              onDelete: () => {},
            }
          : {
              status: "uploading",
              filename: "a.pdf",
              onCancel: () => setCompleted(true),
            }
      }
    />
  );
};
