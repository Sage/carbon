import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../utils/helpers/tags';
import Events from '../../utils/helpers/events';
import asScrollableListItem from './as-scrollable-list-item.wrapper';
import ScrollableListContext from './scrollable-list.context';
import ScrollableListContainer from './scrollable-list.style';


class ScrollableList extends Component {
  static propTypes = {
    alwaysHighlight: PropTypes.bool, // ensures an item is always highlighted
    children: PropTypes.node,
    keyNavigation: PropTypes.bool,
    maxHeight: PropTypes.string,
    onLazyLoad: PropTypes.func,
    onSelect: PropTypes.func
  };

  state = {
    selectedItem: -1 // defaults to nothing being highlighted
  }

  scrollBox = React.createRef()

  componentWillReceiveProps(nextProps) {
    // if selected item is beyond the number of children then reset it (eg. through filtering)
    if ((this.state.selectedItem + 1) > React.Children.count(nextProps.children)) {
      let selectedItem = -1;
      if (nextProps.alwaysHighlight) selectedItem = this.nextSelectable('down', selectedItem);
      this.setState({ selectedItem });
      this.scrollBox.current.scrollTop = 0;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.keyNavigation && !this.props.keyNavigation) {
      document.removeEventListener('keydown', this.handleKeyDown);
    } else if (!prevProps.keyNavigation && this.props.keyNavigation) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentDidMount() {
    if (this.props.keyNavigation) {
      document.addEventListener('keydown', this.handleKeyDown);
    }

    if (this.props.alwaysHighlight) {
      const selectedItem = this.nextSelectable('down', -1);
      this.setState({ selectedItem });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  updateScroll(item) {
    const { current: list } = this.scrollBox;
    if (!list) return;
    const { offsetHeight: listHeight, children } = list;
    if (!children[item]) return;
    const { offsetTop: itemTop, offsetHeight: itemHeight } = children[item];

    if ((itemTop + itemHeight) > listHeight) {
      // set the bottom of the scroll box to the bottom of the selected item
      list.scrollTop = this.setScrollTop({
        item, children, listHeight, itemHeight
      });
    } else {
      list.scrollTop = 0;
    }
  }

  setScrollTop({
    item, children, listHeight, itemHeight
  }) {
    // total height of list up to selected item
    const scrollPos = [...children].slice(0, item).reduce(this.buildHeightReducer, 0);
    return scrollPos - listHeight + itemHeight;
  }

  buildHeightReducer(acc, { offsetHeight }) { return acc + offsetHeight; }

  nextSelectable(direction, position) {
    if (!this.props.children) return null;

    const limit = this.props.children.length;

    if (!limit) return null;

    const change = direction === 'down' ? 1 : -1,
        testIndex = position + change;

    if (testIndex <= -1) return this.nextSelectable(direction, limit);

    if (testIndex === limit) return this.nextSelectable(direction, -1);

    const testNode = this.props.children[testIndex];

    return this.isSelectable(testNode) ? testIndex : this.nextSelectable(direction, testIndex);
  }

  isSelectable(node) {
    return node.props.isSelectable;
  }

  renderChildren(children) {
    return React.Children.map(children, (child, index) => {
      if (!child.props.isSelectable) return child;
      const isSelected = index === this.state.selectedItem;
      return asScrollableListItem(child, index, isSelected);
    });
  }

  selectItem = (itemIndex) => {
    const selectedItem = this.props.children[itemIndex];
    if (!this.props.onSelect || !selectedItem) return;
    this.props.onSelect(selectedItem.props.id);
  }

  handleMouseOver = selectedItem => this.setState({ selectedItem })

  handleScroll = ({ target: { scrollTop, scrollHeight } }) => {
    if (!this.props.onLazyLoad) return;
    if ((scrollHeight - scrollTop) < 300) this.props.onLazyLoad();
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
      return;
    } else if (Events.isTabKey(e)) {
      const index = this.state.selectedItem;
      if (index > -1) this.selectItem(index);
      return;
    } else { return; }

    this.updateScroll(newPos);
    this.setState({ selectedItem: newPos });
  }

  render() {
    const { children, onLazyLoad, ...props } = this.props;

    return (
      <ScrollableListContainer
        ref={ this.scrollBox }
        onScroll={ this.handleScroll }
        { ...props }
        { ...tagComponent('scrollable-list', props) }
      >
        <ScrollableListContext.Provider value={
          {
            onMouseOver: this.handleMouseOver,
            onClick: this.selectItem
          }
        }
        >
          { this.renderChildren(children) }
        </ScrollableListContext.Provider>
      </ScrollableListContainer>
    );
  }
}

export default ScrollableList;
