import React from 'react';
import classNames from 'classnames';
import Row from './../row';

/**
 * @class Filter
 * @constructor
 */
class Filter extends React.Component {
  static propTypes = {
    /**
     * Aligns the children in the filter.
     *
     * @property align
     * @type {String}
     * @default left
     */
    align: React.PropTypes.string
  }

  static defaultProps = {
    align: 'left'
  }

  get classes() {
    return classNames(
      'ui-filter',
      this.props.className,
      `ui-filter--align-${this.props.align}`
    );
  }

  render() {
    return (
      <form className={ this.classes } onSubmit={ (ev) => { ev.preventDefault() } }>
        { this.props.children }
      </form>
    );
  }
}

export default Filter;
