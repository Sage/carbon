import React, { useCallback, useEffect, useRef, useState } from "react";
import { type MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { type ValidationProps } from "../../__internal__/validations";
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
  StyledRequiredText,
} from "./file-input.style";
import Button from "../button/__next__/button.component";
import Typography from "../typography";
import { type FileUploadStatusProps } from "./__internal__/file-upload-status";
import FileUploadStatusList from "./__internal__/file-upload-status-list";
import FileInputValidation from "./__internal__/file-input-validation";
import useUploadCompletionAnnouncement from "./__internal__/use-upload-completion-announcement";
import useMoveFocusAfterFileSelection from "./__internal__/use-move-focus-after-file-selection";
import focusNextAction from "./__internal__/focus-next-action";
import Box from "../box";
import useLocale from "../../hooks/__internal__/useLocale";
import type ResolvedFileInputLocale from "./__internal__/resolved-file-input-locale";

export interface FileInputProps
  extends Pick<ValidationProps, "error">,
    Pick<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name">,
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
  /**
   * Minimum height of the drop zone, as a valid CSS value. In single-file
   * mode, the same height is applied to its one status card.
   */
  minHeight?: string;
  /**
   * Minimum width of the drop zone, as a valid CSS value. Defaults to
   * `"288px"`.
   */
  minWidth?: string;
  /**
   * Controls whether multiple files can be selected. Defaults to `false`,
   * which hides the picker while a file status is present; set to `true` to
   * keep the picker available alongside file statuses.
   */
  multiple?: boolean;
  /** Disables file selection and dropping files onto the drop zone. */
  disabled?: boolean;
  /** Called when files are selected or dropped, with all received files. */
  onChange: (files: FileList) => void;
  /**
   * Controlled status item(s) for files that are uploading, completed,
   * previously uploaded, or in error. In single-file mode, a status replaces
   * the picker; in multiple-file mode, statuses display alongside it.
   */
  uploadStatus?: FileUploadStatusProps | FileUploadStatusProps[];
  /** Marks the native file input as required. */
  required?: boolean;
  /** @deprecated Validation messages always render below the label set, before the drop zone. */
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
      requiredDescription,
    } = locale.fileInput as ResolvedFileInputLocale;

    const [uniqueId, uniqueName] = useUniqueId(id, name);
    const buttonId = `${uniqueId}-button`;
    const requiredId = required ? `${uniqueId}-required` : undefined;
    const [statusAnnouncement, setStatusAnnouncement] = useState("");
    const statusAnnouncementRef = useRef("");
    const announcementFrameRef = useRef<number>();

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

    useEffect(() => {
      if (hasFiles && inputRef.current?.value) {
        // A controlled status confirms that the consumer has retained the
        // selection, so the native value can now be reset for reselection.
        inputRef.current.value = "";
      }
    }, [hasFiles, uploadStatus]);

    const textOnButton = buttonText || locale.fileInput.selectFile();
    const mainText = dragAndDropText || dragAndDrop(textOnButton);
    const { statusListRef, requestFileStatusFocus, cancelFileStatusFocus } =
      useMoveFocusAfterFileSelection({
        multiple,
        hasFiles,
        fallbackRef: buttonRef,
      });

    const clearStatusAnnouncement = useCallback(() => {
      if (announcementFrameRef.current !== undefined) {
        cancelAnimationFrame(announcementFrameRef.current);
        announcementFrameRef.current = undefined;
      }
      statusAnnouncementRef.current = "";
      setStatusAnnouncement("");
    }, []);

    const announceStatus = useCallback((message: string) => {
      if (announcementFrameRef.current !== undefined) {
        cancelAnimationFrame(announcementFrameRef.current);
        announcementFrameRef.current = undefined;
      }

      if (statusAnnouncementRef.current !== message) {
        statusAnnouncementRef.current = message;
        setStatusAnnouncement(message);
        return;
      }

      setStatusAnnouncement("");
      announcementFrameRef.current = requestAnimationFrame(() => {
        announcementFrameRef.current = requestAnimationFrame(() => {
          setStatusAnnouncement(message);
          announcementFrameRef.current = undefined;
        });
      });
    }, []);

    useEffect(
      () => () => {
        if (announcementFrameRef.current !== undefined) {
          cancelAnimationFrame(announcementFrameRef.current);
        }
      },
      [],
    );

    useUploadCompletionAnnouncement(
      activeStatuses,
      useCallback(
        (newlyCompletedFilenames) =>
          announceStatus(uploadComplete(newlyCompletedFilenames)),
        [announceStatus, uploadComplete],
      ),
    );

    const addFiles = (files: FileList) => {
      if (disabled || !files.length || (!multiple && hasFiles)) return;
      if (!multiple && files.length === 1) {
        requestFileStatusFocus();
      }
      onChange(files);
      if (!multiple && files.length > 1) {
        clearStatusAnnouncement();
        return;
      }
      announceStatus(
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
    const pickerAriaDescribedBy = [requiredId, ariaDescribedBy]
      .filter(Boolean)
      .join(" ");

    return (
      <InputBehaviour>
        <StyledFileInputContainer
          role={label ? "group" : undefined}
          aria-labelledby={labelId}
        >
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
            {requiredId && (
              <StyledRequiredText id={requiredId}>
                {requiredDescription()}
              </StyledRequiredText>
            )}
            <Box
              position="relative"
              minWidth={sizeProps.minWidth}
              maxWidth={sizeProps.maxWidth}
            >
              <FileInputValidation error={error} validationId={validationId} />
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
                }}
              />
              {(multiple || !hasFiles) && (
                <StyledFileInputDropZone
                  data-role="file-input-presentation"
                  $minWidth={sizeProps.minWidth}
                  $minHeight={sizeProps.minHeight}
                  $maxWidth={sizeProps.maxWidth}
                  $maxHeight={sizeProps.maxHeight}
                  $isVertical={isVertical}
                  $multiple={multiple}
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
                    aria-describedby={pickerAriaDescribedBy || undefined}
                    variant="default"
                    variantType="secondary"
                    size="medium"
                    disabled={disabled}
                    onClick={() => !disabled && inputRef.current?.click()}
                    onBlur={cancelFileStatusFocus}
                  >
                    {textOnButton}
                  </Button>
                  <Typography m={0}>{mainText}</Typography>
                </StyledFileInputDropZone>
              )}
            </Box>
            {hasFiles && (
              <StyledFileStatusLists
                ref={statusListRef}
                $minWidth={sizeProps.minWidth}
                $maxWidth={sizeProps.maxWidth}
                $multiple={multiple}
              >
                {activeStatuses.length > 0 && (
                  <FileUploadStatusList
                    items={activeStatuses}
                    label={currentFiles(activeStatuses.length)}
                    minHeight={minHeight}
                    multiple={multiple}
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
                    minHeight={minHeight}
                    multiple={multiple}
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
