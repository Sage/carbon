import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Browser from '../../utils/helpers/browser';

class Portal extends React.Component {

  static propTypes = {
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
      Browser.getDocument().body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  getPortalDiv() {
    if (this.props.node) return this.props.node;

    if (!this.defaultNode) {
      this.defaultNode = Browser.getDocument().createElement('div');
      this.defaultNode.classList.add('portal');
      Browser.getDocument().body.appendChild(this.defaultNode);

    }
    return this.defaultNode;
  }

  render() {
    if (!Browser.isDomAvailable()) {
      return null;
    }

    this.node = this.getPortalDiv();
    return (
      <ReactPortal node={ this.node }>{this.props.children}</ReactPortal>
    );
  }
}

function ReactPortal(props) {
  return (
    createPortal(
      props.children,
      props.node
    )
  );
}

export default Portal;
