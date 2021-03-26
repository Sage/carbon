import * as React from "react";
import { AccordionProps } from "./accordion";

type AccordionElement = React.ReactElement<AccordionProps>;
export interface AccordionGroupProps {
  children?: AccordionElement | AccordionElement[];
}

declare function AccordionGroup(props: AccordionGroupProps): JSX.Element;

export default AccordionGroup;
