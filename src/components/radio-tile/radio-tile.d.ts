import * as React from 'react';

export interface RadioTileProps {
    /** title of the RadioTile */
    title?: string;
    /** adornment to be rendered next to the title */
    titleAdornment?: React.ReactNode;
    /** subtitle of the RadioTile */
    subtitle?: string;
    /** description of the RadioTile */
    description?: string;
    /** disables the RadioTile input */
    disabled?: boolean;
    /** the value that is represented by this RadioTile */
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
    /** Custom classname passed to the root element of RadioTile */
    className?: string;
}

declare const RadioTile: React.FunctionComponent<RadioTileProps>;

export { RadioTile };
