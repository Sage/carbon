import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TooltipDecorator from './tooltip-decorator';
import { shallow } from 'enzyme';

/* global jest */

class BasicClass extends React.Component {
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillReceiveProps() {}
  onBlur = () => {}
  onFocus = () => {}
  onMouseEnter = () => {}
  onMouseLeave = () => {}

  get componentProps() {
    return {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    };
  }

  render() {
    return (
      <div>
        {this.tooltipHTML }
      </div>
    );
  }
}

class StrippedClass extends React.Component {
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillReceiveProps() {}
  onBlur = () => {}
  onFocus = () => {}
  onMouseEnter = () => {}
  onMouseLeave = () => {}

  render() {
    return (
      <div>
        {this.tooltipHTML }
      </div>
    );
  }
}

describe('tooltip-decorator', () => {
  let topTooltip, bottomTooltip, rightTooltip, leftTooltip, noTooltip, strippedTooltip,
      DecoratedClassOne, DecoratedClassTwo;

  beforeEach(() => {
    DecoratedClassOne = TooltipDecorator(BasicClass);
    DecoratedClassTwo = TooltipDecorator(StrippedClass);

    topTooltip = TestUtils.renderIntoDocument(<DecoratedClassOne tooltipMessage='Hello' />);
    bottomTooltip = TestUtils.renderIntoDocument(<DecoratedClassOne tooltipMessage='Hello' tooltipPosition='bottom' />);
    rightTooltip = TestUtils.renderIntoDocument(<DecoratedClassOne tooltipMessage='Hello' tooltipPosition='right' />);
    leftTooltip = TestUtils.renderIntoDocument(<DecoratedClassOne tooltipMessage='Hello' tooltipPosition='left' />);
    noTooltip = TestUtils.renderIntoDocument(<DecoratedClassOne/>);

    strippedTooltip = TestUtils.renderIntoDocument(<DecoratedClassTwo />);

    jest.useFakeTimers();
  });

  describe('componentWillReceiveProps', () => {
    describe('if currently visible', () => {
      it('calls setState to reset the hover', () => {
        topTooltip.state.isVisible = true;
        spyOn(topTooltip, 'setState');
        topTooltip.componentWillReceiveProps();
        expect(topTooltip.setState).toHaveBeenCalledWith({
          isVisible: false
        });
      });
    });

    describe('if not visible', () => {
      it('does not call setState', () => {
        spyOn(topTooltip, 'setState');
        topTooltip.componentWillReceiveProps();
        expect(topTooltip.setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('componentWillUpdate', () => {
    let props;

    beforeEach(() => {
      props = {
        tooltipMessage: topTooltip.props.tooltipMessage,
        tooltipPosition: topTooltip.props.tooltipPosition,
        tooltipAlign: topTooltip.props.tooltipAlign
      };
      topTooltip._memoizedShifts = 'foo';
    });

    describe('if message has changed', () => {
      it('nulls the memoized shifts', () => {
        props.tooltipMessage = 'new';
        topTooltip.componentWillUpdate(props);
        expect(topTooltip._memoizedShifts).toEqual(null);
      });
    });

    describe('if position has changed', () => {
      it('nulls the memoized shifts', () => {
        props.tooltipPosition = 'new';
        topTooltip.componentWillUpdate(props);
        expect(topTooltip._memoizedShifts).toEqual(null);
      });
    });

    describe('if align has changed', () => {
      it('nulls the memoized shifts', () => {
        props.tooltipAlign = 'new';
        topTooltip.componentWillUpdate(props);
        expect(topTooltip._memoizedShifts).toEqual(null);
      });
    });

    describe('if nothing has changed', () => {
      it('keeps memoized shifts', () => {
        topTooltip.componentWillUpdate(props);
        expect(topTooltip._memoizedShifts).toEqual('foo');
      });
    });
  });

  describe('on show', () => {
    beforeEach(() => {
      spyOn(topTooltip, 'positionTooltip');
    });

    it('shows the tooltip after a timeout', () => {
      spyOn(topTooltip, 'setState');
      topTooltip.onShow();
      jest.runTimersToTime(300);
      expect(topTooltip.setState).toHaveBeenCalledWith({ isVisible: true });
    });

    it('calls positionTooltip after a timeout', () => {
      topTooltip.onShow();
      jest.runTimersToTime(300);
      expect(topTooltip.positionTooltip).toHaveBeenCalled();
    });
  });

  describe('on hide', () => {
    it('hides the tooltip', () => {
      spyOn(topTooltip, 'setState');
      topTooltip.onHide();
      expect(topTooltip.setState).toHaveBeenCalledWith({ isVisible: false });
    });

    it('clears the timeout', () => {
      spyOn(window, 'clearTimeout');
      topTooltip.onHide();
      expect(window.clearTimeout).toHaveBeenCalledWith(topTooltip._tooltipTimeout);
    });
  });

  describe('calculatePosition', () => {
    describe('if memoized', () => {
      it('returns memoized shifts', () => {
        topTooltip._memoizedShifts = 'foo';
        expect(topTooltip.calculatePosition(0, 0)).toEqual('foo');
      });
    });
  });

  describe('positionTooltip', () => {
    let getTarget;

    beforeEach(() => {
      getTarget = {
        offsetWidth: 30,
        offsetHeight: 30,
        getBoundingClientRect: () => ({ top: 100, bottom: 100, left: 100, right: 100 })
      }
    });


    describe('when positioned above the target', () => {
      beforeEach(()  => {
        topTooltip = shallow(<DecoratedClassOne tooltipMessage='Hello' />).instance();
        spyOn(topTooltip, 'getTarget').and.returnValue(getTarget);

        spyOn(topTooltip, 'getTooltip').and.returnValue(
          {
            offsetWidth: 100,
            offsetHeight: 50,
            style: { left: 0, top: 0},
            children:
            [
              { foo: 'bar' },
              {
                offsetHeight: 7
              }
            ]
          }
        );
      });

      it('sets the top and left styles', () => {
        topTooltip.onShow();
        jest.runTimersToTime(100);
        let tooltip = topTooltip.getTooltip();
        let target = topTooltip.getTarget();
        topTooltip.positionTooltip(tooltip, target);
        expect(tooltip.style.left).toEqual('65px');
        expect(tooltip.style.top).toEqual('42.5px');
      });

      describe('when the pointer is aligned to the right', () => {
        let rightTopTooltip;

        beforeEach(()  => {
          let DecoratedClass = TooltipDecorator(BasicClass);
          rightTopTooltip = shallow(
            <DecoratedClass tooltipMessage='Hello' tooltipPosition='top' tooltipAlign='right'/>
          ).instance();

          spyOn(rightTopTooltip, 'getTarget').and.returnValue(getTarget);

          spyOn(rightTopTooltip, 'getTooltip').and.returnValue(
            {
              offsetWidth: 100,
              offsetHeight: 50,
              style: { left: 0, top: 0},
              children:
                [
                  { foo: 'bar' },
                  {
                    offsetHeight: 7
                  }
                ]
            }
          );
        });

        it('sets the correct top and left styles', () => {
          rightTopTooltip.onShow();
          jest.runTimersToTime(100);
          let alignedTooltip = rightTopTooltip.getTooltip();
          let target = rightTopTooltip.getTarget();
          rightTopTooltip.positionTooltip(alignedTooltip, target);
          expect(alignedTooltip.style.left).toEqual('26px');
          expect(alignedTooltip.style.top).toEqual('42.5px');
        });
      });

      describe('when the pointer is aligned to the left', () => {
        let leftTopTooltip;

        beforeEach(()  => {
          let DecoratedClass = TooltipDecorator(BasicClass);
          leftTopTooltip = shallow(
            <DecoratedClass tooltipMessage='Hello' tooltipPosition='top' tooltipAlign='left'/>
          ).instance();

          spyOn(leftTopTooltip, 'getTarget').and.returnValue(getTarget);

          spyOn(leftTopTooltip, 'getTooltip').and.returnValue(
            {
              offsetWidth: 100,
              offsetHeight: 50,
              style: { left: 0, top: 0},
              children:
                [
                  { foo: 'bar' },
                  {
                    offsetHeight: 7
                  }
                ]
            }
          );
        });

        it('sets the correct top and left styles', () => {
          leftTopTooltip.onShow();
          jest.runTimersToTime(100);
          let alignedTooltip = leftTopTooltip.getTooltip();
          let target = leftTopTooltip.getTarget();
          leftTopTooltip.positionTooltip(alignedTooltip, target);
          expect(alignedTooltip.style.left).toEqual('92.5px');
          expect(alignedTooltip.style.top).toEqual('42.5px');
        });
      });
    });

    describe('when positioned below the target', () => {
      beforeEach(()  => {
        let DecoratedClass = TooltipDecorator(BasicClass);
        bottomTooltip = shallow(
          <DecoratedClass tooltipMessage='Hello' tooltipPosition='bottom'/>
        ).instance();
        spyOn(bottomTooltip, 'getTarget').and.returnValue(getTarget);

        spyOn(bottomTooltip, 'getTooltip').and.returnValue(
            {
              offsetWidth: 100,
              offsetHeight: 50,
              style: {},
              children:
                [
                  { foo: 'bar' },
                  {
                    offsetHeight: 7
                  }
                ]
            }
        );
      });

      it('sets the top and left styles', () => {
        bottomTooltip.onShow();
        jest.runTimersToTime(100);
        let tooltip = bottomTooltip.getTooltip();
        let target = bottomTooltip.getTarget();
        bottomTooltip.positionTooltip(tooltip, target);
        expect(tooltip.style.left).toEqual('65px');
        expect(tooltip.style.bottom).toEqual('auto');
      });
    });

    describe('when positioned right of the target', () => {
      beforeEach(()  => {
        let DecoratedClass = TooltipDecorator(BasicClass);
        rightTooltip = shallow(
          <DecoratedClass tooltipMessage='Hello' tooltipPosition='right'/>
        ).instance();
        spyOn(rightTooltip, 'getTarget').and.returnValue(getTarget);

        spyOn(rightTooltip, 'getTooltip').and.returnValue(
            {
              offsetWidth: 100,
              offsetHeight: 50,
              style: {},
              children:
                [
                  { foo: 'bar' },
                  {
                    offsetHeight: 7
                  }
                ]
            }
        );
      });

      it('sets the top and left styles', () => {
        rightTooltip.onShow();
        jest.runTimersToTime(100);
        let tooltip = rightTooltip.getTooltip();
        let target = rightTooltip.getTarget();
        rightTooltip.positionTooltip(tooltip, target);
        expect(tooltip.style.left).toEqual('107.5px');
        expect(tooltip.style.top).toEqual('90px');
      });

      describe('when the pointer is aligned to the top', () => {
        let topRightTooltip;

        beforeEach(()  => {
          let DecoratedClass = TooltipDecorator(BasicClass);
          topRightTooltip = TestUtils.renderIntoDocument(
            <DecoratedClass tooltipMessage='Hello' tooltipPosition='right' tooltipAlign='top'/>
          );

          spyOn(topRightTooltip, 'getTarget').and.returnValue(getTarget);

          spyOn(topRightTooltip, 'getTooltip').and.returnValue(
            {
              offsetWidth: 100,
              offsetHeight: 50,
              style: { left: 0, top: 0},
              children:
                [
                  { foo: 'bar' },
                  {
                    offsetHeight: 7
                  }
                ]
            }
          );
        });

        it('sets the correct top and left styles', () => {
          topRightTooltip.onShow();
          jest.runTimersToTime(100);
          let alignedTooltip = topRightTooltip.getTooltip();
          let target = topRightTooltip.getTarget();
          topRightTooltip.positionTooltip(alignedTooltip, target);
          expect(alignedTooltip.style.left).toEqual('107.5px');
          expect(alignedTooltip.style.top).toEqual('89px');
        });
      });

      describe('when the pointer is aligned to the bottom', () => {
        let bottomRightTooltip;

        beforeEach(()  => {
          let DecoratedClass = TooltipDecorator(BasicClass);
          bottomRightTooltip = shallow(
            <DecoratedClass tooltipMessage='Hello' tooltipPosition='right' tooltipAlign='bottom'/>
          ).instance();

          spyOn(bottomRightTooltip, 'getTarget').and.returnValue(getTarget);

          spyOn(bottomRightTooltip, 'getTooltip').and.returnValue(
            {
              offsetWidth: 100,
              offsetHeight: 50,
              style: { left: 0, top: 0},
              children:
                [
                  { foo: 'bar' },
                  {
                    offsetHeight: 7
                  }
                ]
            }
          );
        });

        it('sets the correct top and left styles', () => {
          bottomRightTooltip.onShow();
          jest.runTimersToTime(100);
          let alignedTooltip = bottomRightTooltip.getTooltip();
          let target = bottomRightTooltip.getTarget();
          bottomRightTooltip.positionTooltip(alignedTooltip, target);
          expect(alignedTooltip.style.left).toEqual('107.5px');
          expect(alignedTooltip.style.top).toEqual('91px');
        });
      });
     });

    describe('when positioned left of the target', () => {
      beforeEach(()  => {
        let DecoratedClass = TooltipDecorator(BasicClass);
        leftTooltip = shallow(
          <DecoratedClass tooltipMessage='Hello' tooltipPosition='left' />
        ).instance();
        spyOn(leftTooltip, 'getTarget').and.returnValue(getTarget);

        spyOn(leftTooltip, 'getTooltip').and.returnValue(
            {
              offsetWidth: 100,
              offsetHeight: 50,
              style: {},
              children:
                [
                  { foo: 'bar' },
                  {
                    offsetHeight: 7
                  }
                ]
            }
        );
      });

      it('sets the top and left styles', () => {
        leftTooltip.onShow();
        jest.runTimersToTime(100);
        let tooltip = leftTooltip.getTooltip();
        let target = leftTooltip.getTarget();
        leftTooltip.positionTooltip(tooltip, target);
        expect(tooltip.style.left).toEqual('-7.5px');
        expect(tooltip.style.top).toEqual('90px');
      });
    });

    describe('when isVisible is set to false', () => {
      it('does not try to position the tooltip', () => {
        spyOn(topTooltip, 'getTooltip')
        topTooltip.onHide();
        topTooltip.positionTooltip();
        expect(topTooltip.getTooltip).not.toHaveBeenCalled();
      });
    });

    describe('when there is no tooltip', () => {
      it('hides the tooltip', () => {
        noTooltip.onShow();
        jest.runTimersToTime(100);
        expect(noTooltip.state.isVisible).toBeFalsy();
      });
    });

    describe('when there is no target', () => {
      beforeEach(()  => {
        spyOn(leftTooltip, 'getTarget').and.returnValue(null);
        spyOn(leftTooltip, 'getTooltip').and.returnValue({
          offsetWidth: 100,
          offsetHeight: 50,
          style: {},
          children: [
            { foo: 'bar' },
            {
              offsetHeight: 7
            }
          ]
        });
      });

      it('hides the tooltip', () => {
        leftTooltip.onShow();
        jest.runTimersToTime(100);
        expect(leftTooltip.state.isVisible).toBeFalsy();
      });
    });
  });

  describe('componentProps', () => {
    it('sets an onMouseEnter event of chained functions', () => {
      spyOn(topTooltip, 'onShow');
      spyOn(topTooltip, 'onMouseEnter');
      topTooltip.componentProps.onMouseEnter();
      expect(topTooltip.onShow).toHaveBeenCalled();
      expect(topTooltip.onMouseEnter).toHaveBeenCalled();
    });

    it('sets an onMouseLeave event of chained functions', () => {
      spyOn(topTooltip, 'onHide');
      spyOn(topTooltip, 'onMouseLeave');
      topTooltip.componentProps.onMouseLeave();
      expect(topTooltip.onHide).toHaveBeenCalled();
      expect(topTooltip.onMouseLeave).toHaveBeenCalled();
    });

    it('sets an onBlur event of chained functions', () => {
      spyOn(topTooltip, 'onHide');
      spyOn(topTooltip, 'onBlur');
      topTooltip.componentProps.onBlur();
      expect(topTooltip.onHide).toHaveBeenCalled();
      expect(topTooltip.onBlur).toHaveBeenCalled();
    });

    it('sets an onFocus event of chained functions', () => {
      spyOn(topTooltip, 'onShow');
      spyOn(topTooltip, 'onFocus');
      topTooltip.componentProps.onFocus();
      expect(topTooltip.onShow).toHaveBeenCalled();
      expect(topTooltip.onFocus).toHaveBeenCalled();
    });

    it('adds a touchEnd handler that toggles the tooltip on or off', () => {
      spyOn(topTooltip, 'onShow');
      spyOn(topTooltip, 'onHide');
      spyOn(topTooltip, 'positionTooltip');

      topTooltip.setState({ isVisible: true });
      topTooltip.componentProps.onTouchEnd();
      expect(topTooltip.onHide).toHaveBeenCalled();

      topTooltip.setState({ isVisible: false });
      topTooltip.componentProps.onTouchEnd();
      expect(topTooltip.onShow).toHaveBeenCalled();
    });

    describe('when no tooltipMessage is defined', () => {
      it('sets the original onMouseEnter', () => {
        spyOn(noTooltip, 'onShow');
        spyOn(noTooltip, 'onMouseEnter');
        noTooltip.componentProps.onMouseEnter();
        expect(noTooltip.onShow).not.toHaveBeenCalled();
        expect(noTooltip.onMouseEnter).toHaveBeenCalled();
      });

      it('sets the original onMouseLeave event', () => {
        spyOn(noTooltip, 'onHide');
        spyOn(noTooltip, 'onMouseLeave');
        noTooltip.componentProps.onMouseLeave();
        expect(noTooltip.onHide).not.toHaveBeenCalled();
        expect(noTooltip.onMouseLeave).toHaveBeenCalled();
      });

      it('sets the original onBlur event', () => {
        spyOn(noTooltip, 'onHide');
        spyOn(noTooltip, 'onBlur');
        noTooltip.componentProps.onBlur();
        expect(noTooltip.onHide).not.toHaveBeenCalled();
        expect(noTooltip.onBlur).toHaveBeenCalled();
      });

      it('sets the original onFocus event', () => {
        spyOn(noTooltip, 'onShow');
        spyOn(noTooltip, 'onFocus');
        noTooltip.componentProps.onFocus();
        expect(noTooltip.onShow).not.toHaveBeenCalled();
        expect(noTooltip.onFocus).toHaveBeenCalled();
      });

      it('does not add a touchEnd handler', () => {
        expect(noTooltip.componentProps.onTouchEnd).not.toBeDefined();
      });
    });

    describe('when the super class lacks a componentProps method', () => {
      it('sets props to an empty object', () => {
        expect(strippedTooltip.componentProps).toEqual({});
      });
    });
  });

  describe('tooltipHTML', () => {
    describe('when a tooltipMessage is defined', () => {
      it('returns a Tooltip', () => {
        expect(topTooltip.tooltipHTML).toBeDefined();
      });
    });
  });

  describe('when no tooltip message is provided', () => {
    it('does not render a tooltip', () => {
      expect(noTooltip.getTooltip()).toEqual(null);
    });
  });

  describe('displayName', () => {
    class Foo extends React.Component { // eslint-disable-line react/no-multi-comp
      bar = () => {
        return 'bar';
      }
    }

    const displayName = 'FooClass';

    describe('when ComposedComponent.displayName is defined', () => {
      beforeEach(() => {
        Foo.displayName = displayName;
      });
      afterEach(() => {
        Foo.displayName = undefined;
      });

      it('sets Component.displayName to ComposedComponent.displayName', () => {
        const DecoratedComponent = TooltipDecorator(Foo);
        expect(DecoratedComponent.displayName).toBe(displayName);
      });
    });

    describe('when ComposedComponent.displayName is undefined', () => {
      it('sets Component.displayName to ComposedComponent.name', () => {
        const DecoratedComponent = TooltipDecorator(Foo);
        expect(DecoratedComponent.displayName).toBe('Foo');
      });
    });
  });
});
