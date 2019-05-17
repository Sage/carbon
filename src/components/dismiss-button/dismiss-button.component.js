import React from 'react';
import PropTypes from 'prop-types';
import { DismissButtonStyle, LinkStyle } from './dismiss-button.style';
import OptionsHelper from '../../utils/helpers/options-helper';

const DismissButton = ({ messageType, onDismiss, transparent }) => {
  return (
    <DismissButtonStyle messageType={ messageType } transparent={ transparent }>
      <LinkStyle
        icon='close' data-element='dismsiss'
        onClick={ onDismiss }
      />
    </DismissButtonStyle>
  );
};

DismissButton.defaultProps = {
  messageType: 'info',
  transparent: false
};

DismissButton.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.colors),
  onDismiss: PropTypes.func,
  transparent: PropTypes.bool
};

export default DismissButton;
