interface InputAccessibilityProperties {
  labelId?: string;
  tooltipId?: string;
  fieldHelpId?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
}

export default function useInputAccessibility(
  /** Input id -  */
  id: string,
  /** Error validation message */
  error?: string,
  /** Warning validation message */
  warning?: string,
  /** Info validation message */
  info?: string,
  /** Label */
  label?: string,
  /** labelHelp message */
  labelHelp?: string,
  /** fieldHelp message */
  fieldHelp?: string
): void;
