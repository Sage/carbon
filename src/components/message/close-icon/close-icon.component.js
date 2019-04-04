import React from 'react';
import PropTypes from 'prop-types';
import CloseIconStyle from './close-icon.style';
import Icon from '../../icon/icon';
import OptionsHelper from '../../../utils/helpers/options-helper';

const CloseIcon = ({ messageType, onDismiss }) => {
  return (
    <CloseIconStyle messageType={ messageType }>
      <Icon
        data-element='dismiss' onClick={ onDismiss }
        type='close'
      />
    </CloseIconStyle>
  );
};

CloseIcon.defaultProps = {
  messageType: 'info'
};

CloseIcon.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.colors),
  onDismiss: PropTypes.func
};

export default CloseIcon;
