import React from 'react';

var Icons = (props) => {
  var { className, type, ...props } = props;

  className = className + " icon-" + type;

  return <span className={ className } { ...props }></span>;
};

export default Icons;
