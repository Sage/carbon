import React, { useCallback, useRef } from "react";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

import useLocale from "../../../hooks/__internal__/useLocale";
import Portal from "../../portal";
import FocusTrap from "../../../__internal__/focus-trap/focus-trap.component";
import Icon from "../../icon";
import {
  StyledList,
  StyledListWrapper,
  StyledHr,
  StyledVerticalMenuFullScreen,
  StyledVerticalMenuCloseBar,
  StyledCloseButton,
} from "../vertical-menu.style";
import { VerticalMenuProvider } from "../__internal__/vertical-menu.context";
import { getDocument } from "../../../__internal__/dom/globals";
import Events from "../../../__internal__/utils/helpers/events/events";
import useModalManager from "../../../hooks/__internal__/useModalManager";
import useMediaQuery from "../../../hooks/useMediaQuery";

export interface VerticalMenuFullScreenProps extends TagProps {
  /** An aria-label attribute for the menu */
  "aria-label"?: string;
  /** An aria-labelledby attribute for the menu */
  "aria-labelledby"?: string;
  /**  Content of the menu - VerticalMenuItem */
  children: React.ReactNode;
  /** Whether the menu is open or not */
  isOpen: boolean;
  /** A callback to be called when the close icon is clicked or enter is pressed when focused */
  onClose: (
    ev:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent,
  ) => void;
}

export const VerticalMenuFullScreen = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  isOpen,
  onClose,
  ...rest
}: VerticalMenuFullScreenProps) => {
  const l = useLocale();

  const menuWrapperRef = useRef<HTMLElement | null>(null);

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLButtonElement> | KeyboardEvent) => {
      // istanbul ignore else
      if (Events.isEscKey(ev)) {
        onClose(ev);
      }
    },
    [onClose],
  );

  const safeDocument = getDocument();

  useModalManager({
    open: isOpen,
    closeModal: handleKeyDown,
    modalRef: menuWrapperRef,
    topModalOverride: true,
    focusCallToActionElement: safeDocument?.activeElement as HTMLElement,
  });

  const flattenChildren = (items: React.ReactNode): React.ReactNode[] =>
    React.Children.toArray(
      React.Children.map(items, (child) => {
        if (
          React.isValidElement<{ children?: React.ReactNode }>(child) &&
          child.type === React.Fragment
        ) {
          return flattenChildren(child.props.children);
        }

        return child;
      }),
    );

  const menuItems = flattenChildren(children);

  return (
    <Portal>
      <FocusTrap isOpen={isOpen} wrapperRef={menuWrapperRef}>
        <StyledVerticalMenuFullScreen
          ref={menuWrapperRef}
          isOpen={isOpen}
          prefersReducedMotion={reduceMotion}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          {...tagComponent("vertical-menu-full-screen", rest)}
        >
          <StyledVerticalMenuCloseBar>
            <StyledCloseButton
              aria-label={l.verticalMenuFullScreen.ariaLabels.close()}
              onClick={(event) =>
                onClose(event as React.MouseEvent<HTMLButtonElement>)
              }
              data-element="close"
              variantType="tertiary"
            >
              <Icon
                size="small"
                type="close"
                color="var(--colorsComponentsLeftnavWinterStandardContent)"
              />
            </StyledCloseButton>
          </StyledVerticalMenuCloseBar>
          <VerticalMenuProvider value={{ isFullScreen: true }}>
            <StyledListWrapper>
              <StyledList>
                {React.Children.map(menuItems, (child, index) => (
                  <React.Fragment>
                    {child}
                    {index < menuItems.length - 1 && (
                      <li>
                        <StyledHr />
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </StyledList>
            </StyledListWrapper>
          </VerticalMenuProvider>
        </StyledVerticalMenuFullScreen>
      </FocusTrap>
    </Portal>
  );
};

export default VerticalMenuFullScreen;
