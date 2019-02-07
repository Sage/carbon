import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Portal from '../../../components/portal';
import filterChildren from '../../../utils/filter/filter.util';
import { ScrollableList, ScrollableListItem } from '../../../components/scrollable-list';

class SelectList extends React.Component {
  componentDidUpdate() {
    if (this.props.open) this.positionList();
  }

  _list = React.createRef();

  positionList = () => {
    const inputBoundingRect = this.props.target.getBoundingClientRect();
    const top = `${inputBoundingRect.top + inputBoundingRect.height + window.pageYOffset - 1}px`;
    const width = `${inputBoundingRect.width}px`;
    const left = `${inputBoundingRect.left}px`;
    this._list.current.setAttribute('style', `left: ${left}; top: ${top}; width: ${width}; position: absolute;`);
  }

  itemId({ value, text, options }) {
    return { value, text, ...options };
  }

  render() {
    if (!this.props.open) return null;

    const {
      children,
      customFilter,
      filter,
      filterType,
      onMouseEnter,
      onMouseLeave,
      onSelect
    } = this.props;

    let i18n;

    if (filter) {
      i18n = I18n.t('select.no_results_for_term', {
        defaultValue: 'No results for "%{term}"',
        term: filter
      });
    } else {
      i18n = I18n.t('select.no_results', {
        defaultValue: 'No results'
      });
    }

    const filtered = filterChildren({
      value: filter,
      filter: customFilter,
      filterType,
      noResults: () => (
        <ScrollableListItem isSelectable={ false }>{ i18n }</ScrollableListItem>
      )
    });

    return (
      <Portal onReposition={ this.positionList }>
        <div
          onMouseLeave={ onMouseLeave }
          onMouseEnter={ onMouseEnter }
          onMouseDown={ this.props.onMouseDown }
          ref={ this._list }
        >
          <ScrollableList onSelect={ onSelect } keyNavigation defaultHighlight={ this.props.defaultHighlight }>
            {
              filtered(children, child => (
                <ScrollableListItem id={ this.itemId(child.props) }>
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

SelectList.propTypes = {
  children: PropTypes.node,
  customFilter: PropTypes.func,
  filter: PropTypes.string,
  filterType: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  target: PropTypes.object
};

export default SelectList;
