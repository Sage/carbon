import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Column from './column';
import './row.scss';

class Row extends React.Component {
  static propTypes = {
    /**
     * This component supports children of type Column.
     */
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

    /**
     * Classes to apply to the component.
     */
    className: PropTypes.string,

    /**
     * Define how wide the gutter between the rows and columns should be.
     */
    gutter: PropTypes.string,

    /**
     * Enable a divider between each column.
     */
    columnDivide: PropTypes.bool,

    /**
     * Define a certain amount of columns, instead of basing it on the number of children.
     */
    columns: PropTypes.string,

    /**
     * Classes to apply to all column children.
     */
    columnClasses: PropTypes.string
  };

  static defaultProps = {
    gutter: 'medium'
  };

  /**
   * Builds row columns from the children object fields
   *
   * @method buildColumns
   * @return {Array} array of built columns
   */
  buildColumns = () => {
    return React.Children.toArray(this.props.children).map((child) => {
      return React.cloneElement(
        child,
        {
          columnClasses: this.props.columnClasses,
          columnDivide: this.props.columnDivide
        },
        child.props.children
      );
    });
  };

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    const columns = this.props.columns || React.Children.toArray(this.props.children).length;

    return classNames(
      'carbon-row',
      `carbon-row--gutter-${this.props.gutter}`,
      this.props.className,
      `carbon-row--columns-${columns}`
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return <div className={ this.mainClasses }>{this.buildColumns()}</div>;
  }
}

export default Row;
export { Row, Column };
