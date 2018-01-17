import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Browser from '../../utils/helpers/browser';
import ReactDOM from 'react-dom';
class Portal extends React.Component {

  static propTypes = {
    /**
     * The content of the portal.
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node,
    parent: PropTypes.symbol,
    onResposition: PropTypes.func
  }

  getDOMNode() {
    return ReactDOM.findDOMNode(this.props.parent);
  }

  componentWillUnmount() {
    Browser.getDocument().body.removeChild(this.defaultNode);
    this.defaultNode = null;
    this.scrollParent && this.scrollParent.removeEventListener('scroll', this.props.onResposition);
    this.scrollParent = null;
  }

  componentDidMount() {
    if (this.props.onResposition && this.props.parent) {
      this.scrollParent = this.getScrollParent(this.getDOMNode());
      this.scrollParent && this.scrollParent.addEventListener('scroll', this.props.onResposition);
    }
  }

  getScrollParent(element) {
    const style = window.getComputedStyle(element);
    if (style.position !== 'absolute' && /(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX)) {
      return element;
    }

    return (element !== document.body) ? this.getScrollParent(element.parentElement) : null;
  }

  getPortalDiv() {
    if (!this.defaultNode) {
      this.defaultNode = Browser.getDocument().createElement('div');
      this.defaultNode.classList.add('carbon-portal');
      Browser.getDocument().body.appendChild(this.defaultNode);
    }
    return this.defaultNode;
  }

  render() {
    if (!Browser.isDomAvailable()) {
      return null;
    }

    return (
      createPortal(this.props.children, this.getPortalDiv())
    );
  }
}

export default Portal;
