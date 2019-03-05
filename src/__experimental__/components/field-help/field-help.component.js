import React from 'react';
import PropTypes from 'prop-types';

import FieldHelpStyle from './field-help.style';

/**
 * FieldHelp component. That component is a part of the FormField Component.
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
 *      content='text to be rendered'
 *      iconType='foo'
 *      inputId='bar'
 *    />
 *
 * Component has to be placed next to an input presentation element.
 */
const FieldHelp = (props) => {
  const { content, ...styleProps } = props;

  if (!content) { return null; }

  return (
    <FieldHelpStyle data-element='help' { ...styleProps }>
      { content }
    </FieldHelpStyle>
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
  labelInline: PropTypes.bool,
  /**
   * Width of the input field
   */
  inputWidth: PropTypes.number
};

export default FieldHelp;
