import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import { PaddingProps } from "styled-system";
import { CSSTransition } from "react-transition-group";
import { flip, offset } from "@floating-ui/react-dom";

import useMediaQuery from "../../hooks/useMediaQuery";
import {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitleStyle,
  PopoverContainerOpenIcon,
} from "./popover-container.style";
import Icon from "../icon";
import Popover from "../../__internal__/popover";
import createGuid from "../../__internal__/utils/helpers/guid";
import { filterStyledSystemPaddingProps } from "../../style/utils";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import Events from "../../__internal__/utils/helpers/events";
import FocusTrap from "../../__internal__/focus-trap";
import ModalContext from "../modal/__internal__/modal.context";
import useFocusPortalContent from "../../hooks/__internal__/useFocusPortalContent";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import { defaultFocusableSelectors } from "../../__internal__/focus-trap/focus-trap-utils";
import FlatTableContext, {
  FlatTableContextProps,
} from "../flat-table/__internal__/flat-table.context";

export interface RenderOpenProps {
  tabIndex: number;
  isOpen?: boolean;
  "data-element"?: string;
  onClick: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
  ) => void;
  ref: React.RefObject<HTMLButtonElement>;
  "aria-label"?: string;
  id?: string;
  "aria-expanded": boolean;
  "aria-haspopup": "dialog";
}

export const renderOpen = ({
  tabIndex,
  onClick,
  "data-element": dataElement,
  ref,
  "aria-label": ariaLabel,
  id,
  "aria-expanded": ariaExpanded,
  "aria-haspopup": ariaHasPopup,
}: RenderOpenProps) => {
  return (
    <PopoverContainerOpenIcon
      tabIndex={tabIndex}
      onClick={onClick}
      data-element={dataElement}
      ref={ref}
      aria-label={ariaLabel}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
      id={id}
    >
      <Icon type="settings" />
    </PopoverContainerOpenIcon>
  );
};

export interface RenderCloseProps {
  "data-element"?: string;
  tabIndex: number;
  onClick: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
  ) => void;
  ref: React.RefObject<HTMLButtonElement>;
  "aria-label": string;
  closeButtonDataProps?: Pick<TagProps, "data-role" | "data-element">;
}

export const renderClose = ({
  "data-element": dataElement,
  tabIndex,
  onClick,
  ref,
  "aria-label": ariaLabel,
  closeButtonDataProps,
}: RenderCloseProps) => (
  <PopoverContainerCloseIcon
    tabIndex={tabIndex}
    onClick={onClick}
    ref={ref}
    aria-label={ariaLabel}
    {...tagComponent("close", {
      "data-element": dataElement,
      ...closeButtonDataProps,
    })}
  >
    <Icon type="close" />
  </PopoverContainerCloseIcon>
);

export interface PopoverContainerProps extends PaddingProps, TagProps {
  /** A function that will render the open component
   *
   * `({tabIndex, isOpen, data-element, onClick, ref, aria-label}) => ()`
   *
   */
  renderOpenComponent?: (args: RenderOpenProps) => JSX.Element;
  /** A function that will render the close component
   *
   * `({data-element, tabIndex, onClick, ref, aria-label}) => ()`
   *
   */
  renderCloseComponent?: (args: RenderCloseProps) => JSX.Element;
  /** The content of the popover-container */
  children?: React.ReactNode;
  /** Sets rendering position of dialog */
  position?: "left" | "right";
  /** Sets the popover container dialog header name */
  title?: string;
  /** Callback fires when close icon clicked */
  onClose?: (
    ev:
      | React.KeyboardEvent<HTMLElement>
      | React.MouseEvent<HTMLElement>
      | React.FocusEvent<HTMLElement>
      | Event,
  ) => void;
  /** if `true` the popover-container is open */
  open?: boolean;
  /** Callback fires when open component is clicked */
  onOpen?: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
  ) => void;
  /** if `true` the popover-container will cover open button */
  shouldCoverButton?: boolean;
  /** The id of the element that describe the dialog. */
  ariaDescribedBy?: string;
  /** Open button aria label */
  openButtonAriaLabel?: string;
  /** Close button aria label */
  closeButtonAriaLabel?: string;
  /** Data tag prop bag for close Button */
  closeButtonDataProps?: Pick<TagProps, "data-role" | "data-element">;
  /** Container aria label */
  containerAriaLabel?: string;
  /** Disables the animation for the component */
  disableAnimation?: boolean;
  /** Flag to enable fullWidth Button styles */
  hasFullWidth?: boolean;
}

