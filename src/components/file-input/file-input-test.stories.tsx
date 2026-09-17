import React from "react";
import FileInput, { FileInputProps, FileUploadStatusProps } from ".";
import FileInputValidation from "./__internal__/file-input-validation";
import Box from "../box";
import Typography from "../typography";
import Button from "../button/__next__/button.component";
import {
  StyledDashedBorder,
  StyledFileInputDropZone,
  StyledFileInputLabel,
  StyledFileInputLabelSet,
} from "./file-input.style";

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

// Shows one drag-state example without triggering drag state in every story.
const ForcedDropZoneState = ({
  name,
  error,
  disabled,
  isDraggedOver,
  isDraggingFile,
  buttonText = "Select files",
  dragAndDropText = "or drag and drop your files",
}: {
  name: string;
  error?: boolean | string;
  disabled?: boolean;
  isDraggedOver?: boolean;
  isDraggingFile?: boolean;
  buttonText?: string;
  dragAndDropText?: string;
}) => (
  <Box my={20} minWidth="288px" maxWidth="288px">
    <StyledFileInputLabelSet>
      <StyledFileInputLabel $disabled={disabled}>{name}</StyledFileInputLabel>
    </StyledFileInputLabelSet>
    <StyledFileInputDropZone
      data-role="file-input-presentation"
      $minWidth="288px"
      $maxWidth="288px"
      $isVertical
      $error={error}
      $disabled={disabled}
      $isDraggedOver={isDraggedOver}
      $isDraggingFile={isDraggingFile}
    >
      <StyledDashedBorder
        aria-hidden="true"
        $error={error}
        $disabled={disabled}
        $isDraggedOver={isDraggedOver}
        $isDraggingFile={isDraggingFile}
      >
        <rect />
      </StyledDashedBorder>
      <Button
        variant="default"
        variantType="secondary"
        size="medium"
        disabled={disabled}
      >
        {buttonText}
      </Button>
      <Typography m={0}>{dragAndDropText}</Typography>
    </StyledFileInputDropZone>
    {typeof error === "string" && <FileInputValidation error={error} />}
  </Box>
);

const requiredFieldErrorMessage =
  "The file is required and no file has been uploaded on submission.";
const tooManyFilesErrorMessage =
  "Multiple files were dropped into a single file input.";

// Shows real FileInput for non-drag states (default, disabled, error).
const RealDropZoneState = ({
  name,
  ...props
}: { name: string } & Partial<FileInputProps>) => (
  <Box my={20}>
    <StyledFileInputLabelSet>
      <StyledFileInputLabel
        $disabled={props.disabled}
        $isRequired={props.required}
      >
        {name}
      </StyledFileInputLabel>
    </StyledFileInputLabelSet>
    <FileInput maxWidth="288px" onChange={() => {}} {...props} />
  </Box>
);

const dragDropZoneStates: React.ComponentProps<typeof ForcedDropZoneState>[] = [
  { name: "Default dragging", isDraggingFile: true },
  {
    name: "Default dragging over",
    isDraggingFile: true,
    isDraggedOver: true,
  },
  {
    name: "Error dragging over (required field)",
    error: requiredFieldErrorMessage,
    isDraggingFile: true,
    isDraggedOver: true,
  },
];

export const DropZoneStates = () => (
  <>
    <RealDropZoneState name="Default enabled" />
    <RealDropZoneState name="Disabled" disabled required />
    <RealDropZoneState
      name="Error enabled (required field)"
      required
      error={requiredFieldErrorMessage}
    />
    {dragDropZoneStates.map((state) => (
      <ForcedDropZoneState key={state.name} {...state} />
    ))}
  </>
);
DropZoneStates.storyName = "Drop Zone States";

export const SingleFileDropZoneStates = () => (
  <RealDropZoneState
    name="Error enabled (multiple files dropped)"
    multiple={false}
    error={tooManyFilesErrorMessage}
    buttonText="Select file"
    dragAndDropText="or drag and drop your file"
  />
);
SingleFileDropZoneStates.storyName = "Single File Drop Zone States";

const thumbnailSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' rx='4' fill='%236B46C1'/%3E%3Cpath d='M8 28l7-9 5 6 4-5 8 8z' fill='%23FFFFFF' fill-opacity='0.85'/%3E%3Ccircle cx='14' cy='13' r='3' fill='%23FFFFFF' fill-opacity='0.85'/%3E%3C/svg%3E";

