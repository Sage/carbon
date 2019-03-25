import React from 'react';
import PropTypes from 'prop-types';
import {
  MessageStyle,
  MessageBodyStyle,
  MessageContentStyle,
  MessageTitleStyle,
  MessageIconContainerStyle,
  MessageCloseIconContainerStyle
} from './message.style';
import Icon from '../icon';

const Message = ({
  as,
  border,
  children,
  className,
  open,
  onDismiss,
  roundedCorners,
  title,
  transparent
}) => {
  const typeIcon = (
    <MessageIconContainerStyle
      type={ as }
      roundedCorners={ roundedCorners }
      transparent={ transparent }
    >
      <Icon type={ as } />
    </MessageIconContainerStyle>
  );

  const dismissIcon = (
    <MessageCloseIconContainerStyle type={ as }>
      <Icon
        data-element='dismiss'
        onClick={ onDismiss }
        type='close'
      />
    </MessageCloseIconContainerStyle>
  );

  const messageContent = (
    <MessageContentStyle transparent={ transparent }>
      <MessageTitleStyle
        type={ as }
        data-element='title'
      >
        {title}
      </MessageTitleStyle>
      <MessageBodyStyle>{children}</MessageBodyStyle>
    </MessageContentStyle>
  );

  return (
    open && (
      <MessageStyle
        border={ border }
        className={ className }
        transparent={ transparent }
        type={ as }
        roundedCorners={ roundedCorners }
      >
        {typeIcon}
        {messageContent}
        {onDismiss && dismissIcon}
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
