import React from 'react';
import PropTypes from 'prop-types';
import FieldHelpStyle from './field-help.style';

/**
 * To import FieldHelp:
 *
 *   import FieldHelp from 'carbon-react/lib/__experimental__/components/field-help';
 *
 * To render FieldHelp:
 *
 *   <FieldHelp>This provides more information for the field.</FieldHelp>
 */
const FieldHelp = ({ children, ...props }) => (
  <FieldHelpStyle data-element='help' { ...props }>
    { children }
  </FieldHelpStyle>
);

FieldHelp.propTypes = {
  children: PropTypes.node
};

export default FieldHelp;
