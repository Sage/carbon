import React from 'react';
import RowDemo from './row-demo';
import TabsDemo from './tabs-demo';
import PodDemo from './pod-demo';
import ContentDemo from './content-demo';
import CarouselDemo from './carousel-demo';

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
        <ContentDemo />
      </div>
    );
  }
}

export default Layout;
