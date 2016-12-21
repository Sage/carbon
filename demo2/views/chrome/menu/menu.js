import React from 'react';

// Flux
import DemoActions from '../../../actions/demo';

// Carbon
import Link from 'components/link';
import { Sidebar, SidebarHeader } from 'components/sidebar';
import { MenuListItem, MenuList } from 'components/menu-list';

// Demo Site
import GetCodeButtons from '../../components/get-code-buttons';
import ComponentList from './component-list';

import I18n from 'i18n-js';

const styles = [
   { name: 'Colors', href: '/colors' },
   { name: 'Icons', href: '/icons' },
   { name: 'Text' }
];

class Menu extends React.Component {
  /**
   * @method render
   */
  get componentsHTML() {
    return ComponentList.map((item, i) => {
      return <MenuListItem key={ i } name={ item.name }><Link>{ item.name }</Link></MenuListItem>;
    });
  }
  get stylesHTML() {
    return styles.map((item, i) => {
      return <MenuListItem key={ i } name={ item.name }><Link href={ item.href }>{ item.name }</Link></MenuListItem>;
    });
  }

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
        <Link href='/'>
          <SidebarHeader className='demo-menu__header' />
        </Link>

        <MenuList
          className='demo-menu__menu'
          toggleable={ false }
          initiallyOpen={ true }
        >
          <MenuListItem>
            <Link>
              { I18n.t('navigation.getting_started') }
            </Link>
          </MenuListItem>
          <MenuListItem>
            <MenuList
              title={ I18n.t('components') }
              initiallyOpen={ this._initiallyOpen(ComponentList) }
              filter={ true }
            >
              { this.componentsHTML }
            </MenuList>
          </MenuListItem>
          <MenuListItem>
            <Link>
              { I18n.t('navigation.patterns') }
            </Link>
          </MenuListItem>
          <MenuListItem>
            <MenuList
              title={ I18n.t('navigation.style') }
              initiallyOpen={ this._initiallyOpen(styles) }
              filter={ true }
            >
              { this.stylesHTML }
            </MenuList>
          </MenuListItem>
          <MenuListItem>
            <Link>
              { I18n.t('navigation.articles') }
            </Link>
          </MenuListItem>
        </MenuList>

        <div className='demo-menu__buttons'>
          { GetCodeButtons.github() }
          { GetCodeButtons.download('grey') }
        </div>

      </Sidebar>
    );
  }

  _initiallyOpen = (menuItems) => {
    let openCount = 0;

    menuItems.forEach((menuItem) => {
      if (menuItem.href === window.location.pathname) {
        openCount ++;
      }
    });

    return (openCount > 0);
  }
}

export default Menu;
