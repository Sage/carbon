import { ChangeEvent } from 'react';
import { AlignBinaryType } from '../utils/helpers/options-helper/option-helper';
import { Validator } from '../utils/validations/validation-interface';

export interface InputProps {
    value?: any;

    /** Timeout length before onChangeDeferred is triggered. */
    deferTimeout?: number;

    /** Displays additional information below the input to provide help to the user. */
    fieldHelp?: string;

    /** Displays fieldHelp inline with the checkbox/radio button. */
    fieldHelpInline?: boolean;

    /** An array of info messages to apply to the input. */
    info?: Validator[];

    /** A number representing the percentage/ratio of width with the label. Works best with inline labels. */
    inputWidth?: number;

    /** Outputs a label for the input. */
    label?: string;

    /** Align the label either 'left' or 'right'. Only works with inline labels. */
    labelAlign?: AlignBinaryType;

    /** Output an info icon next to the label to display additional help to the user. */
    labelHelp?: string;

    /** Displays the label inline with the input. */
    labelInline?: boolean;

    /** A number representing the percentage/ratio of width with the input. Works best with inline labels. */
    labelWidth?: number;

    /** A callback which will trigger after the user has stopped typing for the duration of deferTimeout. */
    onChangeDeferred?: (ev: ChangeEvent<HTMLElement>) => void;

    /** An array of validations to apply to the input. */
    validations?: Validator[];

    /** An array of warnings to apply to the input. */
    warnings?: Validator[];
}
