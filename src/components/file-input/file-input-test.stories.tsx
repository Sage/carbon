import React from "react";
import FileInput, { FileInputProps } from ".";

export default {
  component: FileInput,
  title: "File Input/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const AllStatuses = (args: Partial<FileInputProps>) => {
  const statuses: FileInputProps["uploadStatus"][] = [
    undefined,
    {
      status: "uploading",
      filename: "foo.pdf",
      onAction: () => {},
      progress: 30,
    },
    {
      status: "uploading",
      filename: "foo.pdf",
      onAction: () => {},
      progress: 100,
    },
    {
      status: "uploading",
      filename: "foo.pdf",
      onAction: () => {},
    },
    {
      status: "uploading",
      filename: "foo.pdf",
      onAction: () => {},
      iconType: "upload",
      progress: 30,
    },
    {
      status: "completed",
      filename: "foo.pdf",
      onAction: () => {},
      href: "http://carbon.sage.com/",
      target: "_blank",
    },
    {
      status: "completed",
      filename: "foo.pdf",
      onAction: () => {},
      href: "http://carbon.sage.com/",
      target: "_blank",
      iconType: "pdf",
    },
    {
      status: "previously",
      filename: "foo.pdf",
      onAction: () => {},
      href: "http://carbon.sage.com/",
    },
    {
      status: "error",
      filename: "foo.pdf",
      onAction: () => {},
      message: "oops, that's not right",
    },
  ];
  return statuses.map((status) => (
    <FileInput
      my={20}
      label="test"
      inputHint="hint"
      uploadStatus={status}
      onChange={() => {}}
      {...args}
    />
  ));
};

export const LongFilenameStatus = (args: Partial<FileInputProps>) => {
  return (
    <FileInput
      my={20}
      label="test"
      uploadStatus={{
        status: "completed",
        onAction: () => {},
        href: "http://carbon.sage.com/",
        filename: "really_long_filename_that_will_overflow_container.doc",
      }}
      onChange={() => {}}
      {...args}
    />
  );
};

export const Validation = () => {
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
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
