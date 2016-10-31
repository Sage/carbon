import React from 'react';
import Button from 'components/button';
import Icon from 'components/icon';

import AppActions from './../../../actions/app';

class Navbar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <Button
          className='navbar__menu-toggle'
          onClick={ AppActions.toggleMenu }
          theme='white'
        >
          <Icon type='hamburger' />
          Menu
        </Button>
      </div>
    );
  }
}

export default Navbar;
