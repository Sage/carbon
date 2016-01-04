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
    path: React.PropTypes.string.isRequired,

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
   * Renders the component.
   *
   * @method render
   */
  render() {
    let {className, ...props} = this.props;

    className = 'ui-link' +
      (this.props.disabled ? ' ui-link--disabled' : '') +
      (className ? ' ' + className : '');

    return (
      <a className={ className } href={ this.props.path} >
        { this.props.children }
      </a>
    );
  }

}

export default Link;
