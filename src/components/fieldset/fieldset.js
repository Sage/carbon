import React from 'react';
import classNames from 'classnames';
import { validProps } from '../../utils/ether';
import { tagComponent } from '../../utils/helpers/tags';

/**
 * Fieldset component.
 *
 * This component will stack inputs together.
 */
class Fieldset extends React.Component {

  static propTypes = {
    /**
     * A label for the fieldset.
     *
     * @property legend
     * @type {String}
     */
    legend: React.PropTypes.string
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
      <legend className="carbon-fieldset__legend common-input__label" data-element='legend'>
        { this.props.legend }
      </legend>
    );
  }

  /**
   * @method render
   */
  render() {
    let { className, ...props } = validProps(this),
        classes = classNames("carbon-fieldset", className);

    return (
      <fieldset className={ classes } { ...props } { ...tagComponent('fieldset', this.props) }>
        { this.legend }
        { this.props.children }
      </fieldset>
    );
  }

}

export default Fieldset;
