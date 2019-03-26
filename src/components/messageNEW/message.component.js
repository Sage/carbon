import React from 'react';
import PropTypes from 'prop-types';
import MessageStyle from './message.style';
import CloseIcon from './close-icon.component';
import TypeIcon from './type-icon.component';
import MessageContent from './message-content.component';

const Message = ({
  as, border, children, className, open, onDismiss, roundedCorners, title, transparent
}) => {
  return (
    open && (
      <MessageStyle
        border={ border }
        className={ className }
        transparent={ transparent }
        type={ as }
        roundedCorners={ roundedCorners }
      >
        <TypeIcon
          as={ as } roundedCorners={ roundedCorners }
          transparent={ transparent }
        />
        <MessageContent
          as={ as } transparent={ transparent }
          title={ title }
        >
          {children}
        </MessageContent>
        {onDismiss && <CloseIcon as={ as } onDismiss={ onDismiss } />}
      </MessageStyle>
    )
  );
};

Message.defaultProps = {
  as: 'info',
  border: true,
  open: true,
  roundedCorners: true,
  transparent: false
};

Message.propTypes = {
  as: PropTypes.string,
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
