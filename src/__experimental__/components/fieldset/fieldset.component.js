import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import FieldsetStyle from './fieldset.style';

const Fieldset = (props) => {
  function legend() {
    if (!props.legend) { return null; }

    return (
      <legend className='carbon-fieldset__legend common-input__label' data-element='legend'>
        { props.legend }
      </legend>
    );
  }

  const { className, ...safeProps } = validProps(this);
  const classes = classNames('carbon-fieldset', className);

  return (
    <FieldsetStyle
      className={ classes }
      { ...tagComponent('fieldset', props) }
      { ...safeProps }
    >
      { legend() }
      { props.children }
    </FieldsetStyle>
  );
};

Fieldset.propTypes = {
  /**
   * Children elements
   */
  children: PropTypes.node,
  /**
   * A label for the fieldset.
   */
  legend: PropTypes.string
};

export default Fieldset;
