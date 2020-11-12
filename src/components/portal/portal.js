import React from "react";
import PropTypes from "prop-types";
import ReactDOM, { createPortal } from "react-dom";
import guid from "../../utils/helpers/guid";
import Browser from "../../utils/helpers/browser";
import ScrollableParent from "../../utils/helpers/scrollable-parent";
import "./portal.scss";

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
    onReposition: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
  };

  constructor(...args) {
    super(...args);
    this.guid = guid();
  }

  componentDidMount() {
    if (this.props.onReposition) {
      this.props.onReposition();
      /* eslint-disable */
      this.scrollParent = ScrollableParent.searchForScrollableParent(
        ReactDOM.findDOMNode(this)
      );
      /* eslint-enable */
      if (this.scrollParent) {
        this.scrollParent.addEventListener("scroll", this.props.onReposition);
      }
      Browser.getWindow().addEventListener("resize", this.props.onReposition);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onReposition !== this.props.onReposition) {
      if (this.scrollParent) {
        this.scrollParent.removeEventListener("scroll", prevProps.onReposition);
        this.scrollParent.addEventListener("scroll", this.props.onReposition);
      }
      Browser.getWindow().removeEventListener("resize", prevProps.onReposition);
      Browser.getWindow().addEventListener("resize", this.props.onReposition);
    }
  }

  componentWillUnmount() {
    if (this.props.onReposition) {
      Browser.getWindow().removeEventListener(
        "resize",
        this.props.onReposition
      );
      if (this.scrollParent) {
        this.scrollParent.removeEventListener(
          "scroll",
          this.props.onReposition
        );
      }
    }
    this.defaultNode.remove();
    this.defaultNode = null;
    this.scrollParent = null;
  }

  updateClassNames(portalClassName) {
    this.defaultNode.removeAttribute("class");
    this.defaultNode.setAttribute("class", portalClassName);
    if (this.props.className) {
      this.props.className.split(" ").forEach((el) => {
        this.defaultNode.classList.add(el);
      });
    }
  }

  getPortalDiv() {
    const portalClassName = "carbon-portal";
    if (
      this.props.id !== undefined &&
      Browser.getDocument().getElementById(this.props.id)
    ) {
      this.defaultNode = Browser.getDocument().getElementById(this.props.id);
    }

    if (
      !this.defaultNode ||
      (this.props.id !== undefined &&
        !Browser.getDocument().getElementById(this.props.id))
    ) {
      this.defaultNode = Browser.getDocument().createElement("div");
      this.defaultNode.classList.add(portalClassName);
      this.defaultNode.setAttribute("data-portal-exit", this.guid);
      if (this.props.id !== undefined) {
        this.defaultNode.setAttribute("id", this.props.id);
      }
      Browser.getDocument().body.appendChild(this.defaultNode);
    }

    this.updateClassNames(portalClassName);

    return this.defaultNode;
  }

  render() {
    if (!Browser.isDomAvailable()) {
      return null;
    }
    return (
      <span data-portal-entrance={this.guid}>
        {createPortal(this.props.children, this.getPortalDiv())}
      </span>
    );
  }
}

export default Portal;
