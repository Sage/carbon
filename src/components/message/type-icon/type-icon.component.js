import React from 'react';
import PropTypes from 'prop-types';
import TypeIconStyle from './type-icon.style';
import Icon from '../../icon/icon';

const TypeIcon = ({ as, roundedCorners, transparent }) => {
  return (
    <TypeIconStyle
      type={ as } roundedCorners={ roundedCorners }
      transparent={ transparent }
    >
      <Icon type={ as } />
    </TypeIconStyle>
  );
};

TypeIcon.defaultProps = {
  as: 'info',
  transparent: false,
  roundedCorners: true
};

TypeIcon.propTypes = {
  as: PropTypes.oneOf(['error', 'success', 'info', 'warning']),
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default TypeIcon;
