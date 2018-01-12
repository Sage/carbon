import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const isDomAvailable = function () {
    return (!!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    ));
};
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
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  getDefaultDiv() {
    if (!this.props.node && !this.defaultNode && isDomAvailable()) {
      this.defaultNode = document.createElement('div');
      this.defaultNode.classList.add('portal');
      document.body.appendChild(this.defaultNode);
    }
    return this.defaultNode;
  }

  render() {
    if (!isDomAvailable()) {
      return null;
    }

    this.node = (this.props.node) ? this.props.node : this.getDefaultDiv();
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
