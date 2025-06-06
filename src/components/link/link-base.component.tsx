import React, { useCallback, useContext, useMemo, useState, ForwardedRef } from "react";
import MenuContext from "../menu/__internal__/menu.context";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";

export interface LinkBaseProps extends TagProps {
  href?: string;
  isSkipLink?: boolean;
  disabled?: boolean;
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
      | React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  onKeyDown?: (
    ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  onMouseDown?: (
    ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
  "data-role"?: string;
  "data-element"?: string;
  style?: React.CSSProperties;
}

export const LinkBase = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkBaseProps
>((props, ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>) => {
  const {
    href,
    onClick,
    onKeyDown,
    onMouseDown,
    isSkipLink,
    disabled,
    target,
    rel,
    ariaLabel,
    className,
    style,
    children,
    ...rest
  } = props;

  const locale = useLocale();
  const { inMenu } = useContext(MenuContext);
  const { batchSelectionDisabled } = useContext(BatchSelectionContext);

  const isDisabled = disabled || batchSelectionDisabled;
  const [hasFocus, setHasFocus] = useState(false);

  const setRefs = useCallback(
    (node: HTMLAnchorElement | null) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const ariaAndDataProps = useMemo(() => {
    return Object.entries(rest).reduce<Record<string, unknown>>((acc, [key, value]) => {
      if (key.startsWith("aria-") || key.startsWith("data-")) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }, [rest]);

  const commonProps = {
    ref: setRefs,
    onClick: isDisabled ? undefined : onClick,
    onKeyDown,
    onMouseDown,
    disabled: isDisabled,
    target,
    href,
    rel,
    className,
    "aria-label": ariaLabel,
    "data-disabled": isDisabled ? "true" : undefined,
    onFocus: () => setHasFocus(true),
    onBlur: () => setHasFocus(false),
    ...ariaAndDataProps,
  };

  const content = isSkipLink ? locale.link.skipLinkLabel() : children;

  if (onClick && !href) {
    return (
      <button type="button" {...commonProps}>
        {content}
      </button>
    );
  }

  return (
    <a data-role="link-anchor" {...commonProps}>
      {content}
    </a>
  );
});

LinkBase.displayName = "LinkBase";
export default LinkBase;
