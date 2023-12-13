import React from "react";
import { LinkProps } from "../../link";
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
}

const Crumb = React.forwardRef<HTMLLinkElement, CrumbProps>(
  ({ href, isCurrent, children, onClick, ...rest }: CrumbProps, ref) => (
    <li>
      <StyledCrumb
        ref={ref}
        isCurrent={isCurrent}
        aria-current={isCurrent ? "page" : undefined}
        {...tagComponent("crumb", rest)}
        {...rest}
        {...(!isCurrent && {
          href,
          onClick,
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
