import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags';
import Events from '../../utils/helpers/events';
import wrapAsScrollableListConsumer from './as-scrollable-list-item.wrapper';
import ScrollableListContext from './scrollable-list.context';
import ScrollableListContainer from './scrollable-list.style';


class ScrollableList extends Component {
  static propTypes = {
    children: PropTypes.node,
    onSelect: PropTypes.func,
    onLazyLoad: PropTypes.func,
    keyNavigation: PropTypes.bool,
    maxHeight: PropTypes.string
  };

  state = {
    selectedItem: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keyNavigation && !this.props.keyNavigation) {
      document.removeEventListener('keydown', this.handleKeyDown);
    } else if (!prevProps.keyNavigation && this.props.keyNavigation) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  scrollBox = React.createRef();

  componentDidMount() {
    if (this.props.keyNavigation) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
    const initialSelectedItem = this.nextSelectable('down', -1);

    this.setState({ selectedItem: initialSelectedItem });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  updateScroll = (item) => {
    const { current: list } = this.scrollBox,
        { offsetHeight: listHeight, children } = list,
        { offsetTop: itemTop } = children[item];

    if (itemTop > listHeight) {
      // set the bottom of the scroll box to the bottom of the selected item
      list.scrollTop = this.setScrollTop(item);
    } else {
      list.scrollTop = 0;
    }
  }

  setScrollTop = (item) => {
    const { current: list } = this.scrollBox,
        listHeight = list.offsetHeight,
        { children } = list,
        itemHeight = children[item].offsetHeight;

    // total height of list up to selected item
    const scrollPos = [...children].slice(0, item).reduce(this.buildHeightReducer, 0);

    return scrollPos - listHeight + itemHeight;
  }

  buildHeightReducer = (acc, { offsetHeight }) => acc + offsetHeight

  handleScroll = ({ target: { scrollTop, scrollHeight } }) => {
    if (!this.props.onLazyLoad) return;

    if ((scrollHeight - scrollTop) < 200) this.props.onLazyLoad();
  }

  handleKeyDown = (e) => {
    const { selectedItem } = this.state;
    let newPos = selectedItem;

    if (Events.isUpKey(e)) {
      e.preventDefault();
      newPos = this.nextSelectable('up', newPos);
    } else if (Events.isDownKey(e)) {
      e.preventDefault();
      newPos = this.nextSelectable('down', newPos);
    } else if (Events.isEnterKey(e)) {
      e.preventDefault();
      this.selectItem(selectedItem);
    } else { return; }

    this.updateScroll(newPos);
    this.setState({ selectedItem: newPos });
  }

  nextSelectable = (direction, position) => {
    if (!this.props.children) return null;

    const limit = this.props.children.length;

    if (!limit) return null;

    const change = direction === 'down' ? 1 : -1,
        testIndex = position + change;

    if (testIndex === -1) return this.nextSelectable(direction, limit);

    if (testIndex === limit) return this.nextSelectable(direction, -1);

    const testNode = this.props.children[testIndex];

    return this.isSelectable(testNode) ? testIndex : this.nextSelectable(direction, testIndex);
  }

  isSelectable = (node) => {
    return node.props.isSelectable;
  }

  renderChildren = (children) => {
    return React.Children.map(children, (child, index) => {
      if (!child.props.isSelectable) return child;
      const isSelected = index === this.state.selectedItem;
      return wrapAsScrollableListConsumer(child, index, isSelected);
    });
  }

  handleMouseOver = selectedItem => this.setState({ selectedItem })

  selectItem = (itemIndex) => {
    if (!this.props.onSelect) return;
    this.props.onSelect(this.props.children[itemIndex].props.id);
  }

  render() {
    const { children } = this.props;

    return (
      <ScrollableListContainer
        ref={ this.scrollBox }
        onScroll={ this.handleScroll }
        { ...this.props }
        { ...tagComponent('scrollable-list', this.props) }
      >
        <ScrollableListContext.Provider value={
          {
            onMouseOver: this.handleMouseOver,
            onClick: this.selectItem
          }
        }
        >
          {this.renderChildren(children)}
        </ScrollableListContext.Provider>
      </ScrollableListContainer>
    );
  }
}

export default ScrollableList;
