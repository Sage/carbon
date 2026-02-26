import React from "react";
import Link, { LinkProps } from "../../link";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { StyledCrumbCurrent, Divider } from "./crumb.style";
import { useBreadcrumbsContext } from "../__internal__/breadcrumbs.context";

export interface CrumbProps
  extends Pick<
      LinkProps,
      "href" | "onClick" | "onKeyDown" | "onMouseDown" | "children"
    >,
    TagProps {
  /** This sets the Crumb to current, does not render Link */
  isCurrent?: boolean;
  /** @deprecated Intended for internal use only */
  hasFocus?: boolean;
  /**
   * Specifies when the link underline should be displayed.
   * @deprecated The 'underline' prop in Crumb is deprecated and will soon be removed.
   */
  underline?: "always" | "hover" | "never";
  /**
   * Sets the correct link size
   * @deprecated The 'linkSize' prop in Crumb is deprecated and will soon be removed.
   */
  linkSize?: "medium" | "large";
  /**
   * Sets the link style to bold
   * @deprecated The 'bold' prop in Crumb is deprecated and will soon be removed.
   */
  bold?: boolean;
}

export const Crumb = React.forwardRef<HTMLAnchorElement, CrumbProps>(
  ({ href, isCurrent, children, onClick, ...rest }: CrumbProps, ref) => {
    const { inverse } = useBreadcrumbsContext();

    if (isCurrent) {
      return (
        <li>
          <StyledCrumbCurrent
            ref={ref}
            aria-current="page"
            inverse={inverse}
            {...rest}
            {...tagComponent("crumb", rest)}
          >
            {children}
          </StyledCrumbCurrent>
        </li>
      );
    }

    return (
      <li>
        <Link
          ref={ref}
          inverse={inverse}
          href={href}
          onClick={onClick}
          {...rest}
          {...tagComponent("crumb", rest)}
        >
          {children}
        </Link>
        <Divider
          data-role="crumb-divider"
          aria-hidden="true"
          $inverse={inverse}
        />
      </li>
    );
  },
);

Crumb.displayName = "Crumb";

export default Crumb;
