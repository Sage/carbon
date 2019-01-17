import React, { Component } from 'react';
import tagComponent from '../../utils/helpers/tags';
import ScrollableListItem from './scrollable-list-item.component';
import ScrollableItemWrapper from './scrollable-item-wrapper.component';
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
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  updateScroll = (item) => {
    const { current: list } = this.scrollBox,
        { offsetHeight: listHeight, children } = list,
        { offsetHeight: itemHeight, offsetTop: itemTop } = children[item];

        console.log(children)
    
    const scrollPos = [...children].slice(0, item).reduce((acc, i) => acc + i.offsetHeight,0)
    // const newScroll = scrollPos + children[item].;
    console.log('scrollTo')
    console.log(scrollPos - listHeight)

    if (itemTop > listHeight) {
      list.scrollTop = scrollPos - listHeight + itemHeight;
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

    const { selectedItem } = this.state;
    let newPos = selectedItem;
  

    switch (e.key) {
      case 'ArrowDown': newPos = this.nextSelectable('down', newPos); break;
      case 'ArrowUp': newPos = this.nextSelectable('up', newPos); break;
      case 'Enter': this.props.onSelect(selectedItem); break;
      default: return;
    }

    this.updateScroll(newPos);

    this.setState({ selectedItem: newPos });
  }

  nextSelectable = (direction, position) => {
    const { length: limit } = this.props.children;
    console.log('NEXTSELECTABLE')
    console.log('limit', limit)
    const change = direction === 'down' ? 1 : -1,
        testIndex = position + change;

    console.log(direction, 'from position: ', position);
    console.log('testIndex is: ', testIndex);
    

    if (testIndex === -1) return this.nextSelectable(direction, limit);

    if (testIndex === limit) return this.nextSelectable(direction, -1);
    const testNode = this.props.children[testIndex];

    console.log('testNode is', testNode);

    return this.isSelectable(testNode) ? testIndex : this.nextSelectable(direction, testIndex);
  }

  isSelectable = (node) => {
    // console.log('ISSELECTABLE')
    // console.log(node)
    // const conditions = {
    //   typeof: typeof node,
    //   node,
    //   isSelectableProp: node.props.isSelectable,
    //   type: node.props.type
    // }
    // Object.keys(conditions).forEach((key) => console.log(key, conditions[key]));
    return node.props.isSelectable;
  }

  renderChildren = (children) => {
    console.log('list render children:', children)
    
    return children.map((Child, i) => {
      // console.log('Child to map', Child);
      // console.log(<Child.type { ...Child.props } />)
      // console.log('CHILD PROPS: ',Child.props);
      // console.log('index to send to child: ', i);
      if (Child.props.isSelectable) {
        // console.log('child is selectable')
        // console.log('wrapper returns: ', ScrollableItemWrapper(Child.type, Child.props))
        return ScrollableItemWrapper(Child.type, {...Child.props, id: i });
      }
      
      
      return <Child.type id={ i } { ...Child.props } />;

    })
  }

  render() {
    const { children, onSelect } = this.props;
    const { selectedItem } = this.state;
    console.log(this.state.selectedItem);

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
            onClick: item => onSelect(item),
            isSelected: item => item === selectedItem
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
