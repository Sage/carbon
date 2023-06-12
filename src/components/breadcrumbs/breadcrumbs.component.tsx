import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import StyledBreadcrumbs from "./breadcrumbs.style";
import useLocale from "../../hooks/__internal__/useLocale";

export interface BreadcrumbsProps extends TagProps, SpaceProps {
  /** Child crumbs to display */
  children: React.ReactNode;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, ...rest }: BreadcrumbsProps, ref) => {
    const l = useLocale();
    return (
      <StyledBreadcrumbs
        ref={ref}
        role="navigation"
        {...tagComponent("breadcrumbs", rest)}
        aria-label={l.breadcrumbs.ariaLabel()}
        {...rest}
      >
        <ol>{children}</ol>
      </StyledBreadcrumbs>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
