import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Form from '../form';
import tagComponent from '../../utils/helpers/tags';
import './filter.scss';

/**
 * @class Filter
 * @constructor
 */
class Filter extends Form {
  static propTypes = {
    /**
     * Aligns the children in the filter.
     *
     * @property align
     * @type {String}
     * @default left
     */
    align: PropTypes.string
  }

  static defaultProps = {
    align: 'left'
  }

  /**
   * Handles the submission of the form.
   *
   * @method handleSubmit
   * @param {Object}
   */
  handleSubmit = (ev) => {
    ev.preventDefault();
  }

  /**
   * Returns the classes for the filter.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      'carbon-filter',
      this.props.className,
      `carbon-filter--align-${this.props.align}`
    );
  }


  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <form
        className={ this.classes } onSubmit={ this.handleSubmit }
        { ...tagComponent('filter', this.props) }
      >
        { this.props.children }
      </form>
    );
  }
}

export default Filter;
