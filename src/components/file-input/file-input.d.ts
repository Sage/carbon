export interface InlineInputsProps {
  /** Specify a callback triggered when user chooses the file(s), accepts the files array */
  fileChooseAction: (files: File[]) => any;
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
  cancelAction?: () => any;
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
  /** Secondary placehodler for draggable component */
  dragPlaceholder?: string;
  /** Assigns a size to the component: "small" | "medium" | "large" */
  size?: "small" | "medium" | "large";
}

declare function InlineInputs(props: InlineInputsProps): JSX.Element;

export default InlineInputs;
