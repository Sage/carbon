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
 * You can pass a 'as' property to the spinner to define the stype of spinner
 *    std
 *
 * You can pass a 'size' property to adjust the size of the spinner   
 *    small, smed, lmed, large
 *
 * @class Row
 * @constructor
 */
class Spinner extends React.Component {

  static propTypes = {
    as: React.PropTypes.string,
    size: React.PropTypes.string
  }

  static defaultProps = {
    as: 'std',
    size: 'lmed'
  } 

  /**
   * Returns classes for the spinner.
   *
   * @method spinnerClasses 
   * @return {String} spinner className
   */
  get spinnerClasses() {
    return classNames(
      'ui-spinner',
      'ui-spinner__' + this.props.as,
      'ui-spinner__' + this.props.as + '--' + this.props.size,
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
