import React from 'react';
import I18n from 'i18n-js';

// Flux
import DemoActions from './../../../actions/demo';

// Carbon
import Link from 'components/link/link';
import { Sidebar, SidebarHeader } from 'components/sidebar';

// Demo Site
import SiteMap from './../../../site-map';
import GetCodeButtons from './../../../components/get-code-buttons';
import { MenuList } from 'components/menu-list';
import './menu.scss';

class Menu extends React.Component {
  render() {
    return (
      <Sidebar
        className="demo-menu"
        enableBackgroundUI={ !this.props.isTablet }
        onCancel={ this.props.isTablet ? DemoActions.toggleMenu : null }
        open={ this.props.menuOpen || !this.props.isTablet }
        position="left"
        size='small'
      >
        <SidebarHeader className='demo-menu__header'>
          <Link to='/' className='demo-menu__logo-link' />
        </SidebarHeader>

        <MenuList className='demo-menu__menu'>
          { SiteMap.generateMenu() }
        </MenuList>

        <div className='demo-menu__buttons'>
          { GetCodeButtons.github() }
          { GetCodeButtons.download('grey') }
        </div>
      </Sidebar>
    );
  }
}

export default Menu;
