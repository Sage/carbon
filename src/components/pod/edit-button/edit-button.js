import React from 'react';
import classNames from 'classnames';

import Link from 'components/link';

/**
 * Creates an edit button
 *
 * @param {Object} props
 * @param {String} props.as - theme defaults to 'primary'
 * @param {String} props.border - defaults to true
 * @param {String} props.padding - defaults to 'medium'
 * @param {Function} props.action - function that will be called on click
 * @return {EditButton}
 */
let EditButton = props =>
  <div
    className={ _classes(props) }
    onClick={ props.action }
  >
    <Link icon="edit" className='carbon-edit-button__action' />
  </div>;

EditButton.propTypes = {
  as: React.PropTypes.string,
  border: React.PropTypes.bool,
  padding: React.PropTypes.string
};
EditButton.defaultProps = {
  as: 'primary',
  border: true,
  padding: 'medium'
};

/**
 * retrieves classes for this component
 *
 * @private
 * @method _classes
 * @param {Object} classes - formatted as an object for processing, will contain various props
 * @return {String} classes in HTML attribute format
 */
const _classes = (classes) => {
  return classNames(
    'carbon-edit-button',
    `carbon-edit-button--${classes.as}`,
    _padding(classes.padding), {
      'carbon-edit-button--border': classes.border
    }
  );
};

/**
 * calculates padding for the edit button, which will only allow padding sizes of medium or smaller
 *
 * @private
 * @method _padding
 * @param {String} padding - string paddding value from the common app set
 * @return {String} a prefixed padding string for use as a css specific class
 */
const _padding = (padding) => {
  let limitToMedium = [
    'padding-extra-large',
    'padding-large'
  ];
  let paddingSuffix = `${limitToMedium.indexOf(padding) >= 0 ? 'padding-medium' : `padding-${padding}` }`;

  return `carbon-edit-button--${paddingSuffix}`;
};

export default EditButton;
