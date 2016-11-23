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

const styles = [
   { name: 'Colors', href: '/colors' },
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
        <SidebarHeader className='demo-menu__header' />

        <MenuList
          className='demo-menu__menu'
          toggleable={ false }
          initiallyOpen={ true }
        >
          <MenuListItem><Link>Getting Started</Link></MenuListItem>
          <MenuListItem>
            <MenuList title='Components' filter={ true }>
              { this.componentsHTML }
            </MenuList>
          </MenuListItem>
          <MenuListItem><Link>Patterns</Link></MenuListItem>
          <MenuListItem>
            <MenuList title='Style' filter={ true }>
              { this.stylesHTML }
            </MenuList>
          </MenuListItem>
          <MenuListItem><Link>Articles</Link></MenuListItem>
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
