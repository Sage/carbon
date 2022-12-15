import React from "react";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import StyledCrumb from "./crumb.style";

export interface CrumbProps extends TagProps {
  /** The href string for Crumb Link */
  href: string;
  /** The to string for Crumb Link */
  to?: string;
  /** This sets the Crumb to current, does not render Link */
  isCurrent?: boolean;
  /** The onClick callback for the Crumb Link */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
    id: string,
    to?: string
  ) => null;
  /** The id to be passed as an argument in the onClick callback */
  crumbId?: string;
  /** The text to render for the Crumb Link */
  text: string;
}

export const Crumb = ({
  text,
  href,
  to,
  isCurrent,
  onClick,
  crumbId,
  ...rest
}: CrumbProps) => (
  <StyledCrumb
    isCurrent={isCurrent}
    {...tagComponent("crumb", rest)}
    {...(!isCurrent && {
      href,
      onClick: (ev) => onClick?.(ev, crumbId || text, to),
    })}
  >
    {text}
  </StyledCrumb>
);

Crumb.displayName = "Crumb";

export default Crumb;
