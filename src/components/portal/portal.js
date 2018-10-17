import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { createPortal } from 'react-dom';
import guid from '../../utils/helpers/guid';
import Browser from '../../utils/helpers/browser';
import ScrollableParent from '../../utils/helpers/scrollable-parent';
import './portal.scss';

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
      this.scrollParent = ScrollableParent.searchForScrollableParent(ReactDOM.findDOMNode(this));
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
