import React from 'react';
import PropTypes from 'prop-types';
import TypeIconStyle from './type-icon.style';
import Icon from '../../icon/icon';
import OptionsHelper from '../../../utils/helpers/options-helper';

const TypeIcon = ({ messageType, roundedCorners, transparent }) => {
  return (
    <TypeIconStyle
      messageType={ messageType } roundedCorners={ roundedCorners }
      transparent={ transparent }
    >
      <Icon type={ messageType } />
    </TypeIconStyle>
  );
};

TypeIcon.defaultProps = {
  messageType: 'info',
  transparent: false,
  roundedCorners: true
};

TypeIcon.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.colors),
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default TypeIcon;
