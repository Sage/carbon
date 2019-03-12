import React from 'react';
import PropTypes from 'prop-types';

import FieldHelpStyle from './field-help.style';

/**
 * FieldHelp component. This component is a part of the FormField Component.
 *
 * == How to use FieldHelp component:
 *
 * In your file:
 *
 *   import FieldHelp from 'carbon-react/lib/components/field-help';
 *
 * To render a FieldHelp:
 *
 *   <FieldHelp>This provides more information for the field.</FieldHelp>
 *
 * Component should be placed next to an input presentation element.
 */
const FieldHelp = ({ children, ...props }) => {
  if (!children) { return null; }

  return (
    <FieldHelpStyle data-element='help' { ...props }>
      { children }
    </FieldHelpStyle>
  );
};

FieldHelp.propTypes = {
  children: PropTypes.node
};

export default FieldHelp;
