import React from 'react';
import Sectioniser from './sectioniser';

import ScrollableList from '../../../../src/components/scrollable-list';
import './demo-site.scss';

class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div style={{ height: '100vh'}}>

        <ScrollableList 
          onLazyLoad={() => console.log('lazy load now')}
          keyNavigation  
        >
          {[...Array(15).keys()].map(i => <div>{`Item: ${i}`}</div>)}
        </ScrollableList>
      </div>
     
    );
  }
}

export default Home;
