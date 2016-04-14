import React from 'react';
import Tooltip from './../../../components/tooltip';

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
 *  Your decorated component must add a conditional class name of 'target-tooltip';
 *
 * e.g.
 *
 *  if (this.props.tooltipMessage) {
 *    classes += ' target-tooltip '
 *  }
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
 *
 * @method ToolTipIDecorator
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let TooltipIDecorator = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  state = {
    /**
     * Whether tooltip currently showing
     *
     * @property showTooltip
     * @type {Boolean}
     * @default false
     */
    showTooltip: false
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
      let target  = document.getElementsByClassName('target-tooltip')[0],
          tooltip = document.getElementsByClassName('ui-tooltip')[0],
          pointer = document.getElementsByClassName('ui-tooltip__pointer')[0];

      let position = this.props.tooltipPosition,
          tooltipWidth = tooltip.offsetWidth,
          tooltipHeight = tooltip.offsetHeight,
          pointerHeight = pointer.offsetHeight,
          targetWidth = target.offsetWidth;

      switch (position) {
        case "top":
          tooltip.style.top = String(-tooltipHeight - pointerHeight / 2) + 'px';
          tooltip.style.left = String(-tooltipWidth / 2 + targetWidth / 2) + 'px';
          break;
        case "bottom":
          tooltip.style.top = String(tooltipHeight - pointerHeight) + 'px';
          tooltip.style.left = String(-tooltipWidth / 2 + targetWidth / 2) + 'px';
          break;
        case "left":
          // hardcode 7px for pointerWidth since span has no width
          tooltip.style.left = String(-tooltipWidth - 7) + 'px';
          tooltip.style.top = String(-tooltipHeight / 2 + pointerHeight / 2) + 'px';
          break;
        case "right":
        // hardcode 7px for pointerWidth since span has no width
          tooltip.style.left = String(targetWidth + 7) + 'px';
          tooltip.style.top = String(-tooltipHeight / 2 + pointerHeight / 2) + 'px';
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
    let props = super.componentProps;

    props.tooltipPosition = props.tooltipPosition || 'top';
    props.onMouseEnter = this.onShow;
    props.onMouseLeave = this.onHide;
    props.onTouchEnd = this.state.showTooltip ? this.onHide : this.onShow;

    return props;
  }

  /**
   * Calculated props for pointer
   *
   * @method pointerProps
   * @return {Object} props
   */
  get pointerProps() {
    let props = {};

    switch (this.props.tooltipPosition) {
      case 'top':
        props.pointerPosition = 'bottom';
        break;
      case 'right':
        props.pointerPosition = 'left';
        break;
      case 'left':
        props.pointerPosition = 'right';
        break;
      case 'bottom':
        props.pointerPosition = 'top';
    }

    props.pointerAlign = this.props.pointerAlign;

    return props;
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
