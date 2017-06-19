import React from 'react';

import ComponentShowcase from './component-showcase';
import GetStarted from './get-started';
import PageHeaderLarge from '../../common/page-header-large';
import SageLovesCarbon from './sage-loves-carbon';
import SellingPoints from './selling-points';
import Sectioniser from './sectioniser';
import Wrapper from './../../common/wrapper';

import CopyToClipboard from 'components/copy-to-clipboard';

class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <div style={{ width: '60%', height: '60%', margin: '20%' }}>
          <CopyToClipboard copyData='Foo'>
            <div style={{ width: '50%',paddingBottom: '50%',backgroundColor: 'hsl(25, 60%, 60%)', display: 'inline-block' }}>

            </div>
            <div style={{ width: '50%',paddingBottom: '50%',backgroundColor: 'hsl(115, 60%, 60%)', display: 'inline-block' }}>

            </div>
            <div style={{ width: '50%',paddingBottom: '50%',backgroundColor: 'hsl(205, 60%, 60%)', display: 'inline-block' }}>

            </div>
            <div style={{ width: '50%',paddingBottom: '50%',backgroundColor: 'hsl(295, 60%, 60%)', display: 'inline-block' }}>

            </div>
          </CopyToClipboard>
        </div>
        <div style={{ width: '60%', height: '60%', margin: '20%' }}>
          <CopyToClipboard copyData='Bar'>
            <div style={{ width: '25%',paddingBottom: '25%',backgroundColor: 'hsl(70, 40%, 30%)', display: 'inline-block' }}>

            </div>
            <div style={{ width: '25%',paddingBottom: '25%',backgroundColor: 'hsl(160, 40%, 30%)', display: 'inline-block' }}>

            </div>
            <div style={{ width: '25%',paddingBottom: '25%',backgroundColor: 'hsl(250, 40%, 30%)', display: 'inline-block' }}>

            </div>
            <div style={{ width: '25%',paddingBottom: '25%',backgroundColor: 'hsl(340, 40%, 30%)', display: 'inline-block' }}>

            </div>
          </CopyToClipboard>
        </div>
        <Sectioniser
          minDepth='2'
          maxDepth='5'
        >
          <PageHeaderLarge />

          <ComponentShowcase />
          <SellingPoints />
          <SageLovesCarbon />
          <GetStarted />
        </Sectioniser>
      </div>
    );
  }
}

export default Home;
