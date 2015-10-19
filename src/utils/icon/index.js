import React from 'react';

var Icons = (props) => {
  var { className, type, ...other } = props;
  var iconClass = className + " icon-" + type
  return <span className={ iconClass } {...other} ></span>;
};

export default Icons;
