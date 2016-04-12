import React from 'react';
import classNames from 'classnames';

/**
 * @class Tile
 * @constructor
 */
class Tile extends React.Component {
  static propTypes = {
    /**
     * A required prop. This is what the Tile will display.
     *
     * @property children
     * @type {Multiple}
     */
    children: React.PropTypes.node.isRequired
  }

  /**
   * Main class getter
   *
   * @method mainClasses
   * @return {void}
   */
  get mainClasses() {
    return classNames("ui-tile", this.props.className);
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        { this.props.children }
      </div>
    );
  }
}

export default Tile;
