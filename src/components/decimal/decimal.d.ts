import * as React from 'react';
import { InputProps } from '../input-definition';
import { AlignBinaryType } from '../../utils/helpers/options-helper/option-helper';

export interface DecimalProps extends InputProps {
    value?: number;

    /** Sets the alignment of the text within the decimal component, defaults to "right" */
    align?: AlignBinaryType;

    /** Sets the precision of the decimal */
    precision?: number;

    /** Classes to apply to the component.  */
    className?: string;

    /** Callback function called in response to the keydown event */
    onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>, props: DecimalProps) => void;

    onBlur?: () => void;
}

/**
 * A decimal widget.
 */
declare const Decimal: React.Component<DecimalProps, {}>;
export default Decimal;
