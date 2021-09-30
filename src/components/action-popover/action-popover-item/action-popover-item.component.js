import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";
import {
  MenuItemFactory,
  MenuItemIcon,
  SubMenuItemIcon,
  StyledMenuItem,
} from "../action-popover.style";
import Events from "../../../__internal__/utils/helpers/events";
import createGuid from "../../../__internal__/utils/helpers/guid";
import ActionPopoverContext from "../action-popover-context";
import useLocale from "../../../hooks/__internal__/useLocale";

const INTERVAL = 150;

const MenuItem = ({
  children,
  icon,
  disabled = false,
  onClick: onClickProp,
  submenu,
  theme,
  placement = "bottom",
  focusItem,
  download,
  href,
  horizontalAlignment,
  ...rest
}) => {
  const l = useLocale();
  const { setOpenPopover, isOpenPopover, focusButton } = useContext(
    ActionPopoverContext
  );

  const isHref = !!href;
  const [containerPosition, setContainerPosition] = useState(null);
  const [guid] = useState(createGuid());
  const [isOpen, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [isLeftAligned, setIsLeftAligned] = useState(true);
  const submenuRef = useRef();
  const ref = useRef();
  const mouseEnterTimer = useRef();
  const mouseLeaveTimer = useRef();
  const { spacing } = theme;

  useEffect(() => {
    if (!isOpenPopover) {
      setOpen(false);
    }
  }, [isOpenPopover]);

  const alignSubmenu = useCallback(() => {
    if (checkRef(ref) && checkRef(submenuRef)) {
      const align = submenu && leftAlignSubmenu(ref, submenuRef);
      setIsLeftAligned(align);
      setContainerPosition(
        getContainerPosition(ref, submenuRef, spacing, placement)
      );
    }
  }, [submenu, spacing, placement]);

  useEffect(() => {
    alignSubmenu();

    if (focusItem && ref.current) {
      ref.current.focus();
    }
  }, [alignSubmenu, focusItem]);

  useEffect(() => {
    return function cleanup() {
      clearTimeout(mouseEnterTimer.current);
      clearTimeout(mouseLeaveTimer.current);
    };
  }, []);

  useEffect(() => {
    const event = "resize";
    window.addEventListener(event, alignSubmenu);

    return function cleanup() {
      window.removeEventListener(event, alignSubmenu);
    };
  }, [alignSubmenu]);

  const onClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!disabled) {
        if (onClickProp) {
          onClickProp();
        }
        setOpenPopover(false);
        focusButton();
      } else {
        ref.current.focus();
        e.preventDefault();
      }
    },
    [disabled, focusButton, onClickProp, setOpenPopover]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (Events.isEscKey(e)) {
        e.stopPropagation();
        setOpenPopover(false);
        focusButton();
      } else if (Events.isSpaceKey(e)) {
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
            } else if (Events.isRightKey(e)) {
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
            if (Events.isLeftKey(e)) {
              setOpen(false);
              ref.current.focus();
              e.stopPropagation();
            }
          }
          e.preventDefault();
        } else if (Events.isEnterKey(e)) {
          if (isHref && download) ref.current.click();
          onClick(e);
        }
      } else if (Events.isEnterKey(e)) {
        e.stopPropagation();
      }
    },
    [
      disabled,
      download,
      focusButton,
      isHref,
      isLeftAligned,
      onClick,
      setOpenPopover,
      submenu,
    ]
  );

  const itemSubmenuProps = {
    ...(!disabled && {
      onMouseEnter: (e) => {
        clearTimeout(mouseEnterTimer.current);
        setFocusIndex(null);
        mouseEnterTimer.current = setTimeout(() => {
          setOpen(true);
        }, INTERVAL);
        e.stopPropagation();
      },
      onMouseLeave: (e) => {
        clearTimeout(mouseLeaveTimer.current);
        mouseLeaveTimer.current = setTimeout(() => {
          setOpen(false);
        }, INTERVAL);
        e.stopPropagation();
      },
      onClick: (e) => {
        setOpen(true);
        ref.current.focus();
        e.preventDefault();
        e.stopPropagation();
      },
    }),
    "aria-haspopup": "true",
    "aria-label": l.actionPopover.ariaLabel(),
    "aria-controls": `ActionPopoverMenu_${guid}`,
    "aria-expanded": isOpen,
  };

  const renderMenuItemIcon = () => {
    return (
      icon && (
        <MenuItemIcon type={icon} horizontalAlignment={horizontalAlignment} />
      )
    );
  };

  return (
    <StyledMenuItem
      {...rest}
      ref={ref}
      onClick={onClick}
      onKeyDown={onKeyDown}
      type="button"
      tabIndex="0"
      role="menuitem"
      {...(disabled && { "aria-disabled": true })}
      {...(isHref && { as: "a", download, href })}
      {...(submenu && itemSubmenuProps)}
    >
      {submenu &&
        React.cloneElement(submenu, {
          parentID: `ActionPopoverItem_${guid}`,
          menuID: `ActionPopoverMenu_${guid}`,
          "data-element": "action-popover-submenu",
          isOpen,
          ref: submenuRef,
          style: containerPosition,
          setOpen,
          setFocusIndex,
          focusIndex,
        })}
      {submenu && checkRef(ref) && isLeftAligned && (
        <SubMenuItemIcon type="chevron_left" />
      )}
      {horizontalAlignment === "left" && renderMenuItemIcon()}
      {children}
      {horizontalAlignment === "right" && renderMenuItemIcon()}
      {submenu && checkRef(ref) && !isLeftAligned && (
        <SubMenuItemIcon type="chevron_right" />
      )}
    </StyledMenuItem>
  );
};

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
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * The name of the icon to display next to the label
   * */
  icon: PropTypes.string,
  /** Callback to run when item is clicked */
  onClick: PropTypes.func,
  /** allows to provide download prop that works dependent with href */
  download: PropTypes.bool,
  /** allows to provide href prop */
  href: PropTypes.string,
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
  /** @ignore @private */
  focusItem: PropTypes.bool,
  /** @ignore @private */
  horizontalAlignment: PropTypes.oneOf(["left", "right"]),
};

ActionPopoverItem.propTypes = { ...propTypes };

// needed to export MenuItem to create prop tables in storybook
MenuItem.propTypes = { ...propTypes };
MenuItem.displayName = "ActionPopoverItem";
export { MenuItem };

export default ActionPopoverItem;
