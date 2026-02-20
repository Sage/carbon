import React from "react";
import { LinkProps } from "../../link";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { StyledCrumb, Divider } from "./crumb.style";
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

    return (
      <li>
        <StyledCrumb
          ref={ref}
          $isCurrent={isCurrent}
          aria-current={isCurrent ? "page" : undefined}
          inverse={inverse}
          {...rest}
          {...tagComponent("crumb", rest)}
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
            $inverse={inverse}
          />
        )}
      </li>
    );
  },
);

Crumb.displayName = "Crumb";

export default Crumb;
