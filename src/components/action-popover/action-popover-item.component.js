import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import { withTheme } from "styled-components";
import {
  MenuItemFactory,
  MenuItemIcon,
  SubMenuItemIcon,
} from "./action-popover.style";
import OptionsHelper from "../../utils/helpers/options-helper";
import Events from "../../utils/helpers/events";
import createGuid from "../../utils/helpers/guid";

const INTERVAL = 150;

const MenuItem = React.forwardRef(
  (
    {
      children,
      icon,
      disabled = false,
      onClick: onClickProp,
      submenu,
      theme,
      placement = "bottom",
      ...rest
    },
    ref
  ) => {
    const [containerPosition, setContainerPosition] = useState(null);
    const [guid] = useState(createGuid());
    const [isOpen, setOpen] = useState(false);
    const [focusIndex, setFocusIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [isLeftAligned, setIsLeftAligned] = useState(true);
    const submenuRef = useRef();
    const { spacing } = theme;

    const alignSubmenu = useCallback(() => {
      if (checkRef(ref) && checkRef(submenuRef)) {
        const align = submenu && leftAlignSubmenu(ref, submenuRef);
        setIsLeftAligned(align);
        setContainerPosition(
          getContainerPosition(ref, submenuRef, spacing, placement)
        );
      }
    }, [ref, submenu, spacing, placement]);

    useLayoutEffect(() => {
      alignSubmenu();
    }, [alignSubmenu]);

    useEffect(() => {
      const event = "resize";
      window.addEventListener(event, alignSubmenu);

      return function cleanup() {
        window.removeEventListener(event, alignSubmenu);
      };
    }, [alignSubmenu]);

    const onClick = useCallback(
      (e) => {
        if (!disabled) {
          onClickProp();
          setOpen(false);
        } else {
          e.stopPropagation();
        }
      },
      [disabled, onClickProp]
    );

    const onKeyDown = useCallback(
      (e) => {
        if (Events.isSpaceKey(e)) {
          e.preventDefault();
          e.stopPropagation();
        } else if (!disabled) {
          if (submenu) {
            if (isLeftAligned) {
              // LEFT: open if has submenu and left aligned otherwise close submenu
              if (Events.isLeftKey(e) || Events.isEnterKey(e)) {
                setOpen(true);
                setFocusIndex(0);
                e.stopPropagation();
              } else if (Events.isRightKey(e) || Events.isEscKey(e)) {
                setOpen(false);
                ref.current.focus();
                e.stopPropagation();
              }
            } else {
              // RIGHT: open if has submenu and right aligned otherwise close submenu
              if (Events.isRightKey(e) || Events.isEnterKey(e)) {
                setOpen(true);
                setFocusIndex(0);
                e.stopPropagation();
              }
              if (Events.isLeftKey(e) || Events.isEscKey(e)) {
                setOpen(false);
                ref.current.focus();
                e.stopPropagation();
              }
            }
            e.preventDefault();
          } else if (Events.isEnterKey(e)) {
            onClick(e);
          }
        } else if (Events.isEnterKey(e)) {
          e.stopPropagation();
        }
      },
      [disabled, isLeftAligned, onClick, ref, submenu]
    );

    let timer;
    const itemSubmenuProps = {
      ...(!disabled && {
        onMouseEnter: (e) => {
          clearTimeout(timer);
          setFocusIndex(null);
          timer = setTimeout(() => {
            setOpen(true);
          }, INTERVAL);
          e.stopPropagation();
        },
        onMouseLeave: (e) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            setOpen(false);
          }, INTERVAL);
          e.stopPropagation();
        },
        onClick: (e) => {
          setOpen(true);
          e.preventDefault();
          e.stopPropagation();
        },
      }),
      "aria-haspopup": "true",
      "aria-label": I18n.t("actionpopover.aria-label", {
        defaultValue: "actions",
      }),
      "aria-controls": `ActionPopoverMenu_${guid}`,
      "aria-expanded": isOpen,
    };

    return (
      <div
        {...rest}
        {...{ ref, onClick, onKeyDown }}
        {...(disabled && { "aria-disabled": true })}
        type="button"
        tabIndex="0"
        role="menuitem"
        {...(submenu && itemSubmenuProps)}
      >
        {submenu &&
          React.cloneElement(submenu, {
            button: ref,
            parentID: `ActionPopoverItem_${guid}`,
            menuID: `ActionPopoverMenu_${guid}`,
            "data-element": "action-popover-submenu",
            isOpen,
            ref: submenuRef,
            style: containerPosition,
            setOpen,
            setFocusIndex,
            focusIndex,
            items,
            setItems,
          })}
        {submenu && checkRef(ref) && isLeftAligned && (
          <SubMenuItemIcon type="chevron_left" />
        )}
        {icon && <MenuItemIcon type={icon} />}
        {children}
        {submenu && checkRef(ref) && !isLeftAligned && (
          <SubMenuItemIcon type="chevron_right" />
        )}
      </div>
    );
  }
);

function checkRef(ref) {
  return Boolean(ref && ref.current);
}

function leftAlignSubmenu(ref, submenuRef) {
  const itemRect = ref.current.getBoundingClientRect();
  const { offsetWidth } = submenuRef.current;

  return itemRect.left >= offsetWidth;
}

function getContainerPosition(itemRef, submenuRef, spacing, placement) {
  const { offsetWidth: parentWidth } = itemRef.current;
  const { offsetWidth: submenuWidth } = submenuRef.current;
  const xPositionValue = leftAlignSubmenu(itemRef, submenuRef)
    ? -submenuWidth
    : parentWidth;
  const yPositionName = placement === "top" ? "bottom" : "top";

  return {
    left: xPositionValue,
    [yPositionName]: -spacing,
    right: "auto",
  };
}

const StyledActionPopoverItem = MenuItemFactory(MenuItem);
StyledActionPopoverItem.displayName = "ActionPopoverItem";
const ActionPopoverItem = withTheme(StyledActionPopoverItem);

const propTypes = {
  /** The text label to display for this Item */
  children: PropTypes.string.isRequired,
  /** Flag to indicate if item is disabled */
  disabled: PropTypes.bool,
  /** The name of the icon to display next to the label */
  icon: PropTypes.oneOf(OptionsHelper.icons),
  /** Callback to run when item is clicked */
  onClick: PropTypes.func.isRequired,
  /** Submenu component for item */
  submenu(props, propName, componentName) {
    let error;
    if (
      props[propName] &&
      props[propName].type.displayName !== "ActionPopoverMenu"
    ) {
      error = new Error(
        `\`${componentName}\` only accepts submenu of type \`ActionPopoverMenu\``
      );
    }
    return error;
  },
  /** @ignore @private */
  placement: PropTypes.oneOf(["bottom", "top"]),
};

ActionPopoverItem.propTypes = { ...propTypes };

// needed to export MenuItem to create prop tables in storybook
MenuItem.propTypes = { ...propTypes };
MenuItem.displayName = "ActionPopoverItem";
export { MenuItem };

export default ActionPopoverItem;
