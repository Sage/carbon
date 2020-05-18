import * as React from 'react';

export interface RadioTileGroupProps {
  /** The RadioTile components to be rendered in the group */
  children: React.ReactNode;
  /** The content for the RadioGroup Legend */
  legend?: string;
  /** Description to be rendered below the legend */
  description?: string;
  /** The currently selected value - only for single select mode. */
  value?: string;
  /** The name to apply to the input - only for single select mode. */
  name?: string;
  /** A callback triggered when one of tiles is selected - only for single select mode. */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** A callback triggered when one of tiles is blurred - only for single select mode. */
  onBlur?: (ev: React.SyntheticEvent<HTMLElement>) => void;
  /** When passed as true RadioTileGroup serves only visual purpose */
  /** It wraps RadioTiles in fieldset element and renders the legend and description props content */
  /** onChange, onBlur, value, checked and name props are meant to be passed individually on each of the RadioTiles */
  multiSelect?: boolean;
}

declare const RadioTileGroup: React.FunctionComponent<RadioTileGroupProps>;

export { RadioTileGroup };
