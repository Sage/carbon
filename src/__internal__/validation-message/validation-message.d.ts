export interface ValidationMessageProptypes {
  /** Indicate that error has occurred
  Pass string to display hint with error */
  error?: boolean | string;
  /** Indicate that warning has occurred
  Pass string to display hint with warning */
  warning?: boolean | string;
  /** Indicate additional information
  Pass string to display hint with info */
  info?: boolean | string;
}

declare function ValidationMessage(
  props: ValidationMessageProptypes
): JSX.Element;

export default ValidationMessage;
