import React from 'react';
import Sectioniser from './sectioniser';
import styled from 'styled-components';

import { ScrollableList, ScrollableItemWrapper, ScrollableListItem }  from '../../../../src/components/scrollable-list';
import './demo-site.scss';

const Divider = ({ background }) => <div style={ { height: '100%', width: '100%', background } }>divider</div>;
const MiniApp = () => {
  return (
    <div style={ { display: 'flex' } }>
      <h2>Mini App</h2>
      <button>Increment - </button>
      <button>Decrement + </button>
    </div>
  )
}

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
          <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(40, 40, 250, 0.5)'}}>This header should not be selectable:</div>
          {/* <ScrollableListItem >sub 0</ScrollableListItem>
          <div>--- nor should this div be ---</div>
          <ScrollableListItem >sub 3</ScrollableListItem>
          <ScrollableListItem >sub 4</ScrollableListItem>
          <div>--- nor should this div be ---</div>
          <ScrollableListItem >sub 3</ScrollableListItem>
          <ScrollableListItem >sub 4</ScrollableListItem>
          <div>--- nor should this div be ---</div>
          <CustomItem isSelectable>Style changes on select</CustomItem>
          <ScrollableListItem >sub 3</ScrollableListItem>
          <ScrollableListItem >sub 4</ScrollableListItem>
          <div>--- nor should this div be ---</div>
          <ScrollableListItem >sub 3</ScrollableListItem>
          <MiniApp />
          <ScrollableListItem >sub 4</ScrollableListItem>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(240, 40, 250, 0.5)'}}>This footer should not be selectable:</div> */}
        </ScrollableList>
      </div>
     
    );
  }
}

export default Home;
