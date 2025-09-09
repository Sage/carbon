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

    const internalRef = React.useRef<HTMLElement | null>(null);
    const isSafari = React.useMemo(
      () =>
        typeof navigator !== "undefined" &&
        /safari/i.test(navigator.userAgent) &&
        !/chrome|crios|android/i.test(navigator.userAgent),
      [],
    );

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
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
          ref={internalRef}
          isCurrent={isCurrent}
          aria-current={isCurrent ? "page" : undefined}
          isDarkBackground={isDarkBackground}
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
