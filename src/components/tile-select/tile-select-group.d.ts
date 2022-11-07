import * as React from "react";
import { MarginProps } from "styled-system";
import { Expand } from "../../__internal__/utils/helpers/types";

export interface TileSelectGroupProps extends Expand<MarginProps> {
  /** The TileSelect components to be rendered in the group */
  children: React.ReactNode;
  /** The content for the TileSelectGroup Legend */
  legend?: string;
  /** Description to be rendered below the legend */
  description?: string;
  /** The currently selected value - only for single select mode. */
  value?: string;
  /** The name to apply to the input - only for single select mode. */
  name?: string;
  /** A callback triggered when one of tiles is selected - only for single select mode. */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** A callback triggered when one of tiles is blurred - only for single select mode. */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** When passed as true TileSelectGroup serves only visual purpose */
  /** It wraps TileSelects in fieldset element and renders the legend and description props content */
  /** onChange, onBlur, value, checked and name props are meant to be passed individually on each of the TileSelects */
  multiSelect?: boolean;
}

declare function TileSelectGroup(props: TileSelectGroupProps): JSX.Element;

export { TileSelectGroup };
