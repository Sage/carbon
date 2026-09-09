import React, { useCallback, useRef, useState } from "react";
import { type MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { type ValidationProps } from "../../__internal__/validations";
import { type InputProps } from "../../__internal__/legacy-input";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import FormField from "../../__internal__/form-field";
import { type TagProps } from "../../__internal__/utils/helpers/tags";
import combineRefs from "../../__internal__/utils/helpers/combine-refs";
import useUniqueId from "../../hooks/__internal__/useUniqueId";
import { type CurrentFileStatusCounts } from "../../locales/locale";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import useIsFileDraggedOverDocument from "../../hooks/__internal__/useIsFileDraggedOverDocument";
import useFileDropZone from "./__internal__/use-file-drop-zone";
import {
  StyledFileStatusLists,
  StyledFileInputContainer,
  StyledDashedBorder,
  StyledFileInputHint,
  StyledFileInputLabel,
  StyledFileInputLabelSet,
  StyledFileInputDropZone,
  StyledHiddenFileInput,
  StyledLiveRegion,
} from "./file-input.style";
import Button from "../button/__next__/button.component";
import Typography from "../typography";
import { type FileUploadStatusProps } from "./__internal__/file-upload-status";
import FileUploadStatusList from "./__internal__/file-upload-status-list";
import FileInputValidation from "./__internal__/file-input-validation";
import useUploadCompletionAnnouncement from "./__internal__/use-upload-completion-announcement";
import focusNextAction from "./__internal__/focus-next-action";
import Box from "../box";
import useLocale from "../../hooks/__internal__/useLocale";
import type ResolvedFileInputLocale from "./__internal__/resolved-file-input-locale";

export interface FileInputProps
  extends Pick<ValidationProps, "error">,
    Pick<InputProps, "id" | "name">,
    TagProps,
    MarginProps {
  /**
   * File type(s) used by the native file picker through the HTML input's
   * `accept` attribute. Consumers must validate dropped files.
   */
  accept?: string;
  /** Text displayed on the button that opens the native file picker. */
  buttonText?: string;
  /**
   * Supporting text displayed in the drop zone. Defaults to the localized
   * instruction to drag and drop files.
   */
  dragAndDropText?: string;
  /** Help content displayed beneath the label and associated with the input. */
  inputHint?: React.ReactNode;
  /**
   * Controls the drop-zone layout. Defaults to `true`, which stacks its
   * contents vertically; set to `false` for a horizontal layout.
   */
  isVertical?: boolean;
  /** Visible label for the native file input. */
  label?: string;
  /** Maximum height of the drop zone, as a valid CSS value. */
  maxHeight?: string;
  /**
   * Maximum width of the drop zone, as a valid CSS value. Defaults to the
   * value of `minWidth`.
   */
  maxWidth?: string;
  /** Minimum height of the drop zone, as a valid CSS value. */
  minHeight?: string;
  /**
   * Minimum width of the drop zone, as a valid CSS value. Defaults to
   * `"288px"`.
   */
  minWidth?: string;
  /**
   * Controls single-file vs multi-file behavior. Defaults to `false`, which
   * restricts the native picker to one file; the Drop zone remains available
   * alongside file cards in either mode so a replacement can be selected.
   */
  multiple?: boolean;
  /** Disables file selection and dropping files onto the drop zone. */
  disabled?: boolean;
  /** Called when files are selected or dropped, with all received files. */
  onChange: (files: FileList) => void;
  /**
   * Status item(s) displayed alongside the picker for files that are
   * uploading, completed, previously uploaded, or in error.
   */
  uploadStatus?: FileUploadStatusProps | FileUploadStatusProps[];
  /** Marks the native file input as required. */
  required?: boolean;
  /** @deprecated Validation messages render below the drop zone. */
  validationMessagePositionTop?: boolean;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      accept,
      buttonText,
      "data-element": dataElement,
      "data-role": dataRole,
      disabled,
      dragAndDropText,
      error,
      label,
      id,
      inputHint,
      isVertical = true,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth = "288px",
      multiple = false,
      name,
      onChange,
      required,
      uploadStatus = [],
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const {
      dragAndDrop,
      filesAdded,
      uploadComplete,
      currentFiles,
      currentFilesErrorSummary,
      previouslyUploadedFiles,
    } = locale.fileInput as ResolvedFileInputLocale;

    const [uniqueId, uniqueName] = useUniqueId(id, name);
    const buttonId = `${uniqueId}-button`;
    const [statusAnnouncement, setStatusAnnouncement] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const isFileDraggedOverDocument = useIsFileDraggedOverDocument();

    const statuses = (
      Array.isArray(uploadStatus) ? uploadStatus : [uploadStatus]
    ).filter(Boolean) as FileUploadStatusProps[];
    const activeStatuses = statuses.filter(
      ({ status }) => status !== "previously",
    );
    const previouslyUploadedStatuses = statuses.filter(
      ({ status }) => status === "previously",
    );
    const currentFileStatusCounts: CurrentFileStatusCounts = {
      totalCount: activeStatuses.length,
      uploadingCount: activeStatuses.filter(
        ({ status }) => status === "uploading",
      ).length,
      completedCount: activeStatuses.filter(
        ({ status }) => status === "completed",
      ).length,
      errorCount: activeStatuses.filter(({ status }) => status === "error")
        .length,
    };

    const sizeProps = {
      maxHeight: maxHeight || undefined,
      maxWidth: maxWidth || minWidth,
      minHeight,
      minWidth,
    };

    const hasFiles =
      activeStatuses.length > 0 || previouslyUploadedStatuses.length > 0;
    const textOnButton = buttonText || locale.fileInput.selectFile();
    const mainText = dragAndDropText || dragAndDrop(textOnButton);

    useUploadCompletionAnnouncement(
      activeStatuses,
      useCallback(
        (newlyCompletedFilenames) =>
          setStatusAnnouncement(uploadComplete(newlyCompletedFilenames)),
        [uploadComplete],
      ),
    );

    const addFiles = (files: FileList) => {
      if (disabled || !files.length) return;
      onChange(files);
      setStatusAnnouncement(
        filesAdded(Array.from(files, ({ name: fileName }) => fileName)),
      );
    };

    const { isDraggedOver, onDragOver, onDragLeave, onDrop } = useFileDropZone({
      disabled,
      onFilesDropped: addFiles,
      onDropComplete: () => buttonRef.current?.focus(),
    });

    const onActionFocusFallback = (element: HTMLElement) =>
      focusNextAction(element, () => buttonRef.current);

    const { labelId, validationId, fieldHelpId, ariaDescribedBy } =
      useInputAccessibility({
        id: uniqueId,
        validationRedesignOptIn: true,
        error,
        label,
        fieldHelp: inputHint,
      });

    return (
      <InputBehaviour>
        <StyledFileInputContainer>
          <FormField
            error={error}
            id={uniqueId}
            data-component="file-input"
            data-role={dataRole}
            data-element={dataElement}
            validationRedesignOptIn
            {...filterStyledSystemMarginProps(rest)}
          >
            {label && (
              <StyledFileInputLabelSet>
                <StyledFileInputLabel
                  htmlFor={uniqueId}
                  id={labelId}
                  $isRequired={required}
                  $disabled={disabled}
                >
                  {label}
                </StyledFileInputLabel>
                {inputHint && (
                  <StyledFileInputHint
                    forwardedAs="span"
                    id={fieldHelpId}
                    variant="p"
                    $disabled={disabled}
                  >
                    {inputHint}
                  </StyledFileInputHint>
                )}
              </StyledFileInputLabelSet>
            )}
            <Box
              position="relative"
              minWidth={sizeProps.minWidth}
              maxWidth={sizeProps.maxWidth}
            >
              <StyledHiddenFileInput
                ref={combineRefs(ref, inputRef)}
                id={uniqueId}
                name={uniqueName}
                type="file"
                multiple={multiple}
                required={required && !hasFiles}
                disabled={disabled}
                accept={accept}
                aria-invalid={!!error}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={labelId}
                onChange={(event) => {
                  addFiles(event.currentTarget.files as FileList);
                  // allow selecting the same file again.
                  event.currentTarget.value = "";
                }}
              />
              <StyledFileInputDropZone
                data-role="file-input-presentation"
                $minWidth={sizeProps.minWidth}
                $minHeight={sizeProps.minHeight}
                $maxWidth={sizeProps.maxWidth}
                $maxHeight={sizeProps.maxHeight}
                $isVertical={isVertical}
                $isDraggedOver={isDraggedOver}
                $isDraggingFile={isFileDraggedOverDocument}
                $error={error}
                $disabled={disabled}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <StyledDashedBorder
                  aria-hidden="true"
                  $error={error}
                  $isDraggedOver={isDraggedOver}
                  $isDraggingFile={isFileDraggedOverDocument}
                  $disabled={disabled}
                >
                  <rect />
                </StyledDashedBorder>
                <Button
                  ref={buttonRef}
                  id={buttonId}
                  aria-labelledby={
                    labelId ? `${labelId} ${buttonId}` : undefined
                  }
                  aria-describedby={ariaDescribedBy}
                  variant="default"
                  variantType="secondary"
                  size="medium"
                  disabled={disabled}
                  onClick={() => !disabled && inputRef.current?.click()}
                >
                  {textOnButton}
                </Button>
                <Typography m={0}>{mainText}</Typography>
              </StyledFileInputDropZone>
              <FileInputValidation error={error} validationId={validationId} />
            </Box>
            {hasFiles && (
              <StyledFileStatusLists
                $minWidth={sizeProps.minWidth}
                $maxWidth={sizeProps.maxWidth}
              >
                {activeStatuses.length > 0 && (
                  <FileUploadStatusList
                    items={activeStatuses}
                    label={currentFiles(activeStatuses.length)}
                    errorSummary={
                      activeStatuses.length > 1 &&
                      currentFileStatusCounts.errorCount > 0
                        ? currentFilesErrorSummary(currentFileStatusCounts)
                        : undefined
                    }
                    onActionFocusFallback={onActionFocusFallback}
                  />
                )}
                {previouslyUploadedStatuses.length > 0 && (
                  <FileUploadStatusList
                    items={previouslyUploadedStatuses}
                    label={previouslyUploadedFiles(
                      previouslyUploadedStatuses.length,
                    )}
                    onActionFocusFallback={onActionFocusFallback}
                  />
                )}
              </StyledFileStatusLists>
            )}
            <StyledLiveRegion aria-live="polite" aria-atomic="true">
              {statusAnnouncement}
            </StyledLiveRegion>
          </FormField>
        </StyledFileInputContainer>
      </InputBehaviour>
    );
  },
);
FileInput.displayName = "FileInput";
export default FileInput;
