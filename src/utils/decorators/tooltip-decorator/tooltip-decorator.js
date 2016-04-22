import React from 'react';
import Tooltip from './../../../components/tooltip';
import chainFunctions from './../../helpers/chain-functions';
import ReactDOM from 'react-dom';
import { startCase } from 'lodash';
import { pixelValue, styleElement } from './../../ether';

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
    }, 100 );
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
   * @param {Object} tooltip
   * @param {Object} target
   * @return {Void}
   */
  positionTooltip = (tooltip, target) => {
    if (this.state.isVisible) {
      let tooltipWidth  = tooltip.offsetWidth,
          tooltipHeight = tooltip.offsetHeight,
          // hardcode height & width since span has no dimensions
          pointerDimension = 15,
          // hardcode offest of pointer when positioned right or left
          pointerOffset = 11,
          targetWidth   = target.offsetWidth,
          targetHeight  = target.offsetHeight,
          alignment = this.pointerProps.pointerAlign,
          position = this.props.tooltipPosition;

      let shifts = {
        verticalY:       -tooltipHeight - pointerDimension * 0.5,
        verticalCenter:  -tooltipWidth * 0.5 + targetWidth * 0.5,
        verticalRight:   pointerDimension + pointerOffset - tooltipWidth,
        verticalLeft:    -pointerDimension * 0.5,
        rightHorizontal: targetWidth + 0.5 * pointerDimension,
        leftHorizontal:  -pointerDimension * 0.5 - tooltipWidth,
        sideTop:         -pointerOffset,
        sideBottom:      -tooltipHeight + targetHeight + pointerOffset,
        sideCenter:      targetHeight * 0.5 - tooltipHeight * 0.5
      };

      switch (this.props.tooltipPosition) {
        case "top":
          styleElement(tooltip, 'top', pixelValue(shifts.verticalY));
          styleElement(tooltip, 'left', pixelValue(shifts[`vertical${startCase(alignment)}`]));
          break;

        case "bottom":
          styleElement(tooltip, 'bottom', pixelValue(shifts.verticalY));
          styleElement(tooltip, 'left', pixelValue(shifts[`vertical${startCase(alignment)}`]));
          break;

        case "left":
          styleElement(tooltip, 'left', pixelValue(shifts[`${position}Horizontal`]));
          styleElement(tooltip, 'top', pixelValue(shifts[`side${startCase(alignment)}`]));
          break;

        case "right":
          styleElement(tooltip, 'left', pixelValue(shifts[`${position}Horizontal`]));
          styleElement(tooltip, 'top', pixelValue(shifts[`side${startCase(alignment)}`]));
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
      props.onTouchEnd = this.state.isVisible ? this.onHide : this.onShow;
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

      props.pointerAlign = this.props.pointerAlign || 'center';

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
