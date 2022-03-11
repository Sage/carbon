import { PortraitSizes, PortraitShapes } from "./portrait";

export interface PortraitInitialsProps {
  /** The user's initials to render. */
  initials: string;
  /** The size of the initials image. */
  size: PortraitSizes;
  /** Use a dark background. */
  darkBackground?: boolean;
  /** The shape of the Portrait. */
  shape?: PortraitShapes;
  /** The `alt` HTML string. */
  alt?: string;
}

declare function PortraitInitials(props: PortraitInitialsProps): JSX.Element;

export default PortraitInitials;
