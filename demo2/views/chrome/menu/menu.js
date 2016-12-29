import React from 'react';

// Flux
import DemoActions from '../../../actions/demo';

// Carbon
import Link from 'components/link';
import { Sidebar, SidebarHeader } from 'components/sidebar';
import { MenuListItem, MenuList } from 'components/menu-list';

// Demo Site
import GetCodeButtons from '../../components/get-code-buttons';
import Definitions from '../../../definitions';

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
    let defKey,
        i = 0,
        menuListItems = [];

    for (defKey in Definitions) {
      let def = Definitions[defKey];

      i++;

      menuListItems.push(<MenuListItem key={ i } name={ def.text.name }><Link to={ `/components/${def.key}` }>{ def.text.name }</Link></MenuListItem>);
    }

    return menuListItems;
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
              initiallyOpen={ this._initiallyOpen() }
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

  _initiallyOpen = () => {
    let defKey,
        openCount = 0;

    for (defKey in Definitions) {
      let menuItem = Definitions[defKey];

      if (menuItem.key === window.location.pathname) {
        openCount ++;
      }
    }
    return openCount > 0;
  }
}

export default Menu;
