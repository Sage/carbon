import React from 'react';
import RowDemo from './row-demo';
import TabsDemo from './tabs-demo';
import PodDemo from './pod-demo';
import ContentDemo from './content-demo';
import DetailDemo from './detail-demo';
import AppWrapperDemo from './app-wrapper-demo';
import HeadingDemo from './heading-demo';
import NavigationBarDemo from './navigation-bar-demo';
import CarouselDemo from './carousel-demo';
import ShowEditPodDemo from './show-edit-pod-demo';
import InlineInputsDemo from './inline-inputs-demo';

class Layout extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Layout</h1>
        <RowDemo />
        <CarouselDemo />
        <TabsDemo />
        <PodDemo />
        <PodDemo collapsed={ true } />
        <ShowEditPodDemo />
        <AppWrapperDemo />
        <HeadingDemo />
        <NavigationBarDemo />
        <ContentDemo />
        <DetailDemo />
        <InlineInputsDemo />
      </div>
    );
  }
}

export default Layout;
