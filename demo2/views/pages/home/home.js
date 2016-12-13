import React from 'react';

import ComponentShowcase from '../../page-sections/component-showcase';
import GetStarted from '../../page-sections/get-started';
import PageHeaderLarge from '../../page-sections/page-header-large';
import SageLovesCarbon from '../../page-sections/sage-loves-carbon';
import SellingPoints from '../../page-sections/selling-points';

import Sectioniser from '../../chrome/sectioniser';

class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <Sectioniser
        minDepth='20'
        maxDepth='45'
      >
        <PageHeaderLarge />
        <ComponentShowcase />
        <SellingPoints />
        <SageLovesCarbon />
        <GetStarted />
      </Sectioniser>
    );
  }
}

export default Home;
