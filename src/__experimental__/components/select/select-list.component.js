import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../components/portal';
import { Filterable } from '../../../components/filterable';
import { ScrollableList, ScrollableListItem } from '../../../components/scrollable-list';

class SelectList extends React.Component {
  _list = React.createRef();

  positionList = () => {
    const inputBoundingRect = this.props.target.getBoundingClientRect();
    const top = `${inputBoundingRect.top + (inputBoundingRect.height) + window.pageYOffset}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this._list.current.setAttribute('style', `left: ${left}; top: ${top}; width: ${width}; position: absolute;`);
  }

  render() {
    if (!this.props.open) return null;

    return (
      <Portal onReposition={ this.positionList }>
        <div ref={ this._list }>
          <Filterable
            filter={ this.props.filter }
            filterType={ this.props.filterType }
            customFilter={ this.props.customFilter }
          >
            <ScrollableList onSelect={ this.props.onSelect } keyNavigation>
              {
                React.Children.map(this.props.children, child => (
                  <ScrollableListItem id={ { value: child.props.value, text: child.props.text } }>{ child }</ScrollableListItem>
                ))
              }
            </ScrollableList>
          </Filterable>
        </div>
      </Portal>
    );
  }
}

SelectList.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  filter: PropTypes.string,
  filterType: PropTypes.string,
  customFilter: PropTypes.func,
  target: PropTypes.object,
  onSelect: PropTypes.func
};

export default SelectList;
