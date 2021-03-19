import * as React from "react";

export interface OptionProps {
  /** The option's visible text, displayed within <Textbox> of <Select>, and used for filtering */
  text: string;
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children?: React.ComponentType;
  /** The option's invisible internal value */
  value: string | object;
}

declare const Option: React.FunctionComponent<OptionProps>;

export default Option;
