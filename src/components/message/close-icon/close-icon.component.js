import React from 'react';
import PropTypes from 'prop-types';
import CloseIconStyle from './close-icon.style';
import Icon from '../../icon/icon';
import OptionsHelper from '../../../utils/helpers/options-helper';

const CloseIcon = ({ messageType, onDismiss, transparent }) => {
  return (
    <CloseIconStyle messageType={ messageType } transparent={ transparent }>
      <Icon
        data-element='dismiss' onClick={ onDismiss }
        type='close'
      />
    </CloseIconStyle>
  );
};

CloseIcon.defaultProps = {
  messageType: 'info',
  transparent: false
};

CloseIcon.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.colors),
  onDismiss: PropTypes.func,
  transparent: PropTypes.bool
};

export default CloseIcon;
