import Button from "components/button/button";
import IconButton from "components/icon-button";
import { SpaceProps } from "styled-system";

type ButtonBarChild =
  | typeof Button
  | typeof IconButton
  | boolean
  | null
  | undefined;

export interface ButtonBarProps extends SpaceProps {
  children: ButtonBarChild | ButtonBarChild[];
  /** Apply fullWidth style to the button bar */
  fullWidth?: boolean;
  /** Defines an Icon position for buttons: "before" | "after" */
  iconPosition?: "before" | "after";
  /** Assigns a size to the buttons: "small" | "medium" | "large" */
  size?: "small" | "medium" | "large";
}

declare function ButtonBar(props: ButtonBarProps): JSX.Element;

export default ButtonBar;
