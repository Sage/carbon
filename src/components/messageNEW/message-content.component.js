import React from 'react';
import PropTypes from 'prop-types';
import Content from '../content';
import MessageContentStyle from './message-content.style';

const MessageContent = ({
  as, title, transparent, children
}) => {
  return (
    <MessageContentStyle type={ as } transparent={ transparent }>
      <Content title={ title } className='message-content'>
        {children}
      </Content>
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
