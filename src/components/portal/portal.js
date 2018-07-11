import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { createPortal } from 'react-dom';
import guid from '../../utils/helpers/guid';
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

  constructor(...args) {
    super(...args);
    this.guid = guid();
  }

  componentDidMount() {
    if (this.props.onReposition) {
      this.props.onReposition();
      /* eslint-disable */
      this.scrollParent = this.searchForScrollableParent(ReactDOM.findDOMNode(this));
      /* eslint-enable */
      if (this.scrollParent) { this.scrollParent.addEventListener('scroll', this.props.onReposition); }
      Browser.getWindow().addEventListener('resize', this.props.onReposition);
    }
  }

  componentWillUnmount() {
    if (this.props.onReposition) {
      Browser.getWindow().removeEventListener('resize', this.props.onReposition);
      if (this.scrollParent) { this.scrollParent.removeEventListener('scroll', this.props.onReposition); }
    }
    Browser.getDocument().body.removeChild(this.defaultNode);
    this.defaultNode = null;
    this.scrollParent = null;
  }

  getPortalDiv() {
    if (!this.defaultNode) {
      this.defaultNode = Browser.getDocument().createElement('div');
      this.defaultNode.classList.add('carbon-portal');
      this.defaultNode.setAttribute('data-portal-exit', this.guid);
      Browser.getDocument().body.appendChild(this.defaultNode);
    }
    return this.defaultNode;
  }

  searchForScrollableParent(element) {
    if (!element) { return null; }
    const style = Browser.getWindow().getComputedStyle(element);
    const isElementScrollable = style && style.position !== 'absolute'
                                      && /(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX);
    if (isElementScrollable) {
      return element;
    }
    return this.searchForScrollableParent(element.parentElement);
  }

  render() {
    if (!Browser.isDomAvailable()) {
      return null;
    }
    return (
      <span data-portal-entrance={ this.guid }>
        { createPortal(this.props.children, this.getPortalDiv()) }
      </span>
    );
  }
}

export default Portal;
