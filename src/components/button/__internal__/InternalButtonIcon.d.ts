import { ButtonTypes } from "..";

export interface InternalButtonIconProps {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  buttonType?: ButtonTypes;
  /** Apply disabled state to the button */
  disabled?: boolean;
  /** HTML button type property */
  type?: string;
}

declare function InternalButtonIcon(props: InternalButtonIconProps): JSX.Element;

export default InternalButtonIcon;
