import React from 'react';

const DrawerSection = props => {
  return (
  <div>
    <div className = 'carbon-switcher-section-title' > {props.title} </div>
    <div>{props.items}</div>
  </div> );
};

export default DrawerSection;