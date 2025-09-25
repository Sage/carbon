import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import StyledBreadcrumbs from "./breadcrumbs.style";
import useLocale from "../../hooks/__internal__/useLocale";
import { BreadcrumbsProvider } from "./__internal__/breadcrumbs.context";
import Logger from "../../__internal__/utils/logger";

export interface BreadcrumbsProps extends TagProps, SpaceProps {
  /** Child crumbs to display */
  children: React.ReactNode;
  /** @deprecated Sets the colour styling when component is rendered on a dark background */
  isDarkBackground?: boolean;
}

let deprecateDarkBackgroundWarningTriggered = false;

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, isDarkBackground = false, ...rest }: BreadcrumbsProps, ref) => {
    const l = useLocale();

    if (!deprecateDarkBackgroundWarningTriggered && !!isDarkBackground) {
      Logger.deprecate(
        "The `isDarkBackground` prop in the Breadcrumbs component is deprecated and will soon be removed. Future versions of the component will use `inverse` instead.",
      );
      deprecateDarkBackgroundWarningTriggered = true;
    }

    return (
      <BreadcrumbsProvider value={{ isDarkBackground }}>
        <StyledBreadcrumbs
          ref={ref}
          role="navigation"
          aria-label={l.breadcrumbs.ariaLabel()}
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
