import React from 'react';

import ComponentShowcase from './component-showcase';
import GetStarted from './get-started';
import PageHeaderLarge from '../../common/page-header-large';
import SageLovesCarbon from './sage-loves-carbon';
import SellingPoints from './selling-points';
import Sectioniser from './sectioniser';
import Wrapper from './../../common/wrapper';
import './demo-site.scss';

class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <Sectioniser
        minDepth='0'
        maxDepth='0'
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
