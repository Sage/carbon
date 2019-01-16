import React, { Component } from 'react';
import tagComponent from '../../utils/helpers/tags';
import ScrollableListItem from './scrollable-list-item.component';
import ScrollableListContext from './scrollable-list.context';
import ScrollableListContainer from './scrollable-list.style';
import propTypes from './scrollable-list.proptypes';


class ScrollableList extends Component {
  static propTypes = propTypes

  state = {
    selectedItem: 0
  }

  scrollBox = React.createRef();

  componentDidMount() {
    if (this.props.keyNavigation) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown');
  }

  updateScroll = (item) => {
    const { current: list } = this.scrollBox,
        { offsetHeight: listHeight, children } = list,
        { offsetHeight: itemHeight, offsetTop: itemTop } = children[item];

    if (itemTop > listHeight) {
      list.scrollTop = (itemHeight * (item + 1) + 5) - listHeight;
    } else {
      list.scrollTop = 0;
    }
  }

  handleScroll = ({ target: { scrollTop, scrollHeight } }) => {
    if (!this.props.onLazyLoad) return;

    if ((scrollHeight - scrollTop) < 200) this.props.onLazyLoad();
  }

  handleKeyDown = (e) => {
    e.preventDefault();

    const { selectedItem } = this.state,
        end = this.props.children.length - 1,
        atEnd = selectedItem === end,
        atStart = selectedItem === 0;

    let newPos = selectedItem;

    switch (e.key) {
      case 'ArrowDown': newPos = atEnd ? 0 : selectedItem + 1; break;
      case 'ArrowUp': newPos = atStart ? end : selectedItem - 1; break;
      case 'Enter': this.props.onSelect(selectedItem); break;
      default: return;
    }

    this.updateScroll(newPos);

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
            onMouseOver: item => this.setState({ selectedItem: item }),
            onClick: item => onSelect(item)
          }
        }
        >
          {
            children
            && children.map((child, i) => (
              <ScrollableListItem id={ i } isSelected={ selectedItem === i }>
                {child}
              </ScrollableListItem>))}
        </ScrollableListContext.Provider>
      </ScrollableListContainer>
    );
  }
}

export { ScrollableList, ScrollableListContext };
