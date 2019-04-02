import React from 'react';
import PropTypes from 'prop-types';
import CloseIconStyle from './close-icon.style';
import Icon from '../../icon/icon';

const CloseIcon = ({ as, onDismiss }) => {
  return (
    <CloseIconStyle type={ as }>
      <Icon
        data-element='dismiss' onClick={ onDismiss }
        type='close'
      />
    </CloseIconStyle>
  );
};

CloseIcon.defaultProps = {
  as: 'info'
};

CloseIcon.propTypes = {
  as: PropTypes.oneOf(['error', 'success', 'info', 'warning']),
  onDismiss: PropTypes.func
};

export default CloseIcon;
