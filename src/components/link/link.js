import React from 'react';

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
 *  <Link path='foo'>Main Page</Link>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Link
 * @constructor
 */
class Link extends React.Component {

  static propTypes = {

    /**
     * The redirect path.
     *
     * @property path
     * @type {String}
     */
    href: React.PropTypes.string.isRequired,

    /**
     * Gives the link a disabled state.
     *
     * @property disabled
     * @type {boolean}
     * @default undefined
     */
    disabled: React.PropTypes.bool
  }

  /**
   * Getter for componet properties.
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let { ...props } = this.props;
    props.href = this.props.href;
    props.disabled = this.props.disabled || '';
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
    let className = this.props.className;

    let classes = 'ui-link__anchor' +
      (this.props.disabled ? ' ui-link__anchor--disabled' : '') +
      (className ? ' ' + className : '');

    return classes;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <a { ...this.componentProps }>
        { this.props.children }
      </a>
    );
  }

}

export default Link;
