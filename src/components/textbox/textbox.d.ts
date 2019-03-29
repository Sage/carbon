import * as React from 'react';
import { InputProps } from '../input-definition';

export interface TextboxProps extends InputProps {
    value?: string;
}

/**
 * A textbox widget.
 */
declare const Textbox:
    React.ComponentType<TextboxProps & React.HTMLProps<HTMLInputElement> & React.HTMLProps<HTMLLabelElement>>;
export default Textbox;
