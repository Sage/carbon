import React from 'react';
import PropTypes from 'prop-types';
import { DismissButtonStyle, LinkStyle } from './dismiss-button.style';
import OptionsHelper from '../../utils/helpers/options-helper';

const DismissButton = ({ variant, onClick, transparent }) => {
  return (
    <DismissButtonStyle variant={ variant } transparent={ transparent }>
      <LinkStyle
        icon='close' data-element='dismsiss'
        onClick={ onClick }
      />
    </DismissButtonStyle>
  );
};

DismissButton.defaultProps = {
  variant: 'info',
  transparent: false
};

DismissButton.propTypes = {
  variant: PropTypes.oneOf(OptionsHelper.colors),
  onClick: PropTypes.func,
  transparent: PropTypes.bool
};

export default DismissButton;
