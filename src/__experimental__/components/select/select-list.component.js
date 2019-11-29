import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Portal from '../../../components/portal';
import filterChildren from '../../../utils/filter-children';
import { ScrollableList, ScrollableListItem } from '../../../components/scrollable-list';

class SelectList extends React.Component {
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

  /**
   * Find and highlights search terms in text
   */
  highlightMatches = (optionText, value) => {
    if (!value.length || !optionText) return optionText;

    const parsedOptionText = optionText.toLowerCase();
    const valIndex = parsedOptionText.indexOf(value);

    if (valIndex === -1) {
      return optionText;
    }

    const beginning = optionText.substr(0, valIndex);
    const middle = optionText.substr(valIndex, value.length);
    let end = optionText.substr(valIndex + value.length, optionText.length);

    // find end of string recursively
    if (end.indexOf(value) !== -1) {
      end = this.highlightMatches(end, value);
    }

    // build JSX object
    const newValue = [
      <span key='beginning'>{ beginning }</span>,
      <strong key='middle'>{ middle }</strong>,
      <span key='end'>{ end }</span>
    ];

    return newValue;
  }

  render() {
    const {
      id,
      isLoopable,
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
          id={ id }
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
            isLoopable={ isLoopable }
            keyNavigation
          >
            {
              filter(children, (child) => {
                const { text, ...props } = child.props;
                return (
                  <ScrollableListItem
                    id={ this.itemId(child.props) }
                    isSelectable={ child.props.isSelectable }
                  >
                    {
                      React.cloneElement(
                        child,
                        {
                          children: this.highlightMatches(text, String(filterValue)),
                          text,
                          ...props
                        }
                      )
                    }
                  </ScrollableListItem>
                );
              })
            }
          </ScrollableList>
        </div>
      </Portal>
    );
  }
}

SelectList.propTypes = {
  /** The ID for the parent <div> */
  id: PropTypes.string,
  /** Ensure that there's always a highlighted option? */
  alwaysHighlight: PropTypes.bool,
  /** Child components (such as <Option>) for the <ScrollableList> */
  children: PropTypes.node,
  /** A custom function to filter the children. Its interface is (text, value) => boolean */
  customFilter: PropTypes.func,
  /** The value to filter the children by */
  filterValue: PropTypes.string,
  /** Flag to indicite whether select list is loopable while traversing using up and down keys */
  isLoopable: PropTypes.bool,
  /** A custom callback for when more data needs to be lazy-loaded when the user scrolls the dropdown menu list */
  onLazyLoad: PropTypes.func,
  /** A custom callback for the parent <div>'s MouseDown event */
  onMouseDown: PropTypes.func,
  /** A custom callback for the parent <div>'s MouseEnter event */
  onMouseEnter: PropTypes.func,
  /** A custom callback for the parent <div>'s MouseLeave event */
  onMouseLeave: PropTypes.func,
  /** A callback for when a child is selected */
  onSelect: PropTypes.func,
  /** Target DOM element to position the dropdown menu list relative to */
  target: PropTypes.object
};

export default SelectList;
