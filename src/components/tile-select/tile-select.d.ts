import * as React from 'react';

export interface TileSelectProps {
    /** title of the TileSelect */
    title?: string;
    /** adornment to be rendered next to the title */
    titleAdornment?: React.ReactNode;
    /** subtitle of the TileSelect */
    subtitle?: string;
    /** description of the TileSelect */
    description?: string;
    /** disables the TileSelect input */
    disabled?: boolean;
    /** the value that is represented by this TileSelect */
    value?: string;
    /** input id */
    id?: string;
    /** input name */
    name?: string;
    /** Callback triggered when user selects or deselects this tile */
    onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
    /** Callback triggered when the user blurrs this tile */
    onBlur?: (ev: React.SyntheticEvent<HTMLElement>) => void;
    /** determines if this tile is selected or unselected */
    checked?: boolean;
    /** Custom classname passed to the root element of TileSelect */
    className?: string;
     /** Type of the TileSelect input */
    type: 'radio' | 'checkbox';
}

declare const TileSelect: React.FunctionComponent<TileSelectProps>;

export { TileSelect };
