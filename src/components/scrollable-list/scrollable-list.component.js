import React, { Component } from 'react';
import tagComponent from '../../utils/helpers/tags';
import ScrollableListItem from './scrollable-list-item.component';
import ScrollableListContainer from './scrollable-list.style';
import propTypes from './scrollable-list.proptypes';

const ScrollableListContext = React.createContext();

class ScrollableList extends Component {
  static propTypes = propTypes
  
  state = {
    selectedItem: 0
  }
  
  scrollBox = React.createRef();

  componentDidMount() {
    this.props.keyNavigation && document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown');
  }

  handleScroll = ({ target: { scrollTop, scrollHeight } }) => {
    if (!this.props.onLazyLoad) return null;

    if((scrollHeight - scrollTop) < 200) this.props.onLazyLoad();
  }

  handleKeyDown = (e) => {
    e.preventDefault();

    const { selectedItem } = this.state,
      end = this.props.children.length - 1,
      atEnd = selectedItem === end,
      atStart = selectedItem === 0;

    let newPos;

    switch(e.key) {
      case 'ArrowDown': newPos = atEnd ? 0 : selectedItem + 1; break;
      case 'ArrowUp': newPos = atStart ? end : selectedItem - 1; break;
      case 'Enter': this.props.onSelect(selectedItem); break;
      default: return null;
    };

    this.setState({ selectedItem: newPos });
  }

  render() {
    const { children, onSelect } = this.props;
    const { selectedItem } = this.state;

    return (
      <ScrollableListContainer 
        ref={ this.scrollBox }
        onScroll={ this.handleScroll } 
        { ...this.props }
        { ...tagComponent('scrollable-list', this.props) }
      >
        <ScrollableListContext.Provider value={
          {
            onMouseOver: selectedItem => this.setState({ selectedItem }),
            onClick: selectedItem => onSelect(selectedItem)
          }
        }>
          {
            children && 
            children.map((child, i) => 
              <ScrollableListItem id={i} isSelected={selectedItem === i}>
                {child}
              </ScrollableListItem>)
          }
        </ScrollableListContext.Provider>
      </ScrollableListContainer>
    )
  }
  
}

export { ScrollableList, ScrollableListContext };