import React from 'react';
import Button from 'components/button';
import Icon from 'components/icon';

import DemoActions from '../../../actions/demo';

import I18n from 'i18n-js';

class Header extends React.Component {
  render() {
    return (
      <div className='demo-header'>
        <Button
          className='demo-header__menu-toggle'
          onClick={ DemoActions.toggleMenu }
          theme='white'
        >
          <Icon type='hamburger' />
          { I18n.t('menu') }
        </Button>
      </div>
    );
  }
}

export default Header;
