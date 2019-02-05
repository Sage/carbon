import * as React from "react";
import classNames from "classnames";
import { Link } from "react-router";
import Icon from "../icon/icon";
import { validHTMLProps } from "../../utils/ether/ether";
import Event from "../../utils/helpers/events/events";
import tagComponent from "../../utils/helpers/tags/tags";
import "./link.scss";

const propsNotForHTMLElement = [
  'className',
  'disabled',
  'icon',
  'iconAlign',
  'tabbable',
  'to',
  'tooltipMessage',
  'tooltipPosition',
  'tooltipAlign'
];

interface _LinkProps {
  className?: string,
  disabled?: boolean,
  href?: string,
  icon?: string,
  iconAlign?: string,
  onClick?: (...args: any[]) => any,
  onKeyDown?: (...args: any[]) => any,
  tabbable?: boolean,
  to?: string,
  tooltipMessage?: string,
  tooltipPosition?: string,
  tooltipAlign?: string
};
/**
 * A link widget.
 *
 * == How to use a Link in a component:
 *
 * In your file:
 *
 *   import Link from 'carbon-react/lib/components/link';
 *
 * To render the Link:
 *
 *  <Link href='foo'>Main Page</Link>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Link
 * @constructor
 */
class _Link extends React.Component<_LinkProps, {}> {
  static defaultProps = {
    iconAlign: "left",
    tabbable: true
  };

  constructor(...args: any[]) {
    // @ts-ignore
    super(...args);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  /**
   * Triggers the onClick event for the enter key
   *
   * @method onKeyDown
   * @param {Object} ev
   */
  onKeyDown(ev) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }
    // return early if there is no onClick or there is a href prop
    if (!this.props.onClick || this.props.href) {
      return;
    }
    // return early if the event is not an enter key
    if (!Event.isEnterKey(ev)) {
      return;
    }
    this.props.onClick(ev);
  }
  /**
   * Getter for componet classes.
   *
   * @method componentClasses
   * @return {String} class names
   */
  get componentClasses() {
    return classNames("carbon-link__anchor", this.props.className, {
      "carbon-link__anchor--disabled": this.props.disabled
    });
  }
  /**
   * Returns the icon if enabled and aligned to the left.
   *
   * @method iconLeft
   * @return {Object} JSX
   */
  get iconLeft() {
    if (!this.props.icon || this.props.iconAlign !== "left") {
      return null;
    }
    return this.icon;
  }
  /**
   * Returns the icon if enabled and aligned to the right.
   *
   * @method iconRight
   * @return {Object} JSX
   */
  get iconRight() {
    if (!this.props.icon || this.props.iconAlign !== "right") {
      return null;
    }
    return this.icon;
  }
  /**
   * Returns the markup for the icon.
   *
   * @method icon
   * @return {Object} JSX
   */
  get icon() {
    const classes = classNames(
      "carbon-link__icon",
      `carbon-link__icon--align-${this.props.iconAlign}`
    );
    return (
      <Icon
        type={this.props.icon}
        className={classes}
        tooltipMessage={this.props.tooltipMessage}
        tooltipAlign={this.props.tooltipAlign}
        tooltipPosition={this.props.tooltipPosition}
      />
    );
  }
  /**
   * Returns 0 or -1 for tabindex
   *
   * @method tabIndex
   * @return {String} 0 or -1
   */
  get tabIndex() {
    return this.props.tabbable && !this.props.disabled ? "0" : "-1";
  }
  /**
   * Regex for finding 'href:' or 'to:',
   *
   * @method typeRegex
   * @return {Regex}
   */
  get typeRegex() {
    return /^href:|^to:/;
  }
  /**
   * A hash of the different link types.
   *
   * @method linkTypes
   * @return {Object}
   */
  get linkTypes() {
    return {
      to: {
        prop: "to",
        component: Link
      },
      href: {
        prop: "href",
        component: "a"
      }
    };
  }
  /**
   * Returns the correct link type based on the given props.
   *
   * @method linkType
   * @return {Object}
   */
  get linkType() {
    const url = this.props.href || this.props.to;
    let type = "href";
    if (url) {
      const match = url.match(this.typeRegex);
      if (match) {
        type = match[0].substr(0, match[0].length - 1);
      } else if (this.props.href) {
        type = "href";
      } else {
        type = "to";
      }
    }
    return this.linkTypes[type];
  }
  /**
   * Returns the parsed URL for the link.
   *
   * @method url
   * @return {String}
   */
  get url() {
    const url = this.props.href || this.props.to;
    if (!url) {
      return null;
    }
    return url.replace(this.typeRegex, "");
  }
  /**
   * Getter for component properties.
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let props = validHTMLProps(this.props, propsNotForHTMLElement);
    props = { ...props, ...tagComponent("link", this.props) }
    props.tabIndex = this.tabIndex;
    props.className = this.componentClasses;
    props[this.linkType.prop] = this.url;
    props.onKeyDown = this.onKeyDown;
    return props;
  }
  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return React.createElement(
      this.linkType.component,
      this.componentProps,
      <span>
        {this.iconLeft}

        <span className="carbon-link__content">{this.props.children}</span>

        {this.iconRight}
      </span>
    );
  }
}
export default _Link;
