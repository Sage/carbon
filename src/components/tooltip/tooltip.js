import React from 'react';
import classNames from 'classnames';
/**
* A Tooltip widget.
*
* == How to use a Tooltip in a component:
*
* In your file:
*
*   import Tooltip from 'carbon/lib/components/tooltip'
*
* To render the Tooltip:
*
*   <Tooltip>
*     My tooltip content
*   </Tooltip>
*
* You can pass a prop of 'align' to the component which shifts the alignment of the pointer.
* This defaults to 'center'.
* You can also pass a prop of 'position' to the component which shifts the position of the pointer.
* This defaults to 'bottom'.
*
* @class Tooltip
* @constructor
*/
class Tooltip extends React.Component {

  static propTypes = {
    /**
     * Sets alignment of pointer on tooltip
     *
     * @property align
     * @type {String}
     * @default 'center'
     */
    align: React.PropTypes.string,

    /**
     * Sets position of pointer on tooltip
     *
     * @property position
     * @type {String}
     * @default 'bottom'
     */
    position: React.PropTypes.string
  };

  static defaultProps = {
    align: 'center',
    position: 'bottom'
  };

  /**
   * Pointer classes
   *
   * @method pointerClasses
   * @return {String} classNames for pointer
   */
  get pointerClasses() {
    return classNames(
      'ui-tooltip__pointer',
      'ui-tooltip__pointer--align-' + this.props.align,
      'ui-tooltip__pointer--position-' + this.props.position
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return(
      <div className='ui-tooltip'>
          { this.props.children }
        <span className={ this.pointerClasses }>
        </span>
      </div>
    );
  }
}

export default Tooltip;
