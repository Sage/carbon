import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitleStyle,
  PopoverContainerOpenIcon,
} from "./popover-container.style";
import Icon from "../icon";
import createGuid from "../../utils/helpers/guid";

const PopoverContainer = ({
  children,
  title,
  position,
  open,
  onOpen,
  onClose,
  renderOpenComponent,
  renderCloseComponent,
  shouldCoverButton,
  ariaDescribedBy,
}) => {
  const isControlled = open !== undefined;
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  const closeButtonRef = useRef();
  const openButtonRef = useRef();
  const guid = useRef(createGuid());
  const popoverContainerId = `PopoverContainer_${guid.current}`;

  const isOpen = isControlled ? open : isOpenInternal;

  useEffect(() => {
    if (isOpen && closeButtonRef.current) closeButtonRef.current.focus();
  }, [isOpen]);

  const handleOpenButtonClick = (e) => {
    if (!isControlled) setIsOpenInternal(!isOpen);

    // We want the open button to close the popover if it is already open
    if (!isOpen) {
      if (onOpen) onOpen(e);
    } else if (onClose) onClose(e);
  };

  const handleCloseButtonClick = (e) => {
    if (!isControlled) setIsOpenInternal(!isOpen);
    if (onClose) onClose(e);
    if (isOpen && openButtonRef.current) openButtonRef.current.focus();
  };

  const renderOpenComponentProps = {
    tabIndex: isOpen ? -1 : 0,
    isOpen,
    dataElement: "popover-container-open-component",
    onClick: handleOpenButtonClick,
    ref: openButtonRef,
    ariaLabel: title,
  };

  const renderCloseComponentProps = {
    dataElement: "popover-container-close-component",
    tabIndex: 0,
    onClick: handleCloseButtonClick,
    ref: closeButtonRef,
    ariaLabel: "close",
  };

  return (
    <PopoverContainerWrapperStyle
      data-component="popover-container"
      aria-labelledby={popoverContainerId}
    >
      {renderOpenComponent(renderOpenComponentProps)}
      <Transition
        in={isOpen}
        timeout={{ exit: 300 }}
        appear
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <PopoverContainerContentStyle
            data-element="popover-container-content"
            role="dialog"
            animationState={state}
            position={position}
            shouldCoverButton={shouldCoverButton}
            aria-labelledby={popoverContainerId}
            aria-describedby={ariaDescribedBy}
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
        )}
      </Transition>
    </PopoverContainerWrapperStyle>
  );
};

PopoverContainer.propTypes = {
  /** A function that will render the open component
   *
   * `({dataElement, tabIndex, onClick, ref, ariaLabel, isOpen}) => ()`
   *
   */
  renderOpenComponent: PropTypes.func,
  /** A function that will render the close component
   *
   * `({dataElement, tabIndex, onClick, ref, ariaLabel, isOpen}) => ()`
   *
   */
  renderCloseComponent: PropTypes.func,
  /** If `true` the popover-container will open */
  open: PropTypes.bool,
  /** Sets the popover-container title displayed in the dialog */
  title: PropTypes.string,
  /** If `true` the popover-container will cover open button */
  shouldCoverButton: PropTypes.bool,
  /** Callback fires when open component is clicked */
  onOpen: PropTypes.func,
  /** Callback fires when close component is clicked */
  onClose: PropTypes.func,
  /** Sets rendering position of the popover-container */
  position: PropTypes.oneOf(["left", "right"]),
  /** The content of the popover-container */
  children: PropTypes.node,
  /** The id of the element that describes the dialog */
  ariaDescribedBy: PropTypes.string,
};

PopoverContainer.defaultProps = {
  position: "right",
  shouldCoverButton: false,
  renderOpenComponent: ({
    // eslint-disable-next-line react/prop-types
    tabIndex,
    onClick,
    dataElement,
    ref,
    ariaLabel,
  }) => (
    <PopoverContainerOpenIcon
      tabIndex={tabIndex}
      onAction={onClick}
      data-element={dataElement}
      ref={ref}
      aria-label={ariaLabel}
      aria-haspopup
    >
      <Icon type="settings" />
    </PopoverContainerOpenIcon>
  ),
  renderCloseComponent: ({
    // eslint-disable-next-line react/prop-types
    dataElement,
    tabIndex,
    onClick,
    ref,
    ariaLabel,
  }) => (
    <PopoverContainerCloseIcon
      data-element={dataElement}
      tabIndex={tabIndex}
      onAction={onClick}
      ref={ref}
      aria-label={ariaLabel}
    >
      <Icon type="close" />
    </PopoverContainerCloseIcon>
  ),
};

export default PopoverContainer;
