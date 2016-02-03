import React from 'react';
import classNames from 'classnames';

/**
* A Pill widget.
*
* == How to use a Pill in a component:
*
* In your file:
*
*   import Pill from 'carbon/lib/components/pill'
*
* To render the Pill:
*
*   <Pill type='warning'>My warning text</Pill>
*
* Additionally you can pass optional props to the Pill component
*
*   type: Customizes the appearence of the pill changing the colour
*     info: default
*     warning
*     new
*
* @class Pill
* @constructor
*/
class Pill extends React.Component {

  static propTypes = {

    /**
     * Customizes the appearance through colour
     * Can be set to 'info', 'warning', 'new'
     *
     * @property type
     * @type {String}
     * @default 'info'
     */
    type: React.PropTypes.string,

    /**
     * The text to display on the Pill
     *
     * @property children
     * @type {String}
     */
    children: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    type: 'info'
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let { className, ...props } = this.props;

    className = classNames(
      'ui-pill',
      className,
      'ui-pill--' + this.props.type
    );

    return(
      <span { ...props } className={ className }>
        {this.props.children}
      </span>
    );
  }
}

export default Pill;
