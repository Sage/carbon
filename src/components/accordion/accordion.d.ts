import * as React from "react";
import { SpaceProps } from "styled-system";

export interface AccordionProps extends SpaceProps {
  /** Toggles left and right borders */
  borders?: "default" | "full" | "none";
  /** Renders the accordion heading in the style of a tertiary button */
  buttonHeading?: boolean;
  /** Width of the buttonHeading when it's set, defaults to 150px */
  buttonWidth?: number;
  children?: React.ReactNode;
  /** Set the default state of expansion of the Accordion if component is meant to be used as uncontrolled */
  defaultExpanded?: boolean;
  /** Disable padding for the content */
  disableContentPadding?: boolean;
  /** Sets the expansion state of the Accordion if component is meant to be used as controlled */
  expanded?: boolean;
  /** An error message to be displayed in the tooltip */
  error?: string;
  /** Styled system spacing props provided to Accordion Title */
  headerSpacing?: SpaceProps;
  id?: string;
  /** Sets icon type - accepted values: 'chevron_down' (default), 'dropdown' */
  iconType?: "chevron_down" | "dropdown";
  /** Sets icon alignment - accepted values: 'left', 'right' (default) */
  iconAlign?: "left" | "right";
  /** Sets accordion title */
  title: React.ReactNode;
  /** An info message to be displayed in the tooltip */
  info?: string;
  /** Callback fired when expansion state changes */
  onChange?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean
  ) => void;
  /** When the Accordion is open the title can change to this */
  openTitle?: string;
  /** Sets background as white or transparent */
  scheme?: "white" | "transparent";
  /** Sets accordion size */
  size?: "large" | "small";
  /** Sets accordion sub title */
  subTitle?: string;
  /** A warning message to be displayed in the tooltip */
  warning?: string;
  /** Sets accordion width */
  width?: string;
}

declare function Accordion(
  props: AccordionProps & React.RefAttributes<HTMLDivElement>
): JSX.Element;

export default Accordion;
