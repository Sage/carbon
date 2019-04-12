import React from 'react';
import PropTypes from 'prop-types';
import { CloseIconStyle, LinkStyle } from './close-icon.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const CloseIcon = ({ messageType, onDismiss, transparent }) => {
  return (
    <CloseIconStyle messageType={ messageType } transparent={ transparent }>
      <LinkStyle
        icon='close' data-element='dismsiss'
        onClick={ onDismiss }
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
