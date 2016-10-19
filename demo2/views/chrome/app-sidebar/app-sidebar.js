import React from 'react';
import { Sidebar, SidebarHeader } from 'components/sidebar';

class AppSidebar extends React.Component {
  render() {
    return (
      <Sidebar
        className="carbon-app-sidebar"
        position="left"
        open={ true }
        enableBackgroundUI={ !this.props.isTablet }
      >
        <SidebarHeader>
          Carbon
        </SidebarHeader>

        Menu
      </Sidebar>
    );
  }
}

export default AppSidebar;
