import * as React from 'react';
import { MarginSpacingProps } from "../../utils/helpers/options-helper";

export interface AccordionGroupProps extends MarginSpacingProps {
  children?: React.ReactNode;
}

declare const AccordionGroup: React.FunctionComponent<AccordionGroupProps>;
export default AccordionGroup;
