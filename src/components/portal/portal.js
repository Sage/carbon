import React from 'react';
import ReactPortal from 'react-portal';
import PropTypes from 'prop-types';

class Portal extends React.Component {
  static propTypes = {
    /**
     * Determine if the portal is visible or not
     *
     * @property open
     * @type {Boolean}
    */
    open: PropTypes.bool,

    /**
     * The content of the portal.
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node
  }

  render() {
    return (
      <ReactPortal isOpened={ this.props.open }>
        <div ref={ (node) => { this._portal = node; } }>
          { this.props.children }
        </div>
      </ReactPortal>
    );
  }
}

export default Portal;
