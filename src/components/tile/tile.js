import React from 'react';

/**
 * @class Tile
 * @constructor
 */
class Tile extends React.Component {
  render() {
    return (
      <div className="ui-tile">
        { this.props.children }
      </div>
    );
  }
}

export default Tile;
