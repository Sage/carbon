import * as React from "react";

export interface OptionProps {
  /** The option's visible text, displayed within <Textbox> of <Select>, and used for filtering */
  text: string;
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children?: React.ComponentType;
  /** The option's invisible internal value */
  value: string | object;
}

declare function Option(props: OptionProps & React.RefAttributes<HTMLLIElement>): JSX.Element;

export default Option;
