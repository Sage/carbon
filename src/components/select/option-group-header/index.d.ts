import * as React from "react";

export interface OptionGroupHeaderProps {
  /** Heading text */
  label: string;
  /** Any valid Carbon icon name */
  icon?: string;
}

declare const OptionGroupHeader: React.ComponentType<OptionGroupHeaderProps>;

export default OptionGroupHeader;
