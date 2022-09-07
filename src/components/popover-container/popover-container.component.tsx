import React, { useEffect, useRef, useState } from "react";
import { PaddingProps } from "styled-system";
import { Transition, TransitionStatus } from "react-transition-group";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";

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

export interface RenderOpenProps {
  tabIndex: number;
  isOpen?: boolean;
  "data-element": string;
  onClick: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => void;
  ref: React.RefObject<HTMLButtonElement>;
  "aria-label"?: string;
  id?: string;
  "aria-expanded": boolean;
  "aria-haspopup": "dialog";
}

const renderOpen = ({
  tabIndex,
  onClick,
  "data-element": dataElement,
  ref,
  "aria-label": ariaLabel,
  id,
  "aria-expanded": ariaExpanded,
  "aria-haspopup": ariaHasPopup,
}: RenderOpenProps) => (
  <PopoverContainerOpenIcon
    tabIndex={tabIndex}
    onAction={onClick}
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

export interface RenderCloseProps {
  "data-element": string;
  tabIndex: number;
  onClick: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => void;
  ref: React.RefObject<HTMLButtonElement>;
  "aria-label": string;
}

const renderClose = ({
  "data-element": dataElement,
  tabIndex,
  onClick,
  ref,
  "aria-label": ariaLabel,
}: RenderCloseProps) => (
  <PopoverContainerCloseIcon
    data-element={dataElement}
    tabIndex={tabIndex}
    onAction={onClick}
    ref={ref}
    aria-label={ariaLabel}
  >
    <Icon type="close" />
  </PopoverContainerCloseIcon>
);

export interface PopoverContainerProps extends PaddingProps {
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
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement> | Event
  ) => void;
  /** if `true` the popover-container is open */
  open?: boolean;
  /** Callback fires when open component is clicked */
  onOpen?: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => void;
  /** if `true` the popover-container will cover open button */
  shouldCoverButton?: boolean;
  /** The id of the element that describe the dialog. */
  ariaDescribedBy?: string;
  /** Open button aria label */
  openButtonAriaLabel?: string;
  /** Close button aria label */
  closeButtonAriaLabel?: string;
  /** Container aria label */
  containerAriaLabel?: string;
}

const offset: OffsetsFunction = ({ reference }) => {
  return [0, -reference.height];
};

const popperModifiers = [
  {
    name: "offset",
    options: {
      offset,
    },
  },
];

export const PopoverContainer = ({
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
  ...rest
}: PopoverContainerProps) => {
  const isControlled = open !== undefined;
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const guid = useRef(createGuid());
  const popoverContentNodeRef = useRef<HTMLDivElement>(null);
  const popoverContainerId = title
    ? `PopoverContainer_${guid.current}`
    : undefined;

  const isOpen = isControlled ? open : isOpenInternal;

  useEffect(() => {
    if (isOpen && closeButtonRef.current)
      setTimeout(() => closeButtonRef.current?.focus(), 0);
  }, [isOpen]);

  const handleOpenButtonClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (!isControlled) setIsOpenInternal(!isOpen);

    // We want the open button to close the popover if it is already open
    if (!isOpen) {
      if (onOpen) onOpen(e);
    } else if (onClose) onClose(e);
  };

  const handleCloseButtonClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (!isControlled) setIsOpenInternal(!isOpen);
    if (onClose) onClose(e);
    if (isOpen && openButtonRef.current) openButtonRef.current.focus();
  };

  const renderOpenComponentProps = {
    tabIndex: isOpen ? -1 : 0,
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
  };

  const handleClickAway = (e: Event) => {
    if (!isControlled) setIsOpenInternal(false);
    if (onClose) onClose(e);
  };

  const handleClick = useClickAwayListener(handleClickAway, "mousedown");

  return (
    <PopoverContainerWrapperStyle
      data-component="popover-container"
      onMouseDown={handleClick}
    >
      {renderOpenComponent(renderOpenComponentProps)}
      <Transition
        in={isOpen}
        timeout={{ exit: 300 }}
        appear
        mountOnEnter
        unmountOnExit
        nodeRef={popoverContentNodeRef}
      >
        {(state: TransitionStatus) =>
          isOpen && (
            <Popover
              reference={openButtonRef}
              placement={position === "right" ? "bottom-start" : "bottom-end"}
              {...(shouldCoverButton && { modifiers: popperModifiers })}
            >
              <PopoverContainerContentStyle
                data-element="popover-container-content"
                role="dialog"
                animationState={state}
                aria-labelledby={popoverContainerId}
                aria-label={containerAriaLabel}
                aria-describedby={ariaDescribedBy}
                p="16px 24px"
                ref={popoverContentNodeRef}
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
            </Popover>
          )
        }
      </Transition>
    </PopoverContainerWrapperStyle>
  );
};

export default PopoverContainer;
