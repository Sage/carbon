import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import {
  HintText,
  FileDropArea,
  FileInput,
  FileInputContent,
  FileInputContentWrapper,
  FileInputContainer,
  FileInputForm,
  FirstSegment,
  FormattedText,
  NeutralLoaderBar,
  Placeholder,
  StyledButton,
  StyledLink,
  StyledProgressTracker,
  ValidationBorder,
  ValidationMessage,
} from "./file-input.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Label from "../../__internal__/label/label.component";
import useLocale from "../../hooks/__internal__/useLocale";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const REASONS = {
  INVALID_FILE_TYPE: "INVALID_FILE_TYPE",
  MULTIPLE_FILES: "MULTIPLE_FILES",
};

const FileInputComponent = ({
  accept,
  allowMultiple = false,
  buttonType = "primary",
  cancelAction,
  disabled = false,
  draggable = false,
  dragPlaceholder = "",
  hintText,
  fileChooseAction,
  isUploading = false,
  label = "File input",
  loaderType = "untracked",
  onFileRejected,
  progress = 0,
  readOnly,
  size = "medium",
  error,
  warning,
  id,
  ...rest
}) => {
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragged, setIsDragged] = useState(false);
  const inputFile = useRef(null);
  const fileInputContent = useRef(null);
  const l = useLocale();

  const cancelButtonText = l.fileInput.buttonTitle.cancel();
  const removeButtonText = l.fileInput.buttonTitle.remove();
  const chooseButtonText = l.fileInput.buttonTitle.choose();
  const fileInputId = id || `file-upload-${label}`;

  useEffect(() => {
    if (error) {
      fileInputContent.current.focus();
    }
  }, [error]);

  const handleFileChoose = useCallback(
    (filesArr) => {
      const selectedFile = filesArr[0];
      const name = selectedFile?.name;

      setIsDragged(false);
      if (accept) {
        const isWrongFileType = filesArr.some(
          (file) => !accept.includes(file.type)
        );

        if (isWrongFileType) {
          inputFile.current.value = "";
          setFileName(name);
          onFileRejected(filesArr, REASONS.INVALID_FILE_TYPE);
          return;
        }
      }

      if (allowMultiple) {
        fileChooseAction(filesArr);
        setFiles(filesArr.map((f) => URL.createObjectURL(f)));
        setFileName(
          filesArr.length > 1
            ? l.fileInput.fileName(filesArr.length)
            : filesArr[0].name
        );

        return;
      }

      if (filesArr.length > 1) {
        onFileRejected(filesArr, REASONS.MULTIPLE_FILES);
        setFileName(filesArr[0].name);
        return;
      }

      fileChooseAction([filesArr[0]]);
      setFiles([URL.createObjectURL(filesArr[0])]);
      setFileName(name);
    },
    [accept, allowMultiple, fileChooseAction, onFileRejected, l]
  );

  const handleOnDragOver = (e) => {
    if (draggable) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleOnDrop = (e) => {
    if (draggable && !isUploading) {
      e.preventDefault();
      handleFileChoose(Array.from(e.dataTransfer.files));
    }
  };

  const handleClick = (buttonTitle) => {
    if (buttonTitle === chooseButtonText) inputFile.current.click();
    if (buttonTitle === removeButtonText) {
      inputFile.current.value = "";
      setFileName("");
      setFiles([]);
      fileChooseAction(allowMultiple ? [] : null);
    }
    if (buttonTitle === cancelButtonText) {
      inputFile.current.value = "";
      setFileName("");
      setFiles([]);
      if (cancelAction) cancelAction();
    }
  };

  const renderButton = () => {
    const isFileUploading = () => {
      if (loaderType === "tracked") {
        return progress < 100;
      }
      return isUploading;
    };

    let buttonTitle = chooseButtonText;
    if (fileName && !isFileUploading()) buttonTitle = removeButtonText;
    if (fileName && isFileUploading()) buttonTitle = cancelButtonText;

    return (
      <StyledButton
        size={size}
        disabled={disabled && !isUploading}
        px={1}
        buttonType={fileName || error || warning ? "tertiary" : buttonType}
        onClick={() => handleClick(buttonTitle)}
        isSelected={!!fileName}
        destructive={!!error}
      >
        {buttonTitle}
      </StyledButton>
    );
  };

  const renderValidationMessage = () => (
    <>
      <ValidationBorder error={!!error} warning={!!warning} />
      <ValidationMessage error={!!error} warning={!!warning}>
        {error || warning}
      </ValidationMessage>
    </>
  );

  const renderFormattedFileName = () => (
    <FormattedText>
      <FirstSegment>{fileName.substr(0, fileName.length - 8)}</FirstSegment>
      <span>{fileName.substr(-8)}</span>
    </FormattedText>
  );

  const renderFileDropArea = () => (
    <FileDropArea
      onDragLeave={() => setIsDragged(false)}
      onDragOver={() => {
        if (draggable && !isDragged && !isUploading) setIsDragged(true);
      }}
      disabled={disabled}
      isSelected={!!fileName}
      draggable={draggable}
      isDragged={isDragged}
      error={!!error}
      warning={!!warning}
    >
      {files.length === 1 ? (
        <StyledLink
          target="_blank"
          href={files[0]}
          data-element="action"
          disabled={disabled}
          readOnly={readOnly}
          isUploading={isUploading}
        >
          {renderFormattedFileName()}
        </StyledLink>
      ) : (
        <Placeholder
          dragPlaceholder={dragPlaceholder}
          isSelected={!!fileName}
          isDragged={isDragged}
        >
          {(allowMultiple && fileName) || dragPlaceholder}
        </Placeholder>
      )}
    </FileDropArea>
  );

  const renderFileInput = () => (
    <FileInput
      accept={accept || "*"}
      multiple={allowMultiple}
      ref={inputFile}
      type="file"
      id={fileInputId}
      onChange={(e) => {
        if (e.target.files.length > 0)
          handleFileChoose(Array.from(e.target?.files));
      }}
    />
  );

  const renderLoader = () =>
    loaderType === "untracked" ? (
      <NeutralLoaderBar size="small" />
    ) : (
      <StyledProgressTracker size="small" progress={progress} error={!!error} />
    );

  return (
    <FileInputForm {...rest}>
      <Label disabled={disabled} htmlFor={fileInputId}>
        {label}
      </Label>
      {hintText && <HintText>{hintText}</HintText>}
      <FileInputContainer>
        {(error || (warning && !fileName)) && renderValidationMessage()}
        <FileInputContentWrapper
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          <FileInputContent
            ref={fileInputContent}
            tabIndex={-1}
            disabled={disabled && !isUploading}
            error={!!error}
            draggable={draggable}
            isDragged={isDragged}
            isSelected={!!fileName}
            isUploadingAndDisabled={isUploading && disabled && !!fileName}
            readOnly={readOnly && !!fileName}
            warning={!!warning}
          >
            {renderFileDropArea()}
            {renderFileInput()}
            {(!readOnly || !fileName) && renderButton()}
          </FileInputContent>
        </FileInputContentWrapper>
        {isUploading && !!fileName && renderLoader()}
      </FileInputContainer>
    </FileInputForm>
  );
};