const singleFileStatuses = (
  withThumbnail: boolean,
): { name: string; status?: FileUploadStatusProps }[] => [
  {
    name: "No files (default)",
    status: undefined,
  },
  {
    name: "Uploading",
    status: {
      status: "uploading",
      filename: "foo.pdf",
      onCancel: () => {},
      progress: 75,
      ...(withThumbnail && { thumbnailSrc }),
    },
  },
  {
    name: "Uploaded",
    status: {
      status: "completed",
      filename: "foo.pdf",
      onDelete: () => {},
      href: "http://carbon.sage.com/",
      ...(withThumbnail && { thumbnailSrc }),
    },
  },
  {
    name: "Upload error (retry offered)",
    status: {
      status: "error",
      filename: "foo.pdf",
      onRemove: () => {},
      onRetry: () => {},
      message: "Something went wrong - please try again",
      ...(withThumbnail && { thumbnailSrc }),
    },
  },
  {
    name: "Validation error (no retry)",
    status: {
      status: "error",
      filename: "foo.exe",
      onRemove: () => {},
      message: "This file type is not supported",
      ...(withThumbnail && { thumbnailSrc }),
    },
  },
  {
    name: "Read-only (previously saved)",
    status: {
      status: "previously",
      filename: "foo.pdf",
      href: "http://carbon.sage.com/",
      message: "Uploaded by Jane Doe on 4 Sep 2026",
      ...(withThumbnail && { thumbnailSrc }),
    },
  },
];

const multiFileStatuses = (withThumbnail: boolean): FileUploadStatusProps[] => [
  {
    status: "uploading",
    filename: "presentation.pptx",
    onCancel: () => {},
    progress: 75,
    ...(withThumbnail && { thumbnailSrc }),
  },
  {
    status: "completed",
    filename: "invoice.pdf",
    onDelete: () => {},
    href: "http://carbon.sage.com/",
    ...(withThumbnail && { thumbnailSrc }),
  },
  {
    status: "error",
    filename: "unsupported-file.zip",
    onRemove: () => {},
    message: "This file type is not supported",
    ...(withThumbnail && { thumbnailSrc }),
  },
  {
    status: "error",
    filename: "photo.jpg",
    onRemove: () => {},
    onRetry: () => {},
    message: "Upload failed - check your connection and try again",
    ...(withThumbnail && { thumbnailSrc }),
  },
];

const StatusesSection = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <Box mb={64}>
    <Typography variant="strong" mb={2}>
      {name}
    </Typography>
    {children}
  </Box>
);

export const Statuses = (args: Partial<FileInputProps>) => (
  <>
    <StatusesSection name="Single file - with thumbnail">
      {singleFileStatuses(true).map(({ name, status }) => (
        <FileInput
          key={name}
          my={20}
          maxWidth="288px"
          multiple={false}
          label="Current file"
          inputHint={name}
          uploadStatus={status}
          onChange={() => {}}
          {...args}
        />
      ))}
    </StatusesSection>
    <StatusesSection name="Single file - no thumbnail">
      {singleFileStatuses(false).map(({ name, status }) => (
        <FileInput
          key={name}
          my={20}
          maxWidth="288px"
          multiple={false}
          label="Current file"
          inputHint={name}
          uploadStatus={status}
          onChange={() => {}}
          {...args}
        />
      ))}
    </StatusesSection>
    <Box mb={64}>
      <FileInput
        my={20}
        maxWidth="288px"
        multiple
        label="Multiple files - with thumbnail"
        inputHint="Multiple files - with thumbnail"
        uploadStatus={multiFileStatuses(true)}
        onChange={() => {}}
        {...args}
      />
    </Box>
    <Box mb={64}>
      <FileInput
        my={20}
        maxWidth="288px"
        multiple
        label="Multiple files - no thumbnail"
        inputHint="Multiple files - no thumbnail"
        uploadStatus={multiFileStatuses(false)}
        onChange={() => {}}
        {...args}
      />
    </Box>
  </>
);
Statuses.storyName = "Statuses";

const SingleFileTooManyFilesExample = () => {
  const [error, setError] = React.useState<string | undefined>(
    "Error message (fix is required)",
  );
  const onChange = (files: FileList) => {
    setError(files.length > 1 ? "Select only one file" : undefined);
  };
  return (
    <FileInput
      m={4}
      label="Label"
      inputHint="Hint text"
      required
      multiple={false}
      error={error}
      onChange={onChange}
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
      <SingleFileTooManyFilesExample />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
