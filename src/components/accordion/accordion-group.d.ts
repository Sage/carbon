import * as React from "react";
import { MarginProps } from "styled-system";
import { AccordionProps } from "./accordion";

type AccordionElement = React.ReactElement<AccordionProps>;

export interface AccordionGroupProps extends MarginProps {
  children?: AccordionElement | AccordionElement[];
}

declare function AccordionGroup(props: AccordionGroupProps): JSX.Element;

export default AccordionGroup;
