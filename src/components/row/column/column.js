import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const classes = (props) => {
  return classNames(
    'carbon-column',
    props.className,
    props.columnClasses, {
      [`carbon-column--offset-${props.columnOffset}`]: props.columnOffset,
      [`carbon-column--span-${props.columnSpan}`]: props.columnSpan,
      [`carbon-column--align-${props.columnAlign}`]: props.columnAlign,
      'carbon-column--column-divide': props.columnDivide
    }
  );
};

const Column = (props) => {
  return (
    <div className={ classes(props) }>
      { props.children }
    </div>
  );
};

/* eslint-disable react/no-unused-prop-types */
Column.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: PropTypes.node,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: PropTypes.string,

  /**
   * Classes applied by row component to affect all rows
   *
   * @property columnDivide
   * @type {Boolean}
   */
  columnClasses: PropTypes.string,

  /**
   * Show a divide between columns
   * This is defined on the Row Component
   *
   * @property columnDivide
   * @type {Boolean}
   */
  columnDivide: PropTypes.bool,

  /**
   * Alignment of content within column
   *
   * @property columnDivide
   * @type {String}
   */
  columnAlign: PropTypes.string,

  /**
   * Offset the column by n number of columns
   *
   * @property columnDivide
   * @type {String}
   */
  columnOffset: PropTypes.string,

  /**
   * Number of columns to span
   *
   * @property columnDivide
   * @type {String}
   */
  columnSpan: PropTypes.string
};

export default Column;
