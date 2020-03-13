import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import {
  PopoverContainerWrapperStyle,
  PopoverContainerIcon,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitle
} from './popover-container.style';
import Icon from '../icon';

const PopoverContainer = ({
  children, iconType, title, position
}) => {
  const [isOpen, setOpen] = useState(false);
  const iconRef = useRef();
  const closeIconRef = useRef();

  useEffect(() => {
    if (isOpen) closeIconRef.current.focus();
  }, [isOpen]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    iconRef.current.focus();
  };

  return (
    <PopoverContainerWrapperStyle data-component='popover-container'>
      <PopoverContainerIcon
        ref={ iconRef }
        data-element='popover-container-icon'
        tabIndex={ isOpen ? -1 : 0 }
        onAction={ handleOpen }
      >
        <Icon type={ iconType } />
      </PopoverContainerIcon>
      <Transition
        in={ isOpen }
        timeout={ { exit: 300 } }
        appear
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <PopoverContainerContentStyle
            data-element='popover-container-content'
            animationState={ state }
            position={ position }
          >
            <PopoverContainerHeaderStyle>
              <PopoverContainerTitle data-element='popover-container-title'>
                {title}
              </PopoverContainerTitle>
              <PopoverContainerCloseIcon
                data-element='popover-container-close-icon'
                type='close'
                tabIndex='0'
                onAction={ handleClose }
                ref={ closeIconRef }
              >
                <Icon type='close' />
              </PopoverContainerCloseIcon>
            </PopoverContainerHeaderStyle>
            {children}
          </PopoverContainerContentStyle>
        )}
      </Transition>
    </PopoverContainerWrapperStyle>
  );
};

PopoverContainer.propTypes = {
  /** Sets the popover container dialog header name */
  title: PropTypes.string.isRequired,
  /** Sets the icon that opens dialog */
  iconType: PropTypes.string.isRequired,
  /** Sets rendering position of dialog */
  position: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node
};

export default PopoverContainer;
