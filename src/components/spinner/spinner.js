import React from 'react';
import classNames from 'classnames';

/**
 * A Spinner widget.
 *
 * == How to use a Spinner in a component:
 *
 * In your file
 *
 *   import Spinner from 'carbon/lib/components/spinner';
 *
 * To render the Spinner:
 *
 *   <Spinner />
 *
 * You can pass a 'size' property to adjust the size of the spinner
 *    The default is lmed
 *    options: small, smed, lmed, large
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Spinner
 * @constructor
 */
class Spinner extends React.Component {

  static propTypes = {

    /**
     * Sets the theme for the component.
     * (see the 'iconColorSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default info
     */
    as: React.PropTypes.string,

    /**
     * Size of the spinner
     * Options: small, smed, lmed, large
     *
     * @property size
     * @type {String}
     */
    size: React.PropTypes.string
  };

  static defaultProps = {
    as: 'info',
    size: 'medium'
  };

  /**
   * Returns classes for the spinner.
   *
   * @method spinnerClasses
   * @return {String} spinner className
   */
  get spinnerClasses() {
    return classNames(
      'ui-spinner',
      'ui-spinner--'+ this.props.as,
      'ui-spinner--' + this.props.size,
      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.spinnerClasses } ></div>
    );
  }
}

export default Spinner;
