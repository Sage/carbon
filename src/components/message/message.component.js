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
    open, border, className, transparent, title, variant, roundedCorners, children, onDismiss, as
  } = props;

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
        {onDismiss && (
          <DismissButton
            variant={ variant || as } onDismiss={ onDismiss }
            transparent={ transparent }
          />
        )}
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
  /** show message component */
  open: PropTypes.bool,
  /** function runs when user click dismiss button */
  onDismiss: PropTypes.func,
  /** set corners to be rounded or sharp */
  roundedCorners: PropTypes.bool,
  /** set message title */
  title: PropTypes.node,
  /** set background to be invisible */
  transparent: PropTypes.bool
};

export default Message;
