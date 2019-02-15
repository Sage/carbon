import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Portal from '../../../components/portal';
import filterChildren from '../../../utils/filter-children';
import { ScrollableList, ScrollableListItem } from '../../../components/scrollable-list';

class SelectList extends React.Component {
  static propTypes = {
    alwaysHighlight: PropTypes.bool,
    children: PropTypes.node,
    customFilter: PropTypes.func,
    filterValue: PropTypes.string,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onSelect: PropTypes.func,
    target: PropTypes.object
  }

  list = React.createRef();

  componentDidUpdate() {
    this.positionList();
  }

  positionList = () => {
    if (!this.props.target) return;
    const inputBoundingRect = this.props.target.getBoundingClientRect();
    const top = `${inputBoundingRect.top + inputBoundingRect.height + window.pageYOffset}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this.list.current.setAttribute('style', `left: ${left}; top: ${top}; width: ${width}; position: absolute;`);
  }

  // returns the data structure for the value of an item when selected
  itemId({ value, text, options }) {
    return { value, text, ...options };
  }

  noResultsText(value) {
    if (value) {
      return I18n.t('select.no_results_for_term', {
        defaultValue: 'No results for "%{term}"',
        term: value
      });
    }

    return I18n.t('select.no_results', {
      defaultValue: 'No results'
    });
  }

  filter(value, filter) {
    return filterChildren({
      value,
      filter,
      onNoResults: () => (
        <ScrollableListItem isSelectable={ false }>
          { this.noResultsText(value) }
        </ScrollableListItem>
      )
    });
  }

  render() {
    const {
      alwaysHighlight,
      children,
      customFilter,
      filterValue,
      onLazyLoad,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onSelect
    } = this.props;

    const filter = this.filter(filterValue, customFilter);

    return (
      <Portal onReposition={ this.positionList }>
        <div
          role='presentation'
          onMouseLeave={ onMouseLeave }
          onMouseEnter={ onMouseEnter }
          onMouseDown={ onMouseDown }
          ref={ this.list }
        >
          <ScrollableList
            onLazyLoad={ onLazyLoad }
            onSelect={ onSelect }
            alwaysHighlight={ alwaysHighlight }
            keyNavigation
          >
            {
              filter(children, child => (
                <ScrollableListItem
                  id={ this.itemId(child.props) }
                  isSelectable={ child.props.isSelectable }
                >
                  { child }
                </ScrollableListItem>
              ))
            }
          </ScrollableList>
        </div>
      </Portal>
    );
  }
}

export default SelectList;
