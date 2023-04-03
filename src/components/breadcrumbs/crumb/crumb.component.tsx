import { LinkProps } from "components/link/link.component";
import React from "react";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { StyledCrumb, Divider } from "./crumb.style";

export interface CrumbProps
  extends Omit<
      LinkProps,
      | "tooltipMessage"
      | "tooltipPosition"
      | "iconType"
      | "iconAlign"
      | "isSkipLink"
      | "isDarkBackground"
      | "ariaLabel"
      | "className"
      | "variant"
      | "target"
      | "rel"
      | "icon"
      | "disabled"
    >,
    TagProps {
  /** This sets the Crumb to current, does not render Link */
  isCurrent?: boolean;
  /** The href string for Crumb Link */
  href: string;
}

const Crumb = React.forwardRef<HTMLLinkElement, CrumbProps>(
  ({ href, isCurrent, children, ...rest }: CrumbProps, ref) => (
    <li>
      <StyledCrumb
        ref={ref}
        isCurrent={isCurrent}
        aria-current={isCurrent ? "page" : undefined}
        {...tagComponent("crumb", rest)}
        {...(!isCurrent && {
          href,
        })}
      >
        {children}
      </StyledCrumb>
      {!isCurrent && <Divider />}
    </li>
  )
);

Crumb.displayName = "Crumb";

export default Crumb;
