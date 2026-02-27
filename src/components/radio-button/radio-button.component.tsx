import React from "react";
import {
  RadioButtonProps as NextProps,
  RadioButton as NextRadioButton,
} from "./___internal___/__next__/radio-button.component";

export interface RadioButtonProps extends NextProps {
  /**
   * Overrides the default tooltip position
   * @deprecated Tooltips are no longer supported on this component.
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * Aria label for rendered help component
   * @deprecated Help tooltips are no longer supported on this component.
   */
  helpAriaLabel?: string;
  /**
   * Indicate that an error has occurred.
   * @deprecated The `error` state is deprecated and will be removed in a future release. Please pass any validation message to the `RadioButtonGroup` component instead.
   */
  error?: string | boolean;
  /**
   * [Legacy] Indicate additional information.
   * @deprecated Information validation is no longer supported on this component.
   */
  info?: string | boolean;
  /**
   * Indicate that warning has occurred.
   * @deprecated The `warning` state is deprecated and will be removed in a future release.
   */
  warning?: string | boolean;
  /**
   * If true the label switches position with the input
   * @deprecated Reversed layout is no longer supported on this component.
   */
  reverse?: boolean;
  /**
   * Id of the validation icon
   * @deprecated Validation icons with tooltips are no longer supported on this component.
   */
  validationIconId?: string;
  /**
   * Help content to be displayed under an input
   * @deprecated The `fieldHelp` prop is deprecated and will be removed in a future release. Please use the `inputHint` prop instead.
   */
  fieldHelp?: React.ReactNode;
  /**
   * Sets percentage-based input width
   * @deprecated Custom input widths are no longer supported on this component.
   */
  inputWidth?: React.ReactNode;
  /**
   * The content for the help tooltip, to appear next to the Label
   * @deprecated The `labelHelp` prop is deprecated and will be removed in a future release. Please use the `inputHint` prop instead.
   */
  labelHelp?: React.ReactNode;
  /**
   * Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8)
   * @deprecated Custom spacing for labels is no longer supported on this component.
   */
  labelSpacing?: 1 | 2;
  /**
   * Label width
   * @deprecated Custom label widths are no longer supported on this component.
   */
  labelWidth?: number;
  /**
   * When true, displays validation icon on label
   * @deprecated Validation icons with tooltips are no longer supported on this component.
   */
  validationOnLabel?: boolean;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   * @deprecated The `fieldHelpInline` prop is no longer supported on this component.
   */
  fieldHelpInline?: boolean;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ fieldHelp, labelHelp, inputHint, ...props }: RadioButtonProps, ref) => {
    return (
      <NextRadioButton
        inputHint={inputHint || labelHelp || fieldHelp}
        ref={ref}
        {...props}
      />
    );
  },
);

RadioButton.displayName = "RadioButton";

export default React.memo(RadioButton);
