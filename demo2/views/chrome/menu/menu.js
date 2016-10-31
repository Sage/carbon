import React from 'react';

// Flux
import DemoActions from '../../../actions/demo';

// Carbon
import Link from 'components/link';
import { Sidebar, SidebarHeader } from 'components/sidebar';
import { MenuListItem, MenuList } from 'components/menu-list';

// Demo Site
import GetCodeButtons from '../../components/get-code-buttons';

const components = [
   { name: 'One' },
   { name: 'Two' }
];
const patterns = [
   { name: 'One' },
   { name: 'Two' }
];

class AppSidebar extends React.Component {
  /**
   * @method render
   */
  get componentsHTML() {
    return components.map((item, i) => {
      return <MenuListItem><Link key={ i } name={ item.name }>{ item.name }</Link></MenuListItem>;
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
        size='extra-small'
      >
        <SidebarHeader className='demo-menu__header'>
          Carbon
        </SidebarHeader>

        <MenuList
          className='demo-menu__menu'
          toggleable={ false }
          initiallyOpen={ true }
        >
          <MenuListItem><Link tabIndex='10'>Getting Started</Link></MenuListItem>
          <MenuListItem>
            <MenuList title='Components' filter={ true }>
              { this.componentsHTML }
            </MenuList>
          </MenuListItem>
          <MenuListItem>
            <MenuList title='Patterns' filter={ false }>
              <MenuListItem><Link name={ 'Items' }>Items</Link></MenuListItem>
              <MenuListItem><Link name={ 'Stuff' }>Stuff</Link></MenuListItem>
              <MenuListItem><Link name={ 'Things' }>Things</Link></MenuListItem>
            </MenuList>
          </MenuListItem>
          <MenuListItem><Link>Style</Link></MenuListItem>
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

export default AppSidebar;
