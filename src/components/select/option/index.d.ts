import * as React from "react";

export interface OptionProps {
  /** The option's visible text, displayed within <Textbox> of <Select>, and used for filtering */
  text: string;
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children?: React.ReactNode;
  /** The option's invisible internal value */
  value: string | Record<string, unknown>;
  /** MultiSelect only - custom Pill border color - provide any color from palette or any valid css color value. */
  borderColor?: string;
  /** MultiSelect only - fill Pill background with color */
  fill?: boolean;
  /**
   * @private
   * @ignore
   * OnClick callback */
  onClick?: (ev: React.MouseEvent<HTMLLIElement>) => void;
}

declare function Option(
  props: OptionProps & React.RefAttributes<HTMLLIElement>
): JSX.Element;

export default Option;
