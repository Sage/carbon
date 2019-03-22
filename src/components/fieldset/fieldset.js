import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './fieldset.scss';

class Fieldset extends React.Component {
  static propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.node,

    /**
     * A label for the fieldset.
     */
    legend: PropTypes.string
  };


  /**
   * Returns the legend if on is defined.
   *
   * @method legend
   * @return {Object} JSX
   */
  get legend() {
    if (!this.props.legend) { return null; }

    return (
      <legend className='carbon-fieldset__legend common-input__label' data-element='legend'>
        { this.props.legend }
      </legend>
    );
  }

  /**
   * @method render
   */
  render() {
    const { className, ...props } = validProps(this);
    const classes = classNames('carbon-fieldset', className);

    return (
      <fieldset
        className={ classes } { ...props }
        { ...tagComponent('fieldset', this.props) }
      >
        { this.legend }
        { this.props.children }
      </fieldset>
    );
  }
}

export default Fieldset;
