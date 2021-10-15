import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import {
  ErrorBorder,
  ErrorMessage,
  FileDropArea,
  FileInput,
  FileInputForm,
  FileInputLabel,
  FileInputTitle,
  StyledFileInput,
} from "./file-input.style";
import Button from "../button";
import LoaderBar from "../loader-bar";
import Link from "../link";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const FileInputComponent = ({
  accept,
  allowMultiple = false,
  buttonType = "primary",
  cancelAction,
  disabled = false,
  draggable = false,
  dragPlaceholder = "",
  error = "",
  fileChooseAction,
  isUploading = false,
  label = "File input",
  size = "medium",
  ...rest
}) => {
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragged, setIsDragged] = useState(false);
  const [err, setErr] = useState(error);
  const inputFile = useRef(null);

  useEffect(() => {
    setErr(error);
  }, [error]);

  const handleFileChoose = useCallback(
    (filesArr) => {
      setIsDragged(false);
      if (accept) {
        let isWrongFileType = false;
        filesArr.forEach((file) => {
          if (!accept.includes(file.type)) isWrongFileType = true;
        });
        if (isWrongFileType) {
          inputFile.current.value = "";
          setFileName("");
          setErr("Invalid file type!");
          return;
        }
      }

      if (allowMultiple) {
        fileChooseAction(filesArr);
        setFiles(filesArr.map((f) => URL.createObjectURL(f)));
        if (filesArr.length > 1) {
          setFileName(`${filesArr.length} files selected.`);
          return;
        }
      } else {
        fileChooseAction([filesArr[0]]);
        setFiles([URL.createObjectURL(filesArr[0])]);
        if (filesArr.length > 1) setErr("Only one file is allowed.");
      }

      const selectedFile = filesArr[0];
      const name = selectedFile?.name;
      const shortenedFileName =
        name.length < 21 ? name : `${name.substr(0, 10)}...${name.substr(-8)}`;
      setFileName(shortenedFileName);
    },
    [accept, allowMultiple, fileChooseAction]
  );

  const handleOnDragOver = (e) => {
    if (draggable) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleOnDrop = (e) => {
    if (draggable) {
      setErr("");
      e.preventDefault();
      handleFileChoose(Array.from(e.dataTransfer.files));
    }
  };

  const renderButton = () => {
    let buttonTitle = "Choose";
    if (fileName && !isUploading) buttonTitle = "Remove";
    if (fileName && isUploading) buttonTitle = "Cancel";

    return (
      <Button
        size={size}
        disabled={disabled}
        px={1}
        buttonType={fileName ? "tertiary" : buttonType}
        onClick={() => {
          if (buttonTitle === "Choose") inputFile.current.click();
          if (buttonTitle === "Remove") {
            inputFile.current.value = "";
            setFileName("");
            setFiles([]);
            setErr("");
          }
          if (buttonTitle === "Cancel") {
            inputFile.current.value = "";
            setFileName("");
            setFiles([]);
            if (cancelAction) cancelAction();
          }
        }}
      >
        {buttonTitle}
      </Button>
    );
  };

  const renderError = () => (
    <>
      <ErrorBorder />
      <ErrorMessage>{err}</ErrorMessage>
    </>
  );

  const renderFileDropArea = () => (
    <FileDropArea
      draggable={draggable}
      isSelected={!!fileName}
      disabled={disabled}
      onDragLeave={() => setIsDragged(false)}
      onDragOver={() => {
        if (draggable && !isDragged) setIsDragged(true);
      }}
      isDragged={isDragged}
      error={!!err}
    >
      {files.length === 1 ? (
        <Link target="_blank" href={files[0]} data-element="action">
          {fileName}
        </Link>
      ) : (
        <>{fileName || (draggable && dragPlaceholder)}</>
      )}
    </FileDropArea>
  );

  const renderFileInput = () => (
    <FileInput
      accept={accept || "*"}
      multiple={allowMultiple}
      ref={inputFile}
      type="file"
      id="file-upload"
      onChange={(e) => handleFileChoose(Array.from(e.target?.files))}
    />
  );

  return (
    <FileInputForm {...rest}>
      <FileInputTitle>{label}</FileInputTitle>
      <StyledFileInput>
        {err && renderError()}
        <FileInputLabel
          error={!!err}
          disabled={disabled}
          htmlFor="file-upload"
          onDrop={(e) => handleOnDrop(e)}
          onDragOver={(e) => handleOnDragOver(e)}
          draggable={draggable}
          isSelected={!!fileName}
        >
          {renderFileDropArea()}
          {renderButton()}
          {renderFileInput()}
        </FileInputLabel>
        {isUploading && !disabled && <LoaderBar size="small" />}
      </StyledFileInput>
    </FileInputForm>
  );
};

FileInputComponent.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Specify a callback triggered when user chooses the file(s), accepts the files array */
  fileChooseAction: PropTypes.func.isRequired,
  /** Defines the label text. */
  label: PropTypes.string,
  /** Specify button type */
  buttonType: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "dashed",
    "darkBackground",
  ]),
  /** Specify if the input is disabled */
  disabled: PropTypes.bool,
  /** Specify a callback triggered when user aborts uploading */
  cancelAction: PropTypes.func,
  /** if 'true' the loading bar will appear */
  isUploading: PropTypes.bool,
  /** Shows the error label */
  error: PropTypes.string,
  /** Allows to upload multiple files */
  allowMultiple: PropTypes.bool,
  /** File type specifiers describing file types to allow. Accepts all types if not specified */
  accept: PropTypes.string,
  /** Allows to drag and drop files */
  draggable: PropTypes.bool,
  /** Secondary placehodler for draggable component */
  dragPlaceholder: PropTypes.string,
  /** Assigns a size to the component: "small" | "medium" | "large" */
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default FileInputComponent;
