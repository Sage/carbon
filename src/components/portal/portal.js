import React from 'react';
import { Portal as ReactPortal }  from 'react-portal';
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
      this.props.open && <ReactPortal>
        <div ref={ (node) => { this._portal = node; } }>
          { this.props.children }
        </div>
      </ReactPortal>
    );
  }
}

export default Portal;
