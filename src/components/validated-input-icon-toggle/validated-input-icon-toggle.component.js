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
 * To render an ValidatedInputIconToggle:
 *
 *   <ValidatedInputIconToggle iconType='foo' inputId='bar' />
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
   * Validation content to render
   *
   * @property validationHTML
   * @type {Node}
   */
  validationHTML: PropTypes.node,
  /**
   * Type of an icon to render
   *
   * @property iconType
   * @type {String}
   */
  iconType: PropTypes.string.isRequired,
  /**
   * Id of an input that icon toggle should reside in
   *
   * @property inputId
   * @type {String}
   */
  inputId: PropTypes.string.isRequired
};

export default ValidatedInputIconToggle;
