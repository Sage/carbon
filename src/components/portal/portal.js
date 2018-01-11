import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const isDomAvailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
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
    children: PropTypes.node,
    /**
     * The DomNode 
     *
     * @property node
     * @type {Any}
     */
    node: PropTypes.any
  }

  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  render() {
    if (!this.props.open && !isDomAvailable) {
      return null;
    }

    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      this.defaultNode.classList.add('portal');
      document.body.appendChild(this.defaultNode);
    }

    this.node = (this.props.node) ? this.props.node : this.defaultNode;
    return (
      this.props.open && createPortal(
        this.props.children,
        this.node
      )
    );
  }
}

export default Portal;
