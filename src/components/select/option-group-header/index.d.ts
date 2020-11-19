import * as React from "react";

export interface OptionGroupHeader {
  /** Heading text */
  label: string;
  /** Any valid Carbon icon name */
  icon?: string;
}

declare const OptionGroupHeader: React.ComponentType<OptionProps>;

export default OptionGroupHeader;
