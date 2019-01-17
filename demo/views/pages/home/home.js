import React from 'react';
import Sectioniser from './sectioniser';
import styled from 'styled-components';

import { ScrollableList, ScrollableItemWrapper, ScrollableListItem }  from '../../../../src/components/scrollable-list';
import './demo-site.scss';

const Divider = ({ background }) => <div style={ { height: '100%', width: '100%', background } }>divider</div>;

const CustomItem = styled.div`
  background: ${({isSelected}) => isSelected && `rgba(40, 250, 20, 0.8)`};
`;


class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div style={{ height: '400px', width: '500px'}}>
        <ScrollableList 
          onLazyLoad={() => console.log('lazy load now')}
          onSelect={(id) => console.log(id, 'SELECTED')}
          keyNavigation
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(40, 40, 250, 0.5)'}}>This header should not be selectable:</div>
          <ScrollableListItem >0</ScrollableListItem>
          <div>--- nor should this div be ---</div>
          <ScrollableListItem >3</ScrollableListItem>
          <ScrollableListItem >4</ScrollableListItem>
          <div isSelectable>This item is not a ScrollableItemList is selectable because it has a prop</div>
          <ScrollableListItem >5</ScrollableListItem>
          <ScrollableListItem >6</ScrollableListItem>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(40, 40, 250, 0.3)'}}>This sub-header should not be selectable:</div>
          <ScrollableListItem >7</ScrollableListItem>
          <CustomItem isSelectable>This component's style is determined by the isSelected prop</CustomItem>
          <ScrollableListItem >8</ScrollableListItem>
    
        </ScrollableList>

      </div>
     
    );
  }
}

export default Home;