FileInputComponent.propTypes = {
  /** Filtered styled system margin props. */
  ...marginPropTypes,
  /** Specify a callback triggered when user chooses the file(s), accepts the files array. */
  fileChooseAction: PropTypes.func.isRequired,
  /** Specify a callback triggered when files are rejected. Reasons available: "INVALID_FILE_TYPE" | "MULTIPLE_FILES" */
  onFileRejected: PropTypes.func,
  /** Defines the label text. */
  label: PropTypes.string,
  /** Defines the hint text. */
  hintText: PropTypes.string,
  /** Defines id for the file input. If not supplied file-upload-${label} will be used. */
  id: PropTypes.string,
  /** Specify button type. */
  buttonType: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "dashed",
    "darkBackground",
  ]),
  /** Specify if the input is disabled. */
  disabled: PropTypes.bool,
  /** Specify a callback triggered when user aborts uploading. */
  cancelAction: PropTypes.func,
  /** If 'true' the loader will appear. */
  isUploading: PropTypes.bool,
  /** Shows the error label. */
  error: PropTypes.string,
  /** Shows the warning label. Use only when input is empty. */
  warning: PropTypes.string,
  /** Allows to upload multiple files. */
  allowMultiple: PropTypes.bool,
  /** MIME types specifying the files to be allowed. Accepts all types if not specified. */
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Allows to drag and drop files. */
  draggable: PropTypes.bool,
  /** Secondary placeholder for draggable component. */
  dragPlaceholder: PropTypes.string,
  /** Assigns a size to the component: "small" | "medium" | "large". */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Specify type of upload tracking. */
  loaderType: PropTypes.oneOf(["untracked", "tracked"]),
  /** Defines the value of the progress tracker, renders only when loaderType is "tracked". */
  progress: PropTypes.number,
  /** If true, the component will be read-only. */
  readOnly: PropTypes.bool,
};

export default FileInputComponent;
