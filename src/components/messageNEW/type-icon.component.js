import React from 'react';
import PropTypes from 'prop-types';
import TypeIconContainerStyle from './type-icon.style';
import Icon from '../icon/icon';

const TypeIcon = ({ as, roundedCorners, transparent }) => {
  return (
    <TypeIconContainerStyle
      type={ as } roundedCorners={ roundedCorners }
      transparent={ transparent }
    >
      <Icon type={ as } />
    </TypeIconContainerStyle>
  );
};

TypeIcon.defaultProps = {
  as: 'info',
  transparent: false,
  roundedCorners: true
};

TypeIcon.propTypes = {
  as: PropTypes.string,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default TypeIcon;
