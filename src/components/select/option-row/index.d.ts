import * as React from "react";

export interface OptionRowProps {
  /** The option's visible text, displayed within <Textbox> of <Select> */
  text: string;
  /** Row content, should consist of multiple td elements */
  children: React.ReactNode;
  /** The option's invisible internal value */
  value: string | object;
}

declare const OptionRow: React.ComponentType<OptionRowProps>;

export default OptionRow;
