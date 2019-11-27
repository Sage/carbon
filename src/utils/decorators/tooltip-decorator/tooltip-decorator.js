import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { assign } from 'lodash';
import Tooltip from '../../../components/tooltip';
import Portal from '../../../components/portal';
import chainFunctions from '../../helpers/chain-functions';
import { styleElement } from '../../ether';
import OptionsHelper from '../../helpers/options-helper';
import calculatePosition from './calculate-position';
import sizes from '../../../__experimental__/components/input/input-sizes.style';
import { pointerSideMargin } from '../../../components/tooltip/tooltip-pointer.style';

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
      tooltipAlign: PropTypes.oneOf(OptionsHelper.alignAroundEdges),
      isPartOfInput: PropTypes.bool,
      isThemeModern: PropTypes.bool
    });

    _showTooltipTimeout = null;

    _hideTooltipTimeout = null;

    componentDidMount() {
      if (super.componentDidMount) super.componentDidMount();
      if (this.props.tooltipVisible) this.positionTooltip();
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
      if (super.UNSAFE_componentWillUpdate) { super.UNSAFE_componentWillUpdate(nextProps, nextState); }
    }

    componentDidUpdate(prevProps) {
      if (super.componentDidUpdate) { super.componentDidUpdate(prevProps); }

      if (this.props.tooltipMessage && this.isVisible()) {
        this.positionTooltip();
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if (super.UNSAFE_componentWillReceiveProps) { super.UNSAFE_componentWillReceiveProps(nextProps); }

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

    positionTooltip = () => {
      let topPosition, leftPosition;
      const tooltip = this.getTooltip();
      const target = this.getTarget();

      if (!tooltip || !target) {
        if (this.state.isVisible) this.setState({ isVisible: false });
        return;
      }
      const alignment = this.state.tooltipAlign || this.props.tooltipAlign || 'center';
      const position = this.state.tooltipPosition || this.props.tooltipPosition || 'top';
      const shifts = calculatePosition(tooltip, target);
      const isTooltipOffScreenRight = this.isTooltipOffScreenRight(position, alignment, tooltip.offsetWidth, shifts);
      const inputDistanceOffset = this.getInputDistanceOffset(position);

      if (isTooltipOffScreenRight) {
        this.realignOffscreenTooltip(position, alignment);
      }

      if (position === 'top' || position === 'bottom') {
        topPosition = shifts.tooltipDistances[position] + inputDistanceOffset;
        leftPosition = shifts.vertical[alignment] + this.getHorizontalOffset();
      } else {
        topPosition = shifts.horizontal[alignment];
        leftPosition = shifts.tooltipDistances[position] + inputDistanceOffset;
      }

      styleElement(tooltip, 'top', `${topPosition}px`);
      styleElement(tooltip, 'left', `${leftPosition}px`);
    };

    isTooltipOffScreenRight = (position, alignment, tooltipWidth, shifts) => {
      let pointerX;

      if (position === 'left') {
        return false;
      }

      if (position === 'right') {
        pointerX = shifts.tooltipDistances.right;
      } else {
        pointerX = shifts.vertical[alignment];
      }

      return window.innerWidth < pointerX + tooltipWidth;
    }

    realignOffscreenTooltip = (position, alignment) => {
      if (alignment === 'right' || position === 'left') return;

      if (position === 'right') {
        this.setState({ tooltipPosition: 'top', tooltipAlign: 'right' });
      } else {
        this.setState({ tooltipAlign: 'right' });
      }
    }

    getInputDistanceOffset = (position) => {
      if (!this.props.isPartOfInput || !this.props.isThemeModern || !this.props.size) return 0;

      const inputSizes = sizes[this.props.size];
      const { tooltipVerticalOffset, tooltipHorizontalOffset } = inputSizes;
      const inputGap = 2;

      switch (position) {
        case 'top':
          return -tooltipVerticalOffset - pointerSideMargin;
        case 'bottom':
          return tooltipVerticalOffset + pointerSideMargin;
        case 'left':
          return -tooltipHorizontalOffset - pointerSideMargin - inputGap;
        case 'right':
        default:
          return tooltipHorizontalOffset + pointerSideMargin + inputGap;
      }
    }

    getHorizontalOffset = () => {
      if (!this.props.isThemeModern || !this.props.isPartOfInput || !this.props.size) return 0;

      return sizes[this.props.size].tooltipHorizontalOffset;
    }

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
              size={ this.props.size }
              type={ this.props.tooltipType }
              isPartOfInput={ this.props.isPartOfInput }
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
