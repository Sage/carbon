import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon/icon';
import './input-icon-toggle.scss';

/**
 * An InputIconToggle Component.
 *
 * == How to use an InputIconToggle in a component:
 *
 * In your file
 *
 *   import InputIconToggle from 'carbon-react/lib/components/input-icon-toggle';
 *
 * To render an InputIconToggle:
 *
 *   <InputIconToggle
 *      content=''
 *      iconType='foo'
 *      inputId='bar'
 *    />
 *
 * Component has to be placed next to an input element, inputId prop must be the same as the id of that input.
*/
const InputIconToggle = (props) => {
  const { iconType, content, inputId } = props;

  return (
    <label htmlFor={ inputId } key='label-icon'>
      { content || <Icon type={ iconType } className='input-icon-toggle' /> }
    </label>
  );
};

InputIconToggle.propTypes = {
  /**
   * Optional content to be rendered instead of an icon, when empty a simple icon will be rendered
   */
  content: PropTypes.node,
  /**
   * Type of an icon to render
   */
  iconType: PropTypes.string.isRequired,
  /**
   * Id of an input that icon toggle should reside in
   */
  inputId: PropTypes.string.isRequired
};

export default InputIconToggle;
