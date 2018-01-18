import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { createPortal } from 'react-dom';
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
     * Callback function triggered when parent element is scrolled or window resized.
     *
     * @property onReposition
     * @type {Node}
     */
    onReposition: PropTypes.func
  }

  componentDidMount() {
    if (this.props.onReposition) {
      this.props.onReposition();
      this.scrollParent = this.getScrollParent(ReactDOM.findDOMNode(this));
      this.scrollParent && this.scrollParent.addEventListener('scroll', this.props.onReposition);
      Browser.getWindow().addEventListener('resize', this.props.onReposition);
    }
  }

  componentWillUnmount() {
    if (this.props.onReposition) {
      Browser.getWindow().removeEventListener('resize', this.props.onReposition);
      this.scrollParent && this.scrollParent.removeEventListener('scroll', this.props.onReposition);
    }
    Browser.getDocument().body.removeChild(this.defaultNode);
    this.defaultNode = null;
    this.scrollParent = null;
  }

  getScrollParent(element) {
    if (!element) { return null; }
    const style = Browser.getWindow().getComputedStyle(element);
    if (style && style.position !== 'absolute' &&
            /(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX)) {
      return element;
    }

    return (element !== Browser.getDocument().body) ? this.getScrollParent(element.parentElement) : null;
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
