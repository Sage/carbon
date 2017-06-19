import React from 'react';

const DrawerItem = props => {
  return (
  <a href={props.href} className="carbon-switcher-app-item">
            {props.name}
  </a> );
};

export default DrawerItem;