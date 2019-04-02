import React from 'react';
import PropTypes from 'prop-types';
import CloseIconContainerStyle from './close-icon.style';
import Icon from '../icon/icon';

const CloseIcon = ({ as, onDismiss }) => {
  return (
    <CloseIconContainerStyle type={ as }>
      <Icon
        data-element='dismiss' onClick={ onDismiss }
        type='close'
      />
    </CloseIconContainerStyle>
  );
};

CloseIcon.defaultProps = {
  as: 'info'
};

CloseIcon.propTypes = {
  as: PropTypes.string,
  onDismiss: PropTypes.func
};

export default CloseIcon;
