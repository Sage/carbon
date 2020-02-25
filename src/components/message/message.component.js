import React from 'react';
import PropTypes from 'prop-types';
import MessageStyle from './message.style';
import TypeIcon from './type-icon/type-icon.component';
import MessageContent from './message-content/message-content.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import tagComponent from '../../utils/helpers/tags';
import Icon from '../icon';
import IconButton from '../icon-button';

const Message = (props) => {
  const {
    open,
    border,
    transparent,
    title,
    variant,
    roundedCorners,
    children,
    onDismiss,
    as,
    id,
    className,
    showCloseIcon
  } = props;

  const renderCloseIcon = () => {
    if (!showCloseIcon || !onDismiss) return null;

    return (
      <IconButton
        data-element='close'
        onAction={ onDismiss }
        variant={ variant || as }
      >
        <Icon type='close' />
      </IconButton>
    );
  };

  return (
    open && (
      <MessageStyle
        { ...tagComponent('Message', props) }
        border={ border }
        className={ className }
        transparent={ transparent }
        variant={ variant || as }
        roundedCorners={ roundedCorners }
        role='status'
        id={ id }
      >
        <TypeIcon
          variant={ variant || as } roundedCorners={ roundedCorners }
          transparent={ transparent }
        />
        <MessageContent
          variant={ variant || as } transparent={ transparent }
          title={ title }
        >
          {children}
        </MessageContent>
        { renderCloseIcon() }
      </MessageStyle>
    )
  );
};

Message.defaultProps = {
  as: 'info',
  border: true,
  open: true,
  roundedCorners: true,
  transparent: false,
  showCloseIcon: true
};

Message.propTypes = {
  /** set type of message based on new DLS standard */
  variant: PropTypes.oneOf(OptionsHelper.colors),
  /** set type of message. This is legacy property */
  as: PropTypes.string,
  /** set border to component */
  border: PropTypes.bool,
  /** set content to component */
  children: PropTypes.node,
  /** set custom class to component */
  className: PropTypes.string,
  /** set custom id to component root */
  id: PropTypes.string,
  /** show message component */
  open: PropTypes.bool,
  /** function runs when user click dismiss button */
  onDismiss: PropTypes.func,
  /** set corners to be rounded or sharp */
  roundedCorners: PropTypes.bool,
  /** set message title */
  title: PropTypes.node,
  /** set background to be invisible */
  transparent: PropTypes.bool,
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool
};

export default Message;
