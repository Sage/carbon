import React from 'react';
import PropTypes from 'prop-types';
import Content from '../../content/content';
import MessageContentStyle from './message-content.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

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
  as: PropTypes.oneOf(OptionsHelper.colors),
  title: PropTypes.string,
  transparent: PropTypes.bool,
  children: PropTypes.node
};

export default MessageContent;
