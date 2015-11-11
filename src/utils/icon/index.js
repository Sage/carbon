import React from 'react';

var Icons = (props) => {
  var { className, type, ...otherProps } = props;

  className = className + " icon-" + type;

  return <span className={ className } { ...otherProps }></span>;
};

export default Icons;
