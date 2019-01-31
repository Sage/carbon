import React from 'react';

import AlertBanner from './alert-banner';
import ComponentShowcase from './component-showcase';
import GetStarted from './get-started';
import PageHeaderLarge from '../../common/page-header-large';
import SageLovesCarbon from './sage-loves-carbon';
import SellingPoints from './selling-points';
import Sectioniser from './sectioniser';
import Wrapper from './../../common/wrapper';

import { ScrollableList, ScrollableListItem } from '../../../../src/components/scrollable-list';

import './demo-site.scss';

class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div
      >
        <ScrollableList
          keyNavigation
        >
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
        
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
          <ScrollableListItem>1</ScrollableListItem>
        
        
        </ScrollableList>

      </div>
    );
  }
}

export default Home;
