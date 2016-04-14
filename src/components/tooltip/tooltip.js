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
*   <Tooltip showTooltip={ toggleTooltipHandler }>
*     My tooltip content
*   </Tooltip>
*
* You must pass a prop of 'showTooltip' which is toggled to true or false.
*
* You can pass a prop of 'pointerAlign' to the component which shifts the alignment of the pointer.
* This defaults to 'center'.
* You can also pass a prop of 'pointerPosition' to the component which shifts the position of the tooltip.
* This defaults to 'bottom'
*
* @class Tooltip
* @constructor
*/
class Tooltip extends React.Component {

  static propTypes = {
    /**
     * Sets alignment of pointer on tooltip
     *
     * @property pointerAlign
     * @type {String}
     * @default 'center'
     */
    pointerAlign: React.PropTypes.string,

    /**
     * Sets position of the tooltip
     *
     * @property pointerPosition
     * @type {String}
     * @default 'top'
     */
    pointerPosition: React.PropTypes.string,

    /**
     * Whether to to show the Tooltip
     *
     * @property showTooltip
     * @type {Boolean}
     * @default false
     */
    showTooltip: React.PropTypes.bool
  };

  static defaultProps = {
    pointerAlign: 'center',
    pointerPosition: 'top',
    showTooltip: false
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
      'ui-tooltip__pointer--align-' + this.props.pointerAlign,
      'ui-tooltip__pointer--position-' + this.props.pointerPosition,
    );
  }

  get mainClasses() {
    return classNames(
      'ui-tooltip',
      this.props.className
    );
  }

  get innerHTML() {
    let contents = [];

    contents.push(this.props.children);
    contents.push(<span key='pointer' className={ this.pointerClasses }></span>);

    return <div
            className={ this.mainClasses }>
             { contents }
           </div>;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let content;

    if (this.props.showTooltip) {
      content = this.innerHTML;
    }

    return(
      <div>
        { content }
      </div>
    );
  }
}

export default Tooltip;
