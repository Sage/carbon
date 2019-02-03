import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../../../components/portal';
import filterChildren from '../../../utils/filter/filter.util';
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
    const { filter } = this.props;

    return (
      <Portal onReposition={ this.positionList }>
        <div
          onMouseLeave={ this.props.onMouseLeave }
          onMouseEnter={ this.props.onMouseEnter }
          ref={ this._list }
        >
          <ScrollableList onSelect={ this.props.onSelect } keyNavigation>
            {
              filterChildren({ filter })(this.props.children, child => (
                <ScrollableListItem id={ { value: child.props.value, text: child.props.text } }>{ child }</ScrollableListItem>
              ))
            }
          </ScrollableList>
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


ScrollableList
  Option
    ScrollableListItem