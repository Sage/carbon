import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class MenuListItem extends React.Component {
  constructor(...args) {
    super(...args);

    this.mainClasses = this.mainClasses.bind(this);
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.object
    ]).isRequired
  }

  render () {
    return (
      <li className={ this.mainClasses() }>
        { this.props.children }
      </li>
    );
  }

  mainClasses() {
    return classNames(
      'carbon-menu-list-item',
      this.props.className
    );
  }
}

export default MenuListItem;
