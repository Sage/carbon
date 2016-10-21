import React from 'react';

import Link from 'components/link';
import { Sidebar, SidebarHeader } from 'components/sidebar';
import Submenu from 'components/submenu';

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
      return <Link key={ i } href='#' name={ item.name }>{ item.name }</Link>;
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

        <Submenu
          className='carbon-app-sidebar__menu'
          toggleable={ false }
          initiallyOpen={ true }
        >
          <Link>Getting Started</Link>
          <Submenu title='Components' filter={ true }>
            { this.componentsHTML }
          </Submenu>
          <Submenu title='Patterns' filter={ false }>
            <Link href='#' name={ 'Items' }>Items</Link>
            <Link href='#' name={ 'Stuff' }>Stuff</Link>
            <Link href='#' name={ 'Things' }>Things</Link>
          </Submenu>
          <Link>Style</Link>
          <Link>Articles</Link>
        </Submenu>

      </Sidebar>
    );
  }
}

export default AppSidebar;
