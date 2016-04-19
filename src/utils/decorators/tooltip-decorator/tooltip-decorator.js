import React from 'react';
import Tooltip from './../../../components/tooltip';
import chainFunctions from './../../helpers/chain-functions';
import ReactDOM from 'react-dom';
import { styleElement, pixelValue, isVisible } from './../../ether/js';

/**
 * TooltipDecorator.
 *
 * This decorator attaches a tooltip to a component.
 *
 * == How to use Tooltip decorator in a component:
 *
 * In your file:
 *
 *   import TooltipDecorator from 'carbon/lib/utils/decorators/tooltip-decorator';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = TooltipDecorator(
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
 * To activate the tooltip, you must pass a prop of 'tooltipMessage' with some text content.
 *
 * render() {
 *   return (
 *     <MyComponent tooltipMessage='Some Helpful Content' />
 *   )
 * }
 *
 *
 * @method TooltipDecorator
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
     * @property isVisible
     * @type {Boolean}
     * @default false
     */
    isVisible: false
  };

  /**
   * Shows tooltip
   *
   * @method onShow
   * @return {void}
   */
  onShow = () => {
    this.timeout = setTimeout(() => {
      this.setState({ isVisible: true });
      this.positionTooltip(this.getTooltip(), this.getTarget());
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
    this.setState({ isVisible: false });
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
  positionTooltip = (element, target) => {
    if (isVisible(this)) {
      // hardcode value as span has no dimensions
      let pointerDimension = 15;

      let verticalCenter     = -element.offsetHeight - pointerDimension / 2,
          horizontalCenter   = -element.offsetWidth / 2 + target.offsetWidth / 2,
          sideVerticalCenter = target.offsetHeight / 2 - element.offsetHeight / 2;

    switch (this.props.tooltipPosition) {
      case "bottom":
        styleElement(element, 'bottom', pixelValue(verticalCenter));
        styleElement(element, 'left', pixelValue(horizontalCenter));
        break;

      case "left":
        styleElement(element, 'top', pixelValue(sideVerticalCenter));
        styleElement(element, 'left', element.offsetWidth - pointerDimension / 2);
        break;

      case "right":
        styleElement(element, 'top', pixelValue(sideVerticalCenter));
        styleElement(element, 'left', target.offsetWidth + pointerDimension / 2);
        break;

      default:
      // top
        styleElement(element, 'top', pixelValue(verticalCenter));
        styleElement(element, 'left', pixelValue(horizontalCenter));
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
      props.onTouchEnd = isVisible(this) ? this.onHide : this.onShow;
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
          isVisible={ this.state.isVisible }
          { ...this.pointerProps }>
          { this.props.tooltipMessage }
        </Tooltip>
      );
    }
  }
};

export default TooltipDecorator;
