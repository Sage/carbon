import React from 'react';
import Tooltip from './../../../components/tooltip';
import chainFunctions from './../../helpers/chain-functions';
import guid from './../../helpers/guid';
import classNames from 'classnames';

/**
 * ToolTipIDecorator.
 *
 * This decorator attaches a tooltip to a component.
 *
 * == How to use ToolTip decorator in a component:
 *
 * In your file:
 *
 *   import ToolTip from 'carbon/lib/utils/decorators/tooltip-decorator';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = ToolTipIDecorator(
 *   class MyComponent extends React.Component {
 *     ...
 *   });
 *
 * You must also output the tooltip HTML in your component's render method:
 *
 * e.g.
 *
 * render() {
 *   return (
 *     <div>
 *       { this.tooltipHTML }
 *       ...your components JSX
 *     </div>
 *   );
 * }
 *
 * To output the decorated component in a view, you must wrap it in a relatively
 * positioned container.
 *
 * e.g.
 *
 *  <div className='my-position-relative-wrapper'>
 *    <MyDecoratedComponent/>
 *  </div>
 *
 * @method ToolTipIDecorator
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let TooltipIDecorator = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);

    /**
     * Allows tooltip to identify its target uniquely
     *
     * @property targetID
     * @type {String}
     */
    this.targetID = guid();
  }

  state = {
    /**
     * Whether tooltip currently showing
     *
     * @property showTooltip
     * @type {Boolean}
     * @default false
     */
    showTooltip: true
  };

  /**
   * Shows tooltip
   *
   * @method onShow
   * @return {void}
   */
  onShow = () => {
    setTimeout(() => {
      this.setState({ showTooltip: true });
      this.positionTooltip();
    }, 300 );
  }

  /**
   * Hides tooltip
   *
   * @method onHide
   * @return {void}
   */
  onHide = () => {
    this.setState({ showTooltip: false });
  }

  /**
   * Positions tooltip relative to target
   *
   * @method positionTooltip
   * @return {Void}
   */
  positionTooltip = () => {
    if (this.state.showTooltip) {
      let target  = document.getElementsByClassName(`target-tooltip-${this.targetID}`)[0],
          tooltip = document.getElementsByClassName('ui-tooltip')[0],
          pointer = document.getElementsByClassName('ui-tooltip__pointer')[0],
          isInput;

      //if target is an input get the field.
      if (target.getElementsByTagName('input')[0]) {
        isInput = true;
      }

      let position      = this.props.tooltipPosition || 'top',
          tooltipWidth  = tooltip.offsetWidth,
          tooltipHeight = tooltip.offsetHeight,
          pointerHeight = pointer.offsetHeight,
          targetWidth   = target.offsetWidth,
          targetHeight  = target.offsetHeight;

      switch (position) {
        case "top":
          if (isInput) {
            tooltip.style.top = String(-tooltipHeight + pointerHeight) + 'px';
          } else {
            tooltip.style.top = String(-tooltipHeight - pointerHeight / 2) + 'px';
          }
          tooltip.style.left = String(-tooltipWidth / 2 + targetWidth / 2) + 'px';
          break;

        case "bottom":
          if (isInput) {
            tooltip.style.top = String(targetHeight + pointerHeight / 2) + 'px';
          } else {
            tooltip.style.top = String(tooltipHeight - pointerHeight) + 'px';
          }
          tooltip.style.left = String(-tooltipWidth / 2 + targetWidth / 2) + 'px';
          break;

        case "left":
          // hardcode 7px for pointerWidth since span has no width
          tooltip.style.left = String(-tooltipWidth - 7) + 'px';
          if (isInput) {
            tooltip.style.top = String(-targetHeight / 2 + tooltipHeight + pointerHeight / 2) + 'px';
          } else {
              tooltip.style.top = String(-tooltipHeight / 2 + pointerHeight / 2) + 'px';
          }
          break;

        case "right":
        // hardcode 7px for pointerWidth since span has no width
          tooltip.style.left = String(targetWidth + 7) + 'px';
          if (isInput) {
            tooltip.style.top = String(-targetHeight / 2 + tooltipHeight + pointerHeight / 2) + 'px';
          } else {
            tooltip.style.top = String(-tooltipHeight / 2 + pointerHeight / 2) + 'px';
          }

      }
    }
  }

  /**
   * Additional Props for decorated component
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    if (this.props.tooltipMessage) {

      let props = super.componentProps || super.inputProps;
      props.onMouseEnter = chainFunctions(this.onShow, props.onMouseEnter);
      props.onMouseLeave = chainFunctions(this.onHide, props.onMouseLeave);
      props.onFocus = chainFunctions(this.onShow, props.onFocus);
      props.onBlur = chainFunctions(this.onHide, props.onBlur);
      props.onTouchEnd = this.state.showTooltip ? this.onHide : this.onShow;

      return props;
    }
  }


  //Alias get componentProps for inputs
  get inputProps() {
    return this.componentProps;
  }

  /**
   * Calculated props for pointer
   *
   * @method pointerProps
   * @return {Object} props
   */
  get pointerProps() {
    if (this.props.tooltipMessage) {
      let props = {};

      switch (this.props.tooltipPosition) {
        case 'bottom':
          props.pointerPosition = 'top';
          break;
        case 'right':
          props.pointerPosition = 'left';
          break;
        case 'left':
          props.pointerPosition = 'right';
          break;
        case 'top':
          props.pointerPosition = 'bottom';
      }

      props.pointerAlign = this.props.pointerAlign;

      return props;
    }
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {void}
   */
  get mainClasses() {
    let classes = super.mainClasses || '';

    return classNames(
      classes,
      { [`target-tooltip-${this.targetID}`]: this.props.tooltipMessage }
    );
  }

  /**
   * Supplies the HTML for tooltip
   *
   * @method tooltipHTML
   * @return {Object} JSX for tooltip
   */
  get tooltipHTML() {
    if (this.props.tooltipMessage) {
      return (
        <Tooltip
          showTooltip={ this.state.showTooltip }
          { ...this.pointerProps }>
          { this.props.tooltipMessage }
        </Tooltip>
      );
    }
  }
};

export default TooltipIDecorator;
