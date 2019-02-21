import * as React from 'react';
import { InputProps } from '../input-definition';

export interface TextboxProps extends InputProps {
    value?: string;
}

/**
 * A textbox widget.
 */
declare const Textbox: React.ComponentType<TextboxProps>;
export default Textbox;
