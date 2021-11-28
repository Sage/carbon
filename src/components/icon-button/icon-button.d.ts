import * as React from "react";
import { MarginProps } from "styled-system";
import { IconProps } from "../icon/icon";

export interface IconButtonProps extends MarginProps {
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children: React.ReactElement<IconProps>;
  /** Callback */
  onAction: React.MouseEventHandler<HTMLButtonElement>;
  /** Set the button to disabled */
  disabled?: boolean;
}

declare function IconButton(
  props: IconButtonProps & React.RefAttributes<HTMLButtonElement>
): JSX.Element;

export default IconButton;
