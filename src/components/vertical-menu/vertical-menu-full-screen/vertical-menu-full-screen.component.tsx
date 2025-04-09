import React, { useCallback, useRef } from "react";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

import useLocale from "../../../hooks/__internal__/useLocale";
import Portal from "../../portal";
import FocusTrap from "../../../__internal__/focus-trap/focus-trap.component";
import IconButton from "../../icon-button";
import Icon from "../../icon";
import Box from "../../box";
import {
  StyledList,
  StyledVerticalMenuFullScreen,
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

  const menuWrapperRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <Portal>
      <FocusTrap isOpen={isOpen} wrapperRef={menuWrapperRef}>
        <StyledVerticalMenuFullScreen
          ref={menuWrapperRef}
          isOpen={isOpen}
          prefersReducedMotion={reduceMotion}
          scrollVariant="light"
          as="nav"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          {...tagComponent("vertical-menu-full-screen", rest)}
        >
          <Box
            display="flex"
            justifyContent="flex-end"
            height="60px"
            alignItems="flex-start"
            px="20px"
            pt="20px"
            boxSizing="border-box"
          >
            <IconButton
              aria-label={l.verticalMenuFullScreen.ariaLabels.close()}
              onClick={onClose}
              data-element="close"
            >
              <Icon
                type="close"
                color="var(--colorsComponentsLeftnavWinterStandardContent)"
              />
            </IconButton>
          </Box>
          <VerticalMenuProvider value={{ isFullScreen: true }}>
            <StyledList>{children}</StyledList>
          </VerticalMenuProvider>
        </StyledVerticalMenuFullScreen>
      </FocusTrap>
    </Portal>
  );
};

export default VerticalMenuFullScreen;
