import React, { useRef, useState, useEffect } from "react";
import { MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { ValidationProps } from "../../__internal__/validations";
import { InputProps } from "../../__internal__/input";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import FormField from "../../__internal__/form-field";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import useUniqueId from "../../hooks/__internal__/useUniqueId";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import ValidationMessage from "../../__internal__/validation-message";
import {
  StyledHiddenFileInput,
  StyledFileInputPresentation,
} from "./file-input.style";
import ErrorBorder from "../textbox/textbox.style";
import ButtonMinor from "../button-minor";
import Typography from "../typography";
import FileUploadStatus, {
  FileUploadStatusProps,
} from "./__internal__/file-upload-status";
import Box from "../box";
import useLocale from "../../hooks/__internal__/useLocale";
import HintText from "../../__internal__/hint-text";

export interface FileInputProps
  extends Pick<ValidationProps, "error">,
    Pick<InputProps, "id" | "name" | "required">,
    TagProps,
    MarginProps {
  /** Which file format(s) to accept. Will be passed to the underlying HTML input.
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept  */
  accept?: string;
  /** Text to appear on the main button. Defaults to "Select file" */
  buttonText?: string;
  /** Explanatory text to appear inside the input area. Defaults to "or drag and drop your file" */
  dragAndDropText?: string;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: React.ReactNode;
  /** Sets the default layout to vertical - with the button below the explanatory text rather than next to it.
   * This is the equivalent of removing the maxHeight prop - it will be over-ridden if this prop is set explicitly. */
  isVertical?: boolean;
  /** Label content */
  label?: string;
  /** A valid CSS string for the max-height CSS property. */
  maxHeight?: string;
  /** A valid CSS string for the max-width CSS property. Defaults to the same as the minWidth. */
  maxWidth?: string;
  /** A valid CSS string for the min-height CSS property. */
  minHeight?: string;
  /** A valid CSS string for the min-width CSS property. */
  minWidth?: string;
  /** onChange event handler. Accepts a list of all files currently entered to the input. */
  onChange: (files: FileList) => void;
  /** used to control how to display the progress of uploaded file(s) within the component */
  uploadStatus?: FileUploadStatusProps | FileUploadStatusProps[];
  /** Flag to configure component as mandatory. */
  required?: boolean;
  /** Render the ValidationMessage above the FileInput */
  validationMessagePositionTop?: boolean;
}

const FileInput = React.forwardRef(
  (
    {
      accept,
      buttonText,
      "data-element": dataElement,
      "data-role": dataRole,
      dragAndDropText,
      error,
      label,
      id,
      inputHint,
      isVertical,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth = "280px",
      name,
      onChange,
      required,
      uploadStatus = [],
      validationMessagePositionTop = true,
      ...rest
    }: FileInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const locale = useLocale();
    const textOnButton = buttonText || locale.fileInput.selectFile();
    const mainText = dragAndDropText || locale.fileInput.dragAndDrop();

    const sizeProps = {
      maxHeight: maxHeight || undefined,
      maxWidth: maxWidth || minWidth,
      minHeight,
      minWidth,
    };

    const [uniqueId, uniqueName] = useUniqueId(id, name);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [isDraggingFile, setIsDraggingFile] = useState(false);

    const internalInputRef = useRef<HTMLInputElement | null>(null);
    const internalCallbackRef = (fileInput: HTMLInputElement | null) => {
      internalInputRef.current = fileInput;
      if (typeof ref === "function") {
        ref(fileInput);
      } else if (ref) {
        ref.current = fileInput;
      }
    };

    const startDrag = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.types.includes("Files")) {
        setIsDraggingFile(true);
      }
    };

    const stopDrag = (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingFile(false);
    };

    useEffect(() => {
      document.addEventListener("dragover", startDrag);
      document.addEventListener("drop", stopDrag);
      document.addEventListener("dragleave", stopDrag);

      return () => {
        document.removeEventListener("dragover", startDrag);
        document.removeEventListener("drop", stopDrag);
        document.removeEventListener("dragleave", stopDrag);
      };
    }, []);

    const onSelectFileClick = () => {
      internalInputRef.current?.click();
    };

    const onFileAdded = (files: FileList) => {
      onChange?.(files);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer?.types.includes("Files")) {
        setIsDraggedOver(true);
      }
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation(); // stop event triggering the document listener that resets the styles
      setIsDraggedOver(false);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggedOver(false);
      onFileAdded(e.dataTransfer.files);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFileAdded(e.target.files as FileList);
    };

    const { labelId, validationId } = useInputAccessibility({
      id: uniqueId,
      validationRedesignOptIn: true,
      error,
      label,
    });

    // allow for single input that a single set of status props is provided
    const filesUploaded = Array.isArray(uploadStatus)
      ? uploadStatus
      : [uploadStatus];

    const input = (
      <>
        {inputHint && <HintText>{inputHint}</HintText>}
        <Box position="relative">
          {validationMessagePositionTop && (
            <>
              <ValidationMessage
                error={error}
                validationId={validationId}
                validationMessagePositionTop={validationMessagePositionTop}
                data-role="validation-message-top"
              />
              {error && <ErrorBorder warning={false} />}
            </>
          )}
          <StyledHiddenFileInput
            {...(required && { required })}
            accept={accept}
            aria-invalid={!!error}
            id={uniqueId}
            ref={internalCallbackRef}
            name={uniqueName}
            onChange={onInputChange}
            type="file"
            {...rest}
          />
          <StyledFileInputPresentation
            data-role="file-input-presentation"
            isDraggedOver={isDraggedOver}
            isDraggingFile={isDraggingFile}
            error={error}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            isVertical={isVertical}
            {...sizeProps}
          >
            <ButtonMinor buttonType="primary" onClick={onSelectFileClick}>
              {textOnButton}
            </ButtonMinor>
            <Typography m={0}>{mainText}</Typography>
          </StyledFileInputPresentation>
          {!validationMessagePositionTop && (
            <>
              <ValidationMessage
                error={error}
                validationId={validationId}
                validationMessagePositionTop={validationMessagePositionTop}
                data-role="validation-message-bottom"
              />
              {error && <ErrorBorder warning={false} />}
            </>
          )}
        </Box>
      </>
    );

    return (
      <InputBehaviour>
        <FormField
          error={error}
          label={label}
          labelId={labelId}
          id={uniqueId}
          isRequired={required}
          data-component="file-input"
          data-role={dataRole}
          data-element={dataElement}
          validationRedesignOptIn // do not support old-style validation for File Input component
          {...filterStyledSystemMarginProps(rest)}
        >
          {filesUploaded.length === 0
            ? input
            : filesUploaded.map((props) => (
                <StyledFileInputPresentation
                  hasUploadStatus
                  {...sizeProps}
                  key={props.filename}
                >
                  <FileUploadStatus {...props} />
                </StyledFileInputPresentation>
              ))}
        </FormField>
      </InputBehaviour>
    );
  },
);

FileInput.displayName = "FileInput";

export default FileInput;
