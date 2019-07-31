import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { assign } from 'lodash';
import Tooltip from '../../../components/tooltip';
import Portal from '../../../components/portal';
import chainFunctions from '../../helpers/chain-functions';
import { styleElement } from '../../ether';
import { pointerSize, pointerSideMargin } from '../../../components/tooltip/tooltip-pointer.style';
import OptionsHelper from '../../helpers/options-helper';

/**
 * TooltipDecorator.
 *
 * This decorator attaches a tooltip to a component.
 *
 * == How to use Tooltip decorator in a component:
 *
 * In your file:
 *
 *   import TooltipDecorator from 'carbon-react/lib/utils/decorators/tooltip-decorator';
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
const TooltipDecorator = (ComposedComponent) => {
  class Component extends ComposedComponent {
    static propTypes = assign({}, ComposedComponent.propTypes, {
      tooltipMessage: PropTypes.node,
      tooltipPosition: PropTypes.oneOf(OptionsHelper.positions),
      tooltipAlign: PropTypes.oneOf(OptionsHelper.alignAroundEdges)
    });

    _showTooltipTimeout = null;

    _hideTooltipTimeout = null;

    componentDidMount() {
      if (super.componentDidMount) super.componentDidMount();
      if (this.props.tooltipVisible) this.positionTooltip();
    }

    componentWillUpdate(nextProps, nextState) {
      if (super.componentWillUpdate) { super.componentWillUpdate(nextProps, nextState); }
      }

    componentDidUpdate(prevProps) {
      if (super.componentDidUpdate) { super.componentDidUpdate(prevProps); }

      if (this.props.tooltipMessage && this.isVisible()) {
        this.positionTooltip();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (super.componentWillReceiveProps) { super.componentWillReceiveProps(nextProps); }

      if (nextProps.tooltipPosition !== this.props.tooltipPosition) {
        this.setState({ tooltipPosition: '', tooltipAlign: '' });
      }
    }

    state = {
      isVisible: false,
      tooltipAlign: '',
      tooltipPosition: ''
    };

    isVisible = () => {
      return this.state.isVisible || this.props.tooltipVisible;
    }

    onShow = () => {
      clearTimeout(this._showTooltipTimeout);
      clearTimeout(this._hideTooltipTimeout);

      if (this.state.isVisible) return;

      this._showTooltipTimeout = setTimeout(() => {
        this.setState({ isVisible: true });
        this.positionTooltip();
      }, 100);
    };

    onHide = () => {
      clearTimeout(this._showTooltipTimeout);
      clearTimeout(this._hideTooltipTimeout);

      if (!this.state.isVisible) return;

      this._hideTooltipTimeout = setTimeout(() => {
        this.setState({ isVisible: false });
      }, 100);
    };

    getTarget = () => {
      return ReactDOM.findDOMNode(this._target); // eslint-disable-line react/no-find-dom-node
    }

    getTooltip = () => {
      return ReactDOM.findDOMNode(this._tooltip); // eslint-disable-line react/no-find-dom-node
    }

    calculatePosition = (tooltip, target) => {
      const tooltipWidth = tooltip.offsetWidth,
          tooltipHeight = tooltip.offsetHeight,
          targetWidth = target.offsetWidth,
          targetHeight = target.offsetHeight,
          targetRect = target.getBoundingClientRect(),
          offsetY = window.pageYOffset,
          targetTop = targetRect.top + offsetY,
          targetBottom = targetRect.bottom + offsetY,
          targetLeft = targetRect.left,
          targetRight = targetRect.right,
          targetXCenter = targetWidth / 2,
          targetYCenter = targetHeight / 2;

      const tooltipDistances = {
        top: targetTop - tooltipHeight - pointerSize,
        bottom: targetBottom + pointerSize,
        left: targetLeft - tooltipWidth - pointerSize,
        right: targetRight + pointerSize
      };

      const vertical = {
        left: targetLeft - pointerSize,
        center: targetLeft + targetXCenter - (tooltipWidth / 2),
        right: (targetLeft - tooltipWidth) + targetXCenter + pointerSize + pointerSideMargin
      };

      const horizontal = {
        top: (targetTop + targetYCenter) - pointerSize - pointerSideMargin,
        center: targetTop + targetYCenter - (tooltipHeight / 2),
        bottom: (targetTop + targetYCenter - tooltipHeight) + pointerSize + pointerSideMargin
      };

      return { tooltipDistances, vertical, horizontal };
    };

    realignOffscreenTooltip = (shifts, tooltipWidth) => {
      const { tooltipPosition, tooltipAlign } = this.props;
      const position = this.state.tooltipPosition || tooltipPosition || 'top';
      const alignment = this.state.tooltipAlign || tooltipAlign || 'center';
      const isTooltipOffScreen = window.innerWidth < shifts.vertical[alignment] + tooltipWidth;

      if (alignment === 'right' || position === 'left' || !isTooltipOffScreen) return;

      if (position === 'right') {
        this.setState({ tooltipPosition: 'top', tooltipAlign: 'right' });
      } else {
        this.setState({ tooltipAlign: 'right' });
      }
    }

    positionTooltip = () => {
      if (!this.isVisible()) {
        return;
      }

      const tooltip = this.getTooltip(),
          target = this.getTarget();

      if (!tooltip || !target) {
        if (this.state.isVisible) this.setState({ isVisible: false });
        return;
      }

      const alignment = this.state.tooltipAlign || this.props.tooltipAlign || 'center',
          position = this.state.tooltipPosition || this.props.tooltipPosition || 'top',
          shifts = this.calculatePosition(tooltip, target);

      this.realignOffscreenTooltip(shifts, tooltip.offsetWidth);

      styleElement(tooltip, 'bottom', 'auto');
      styleElement(tooltip, 'right', 'auto');

      switch (position) {
        case 'top':
        case 'bottom':
          styleElement(tooltip, 'top', `${shifts.tooltipDistances[position]}px`);
          styleElement(tooltip, 'left', `${shifts.vertical[alignment]}px`);
          break;

        case 'left':
        case 'right':
        default:
          styleElement(tooltip, 'top', `${shifts.horizontal[alignment]}px`);
          styleElement(tooltip, 'left', `${shifts.tooltipDistances[position]}px`);
      }
    };

    get componentProps() {
      const props = super.componentProps || {};

      if (this.props.tooltipMessage) {
        props.onMouseEnter = chainFunctions(this.onShow, props.onMouseEnter);
        props.onMouseLeave = chainFunctions(this.onHide, props.onMouseLeave);
        props.onFocus = chainFunctions(this.onShow, props.onFocus);
        props.onBlur = chainFunctions(this.onHide, props.onBlur);
        props.onTouchEnd = this.isVisible() ? this.onHide : this.onShow;
      }
      return props;
    }

    get tooltipHTML() {
      return (
        (this.props.tooltipMessage && this.isVisible()) && (
          <Portal key='tooltip'>
            <Tooltip
              align={ this.state.tooltipAlign || this.props.tooltipAlign }
              data-element='tooltip'
              isVisible={ this.isVisible() }
              onMouseEnter={ this.onShow }
              onMouseLeave={ this.onHide }
              position={ this.state.tooltipPosition || this.props.tooltipPosition }
              ref={ (comp) => { this._tooltip = comp; } }
              type={ this.props.tooltipType }
            >
              { this.props.tooltipMessage }
            </Tooltip>
          </Portal>
        )
      );
    }
  }

  Component.displayName = ComposedComponent.displayName || ComposedComponent.name;
  return Component;
};

export default TooltipDecorator;
