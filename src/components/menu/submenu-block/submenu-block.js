import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../../utils/helpers/tags';
import './submenu-block.scss';

/**
 * Renders a menu block for inside of a submenu.
 */
class SubmenuBlock extends React.Component {
  static propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.node.isRequired,

    /**
     * Custom className
     */
    className: PropTypes.string
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      'carbon-submenu-block',
      this.props.className
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <div className={ this.classes } { ...tagComponent('submenu-block', this.props) }>
        { this.props.children }
      </div>
    );
  }
}

export default SubmenuBlock;
