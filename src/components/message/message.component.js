import React from 'react';
import PropTypes from 'prop-types';
import MessageStyle from './message.style';
import CloseIcon from './close-icon/close-icon.component';
import TypeIcon from './type-icon/type-icon.component';
import MessageContent from './message-content/message-content.component';
import OptionsHelper from '../../utils/helpers/options-helper';

const Message = ({
  messageType, border, children, className, open, onDismiss, roundedCorners, title, transparent
}) => {
  return (
    open && (
      <MessageStyle
        border={ border }
        className={ className }
        transparent={ transparent }
        messageType={ messageType }
        roundedCorners={ roundedCorners }
        role='status'
      >
        <TypeIcon
          messageType={ messageType } roundedCorners={ roundedCorners }
          transparent={ transparent }
        />
        <MessageContent
          messageType={ messageType } transparent={ transparent }
          title={ title }
        >
          {children}
        </MessageContent>
        {onDismiss && <CloseIcon messageType={ messageType } onDismiss={ onDismiss } />}
      </MessageStyle>
    )
  );
};

Message.defaultProps = {
  messageType: 'info',
  border: true,
  open: true,
  roundedCorners: true,
  transparent: false
};

Message.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.colors),
  border: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  open: PropTypes.bool,
  onDismiss: PropTypes.func,
  roundedCorners: PropTypes.bool,
  title: PropTypes.node,
  transparent: PropTypes.bool
};

export default Message;
