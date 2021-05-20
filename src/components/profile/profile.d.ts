import * as React from "react";

export interface ProfileProps {
  /** [Legacy] A custom class name for the component */
  className?: string;
  /** Custom source URL */
  src?: string;
  /** Define the name to display. */
  name: string;
  /** Define the email to use (will check Gravatar for image). */
  email: string;
  /** Define initials to display if there is no Gravatar image. */
  initials?: string;
  /** [Legacy] Enable a larger theme for the name. */
  large?: boolean;
  /** Allow to setup size for the component */
  size?: "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";
}

declare function Profile(props: ProfileProps): JSX.Element;

export default Profile;
