import React from 'react';
import PropTypes from 'prop-types';
import CloseIconStyle from './close-icon.style';
import Icon from '../../icon/icon';
import OptionsHelper from '../../../utils/helpers/options-helper';

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
  as: PropTypes.oneOf(OptionsHelper.colors),
  onDismiss: PropTypes.func
};

export default CloseIcon;
