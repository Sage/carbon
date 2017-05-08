import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './../../../components/tooltip';
import chainFunctions from './../../helpers/chain-functions';
import ReactDOM from 'react-dom';
import { startCase, assign } from 'lodash';
import { styleElement, append } from './../../ether';

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
 * The targetted JSX must also have a ref of _target and have the correct componentProps
 *
 * e.g.
 *
 * render() {
 *   return (
 *     <div className='relative-class'>
 *       <span
 *         ref={ (comp) => this._target = comp }
 *         { ...this.componentProps }
 *       />
 *       { this.tooltipHTML }
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

  static propTypes = assign({}, ComposedComponent.propTypes, {

    /**
     * The message for this tooltip
     *
     * @property
     * @type {String}
     */
    tooltipMessage: PropTypes.string,

    /**
     * The position of this tooltip: top, bottom, left or right
     *
     * @property
     * @default top
     * @type {String}
     */
    tooltipPosition: PropTypes.string,

    /**
     * The alignment of this tooltip: left, right or center
     *
     * @property
     * @default center
     * @type {String}
     */
    tooltipAlign: PropTypes.string
  });

  /**
   * Timeout for firing ajax request
   *
   * @property _tooltipTimeout
   */
  _tooltipTimeout = null;

  /**
   * Cache the shifts calculations (used for positioning)
   *
   * @property _memoizedShifts
   */
  _memoizedShifts = null;

  /**
   * @method componentWillUpdate
   * @return {Void}
   */
  componentWillUpdate(nextProps, nextState) {
    if (super.componentWillUpdate) { super.componentWillUpdate(nextProps, nextState); }

    if (nextProps.tooltipMessage != this.props.tooltipMessage ||
        nextProps.tooltipPosition != this.props.tooltipPosition ||
        nextProps.tooltipAlign != this.props.tooltipAlign) {
      this._memoizedShifts = null;
    }
  }

  /**
   * @method componentDidUpdate
   * @return {Void}
   */
  componentDidUpdate(prevProps) {
    if (super.componentDidUpdate) { super.componentDidUpdate(prevProps); }

    if (this.props.tooltipMessage && !this._memoizedShifts && this.state.isVisible) {
      this.positionTooltip();
    }
  }

  /**
   * A lifecycle called immediatly before new props cause a re-render
   * Resets the hover state if active
   *
   * @method componentWillReceiveProps
   */
  componentWillReceiveProps(nextProps) {
    if (super.componentWillReceiveProps) { super.componentWillReceiveProps(nextProps); }

    if (this.state.isVisible) {
      this.setState({ isVisible: false });
    }
  }

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
    this._tooltipTimeout = setTimeout(() => {
      this.setState({ isVisible: true });
      this.positionTooltip();
    }, 100);
  };

  /**
   * Hides tooltip
   *
   * @method onHide
   * @return {void}
   */
  onHide = () => {
    clearTimeout(this._tooltipTimeout);
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
   * Calculates position for tooltip, first result cached.
   *
   * @method calculatePosition
   * @param {Object} tooltip
   * @param {Object} target
   * @return {Object} shifts calculated
   */
  calculatePosition = (tooltip, target) => {
    if (this._memoizedShifts) { return this._memoizedShifts; }

    let tooltipWidth  = tooltip.offsetWidth,
        tooltipHeight = tooltip.offsetHeight,
        pointerDimension = 15,
        // hardcode height & width since span has no dimensions
        pointerOffset = 11,
        targetWidth   = target.offsetWidth,
        targetHeight  = target.offsetHeight;

    return {
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
  };

  /**
   * Positions tooltip relative to target
   *
   * @method positionTooltip
   * @param {Object} tooltip
   * @param {Object} target
   * @return {Void}
   */
  positionTooltip = () => {
    if (this.state.isVisible) {

      let tooltip = this.getTooltip(),
          target = this.getTarget();

      if (!tooltip || !target) {
        // Can't find the tooltip or target so hide
        this.setState({ isVisible: false });
        return;
      }

      let alignment = this.props.tooltipAlign || 'center',
          position = this.props.tooltipPosition || 'top',
          shifts = this.calculatePosition(tooltip, target);

      switch (position) {
        case "top":
          styleElement(tooltip, 'top', append(shifts.verticalY, 'px'));
          styleElement(tooltip, 'right', 'auto');
          styleElement(tooltip, 'bottom', 'auto');
          styleElement(tooltip, 'left', append(shifts[`vertical${startCase(alignment)}`], 'px'));
          break;

        case "bottom":
          styleElement(tooltip, 'top', 'auto');
          styleElement(tooltip, 'bottom', append(shifts.verticalY, 'px'));
          styleElement(tooltip, 'left', append(shifts[`vertical${startCase(alignment)}`], 'px'));
          break;

        case "left":
          styleElement(tooltip, 'top', append(shifts[`side${startCase(alignment)}`], 'px'));
          styleElement(tooltip, 'bottom', 'auto');
          styleElement(tooltip, 'left', append(shifts[`${position}Horizontal`], 'px'));
          break;

        case "right":
          styleElement(tooltip, 'top', append(shifts[`side${startCase(alignment)}`], 'px'));
          styleElement(tooltip, 'bottom', 'auto');
          styleElement(tooltip, 'left', append(shifts[`${position}Horizontal`], 'px'));
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
    let props = super.componentProps || {};

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
   * Supplies the HTML for tooltip
   *
   * @method tooltipHTML
   * @return {Object} JSX for tooltip
   */
  get tooltipHTML() {
    if (this.props.tooltipMessage) {
      return (
        <Tooltip
          align={ this.props.tooltipAlign }
          data-element='tooltip'
          isVisible={ this.state.isVisible }
          position={ this.props.tooltipPosition }
          ref={ (comp) => this._tooltip = comp }
        >
          { this.props.tooltipMessage }
        </Tooltip>
      );
    }
  }
};

export default TooltipDecorator;
