import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { tagComponent } from '../../utils/helpers/tags';

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
 *    The default is medium
 *    options: extra-small, small, medium-small, medium, medium-large, large and extra-large
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
     * (see the 'utils/colors/$colorIconSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default info
     */
    as: PropTypes.string,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Size of the spinner
     * Options: extra-small, small, medium-small, medium, medium-large, large and extra-large
     *
     * @property size
     * @type {String}
     */
    size: PropTypes.string
  };

  static defaultProps = {
    as: 'info',
    className: '',
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
      'carbon-spinner',
      `carbon-spinner--${this.props.as}`,
      `carbon-spinner--${this.props.size}`,
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
      <div className={ this.spinnerClasses } { ...tagComponent('spinner', this.props) } />
    );
  }
}

export default Spinner;
