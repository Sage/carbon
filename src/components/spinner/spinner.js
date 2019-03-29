import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';
import './spinner.scss';

class Spinner extends React.Component {
  static propTypes = {
    /**
     * Sets the theme for the component.
     */
    as: PropTypes.string,

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * Size of the spinner
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
   */
  render() {
    return (
      <div className={ this.spinnerClasses } { ...tagComponent('spinner', this.props) } />
    );
  }
}

export default Spinner;
