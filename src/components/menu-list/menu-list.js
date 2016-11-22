import classNames from 'classnames';
import escapeStringRegexp from 'escape-string-regexp';
import React, { PropTypes } from 'react';

import Link from 'components/link';
import Textbox from 'components/textbox';

import MenuListItem from './menu-list-item';

import { find } from 'lodash';

/**

 *
 * == How to use a MenuList in a component:
 *
 * In your file:
 *
 *   import { MenuList, MenuListItem } from 'carbon/lib/components/menu-list';
 *
 * To render the Link:
 *
 *  <MenuList href='foo'>
 *    <MenuListItem>foo</MenuListItem>
 *    <MenuListItem>bar</MenuListItem>
 *    <MenuListItem>
 *      <MenuList>
 *        I'm nestable
 *      </MenuList>
 *    </MenuListItem>
 *  </MenuList>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class MenuList
 * @constructor
 */
class MenuList extends React.Component {
  constructor(...args) {
    super(...args);

    this.filterHTML = this.filterHTML.bind(this);
    this.mainClasses = this.mainClasses.bind(this);
    this.menuItems = this.menuItems.bind(this);
    this.menuTitle = this.menuTitle.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showMenuItems = this.showMenuItems.bind(this);
    this.toggleChildren = this.toggleChildren.bind(this);
    this.filteredItems = this.filteredItems.bind(this);
  }

  static propTypes = {
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
    filter: PropTypes.bool,
    title: PropTypes.string,
    collapsible: PropTypes.bool,
    tags: PropTypes.array
  };

  state = {
    filter: '',
    open: this.props.initiallyOpen || false
  }

  static defaultProps = {
    filter: false,
    collapsible: true
  }

  render() {
    return (
      <div>
        { this.menuTitle() }
        <ul className={ this.mainClasses() }>
          { this.menuItems() }
        </ul>
      </div>
    );
  }

  /** Actions **/
  onSearch(ev) {
    this.setState({ filter: ev.target.value, open: true });
  }

  toggleChildren(){
    this.setState({ open: !this.state.open });
  }

  /** Helpers **/

  showMenuItems() {
    return (!this.props.title || !this.props.collapsible) || this.state.open;
  }

  /** Markup **/
  filterHTML() {
    if (!this.props.filter) { return null; }

    return (<MenuListItem key={ 'filter' }><Textbox onChange={ this.onSearch } value={ this.state.filter } autoFocus={ true }/></MenuListItem>);
  }

  mainClasses() {
    return classNames(
      "carbon-menu-list",
      this.props.className
    );
  }

  menuItems() {
    if (this.showMenuItems()) {
      let items = this.props.children;

      if (this.props.filter && this.state.filter) {
        items = this.filteredItems(items);
      }

      return ([
        this.filterHTML(),
        items
      ]);
    }
  }

  menuTitle() {
    if (!this.props.title) { return null; }

    return (
      <Link className='carbon-menu-list__title' onClick={ this.toggleChildren }>
        { this.props.title }
      </Link>
    );
  }

  filteredItems(items) {
    let regex = new RegExp(escapeStringRegexp(this.state.filter), 'i');
    return items.filter((child) => {
      return this.filterMatchesName(child, regex) || this.filterMatchesTag(child, regex);
    });
  }

  filterMatchesName(child, regex) {
    return child.props.name.search(regex) > -1;
  }

  filterMatchesTag(child, regex) {
    return child.props.tags && find(child.props.tags, (tagChild => { return tagChild.search(regex) > -1; }));
  }
}

export { MenuListItem, MenuList };
