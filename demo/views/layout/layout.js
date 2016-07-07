import React from 'react';
import RowDemo from './row-demo';
import TabsDemo from './tabs-demo';
import PodDemo from './pod-demo';
import ContentDemo from './content-demo';
import AppWrapperDemo from './app-wrapper-demo';
import NavigationBarDemo from './navigation-bar-demo';
import CarouselDemo from './carousel-demo';
import ShowEditPodDemo from './show-edit-pod-demo';

class Layout extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Layout</h1>
        <ShowEditPodDemo />
        <RowDemo />
        <CarouselDemo />
        <TabsDemo />
        <PodDemo />
        <PodDemo collapsed={ true } />
        <AppWrapperDemo />
        <NavigationBarDemo />
        <ContentDemo />
      </div>
    );
  }
}

export default Layout;
