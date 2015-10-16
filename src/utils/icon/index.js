import React from 'react';

var Icons = (props) => {
  debugger
  var { className, type, ...other } = this.props;
  var iconClass = className + " icon-" + type
  return <span className={ iconClass } {...other} ></span>;
};

export default Icons;
