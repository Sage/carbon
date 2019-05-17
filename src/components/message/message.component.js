import React from 'react';
import PropTypes from 'prop-types';
import MessageStyle from './message.style';
import DismissButton from '../dismiss-button';
import TypeIcon from './type-icon/type-icon.component';
import MessageContent from './message-content/message-content.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import tagComponent from '../../utils/helpers/tags';

const Message = (props) => {
  const {
    open, border, className, transparent, title, variant, roundedCorners, children, onDismiss
  } = props;

  return (
    open && (
      <MessageStyle
        { ...tagComponent('Message', props) }
        border={ border }
        className={ className }
        transparent={ transparent }
        variant={ variant }
        roundedCorners={ roundedCorners }
        role='status'
      >
        <TypeIcon
          variant={ variant } roundedCorners={ roundedCorners }
          transparent={ transparent }
        />
        <MessageContent
          variant={ variant } transparent={ transparent }
          title={ title }
        >
          {children}
        </MessageContent>
        {onDismiss && (
          <DismissButton
            variant={ variant } onDismiss={ onDismiss }
            transparent={ transparent }
          />
        )}
      </MessageStyle>
    )
  );
};

Message.defaultProps = {
  variant: 'info',
  border: true,
  open: true,
  roundedCorners: true,
  transparent: false
};

Message.propTypes = {
  variant: PropTypes.oneOf(OptionsHelper.colors),
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
