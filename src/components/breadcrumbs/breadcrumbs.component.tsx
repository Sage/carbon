import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import StyledBreadcrumbs from "./breadcrumbs.style";
import useLocale from "../../hooks/__internal__/useLocale";
import BreadcrumbsContext from "./__internal__/breadcrumbs.context";

export interface BreadcrumbsProps extends TagProps, SpaceProps {
  /** Child crumbs to display */
  children: React.ReactNode;
  /** Sets the colour styling when component is rendered on a dark background */
  isDarkBackground?: boolean;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, isDarkBackground = false, ...rest }: BreadcrumbsProps, ref) => {
    const l = useLocale();
    return (
      <BreadcrumbsContext.Provider value={{ isDarkBackground }}>
        <StyledBreadcrumbs
          ref={ref}
          role="navigation"
          aria-label={l.breadcrumbs.ariaLabel()}
          {...rest}
          {...tagComponent("breadcrumbs", rest)}
        >
          <ol>{children}</ol>
        </StyledBreadcrumbs>
      </BreadcrumbsContext.Provider>
    );
  },
);

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
