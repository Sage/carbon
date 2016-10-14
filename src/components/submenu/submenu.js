import classNames from 'classnames';
import escapeStringRegexp from 'escape-string-regexp';
import React, { PropTypes } from 'react';
import { includes } from 'lodash';

import Link from 'components/link';
import TextBox from 'components/textbox';

import ListItem from './list-item';

class Submenu extends React.Component {
  constructor(...args) {
    super(...args);

    this.filterHTML = this.filterHTML.bind(this);
    this.itemNames = this.itemNames.bind(this);
    this.mainClasses = this.mainClasses.bind(this);
    this.menuItems = this.menuItems.bind(this);
    this.menuTitle = this.menuTitle.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showMenuItems = this.showMenuItems.bind(this);
    this.toggleChildren = this.toggleChildren.bind(this);
  }

  static propTypes = {
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
    filter: PropTypes.bool,
    title: PropTypes.string,
    togglable: PropTypes.bool
  };

  state = {
    filter: null,
    open: this.props.initiallyOpen || false,
    renderedItems: this.itemNames()
  }

  static defaultProps = {
    filter: false,
    togglable: true
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
    let regex = new RegExp(escapeStringRegexp(ev.target.value), 'i');

    let items = this.itemNames().filter((item) => {
      if (item.search(regex) > -1) {
        return item;
      }
    });

    this.setState({ filter: ev.target.value, renderedItems: items, open: true });
  }

  toggleChildren(){
    this.setState({ open: !this.state.open });
  }

  /** Helpers **/

  itemNames(){
    return this.props.children.map((child) => {
      return child.props.name;
    });
  }

  showMenuItems() {
    return !this.props.togglable || this.state.open;
  }

  /** Markup **/
  filterHTML() {
    if (!this.props.filter) { return null; }

    return (<ListItem key={ 'filter' }><TextBox onChange={ this.onSearch } value={ this.state.filter } /></ListItem>);
  }

  mainClasses() {
    return classNames(
      "carbon-submenu",
      this.props.className
    );
  }

  menuItems() {
    if (this.showMenuItems()) {
      let items = this.props.children.map((child, i) => {
        if (includes(this.state.renderedItems, child.props.name)) {
          return (<ListItem key={ i }>{ child }</ListItem>);
        }
      });

      return ([
        this.filterHTML(),
        items
      ]);
    }
  }

  menuTitle() {
    if (!this.props.title) { return null; }

    return (
      <Link className='carbon-submenu__title' onClick={ this.toggleChildren }>
        { this.props.title }
      </Link>
    );
  }
}

export default Submenu;
