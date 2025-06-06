import React, { useCallback, useEffect, useMemo, useState } from "react";
import Icon, { IconType } from "../icon";
import MenuContext from "../menu/__internal__/menu.context";
import BatchSelectionContext from "../batch-selection/__internal__/batch-selection.context";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";

export interface LinkBaseProps extends TagProps {
  href?: string;
  icon?: IconType;
  iconAlign?: "left" | "right";
  isSkipLink?: boolean;
  disabled?: boolean;
  onClick?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  onKeyDown?: (
    ev:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  onMouseDown?: (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  tooltipMessage?: string;
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  children?: React.ReactNode;
  target?: string;
  ariaLabel?: string;
  rel?: string;
  removeAriaLabelOnIcon?: boolean;
  className?: string;
}

export const LinkBase = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkBaseProps
>(
  (
    {
      children,
      onKeyDown,
      href,
      onClick,
      onMouseDown,
      icon,
      iconAlign = "left",
      isSkipLink,
      disabled,
      ariaLabel,
      rel,
      tooltipMessage,
      tooltipPosition,
      target,
      removeAriaLabelOnIcon,
      className,
      ...rest
    }: LinkBaseProps,
    ref,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hasFocus, setHasFocus] = useState(false);
    const l = useLocale();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { inMenu } = React.useContext(MenuContext);
    const { batchSelectionDisabled } = React.useContext(BatchSelectionContext);
    const isDisabled = disabled || batchSelectionDisabled;

    const setRefs = useCallback(
      (reference: HTMLAnchorElement) => {
        if (!ref) return;
        if (typeof ref === "object") ref.current = reference;
        if (typeof ref === "function") ref(reference);
      },
      [ref],
    );

    const renderLinkIcon = (currentAlignment = "left") => {
      const hasProperAlignment = icon && iconAlign === currentAlignment;
      return hasProperAlignment ? (
        <Icon
          type={icon}
          disabled={isDisabled}
          ariaLabel={removeAriaLabelOnIcon ? undefined : ariaLabel}
          tooltipMessage={tooltipMessage}
          tooltipPosition={tooltipPosition}
        />
      ) : null;
    };

    const ariaProps = useMemo(() => {
      const restObject = rest as Record<string, unknown>;

      return Object.keys(restObject)
        .filter((key) => key.startsWith("aria"))
        .reduce((obj: Record<string, unknown>, key: string) => {
          obj[key] = restObject[key];
          return obj;
        }, {});
    }, [rest]);

    const componentProps = {
      onKeyDown,
      onMouseDown,
      onClick,
      disabled: isDisabled,
      target,
      ref: setRefs,
      href,
      rel,
      "aria-label": ariaLabel,
      ...ariaProps,
      onFocus: () => setHasFocus(true),
      onBlur: () => setHasFocus(false),
    };

    const buttonProps = {
      type: "button",
    };

    const createLinkBasedOnType = () => {
      let type = "a";

      if (onClick && !href) {
        type = "button";
      }

      return React.createElement(
        type,
        type === "button"
          ? {
              ...componentProps,
              ...buttonProps,
            }
          : {
              ...componentProps,
              "data-role": "link-anchor",
            },
        <>
          {renderLinkIcon()}
          <span>{isSkipLink ? l.link.skipLinkLabel() : children}</span>
          {renderLinkIcon("right")}
        </>,
      );
    };

    useEffect(() => {
      if (disabled || !(href || onClick)) {
        setHasFocus(false);
      }
    }, [disabled, href, onClick]);

    return createLinkBasedOnType();
  },
);

LinkBase.displayName = "LinkBase";
export default LinkBase;
