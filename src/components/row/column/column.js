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
   * This component supports children.
   */
  children: PropTypes.node,

  /**
   * Classes to apply to the component.
   */
  className: PropTypes.string,

  /**
   * Classes applied by row component to affect all rows
   */
  columnClasses: PropTypes.string,

  /**
   * Show a divide between columns. This is defined by the row component.
   */
  columnDivide: PropTypes.bool,

  /**
   * Alignment of content within column.
   */
  columnAlign: PropTypes.string,

  /**
   * Offset this column by a certain number of columns.
   */
  columnOffset: PropTypes.string,

  /**
   * Span this column by a certain number of columns.
   */
  columnSpan: PropTypes.string
};

export default Column;
