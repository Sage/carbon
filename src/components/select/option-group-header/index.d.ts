import * as React from "react";

export interface OptionGroupHeaderProps {
  /** Heading text */
  label: string;
  /** Any valid Carbon icon name */
  icon?: string;
}

declare function OptionGroupHeader(props: OptionGroupHeaderProps): JSX.Element;

export default OptionGroupHeader;
