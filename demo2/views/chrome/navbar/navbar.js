import React from 'react';
import Button from 'components/button';
import Icon from 'components/icon';

class Navbar extends React.Component {
  render() {
    return (
      <div className='carbon-homepage__navbar'>
        <Button><Icon type='hamburger'/> Menu</Button>
      </div>
    );
  }
}

export default Navbar;
