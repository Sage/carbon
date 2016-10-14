import React, { PropTypes } from 'react';
import classNames from 'classnames';


class ListItem extends React.Component {
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
      'carbon-list-item',
      this.props.className
    );
  }
}

export default ListItem;
