import React from 'react';
import PropTypes from 'prop-types';

import InputIconToggle from '../input-icon-toggle';
import './validated-input-icon-toggle.scss';

/**
 * An ValidatedInputIconToggle Component.
 *
 * == How to use an ValidatedInputIconToggle in a component:
 *
 * In your file
 *
 *   import ValidatedInputIconToggle from 'carbon-react/lib/components/input-icon';
 *
 * To render the ValidatedInputIconToggle:
 *
 *   <ValidatedInputIconToggle
 *      validationHTML={ contentToBeRendered }
 *      iconType='foo'
 *      inputId='bar'
 *    />
 *
 * Component has to be placed next to an input element, inputId prop must be the same as the id of that input.
 */
const ValidatedInputIconToggle = (props) => {
  const { validationHTML, iconType, inputId } = props;
  const validationContent = validationHTML ? renderValidationContent(iconType, validationHTML) : null;

  return <InputIconToggle content={ validationContent } { ...{ iconType, inputId } } />;
};

function renderValidationContent(iconType, validationHTML) {
  return (
    <span className={ `input-icon-toggle input-icon-toggle--${iconType}` }>
      { validationHTML }
    </span>
  );
}

ValidatedInputIconToggle.propTypes = {
  /**
   * Validation content to be rendered
   */
  validationHTML: PropTypes.node,
  /**
   * Type of an icon to render
   */
  iconType: PropTypes.string.isRequired,
  /**
   * Id of an input that icon toggle should reside in
   */
  inputId: PropTypes.string.isRequired
};

export default ValidatedInputIconToggle;
