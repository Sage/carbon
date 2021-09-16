export interface ValidationMessagePropTypes {
  /** Indicate that error has occurred
  Pass string to display hint with error */
  error?: boolean | string;
  /** Indicate that warning has occurred
  Pass string to display hint with warning */
  warning?: boolean | string;
}

declare function ValidationMessage(
  props: ValidationMessagePropTypes
): JSX.Element;

export default ValidationMessage;
