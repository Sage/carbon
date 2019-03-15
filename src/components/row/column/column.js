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

Column.defaultProps = {
  columnOffset: '0',
  columnSpan: '1',
  columnAlign: 'left'
};

/* eslint-disable react/no-unused-prop-types */
Column.propTypes = {
  /**
   * Children elements
   *
   */
  children: PropTypes.node,

  /**
   * Custom className
   *
   */
  className: PropTypes.string,

  /**
   * Classes applied by row component to affect all rows
   *
   */
  columnClasses: PropTypes.string,

  /**
   * Show a divide between columns - defined on the Row Component
   *
   */
  columnDivide: PropTypes.bool,

  /**
   * Alignment of content within column
   *
   */
  columnAlign: PropTypes.string,

  /**
   * Offset the column by n number of columns
   *
   */
  columnOffset: PropTypes.string,

  /**
   * Number of columns to span
   *
   */
  columnSpan: PropTypes.string
};

export default Column;
