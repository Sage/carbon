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
    children: PropTypes.node
  }

  componentWillUnmount() {
    Browser.getDocument().body.removeChild(this.defaultNode);
    this.defaultNode = null;
    this.scrollParent && this.scrollParent.removeEventListener('scroll', this.context.onResposition);
  }

  componentDidMount() {
    if (this.context.onResposition && this.context.parentDOMNode) {
      this.scrollParent = this.getScrollParent(this.context.parentDOMNode);
      this.scrollParent && this.scrollParent.addEventListener('scroll', this.context.onResposition);
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

Portal.contextTypes = {
  parentDOMNode: PropTypes.any,
  onResposition: PropTypes.func
};

export default Portal;
