import React from "react";
import { LinkProps } from "../../link";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { StyledCrumb, Divider } from "./crumb.style";
import { useBreadcrumbsContext } from "../__internal__/breadcrumbs.context";

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
  isCurrent?: boolean;
  onClick?: (
    ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
}

const Crumb = React.forwardRef<HTMLLIElement, CrumbProps>(
  ({ href, isCurrent, children, onClick, ...rest }, ref) => {
    const { isDarkBackground } = useBreadcrumbsContext();

    const isSafari = React.useMemo(() => {
      if (typeof navigator === "undefined") return false;
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }, []);

    const handleClick = React.useCallback(
      (
        event: React.MouseEvent<
          HTMLAnchorElement | HTMLButtonElement,
          MouseEvent
        >,
      ) => {
        if (!isCurrent && isSafari) {
          (event.currentTarget as HTMLElement).focus({ preventScroll: true });
        }
        onClick?.(event);
      },
      [isCurrent, isSafari, onClick],
    );

    return (
      <li ref={ref}>
        <StyledCrumb
          isCurrent={isCurrent}
          aria-current={isCurrent ? "page" : undefined}
          isDarkBackground={isDarkBackground}
          data-testid={isCurrent ? "current-crumb" : "link-anchor"}
          {...rest}
          {...tagComponent("crumb", rest)}
          {...(!isCurrent && {
            href,
            onClick: handleClick,
          })}
          {...(isCurrent && {
            as: "span",
            tabIndex: -1,
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
