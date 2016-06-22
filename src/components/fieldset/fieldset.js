import React from 'react';

/**
 * Fieldset component.
 *
 * This component will stack inputs together.
 */
class Fieldset extends React.Component {
  static PropTypes = {
    /**
     * A label for the fieldset.
     *
     * @property legend
     * @type {String}
     */
    legend: React.PropTypes.string
  }

  /**
   * Returns the legend if on is defined.
   *
   * @method legend
   * @return {Object} JSX
   */
  get legend() {
    if (!this.props.legend) { return null; }

    return <legend className="ui-fieldset__legend common-input__label">{ this.props.legend }</legend>;
  }

  /**
   * @method render
   */
  render() {
    return (
      <fieldset className="ui-fieldset">
        { this.legend }
        { this.props.children }
      </fieldset>
    );
  }

}

export default Fieldset;
