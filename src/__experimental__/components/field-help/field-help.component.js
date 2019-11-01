import React from 'react';
import PropTypes from 'prop-types';
import FieldHelpStyle from './field-help.style';

const FieldHelp = ({ children, ...props }) => (
  <FieldHelpStyle data-element='help' { ...props }>
    { children }
  </FieldHelpStyle>
);

FieldHelp.propTypes = {
  children: PropTypes.node
};

export default FieldHelp;
