import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Column from './column';
import './row.scss';

class Row extends React.Component {
  static propTypes = {

    /**
     * The elements to be rendered in the row
     *
     */
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),

    /**
     * Custom className
     *
     */
    className: PropTypes.string,

    /**
     * Pass a custom value for the gutter
     * (extra-small, small, medium, large or extra-large)
     *
     */
    gutter: PropTypes.string,

    /**
     * Show a divide between columns
     *
     */
    columnDivide: PropTypes.bool,

    /**
     * Manually define number of columns
     *
     */
    columns: PropTypes.string,

    /**
     * class to apply to each child column
     *
     */
    columnClasses: PropTypes.string
  }

  static defaultProps = {
    gutter: 'medium',
    columnDivide: true
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
        child, {
          columnClasses: this.props.columnClasses,
          columnDivide: this.props.columnDivide
        },
        child.props.children
      );
    });
  }

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
    return (
      <div className={ this.mainClasses }>
        { this.buildColumns() }
      </div>
    );
  }
}

export default Row;
export {
  Row,
  Column
};
