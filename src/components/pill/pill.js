import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { validProps } from '../../utils/ether';
import { tagComponent } from '../../utils/helpers/tags';

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
*   <Pill as='warning'>My warning text</Pill>
*
* Additionally you can pass optional props to the Pill component
*
*   as: Customizes the appearence of the pill changing the colour.
*       (see the 'iconColorSets' for possible values).
*
* @class Pill
* @constructor
*/
class Pill extends React.Component {

  static propTypes = {

    /**
     * Customizes the appearance through colour
     * (see the 'iconColorSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default 'info'
     */
    as: PropTypes.string,

    /**
     * Fills the pill with colour when true
     *
     * @property type
     * @type {Boolean}
     * @default false
     */
    fill: PropTypes.bool,

    /**
     * The text to display on the Pill
     *
     * @property children
     * @type {String}
     */
    children: PropTypes.string.isRequired
  }

  static defaultProps = {
    as: 'default',
    fill: false
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let { className, ...props } = validProps(this);

    className = classNames(
      'carbon-pill',
      className,
      'carbon-pill--' + this.props.as + (this.props.fill ? '--fill' : '--empty'),
      { ['carbon-pill--link']: this.props.onClick }
    );

    return(
      <span { ...props } className={ className } { ...tagComponent('pill', this.props) }>
        {this.props.children}
      </span>
    );
  }
}

export default Pill;
