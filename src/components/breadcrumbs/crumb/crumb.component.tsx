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
  /** This sets the Crumb to current, does not render Link */
  isCurrent?: boolean;
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

const Crumb = React.forwardRef<HTMLElement, CrumbProps>(
  ({ href, isCurrent, children, onClick, ...rest }, forwardedRef) => {
    const { isDarkBackground } = useBreadcrumbsContext();
    const crumbRef = React.useRef<HTMLElement | null>(null);

    const focusCrumb = React.useCallback(() => {
      try {
        crumbRef.current?.focus?.({ preventScroll: true } as FocusOptions);
      } catch {
        crumbRef.current?.focus?.();
      }
    }, []);

    type LinkOnClick = NonNullable<LinkProps["onClick"]>;
    type LinkOnClickEvent = Parameters<LinkOnClick>[0];

    const handleClick = React.useCallback(
      (event: LinkOnClickEvent) => {
        if (!isCurrent) focusCrumb();
        onClick?.(event);
      },
      [isCurrent, onClick, focusCrumb],
    );

    return (
      <li>
        <StyledCrumb
          ref={mergeRefs(crumbRef, forwardedRef)}
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
