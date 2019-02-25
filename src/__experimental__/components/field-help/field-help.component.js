import React from 'react';
import PropTypes from 'prop-types';

import FieldHelpWrapper from './field-help.style';

/**
 * FieldHelp component.
 *
 * == How to use FieldHelp component:
 *
 * In your file:
 *
 *   import FieldHelp from 'carbon-react/lib/components/label-help';
 *
 * To render a FieldHelp:
 *
 *   <FieldHelp
 *      content=''
 *      iconType='foo'
 *      inputId='bar'
 *    />
 *
 * Component has to be placed next to an input element.
 */
const FieldHelp = (props) => {
  const { content, isInline } = props;

  if (!content) { return null; }

  return (
    <FieldHelpWrapper data-element='help' isInline={ isInline }>
      { content }
    </FieldHelpWrapper>
  );
};

FieldHelp.propTypes = {
  /**
   * Text to be rendered
   */
  content: PropTypes.string,
  /**
   * Position of the label
   */
  isInline: PropTypes.bool
};

export default FieldHelp;
