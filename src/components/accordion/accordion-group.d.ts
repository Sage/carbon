import * as React from "react";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";
import { AccordionProps } from "./accordion";

type AccordionElement = React.ReactElement<AccordionProps>;

export interface AccordionGroupProps extends MarginSpacingProps {
  children?: AccordionElement | AccordionElement[];
}

declare function AccordionGroup(props: AccordionGroupProps): JSX.Element;

export default AccordionGroup;
