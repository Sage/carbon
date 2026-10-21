import React from "react";
import FileInput, { FileInputProps, FileUploadStatusProps } from ".";
import FileInputValidation from "./__internal__/file-input-validation";
import Box from "../box";
import Typography from "../typography";
import Button from "../button/__next__/button.component";
import Label from "../../__internal__/label";
import {
  StyledDashedBorder,
  StyledFileInputDropZone,
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

// Renders drag states statically; they can't be triggered without a real drag event.
const ForcedDropZoneState = ({
  name,
  error,
  required,
  isDraggedOver,
  isDraggingFile,
}: {
  name: string;
  error?: string;
  required?: boolean;
  isDraggedOver?: boolean;
  isDraggingFile?: boolean;
}) => (
  <Box my={20} minWidth="288px" maxWidth="288px">
    <StyledFileInputLabelSet>
      <Label size="medium" isRequired={required}>
        {name}
      </Label>
    </StyledFileInputLabelSet>
    {error && <FileInputValidation error={error} />}
    <StyledFileInputDropZone
      data-role="file-input-presentation"
      $minWidth="288px"
      $maxWidth="288px"
      $isVertical
      $error={error}
      $isDraggedOver={isDraggedOver}
      $isDraggingFile={isDraggingFile}
    >
      <StyledDashedBorder
        aria-hidden="true"
        $error={error}
        $isDraggedOver={isDraggedOver}
        $isDraggingFile={isDraggingFile}
      >
        <rect />
      </StyledDashedBorder>
      <Button variant="default" variantType="secondary" size="medium">
        Select file
      </Button>
      <Typography m={0}>
        Drag and drop your file, or use Select file to choose it
      </Typography>
    </StyledFileInputDropZone>
  </Box>
);

const requiredFieldErrorMessage =
  "The file is required and no file has been uploaded on submission.";

// Shows real FileInput for non-drag states (default, disabled, error).
const RealDropZoneState = ({
  name,
  ...props
}: { name: string } & Partial<FileInputProps>) => (
  <Box my={20}>
    <FileInput label={name} maxWidth="288px" onChange={() => {}} {...props} />
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
    required: true,
    isDraggingFile: true,
    isDraggedOver: true,
  },
];

export const DropZoneStates = () => (
  <>
    <RealDropZoneState name="Default enabled" />
    <RealDropZoneState
      name="Horizontal compatibility layout"
      isVertical={false}
      minWidth="640px"
      maxWidth="640px"
    />
    <RealDropZoneState
      name="Disabled"
      inputHint="PDF files only"
      disabled
      required
    />
    <RealDropZoneState
      name="Error enabled (required field)"
      required
      error={requiredFieldErrorMessage}
      dragAndDropText="or drag and drop your file"
    />
    {dragDropZoneStates.map((state) => (
      <ForcedDropZoneState key={state.name} {...state} />
    ))}
  </>
);
DropZoneStates.storyName = "Drop Zone States";

const thumbnailSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' rx='4' fill='%236B46C1'/%3E%3Cpath d='M8 28l7-9 5 6 4-5 8 8z' fill='%23FFFFFF' fill-opacity='0.85'/%3E%3Ccircle cx='14' cy='13' r='3' fill='%23FFFFFF' fill-opacity='0.85'/%3E%3C/svg%3E";

const singleFileStatuses = (
  withThumbnail: boolean,
): { name: string; status: FileUploadStatusProps }[] => [
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
    name: "Uploading (no progress)",
    status: {
      status: "uploading",
      filename: "foo.pdf",
      onCancel: () => {},
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
    name: "Previously uploaded (removable)",
    status: {
      status: "previously",
      filename: "foo.pdf",
      onDelete: () => {},
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
  {
    status: "previously",
    filename: "vendor-agreement.pdf",
    href: "http://carbon.sage.com/",
    message: "Uploaded by Jane Doe on 4 Sep 2026",
    ...(withThumbnail && { thumbnailSrc }),
  },
];

const customDimensionStatuses: {
  name: string;
  dimensions: Pick<FileInputProps, "minHeight" | "minWidth" | "maxWidth">;
}[] = [
  {
    name: "Increased height (minHeight 200px)",
    dimensions: { minHeight: "200px", maxWidth: "288px" },
  },
  {
    name: "Width constraints (minWidth 250px, maxWidth min(800px, 100%))",
    dimensions: { minWidth: "250px", maxWidth: "min(800px, 100%)" },
  },
  {
    name: "Increased width and height (maxWidth 500px, minHeight 200px)",
    dimensions: { maxWidth: "500px", minHeight: "200px" },
  },
];

const completedCustomSizeStatus: FileUploadStatusProps = {
  status: "completed",
  filename: "quarterly-report.pdf",
  onDelete: () => {},
};

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

export const FileUploadStatuses = (args: Partial<FileInputProps>) => (
  <>
    <StatusesSection name="Single file - with thumbnail">
      {singleFileStatuses(true).map(({ name, status }) => (
        <FileInput
          key={name}
          my={20}
          maxWidth="288px"
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
          label="Current file"
          inputHint={name}
          uploadStatus={status}
          onChange={() => {}}
          {...args}
        />
      ))}
    </StatusesSection>
    <StatusesSection name="Single file - custom dimensions">
      {customDimensionStatuses.map(({ name, dimensions }) => (
        <FileInput
          key={name}
          my={20}
          label="Current file"
          inputHint={name}
          uploadStatus={completedCustomSizeStatus}
          onChange={() => {}}
          {...dimensions}
          {...args}
        />
      ))}
    </StatusesSection>
    <StatusesSection name="Multiple files - with thumbnail">
      <FileInput
        my={20}
        maxWidth="288px"
        multiple
        label="Files"
        uploadStatus={multiFileStatuses(true)}
        onChange={() => {}}
        {...args}
      />
    </StatusesSection>
    <StatusesSection name="Multiple files - no thumbnail">
      <FileInput
        my={20}
        maxWidth="288px"
        multiple
        label="Files"
        uploadStatus={multiFileStatuses(false)}
        onChange={() => {}}
        {...args}
      />
    </StatusesSection>
  </>
);
FileUploadStatuses.storyName = "File Upload Statuses";

export const Validation = () => (
  <FileInput
    m={4}
    label="Boolean error"
    inputHint="PDF files only"
    error
    onChange={() => {}}
  />
);
Validation.storyName = "Validation";
Validation.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};

export const LegacyValidationMessagePosition = () => (
  <FileInput
    m={4}
    label="Supporting document"
    inputHint="PDF, JPG or PNG, up to 5MB"
    required
    error="Select a file to upload"
    validationMessagePositionTop={false}
    onChange={() => {}}
  />
);
LegacyValidationMessagePosition.storyName =
  "Legacy Validation Message Position";
LegacyValidationMessagePosition.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};
