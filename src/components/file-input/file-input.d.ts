import { MarginProps } from "styled-system";

export interface FileInputProps extends MarginProps {
  /** Specify a callback triggered when user chooses the file(s), accepts the files array. */
  fileChooseAction: (files: File[]) => void;
  /** Specify a callback triggered when files are rejected. Reasons available: INVALID_FILE_TYPE | MULTIPLE_FILES" */
  onFileRejected?: (
    files: File[],
    reason: "INVALID_FILE_TYPE" | "MULTIPLE_FILES"
  ) => string;
  /** Defines the label text for the heading. */
  label?: string;
  /** Defines the hint text. */
  hintText?: string;
  /** Defines id for the file input. If not supplied file-upload-${label} will be used. */
  id?: string;
  /** Specify button type. */
  buttonType?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "dashed"
    | "darkBackground";
  /** Specify if the input is disabled. */
  disabled?: boolean;
  /** Specify a callback triggered when user aborts uploading. */
  cancelAction?: () => void;
  /** If 'true' the loader will appear. */
  isUploading?: boolean;
  /** Shows the error label. */
  error?: string;
  /** Shows the warning label. Use only when input is empty. */
  warning?: string;
  /** Allows to upload multiple files. */
  allowMultiple?: boolean;
  /** MIME types specifying the files to be allowed. Accepts all types if not specified. */
  accept?: string | Array<string>;
  /** Allows to drag and drop files. */
  draggable?: boolean;
  /** Secondary placeholder for draggable component. */
  dragPlaceholder?: string;
  /** Assigns a size to the component: "small" | "medium" | "large". */
  size?: "small" | "medium" | "large";
  /** Specify type of upload tracking. */
  loaderType: "untracked" | "tracked";
  /** Defines the value of the progress tracker, renders only when loaderType is "tracked". */
  progress?: number;
  /** If true, the component will be read-only. */
  readonly?: boolean;
}

declare function FileInput(props: FileInputProps): JSX.Element;

export default FileInput;
