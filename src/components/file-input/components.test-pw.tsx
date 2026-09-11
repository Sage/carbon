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
      onChange={() => {}}
      uploadStatus={filenames.map((filename) => ({
        status: "completed" as const,
        filename,
        href: `/${filename}`,
        onDelete: () => remove(filename),
      }))}
    />
  );
};

export const DropFocusHarness = () => {
  const [uploadStatus, setUploadStatus] =
    React.useState<FileUploadStatusProps>();

  return (
    <FileInput
      label="File input"
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
