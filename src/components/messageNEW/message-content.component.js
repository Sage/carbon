import React from 'react';
import PropTypes from 'prop-types';
import MessageContentStyle from './message-content-component.style';

const MessageContent = ({
  as, title, transparent, children
}) => {
  return (
    <MessageContentStyle type={ as } transparent={ transparent }>
      <div data-element='title'>{title}</div>
      <div>{children}</div>
    </MessageContentStyle>
  );
};

MessageContent.defaultProps = {
  as: 'info',
  transparent: false
};

MessageContent.propTypes = {
  as: PropTypes.string,
  title: PropTypes.string,
  transparent: PropTypes.bool,
  children: PropTypes.node
};

export default MessageContent;
