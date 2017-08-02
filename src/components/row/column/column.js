import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Column = (props) => {
  const classes = classNames(
    'carbon-column',
    props.className,
    props.columnClasses, {
      [`carbon-column--offset-${props.columnOffset}`]: props.columnOffset,
      [`carbon-column--span-${props.columnSpan}`]: props.columnSpan,
      [`carbon-column--align-${props.columnAlign}`]: props.columnAlign,
      'carbon-column--column-divide': props.columnDivide
    }
  );

  return (
    <div className={ classes }>
      { props.children }
    </div>
  );
};

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
  className: PropTypes.string
};

export default Column;
