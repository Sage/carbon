import * as React from 'react';
import { InputProps } from '../input-definition';

export interface TextProps extends InputProps {
    value?: string;
}

/**
 * A textbox widget.
 */
declare const Textbox: React.Component<TextProps, {}>;
export default Textbox;
