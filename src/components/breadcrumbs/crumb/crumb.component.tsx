import React from "react";
import { useTheme } from "styled-components";

import { ThemeObject } from "../../../style/themes";
import { LinkProps } from "../../link";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { styledCrumb, Divider } from "./crumb.style";
import { useBreadcrumbsContext } from "../__internal__/breadcrumbs.context";
import addLinkStyles from "../../link/link.style";
import BaseLink from "../../link/__internal__/base-link.component";

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
    const { isDarkBackground } = useBreadcrumbsContext();
    const theme = useTheme();
    const baseStyles = addLinkStyles({
      theme: theme as ThemeObject,
      hasContent: !!children,
    });
    const styles = styledCrumb(baseStyles, isDarkBackground, isCurrent);

    return (
      <li>
        <BaseLink
          styles={styles}
          ref={ref}
          aria-current={isCurrent ? "page" : undefined}
          {...rest}
          {...tagComponent("crumb", rest)}
          {...(!isCurrent && {
            href,
            onClick,
          })}
        >
          {children}
        </BaseLink>
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
