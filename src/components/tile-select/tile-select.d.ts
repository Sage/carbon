import * as React from "react";
import { MarginProps } from "styled-system";
import { Expand } from "../../__internal__/utils/helpers/types";

export interface TileSelectProps extends Expand<MarginProps> {
  /** title of the TileSelect */
  title?: string;
  /** adornment to be rendered next to the title */
  titleAdornment?: React.ReactNode;
  /** subtitle of the TileSelect */
  subtitle?: string;
  /** description of the TileSelect */
  description?: React.ReactNode;
  /** disables the TileSelect input */
  disabled?: boolean;
  /** the value that is represented by this TileSelect */
  value?: string;
  /** input id */
  id?: string;
  /** input name */
  name?: string;
  /** Callback triggered when user selects or deselects this tile */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback triggered when the user blurs this tile */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** determines if this tile is selected or unselected */
  checked?: boolean;
  /** Custom class name passed to the root element of TileSelect */
  className?: string;
  /** Type of the TileSelect input */
  type?: "radio" | "checkbox";
  /** Render prop that allows overriding the default action button. */
  customActionButton?: (onClick: () => void) => JSX.Element;
  /** An additional help info icon rendered next to the action button */
  actionButtonAdornment?: React.ReactNode;
  /** footer of the TileSelect */
  footer?: React.ReactNode;
  /** Component to render in the top left corner of TileSelect */
  prefixAdornment?: React.ReactNode;
  /** Component to render additional information row between title and description */
  additionalInformation?: React.ReactNode;
  /** Components to render in the TileSelect Accordion */
  accordionContent?: React.ReactNode;
  /** Callback to toggle expanded state of TileSelect Accordion */
  accordionControl?: (controlId: string, contentId: string) => JSX.Element;
  /** Flag to control the open state of TileSelect Accordion */
  accordionExpanded?: boolean;
}

declare function TileSelect(props: TileSelectProps): JSX.Element;

export { TileSelect };
