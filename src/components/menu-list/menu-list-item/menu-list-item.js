import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../../utils/helpers/tags';
import './menu-list-item.scss';

class MenuListItem extends React.Component {
  static propTypes = {
    /**
     * Children elements
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node.isRequired,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string
  }

  constructor(...args) {
    super(...args);

    this.mainClasses = this.mainClasses.bind(this);
  }

  mainClasses() {
    return classNames(
      'carbon-menu-list-item',
      this.props.className
    );
  }

  render () {
    return (
      <li className={ this.mainClasses() } { ...tagComponent('menu-list-item', this.props) }>
        { this.props.children }
      </li>
    );
  }
}

export default MenuListItem;
