import * as React from 'react';
import { InputProps } from '../input-definition';

export interface NumberProps extends InputProps {
    value?: number;

    /** Classes to apply to the component.  */
    className?: string;

    /** Callback function called in response to the keydown event */
    onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>, props: NumberProps) => void;

}

/**
 * A number widget. It only allows entering of a whole number with an optional minus sign.
 *
 * Captures a whole number (not a decimal or currency value).
 *
 * Where it’s clear a field only accepts numerals, you could disable entry of other characters. But, remember than for
 * some regions, phone numbers and postcodes might contain dashes, and remember to cater for a minus sign if necessary.
 */
declare const Number: React.ComponentType<NumberProps>;
export default Number;
