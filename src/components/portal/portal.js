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
    onReposition: PropTypes.func
  }

  componentWillUnmount() {
    Browser.getDocument().body.removeChild(this.defaultNode);
    this.defaultNode = null;
    this.scrollParent && this.scrollParent.removeEventListener('scroll', this.props.onReposition);
    Browser.getWindow().addEventListener('resize', this.props.onReposition);
    this.scrollParent = null;
  }

  componentDidMount() {
    if (this.props.onReposition) {
      this.props.onReposition();
      this.scrollParent = this.getScrollParent(ReactDOM.findDOMNode(this));
      this.scrollParent && this.scrollParent.addEventListener('scroll', this.props.onReposition);
      Browser.getWindow().addEventListener('resize', this.props.onReposition);
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
      <div>
        {
          createPortal(this.props.children, this.getPortalDiv())
        }
      </div>
    );
  }
}

export default Portal;