export type PopoverContainerHandle = {
  focusButton: () => void;
} | null;

function usePopoverMiddleware(shouldCoverButton: boolean) {
  return useMemo(
    () => [
      offset(
        shouldCoverButton
          ? ({ rects }) => ({ mainAxis: -rects.reference.height })
          : 6,
      ),
      flip({
        fallbackStrategy: "initialPlacement",
      }),
    ],
    [shouldCoverButton],
  );
}

export const PopoverContainer = forwardRef<
  PopoverContainerHandle,
  PopoverContainerProps
>(
  (
    {
      children,
      title,
      position = "right",
      open,
      onOpen,
      onClose,
      renderOpenComponent = renderOpen,
      renderCloseComponent = renderClose,
      shouldCoverButton = false,
      ariaDescribedBy,
      openButtonAriaLabel,
      closeButtonAriaLabel = "close",
      containerAriaLabel,
      closeButtonDataProps,
      disableAnimation = false,
      hasFullWidth = false,
      ...rest
    },
    ref,
  ) => {
    const isControlled = open !== undefined;
    const [isOpenInternal, setIsOpenInternal] = useState(false);

    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const openButtonRef = useRef<HTMLButtonElement>(null);
    const popoverReference = useRef<HTMLDivElement>(null);
    const guid = useRef(createGuid());
    const popoverContentNodeRef = useRef<HTMLDivElement>(null);
    const popoverContainerId = title
      ? `PopoverContainer_${guid.current}`
      : undefined;

    const isOpen = isControlled ? open : isOpenInternal;

    const reduceMotion = !useMediaQuery(
      "screen and (prefers-reduced-motion: no-preference)",
    );

    const popoverMiddleware = usePopoverMiddleware(shouldCoverButton);
    const { isInFlatTable } =
      useContext<FlatTableContextProps>(FlatTableContext);

    const closePopover = useCallback(
      (
        ev:
          | React.MouseEvent<HTMLElement>
          | React.KeyboardEvent<HTMLElement>
          | React.FocusEvent<HTMLElement>
          | KeyboardEvent,
      ) => {
        /* istanbul ignore else */
        if (!isControlled) setIsOpenInternal(false);

        onClose?.(ev);

        /* istanbul ignore else */
        if (isOpen) openButtonRef.current?.focus();
      },
      [isControlled, isOpen, onClose],
    );

    const handleEscKey = useCallback(
      (ev: KeyboardEvent) => {
        const eventIsFromSelectInput = Events.composedPath(ev).find(
          (element) => {
            return (
              element instanceof HTMLElement &&
              element.getAttribute("data-element") === "input" &&
              element.getAttribute("aria-expanded") === "true"
            );
          },
        );

        if (!eventIsFromSelectInput && Events.isEscKey(ev)) {
          closePopover(ev);
        }
      },
      [closePopover],
    );

    useEffect(() => {
      document.addEventListener("keydown", handleEscKey);

      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
    }, [handleEscKey]);

    useEffect(() => {
      if (!shouldCoverButton && isOpen) {
        popoverContentNodeRef.current?.focus({ preventScroll: true });
      }
    }, [isOpen, shouldCoverButton, popoverContentNodeRef]);

    const handleOpenButtonClick = (
      e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
      /* istanbul ignore else */
      if (!isControlled) setIsOpenInternal(!isOpen);

      // We want the open button to close the popover if it is already open
      if (!isOpen) onOpen?.(e);
      else onClose?.(e);
    };

    const handleCloseButtonClick = (
      e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
      closePopover(e);
    };

    useFocusPortalContent(
      shouldCoverButton ? undefined : popoverContentNodeRef,
      shouldCoverButton ? undefined : openButtonRef,
      closePopover,
    );

    const onFocusNextElement = useCallback(
      (ev: React.FocusEvent<HTMLElement>) => {
        const allFocusableElements: HTMLElement[] = Array.from(
          document.querySelectorAll(defaultFocusableSelectors) ||
            /* istanbul ignore next */ [],
        );
        const filteredElements = allFocusableElements.filter(
          (el) => el === openButtonRef.current || Number(el.tabIndex) !== -1,
        );

        const openButtonRefIndex = filteredElements.indexOf(
          openButtonRef.current as HTMLElement,
        );

        filteredElements[openButtonRefIndex + 1].focus();
        closePopover(ev);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [],
    );

    const handleFocusGuard = (
      direction: "prev" | "next",
      ev: React.FocusEvent<HTMLElement>,
    ) => {
      if (direction === "next" && onFocusNextElement) {
        // Focus the next focusable element outside of the popover
        onFocusNextElement(ev);
        return;
      }

      // istanbul ignore else
      if (direction === "prev") openButtonRef.current?.focus();
    };

    const renderOpenComponentProps = {
      tabIndex: 0,
      "aria-expanded": isOpen,
      "aria-haspopup": "dialog" as const,
      isOpen,
      "data-element": "popover-container-open-component",
      onClick: handleOpenButtonClick,
      ref: openButtonRef,
      "aria-label": openButtonAriaLabel || title,
      id: isOpen ? undefined : popoverContainerId,
    };

    const renderCloseComponentProps = {
      "data-element": "popover-container-close-component",
      tabIndex: 0,
      onClick: handleCloseButtonClick,
      ref: closeButtonRef,
      "aria-label": closeButtonAriaLabel,
      closeButtonDataProps,
    };

    const handleClickAway = (e: Event) => {
      if (!isControlled) setIsOpenInternal(false);
      if (isOpen) onClose?.(e);
    };

    const handleClick = useClickAwayListener(handleClickAway, "mousedown");
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    useImperativeHandle<PopoverContainerHandle, PopoverContainerHandle>(
      ref,
      () => ({
        focusButton() {
          openButtonRef.current?.focus();
        },
      }),
      [],
    );

    const popover = () => (
      <PopoverContainerContentStyle
        data-element="popover-container-content"
        role="dialog"
        aria-labelledby={popoverContainerId}
        aria-label={containerAriaLabel}
        aria-describedby={ariaDescribedBy}
        p="16px 24px"
        ref={popoverContentNodeRef}
        tabIndex={-1}
        disableAnimation={disableAnimation || reduceMotion}
        {...filterStyledSystemPaddingProps(rest)}
      >
        <PopoverContainerHeaderStyle>
          <PopoverContainerTitleStyle
            id={popoverContainerId}
            data-element="popover-container-title"
          >
            {title}
          </PopoverContainerTitleStyle>
          {renderCloseComponent(renderCloseComponentProps)}
        </PopoverContainerHeaderStyle>
        {children}
      </PopoverContainerContentStyle>
    );

    const childrenToRender = () =>
      shouldCoverButton ? (
        <ModalContext.Provider value={{ isAnimationComplete }}>
          <FocusTrap wrapperRef={popoverContentNodeRef} isOpen={isOpen}>
            {popover()}
          </FocusTrap>
        </ModalContext.Provider>
      ) : (
        <>
          <div
            data-element="tab-guard-top"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            aria-hidden
            onFocus={(ev) => handleFocusGuard("prev", ev)}
          />
          {popover()}
          <div
            data-element="tab-guard-bottom"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            aria-hidden
            onFocus={(ev) => handleFocusGuard("next", ev)}
          />
        </>
      );

    return (
      <PopoverContainerWrapperStyle
        onMouseDown={handleClick}
        hasFullWidth={hasFullWidth}
        {...tagComponent("popover-container", rest)}
      >
        <div ref={popoverReference}>
          {renderOpenComponent(renderOpenComponentProps)}
        </div>
        <CSSTransition
          nodeRef={popoverContentNodeRef}
          timeout={{ exit: disableAnimation ? 0 : 300 }}
          in={isOpen}
          unmountOnExit
          onEntered={
            shouldCoverButton
              ? /* istanbul ignore next */ () => setIsAnimationComplete(true)
              : undefined
          }
          onExiting={
            shouldCoverButton
              ? /* istanbul ignore next */ () => setIsAnimationComplete(false)
              : undefined
          }
        >
          <Popover
            reference={popoverReference}
            placement={position === "right" ? "bottom-start" : "bottom-end"}
            popoverStrategy={
              disableAnimation || reduceMotion ? "fixed" : "absolute"
            }
            middleware={popoverMiddleware}
            childRefOverride={popoverContentNodeRef}
            disableBackgroundUI={isInFlatTable}
          >
            {childrenToRender()}
          </Popover>
        </CSSTransition>
      </PopoverContainerWrapperStyle>
    );
  },
);

export default PopoverContainer;
