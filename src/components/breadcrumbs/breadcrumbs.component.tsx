import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import StyledBreadcrumbs from "./breadcrumbs.style";
import useLocale from "../../hooks/__internal__/useLocale";
import { BreadcrumbsProvider } from "./__internal__/breadcrumbs.context";
import Logger from "../../__internal__/utils/logger";

let deprecatedIsDarkBackgroundWarn = false;

export interface BreadcrumbsProps extends TagProps, SpaceProps {
  /** Child crumbs to display */
  children: React.ReactNode;
  /**
   * Sets the colour styling when component is rendered on a dark background
   * @deprecated The 'isDarkBackground' prop in Breadcrumbs is deprecated and will soon be removed. Please use the 'inverse' prop instead.
   */
  isDarkBackground?: boolean;
  /** Sets the colour styling when component is to be rendered with inverse styles */
  inverse?: boolean;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    { children, isDarkBackground = false, inverse, ...rest }: BreadcrumbsProps,
    ref,
  ) => {
    const locale = useLocale();

    if (isDarkBackground && !deprecatedIsDarkBackgroundWarn) {
      Logger.deprecate(
        "The 'isDarkBackground' prop in Breadcrumbs is deprecated and will soon be removed. Please use the 'inverse' prop instead.",
      );
      deprecatedIsDarkBackgroundWarn = true;
    }

    return (
      <BreadcrumbsProvider value={{ inverse: inverse ?? isDarkBackground }}>
        <StyledBreadcrumbs
          ref={ref}
          role="navigation"
          aria-label={locale.breadcrumbs.ariaLabel()}
          {...rest}
          {...tagComponent("breadcrumbs", rest)}
        >
          <ol>{children}</ol>
        </StyledBreadcrumbs>
      </BreadcrumbsProvider>
    );
  },
);

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
