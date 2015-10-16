import React from 'react';

var Icons = (props) => {
  var iconClass = props.className + " icon-" + props.type
  return <span className={ iconClass }></span>;
};

export default Icons;
