import React from 'react';
import PropTypes from 'prop-types';
import HiddenCheckboxStyle from './hidden-checkbox.style';

const HiddenCheckbox = (props) => {
  return (
    <HiddenCheckboxStyle
      aria-checked={ props.checked }
      role='checkbox'
      type='checkbox'
      { ...props }
    />
  );
};

HiddenCheckbox.propTypes = {
  checked: PropTypes.bool
};

export default HiddenCheckbox;
