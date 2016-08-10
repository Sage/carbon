import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import { Link } from 'react-router';

/**
 * A link widget.
 *
 * == How to use a Link in a component:
 *
 * In your file:
 *
 *   import Link from 'carbon/lib/components/link';
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
class _Link extends React.Component {

  static propTypes = {

    /**
     * Gives the link a disabled state.
     *
     * @property disabled
     * @type {Boolean}
     * @default undefined
     */
    disabled: React.PropTypes.bool,

    /**
     * Renders an icon inline with the link.
     *
     * @property icon
     * @type {String}
     * @default undefined
     */
    icon: React.PropTypes.string,

    /**
     * Use `to` to use the React Router link. You can also prefix your value
     * with `to:` or `href:` to override the prop type.
     *
     * @property to
     * @type {String}
     * @default undefined
     */
    to: React.PropTypes.string,

    /**
     * Use `href` to use a generic anchor. You can also prefix your value
     * with `to:` or `href:` to override the prop type.
     *
     * @property href
     * @type {String}
     * @default undefined
     */
    href: React.PropTypes.string
  }

  /**
   * Getter for componet properties.
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let { href, to, ...props } = this.props;
    props.className = this.componentClasses;
    props[this.linkType.prop] = this.url;

    return props;
  }

  /**
   * Getter for componet classes.
   *
   * @method componentClasses
   * @return {String} class names
   */
  get componentClasses() {
    return classNames (
      'ui-link__anchor',
      this.props.className,
      { 'ui-link__anchor--disabled': this.props.disabled }
    );
  }

  get icon() {
    if (!this.props.icon) { return null; }
    return (
      <Icon
        type={ this.props.icon }
        className="ui-link__icon"
        tooltipMessage={ this.props.tooltipMessage }
        tooltipAlign={ this.props.tooltipAlign }
        tooltipPosition={ this.props.tooltipPosition }
      />
    );
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
    let url = this.props.href || this.props.to,
        type = "href";

    if (url) {
      let match = url.match(this.typeRegex);

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
    let url = this.props.href || this.props.to;
    if (!url) { return null; }

    return url.replace(this.typeRegex, "");
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      React.createElement(this.linkType.component, this.componentProps, (
        <span>
          { this.icon }
          <span className="ui-link__content">
            { this.props.children }
          </span>
        </span>
      ))
    );
  }

}

export default _Link;
