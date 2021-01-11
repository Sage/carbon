import * as React from 'react';
export interface InputIconToggleProps {
    error?: boolean | string;
    info?: boolean | string;
    warning?: boolean | string;
    disabled?: boolean;
    readOnly?: boolean;
    size?: "small" | "medium" | "large"; // a callback to retrieve the input reference
    onClick?: () => void;
    onMouseDown?: () => void;
    inputIcon?: string;
    align?: "left" | "right";
    useValidationIcon?: boolean;
    iconTabIndex?: number;
}
declare const InputIconToggle: React.ComponentType<InputIconToggleProps>;
export default InputIconToggle;
