import * as React from "react";
import { SpaceProps } from "styled-system";

export interface AccordionProps extends SpaceProps {
  children: React.ReactNode;
  expanded?: boolean;
  contentId?: string;
  controlId?: string;
}

declare function Accordion(props: AccordionProps): JSX.Element;

export default Accordion;
