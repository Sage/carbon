import { MarginProps } from "styled-system";

export interface FileInputProps extends MarginProps {
  /** Specify a callback triggered when user chooses the file(s), accepts the files array */
  fileChooseAction: (files: File[]) => void;
  /** Defines the label text for the heading. */
  label?: string;
  /** Specify button type */
  buttonType?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "dashed"
    | "darkBackground";
  /** Specify if the input is disabled */
  disabled?: boolean;
  /** Specify a callback triggered when user aborts uploading */
  cancelAction?: () => void;
  /** if 'true' the loading bar will appear */
  isUploading?: boolean;
  /** Shows the error label */
  error?: string;
  /** Allows to upload multiple files */
  allowMultiple?: boolean;
  /** File type specifiers describing file types to allow. Accepts all types if not specified */
  accept?: string;
  /** Shows 'Drop the file here." statement */
  draggable?: boolean;
  /** Secondary placeholder for draggable component */
  dragPlaceholder?: string;
  /** Assigns a size to the component: "small" | "medium" | "large" */
  size?: "small" | "medium" | "large";
}

declare function FileInput(props: FileInputProps): JSX.Element;

export default FileInput;
