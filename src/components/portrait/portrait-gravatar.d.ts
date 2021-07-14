import * as React from "react";
import { PortraitSizes, PortraitShapes } from "./portrait";

export interface PortraitGravatarProps {
  /** The theme to use. */
  theme?: object;
  /** The user's email address for the Gravatar. */
  gravatarEmail: string;
  /** The size of the Gravatar. */
  size: PortraitSizes;
  /** The shape of the Gravatar. */
  shape?: PortraitShapes;
  /** The `alt` HTML string. */
  alt?: string;
  /** A callback to execute if the Gravatar image fails to load. */
  errorCallback?: () => void;
}

declare function PortraitGravatar(props: PortraitGravatarProps): JSX.Element;

export default PortraitGravatar;
