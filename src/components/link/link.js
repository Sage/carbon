import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';

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
class Link extends React.Component {

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
    icon: React.PropTypes.string
  }

  /**
   * Getter for componet properties.
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let { ...props } = this.props;
    props.className = this.componentClasses;

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
    if (this.props.icon) {
      return <Icon type={ this.props.icon } className="ui-link__icon" />;
    } else {
      return null;
    }
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <a { ...this.componentProps }>
        { this.icon }
        <span className="ui-link__content">
          { this.props.children }
        </span>
      </a>
    );
  }

}

export default Link;
