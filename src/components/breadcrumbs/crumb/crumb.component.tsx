import React, { useContext } from "react";
import { LinkProps } from "../../link";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { StyledCrumb, Divider } from "./crumb.style";
import BreadcrumbsContext from "../__internal__/breadcrumbs.context";

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

const Crumb = React.forwardRef<HTMLAnchorElement, CrumbProps>(
  ({ href, isCurrent, children, onClick, ...rest }: CrumbProps, ref) => {
    const { isDarkBackground } = useContext(BreadcrumbsContext);

    return (
      <li>
        <StyledCrumb
          ref={ref}
          isCurrent={isCurrent}
          aria-current={isCurrent ? "page" : undefined}
          isDarkBackground={isDarkBackground}
          {...tagComponent("crumb", rest)}
          {...rest}
          {...(!isCurrent && {
            href,
            onClick,
          })}
        >
          {children}
        </StyledCrumb>
        {!isCurrent && (
          <Divider
            data-role="crumb-divider"
            aria-hidden="true"
            isDarkBackground={isDarkBackground}
          />
        )}
      </li>
    );
  },
);

Crumb.displayName = "Crumb";

export default Crumb;
