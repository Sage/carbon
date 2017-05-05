import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Column = (props) => {
  const columnClasses = classNames(
    "carbon-column",
    props.className, {
      [`carbon-column--offset-${ props.columnOffset }`]: props.columnOffset,
      [`carbon-column--span-${ props.columnSpan }`]: props.columnSpan,
      [`carbon-column--align-${ props.columnAlign }`]: props.columnAlign,
      "carbon-column--column-divide": props.columnDivide
    }
  );

  return (
    <div className={ columnClasses } >
      { props.children }
    </div>
  );
}

Column.PropTypes = {
  columnAlign: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),

  columnOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),

  columnSpan: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),

  columnDivide: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

export default Column;
