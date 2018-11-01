import React from 'react';

import AlertBanner from './alert-banner';
import ComponentShowcase from './component-showcase';
import GetStarted from './get-started';
import PageHeaderLarge from '../../common/page-header-large';
import SageLovesCarbon from './sage-loves-carbon';
import SellingPoints from './selling-points';
import Sectioniser from './sectioniser';
import Wrapper from './../../common/wrapper';

class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <Sectioniser
        minDepth='2'
        maxDepth='5'
      >
        <AlertBanner />
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
