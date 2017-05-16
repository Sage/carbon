import React from 'react';
import PropTypes from 'prop-types';

const Column = (props) => {
  return (
    <div className={ `carbon-column ${props.className}` }>
      { props.children }
    </div>
  );
};

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
};

export default Column;
