import React from 'react';
import PropTypes from 'prop-types';
import {
  MessageStyle,
  MessageBodyStyle,
  MessageContentStyle,
  MessageTitleStyle,
  MessageIconContainerStyle,
  MessageCloseIconStyle,
  MessageIconStyle,
  MessageCloseIconContainerStyle
} from './message.style';
import './message.scss';

const Message = ({
  as, border, children, className, open, onDismiss, roundedCorners, title, transparent
}) => {
  return (
    <MessageStyle
      border={ border }
      className={ className }
      transparent={ transparent }
      type={ as }
      roundedCorners={ roundedCorners }
    >
      <MessageIconContainerStyle type={ as } roundedCorners={ roundedCorners }>
        <MessageIconStyle type={ as } />
      </MessageIconContainerStyle>
      <MessageContentStyle transparent={ transparent }>
        <MessageTitleStyle data-element='title'>{title}</MessageTitleStyle>
        <MessageBodyStyle>{children}</MessageBodyStyle>
      </MessageContentStyle>
      <MessageCloseIconContainerStyle>
        <MessageCloseIconStyle
          data-element='dismiss'
          onClick={ onDismiss }
          type='close'
          roundedCorners={ roundedCorners }
        />
      </MessageCloseIconContainerStyle>
    </MessageStyle>
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
