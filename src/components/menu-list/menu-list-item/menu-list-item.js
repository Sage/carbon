import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { tagComponent } from '../../../utils/helpers/tags';

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
      <li className={ this.mainClasses() } { ...tagComponent('menu-list-item', this.props) }>
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
