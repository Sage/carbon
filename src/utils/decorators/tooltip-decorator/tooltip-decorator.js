import React from 'react';
import Tooltip from './../../../components/tooltip';
import chainFunctions from './../../helpers/chain-functions';
import ReactDOM from 'react-dom';

/**
 * ToolTipDecorator.
 *
 * This decorator attaches a tooltip to a component.
 *
 * == How to use ToolTip decorator in a component:
 *
 * In your file:
 *
 *   import ToolTipDecorator from 'carbon/lib/utils/decorators/tooltip-decorator';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = ToolTipDecorator(
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
 * You must also give the surrounding div of the component a position of 'relative'
 *
 * e.g.
 *
 * render() {
 *   return (
 *     <div className='relative-class'>
 *       { this.tooltipHTML }
 *       ...your component's JSX
 *     </div>
 *   );
 * }
 *
 *
 * @method ToolTipDecorator
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let TooltipDecorator = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  /**
   * Timeout for firing ajax request
   *
   * @property timeout
   */
  timeout = null;

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
    this.timeout = setTimeout(() => {
      this.setState({ showTooltip: true });
      this.positionTooltip();
    }, 300 );
  };

  /**
   * Hides tooltip
   *
   * @method onHide
   * @return {void}
   */
  onHide = () => {
    clearTimeout(this.timeout);
    this.setState({ showTooltip: false });
  };

  /**
   * Returns the DOM node of the target.
   *
   * @method getTarget
   * @return {DOM node}
   */
  getTarget = () => {
    return ReactDOM.findDOMNode(this._target);
  }

  /**
   * Returns the DOM node of the tooltip.
   *
   * @method getTooltip
   * @return {DOM node}
   */
  getTooltip = () => {
    return ReactDOM.findDOMNode(this._tooltip);
  }

  /**
   * Positions tooltip relative to target
   *
   * @method positionTooltip
   * @return {Void}
   */
  positionTooltip = () => {
    if (this.state.showTooltip) {
      let target  = this.getTarget(),
          tooltip = this.getTooltip(),
          pointer = tooltip.children[1];

      let position      = this.props.tooltipPosition || 'top',
          tooltipWidth  = tooltip.offsetWidth,
          tooltipHeight = tooltip.offsetHeight,
          pointerHeight = pointer.offsetHeight,
          targetWidth   = target.offsetWidth,
          targetHeight  = target.offsetHeight;

      switch (position) {
        case "top":
          tooltip.style.top = String(-tooltipHeight - pointerHeight / 2) + 'px';
          tooltip.style.left = String(-tooltipWidth / 2 + targetWidth / 2) + 'px';
          break;

        case "bottom":
          tooltip.style.bottom = String(-tooltipHeight - pointerHeight / 2) + 'px';
          tooltip.style.left = String(-tooltipWidth / 2 + targetWidth / 2) + 'px';
          break;

        case "left":
          // hardcode 7px for pointerWidth since span has no width
          tooltip.style.left = String(-tooltipWidth - 7) + 'px';
          tooltip.style.top = String((targetHeight / 2) - (tooltipHeight / 2)) + 'px';
          break;

        case "right":
        // hardcode 7px for pointerWidth since span has no width
          tooltip.style.left = String(targetWidth + 7) + 'px';
          tooltip.style.top = String((targetHeight / 2) - (tooltipHeight / 2)) + 'px';
      }
    }
  };

  /**
   * Additional Props for decorated component
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let props = super.componentProps || super.inputProps;

    if (this.props.tooltipMessage) {
      props.onMouseEnter = chainFunctions(this.onShow, props.onMouseEnter);
      props.onMouseLeave = chainFunctions(this.onHide, props.onMouseLeave);
      props.onFocus = chainFunctions(this.onShow, props.onFocus);
      props.onBlur = chainFunctions(this.onHide, props.onBlur);
      props.onTouchEnd = this.state.showTooltip ? this.onHide : this.onShow;
    }
    return props;
  }

  /**
   * Alias for componentProps if component is an input
   *
   * @method inputProps
   * @return {Function} componentProps
   */
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
        default:
          props.pointerPosition = 'bottom';
      }

      props.pointerAlign = this.props.pointerAlign;

      return props;
    }
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
          ref={ (comp) => this._tooltip = comp }
          showTooltip={ this.state.showTooltip }
          { ...this.pointerProps }>
          { this.props.tooltipMessage }
        </Tooltip>
      );
    }
  }
};

export default TooltipDecorator;
