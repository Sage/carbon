import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { type MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { type ValidationProps } from "../../__internal__/validations";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import FormField from "../../__internal__/form-field";
import { type TagProps } from "../../__internal__/utils/helpers/tags";
import combineRefs from "../../__internal__/utils/helpers/combine-refs";
import useUniqueId from "../../hooks/__internal__/useUniqueId";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import useIsFileDraggedOverDocument from "../../hooks/__internal__/useIsFileDraggedOverDocument";
import useFileDropZone from "./__internal__/hooks/useFileDropZone";
import {
  StyledFileStatusLists,
  StyledFileInputContainer,
  StyledFileInputLabelSet,
  StyledFileInputDropZone,
  StyledDashedBorder,
  StyledHiddenFileInput,
  StyledStatusAnnouncement,
  StyledRemovalAnnouncement,
  StyledRequiredDescription,
} from "./file-input.style";
import { type FileUploadStatusProps } from "./__internal__/file-upload-status";
import FileUploadStatusList from "./__internal__/file-upload-status-list";
import FileInputValidation from "./__internal__/file-input-validation";
import useUploadCompletionAnnouncement from "./__internal__/hooks/useUploadCompletionAnnouncement";
import useMoveFocusAfterFileSelection from "./__internal__/hooks/useMoveFocusAfterFileSelection";
import useStatusAnnouncement from "./__internal__/hooks/useStatusAnnouncement";
import useMoveFocusAfterFileRemoval from "./__internal__/hooks/useMoveFocusAfterFileRemoval";
import splitStatuses, {
  countStatuses,
} from "./__internal__/utils/split-statuses";
import Button from "../button/__next__/button.component";
import Typography from "../typography";
import Label from "../../__internal__/label";
import HintText from "../../__internal__/hint-text";
import Box from "../box";
import useLocale from "../../hooks/__internal__/useLocale";
import type { ResolvedFileInputLocale } from "./__internal__/file-input.types";

export interface FileInputProps
  extends Pick<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name">,
    TagProps,
    MarginProps {
  /**
   * File type(s) used by the native file picker through the HTML input's
   * `accept` attribute. Consumers must validate dropped files.
   */
  accept?: string;
  /**
   * Text displayed on the Select file button, which opens the native file
   * picker. Defaults to the localized "Select file", or "Select files" when
   * `multiple` is `true`. The default drag-and-drop instruction reuses this
   * text.
   */
  buttonText?: string;
  /**
   * Indicates an error. A string is displayed as a validation message above the
   * drop zone; `true` shows the error border without a message. Either marks
   * the Select file button as invalid.
   */
  error?: ValidationProps["error"];
  /**
   * Supporting text displayed in the drop zone. Defaults to the localized
   * instruction to drag and drop files.
   */
  dragAndDropText?: string;
  /**
   * Help content displayed beneath the label and announced with the Select
   * file button.
   */
  inputHint?: React.ReactNode;
  /**
   * Controls the drop-zone layout. Defaults to `true`, which stacks its
   * contents vertically; set to `false` for a horizontal layout.
   */
  isVertical?: boolean;
  /**
   * Visible label for the field. It also forms the Select file button's
   * accessible name.
   */
  label?: string;
  /**
   * Maximum height of the drop zone, as a valid CSS value. In single-file mode,
   * it also applies to the status card that replaces the drop zone. In
   * multiple-file mode, status cards size to their content.
   */
  maxHeight?: string;
  /**
   * Maximum width of the drop zone and status cards, as a valid CSS value.
   * When omitted, the component fills the available width of its container.
   */
  maxWidth?: string;
  /**
   * Minimum height of the drop zone, as a valid CSS value. In single-file mode,
   * it also applies to the status card that replaces the drop zone. In
   * multiple-file mode, status cards size to their content.
   */
  minHeight?: string;
  /**
   * Minimum width of the drop zone and status cards, as a valid CSS value,
   * capped at the width of the container. When omitted, the component may
   * shrink to fit its container.
   */
  minWidth?: string;
  /**
   * Controls whether multiple files can be selected. Defaults to `false`,
   * which hides the drop zone while a status card is present; set to `true`
   * to keep the drop zone available alongside status cards.
   */
  multiple?: boolean;
  /** Disables file selection and dropping files onto the drop zone. */
  disabled?: boolean;
  /** Called when files are selected or dropped, with all received files. */
  onChange: (files: FileList) => void;
  /**
   * Status card data for files that are uploading, completed, previously
   * uploaded, or in error. Each item renders a card showing the filename, its
   * state, and its actions. In single-file mode, a status card replaces the
   * drop zone; in multiple-file mode, status cards are displayed alongside it.
   */
  uploadStatus?: FileUploadStatusProps | FileUploadStatusProps[];
  /**
   * Marks the field as required with a visual indicator and an accessible
   * description on the Select file button. The hidden native input is not
   * marked `required`, so browser validation never blocks form submission;
   * validate on submit and supply `error` instead.
   */
  required?: boolean;
  /**
   * @deprecated No replacement: validation is shown above the drop zone by
   * default, so omit this prop. `false`, which renders validation below the
   * drop zone, is retained for existing consumers and will be removed in a
   * future major release.
   */
  validationMessagePositionTop?: boolean;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      accept,
      buttonText: buttonTextProp,
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
      minWidth,
      multiple = false,
      name,
      onChange,
      required,
      uploadStatus,
      validationMessagePositionTop = true,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();
    const {
      dragAndDrop,
      announcements,
      currentFiles,
      currentFilesErrorSummary,
      previouslyUploadedFiles,
      requiredDescription,
      selectFile,
    } = locale.fileInput as ResolvedFileInputLocale;
    const { filesAdded, uploadComplete } = announcements;

    const [inputId, inputName] = useUniqueId(id, name);
    const buttonId = `${inputId}-button`;
    const statusAnnouncementId = `${inputId}-status-announcement`;
    const removalAnnouncementId = `${inputId}-removal-announcement`;
    const requiredDescriptionId = required ? `${inputId}-required` : undefined;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const isFileDraggedOverDocument = useIsFileDraggedOverDocument();

    const { currentStatuses, previouslyUploadedStatuses } = useMemo(
      () => splitStatuses(uploadStatus),
      [uploadStatus],
    );
    const currentStatusCounts = countStatuses(currentStatuses);
    const hasFiles =
      currentStatuses.length > 0 || previouslyUploadedStatuses.length > 0;

    // Errors on statuses present at first render stay silent (no page-load
    // noise); errors on statuses added after mount are announced to screen
    // readers.
    const [announceNewStatusErrors, setAnnounceNewStatusErrors] =
      useState(false);
    useEffect(() => setAnnounceNewStatusErrors(true), []);

    useEffect(() => {
      if (hasFiles && inputRef.current?.value) {
        // Browsers fire `cancel`, not `change`, when the same file is picked
        // again, so clear the native value to let it be picked again. Only
        // clear once `uploadStatus` shows files, so a selection without a
        // status stays in the input for validation and form submission.
        inputRef.current.value = "";
      }
    }, [hasFiles, uploadStatus]);

    const { statusAnnouncement, announceStatus, clearStatusAnnouncement } =
      useStatusAnnouncement();
    // Focus returning to the Select file button after the file picker closes or
    // a drop can interrupt the live region, so the added files announcement
    // also describes the button until focus leaves it. Upload-complete
    // announcements use the live region alone.
    const [
      shouldAnnounceAddedFilesOnButton,
      setShouldAnnounceAddedFilesOnButton,
    ] = useState(false);

    useUploadCompletionAnnouncement(
      currentStatuses,
      useCallback(
        (newlyCompletedFilenames) => {
          setShouldAnnounceAddedFilesOnButton(false);
          announceStatus(uploadComplete(newlyCompletedFilenames));
        },
        [announceStatus, uploadComplete],
      ),
    );

    const { statusListRef, requestFileStatusFocus, cancelFileStatusFocus } =
      useMoveFocusAfterFileSelection({
        multiple,
        hasFiles,
        fallbackRef: buttonRef,
      });

    const {
      removalAnnouncement,
      clearRemovalAnnouncement,
      moveFocusAfterAction,
    } = useMoveFocusAfterFileRemoval({
      statusListRef,
      fallbackRef: buttonRef,
      onRemovalAnnouncement: clearStatusAnnouncement,
    });

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
      setShouldAnnounceAddedFilesOnButton(true);
      announceStatus(
        filesAdded(Array.from(files, ({ name: fileName }) => fileName)),
      );
    };

    const { isDraggedOver, onDragOver, onDragLeave, onDrop } = useFileDropZone({
      disabled,
      onFilesDropped: addFiles,
      onDropComplete: () => buttonRef.current?.focus(),
    });

    const {
      labelId,
      validationId: errorMessageId,
      fieldHelpId,
      ariaDescribedBy,
    } = useInputAccessibility({
      id: inputId,
      validationRedesignOptIn: true,
      error,
      label,
      fieldHelp: inputHint,
    });
    // The result of the latest action is read first, before the field's
    // static descriptions.
    const buttonAriaDescribedBy = [
      removalAnnouncement ? removalAnnouncementId : undefined,
      shouldAnnounceAddedFilesOnButton && statusAnnouncement
        ? statusAnnouncementId
        : undefined,
      requiredDescriptionId,
      ariaDescribedBy,
    ]
      .filter(Boolean)
      .join(" ");

    const buttonText = buttonTextProp || selectFile(multiple);
    const validation = (
      <FileInputValidation
        error={error}
        validationId={errorMessageId}
        validationMessagePositionTop={validationMessagePositionTop}
      />
    );
    const sharedStatusListProps = {
      maxHeight,
      minHeight,
      multiple,
      moveFocusAfterAction,
      removalAnnouncementId: removalAnnouncement
        ? removalAnnouncementId
        : undefined,
      onPreviewActivate: clearRemovalAnnouncement,
      announceInitialErrors: announceNewStatusErrors,
    };

    return (
      <InputBehaviour>
        <StyledFileInputContainer
          role={label ? "group" : undefined}
          aria-labelledby={labelId}
          onBlurCapture={clearRemovalAnnouncement}
        >
          <FormField
            error={error}
            id={inputId}
            data-component="file-input"
            data-role={dataRole}
            data-element={dataElement}
            validationRedesignOptIn
            {...filterStyledSystemMarginProps(rest)}
          >
            {(label || inputHint) && (
              <StyledFileInputLabelSet>
                {label && (
                  <Label
                    size="medium"
                    htmlFor={inputId}
                    id={labelId}
                    isRequired={required}
                    disabled={disabled}
                  >
                    {label}
                  </Label>
                )}
                {inputHint && (
                  <HintText size="medium" id={fieldHelpId} disabled={disabled}>
                    {inputHint}
                  </HintText>
                )}
              </StyledFileInputLabelSet>
            )}
            {requiredDescriptionId && (
              <StyledRequiredDescription id={requiredDescriptionId}>
                {requiredDescription()}
              </StyledRequiredDescription>
            )}
            <Box position="relative" minWidth={minWidth} maxWidth={maxWidth}>
              {validationMessagePositionTop && validation}
              <StyledHiddenFileInput
                ref={combineRefs(ref, inputRef)}
                id={inputId}
                name={inputName}
                type="file"
                multiple={multiple}
                disabled={disabled}
                accept={accept}
                onClick={clearStatusAnnouncement}
                onChange={(event) => {
                  addFiles(event.currentTarget.files as FileList);
                }}
              />
              {(multiple || !hasFiles) && (
                <StyledFileInputDropZone
                  data-role="file-input-presentation"
                  $minWidth={minWidth}
                  $minHeight={minHeight}
                  $maxWidth={maxWidth}
                  $maxHeight={maxHeight}
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
                    aria-describedby={buttonAriaDescribedBy || undefined}
                    aria-invalid={!!error}
                    variant="default"
                    variantType="secondary"
                    size="medium"
                    disabled={disabled}
                    onClick={() => !disabled && inputRef.current?.click()}
                    onBlur={() => {
                      cancelFileStatusFocus();
                      setShouldAnnounceAddedFilesOnButton(false);
                    }}
                  >
                    {buttonText}
                  </Button>
                  <Typography m={0}>
                    {dragAndDropText || dragAndDrop(buttonText, multiple)}
                  </Typography>
                </StyledFileInputDropZone>
              )}
              {!validationMessagePositionTop && validation}
            </Box>
            {hasFiles && (
              <StyledFileStatusLists
                ref={statusListRef}
                data-role="file-status-lists"
                $minWidth={minWidth}
                $maxWidth={maxWidth}
                $multiple={multiple}
              >
                {currentStatuses.length > 0 && (
                  <FileUploadStatusList
                    {...sharedStatusListProps}
                    items={currentStatuses}
                    label={currentFiles(currentStatuses.length)}
                    errorSummary={
                      currentStatuses.length > 1 &&
                      currentStatusCounts.errorCount > 0
                        ? currentFilesErrorSummary(currentStatusCounts)
                        : undefined
                    }
                  />
                )}
                {previouslyUploadedStatuses.length > 0 && (
                  <FileUploadStatusList
                    {...sharedStatusListProps}
                    items={previouslyUploadedStatuses}
                    label={previouslyUploadedFiles(
                      previouslyUploadedStatuses.length,
                    )}
                  />
                )}
              </StyledFileStatusLists>
            )}
            <StyledStatusAnnouncement
              id={statusAnnouncementId}
              aria-live="polite"
              aria-atomic="true"
            >
              {statusAnnouncement}
            </StyledStatusAnnouncement>
            <StyledRemovalAnnouncement id={removalAnnouncementId}>
              {removalAnnouncement}
            </StyledRemovalAnnouncement>
          </FormField>
        </StyledFileInputContainer>
      </InputBehaviour>
    );
  },
);
FileInput.displayName = "FileInput";
export default FileInput;
