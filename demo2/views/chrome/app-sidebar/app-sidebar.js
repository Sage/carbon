import React from 'react';

import Link from 'components/link';
import { Sidebar, SidebarHeader } from 'components/sidebar';
import { MenuListItem, MenuList } from 'components/menu-list';

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
        className="carbon-app-sidebar"
        position="left"
        size='small'
        open={ true }
        enableBackgroundUI={ !this.props.isTablet }
      >
        <SidebarHeader>
          Carbon
        </SidebarHeader>

        <MenuList
          className='carbon-app-sidebar__menu'
          toggleable={ false }
          initiallyOpen={ true }
        >
          <MenuListItem><Link tabIndex='10'>Getting Started</Link></MenuListItem>
          <MenuListItem><MenuList title='Components' filter={ true }>
            { this.componentsHTML }
          </MenuList></MenuListItem>
          <MenuListItem><MenuList title='Patterns' filter={ false }>
            <MenuListItem><Link name={ 'Items' }>Items</Link></MenuListItem>
            <MenuListItem><Link name={ 'Stuff' }>Stuff</Link></MenuListItem>
            <MenuListItem><Link name={ 'Things' }>Things</Link></MenuListItem>
          </MenuList></MenuListItem>
          <MenuListItem><Link tabbable={ false } >Style</Link></MenuListItem>
          <MenuListItem><Link>Articles</Link></MenuListItem>
        </MenuList>

      </Sidebar>
    );
  }
}

export default AppSidebar;
