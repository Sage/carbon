import React from 'react';
import Icon from 'components/icon'
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import TooltipDecorator from './tooltip-decorator';

class BasicClass extends React.Component {
  onBlur = () => {
  }

  onFocus = () => {
  }

  onMouseEnter = () => {

  }

  onMouseLeave = () => {

  }

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
      <div tooltipMessage={ this.props.tooltipMessage } tooltipPosition={ this.props.tooltipPosition } tooltipAlign={ this.props.tooltipAlign }>
        {this.tooltipHTML }
      </div>
    )
  }
};


describe('tooltip-decorator', () => {
  let topTooltip, bottomTooltip, rightTooltip, leftTooltip, bottomAlignTooltip, noTooltip;

  beforeEach(() => {
    let DecoratedClassOne = TooltipDecorator(BasicClass);
    topTooltip = TestUtils.renderIntoDocument(<DecoratedClassOne tooltipMessage='Hello'/>);

    let DecoratedClassTwo = TooltipDecorator(BasicClass);
    bottomTooltip = TestUtils.renderIntoDocument(<DecoratedClassTwo tooltipMessage='Hello' tooltipPosition='bottom'/>);

    let DecoratedClassThree = TooltipDecorator(BasicClass);
    rightTooltip = TestUtils.renderIntoDocument(<DecoratedClassThree tooltipMessage='Hello' tooltipPosition='right'/>);

    let DecoratedClassFour = TooltipDecorator(BasicClass);
    leftTooltip = TestUtils.renderIntoDocument(<DecoratedClassFour tooltipMessage='Hello' tooltipPosition='left'/>);

    let DecoratedClassFive = TooltipDecorator(BasicClass);
    noTooltip = TestUtils.renderIntoDocument(<DecoratedClassFive/>);

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('on show', () => {
    beforeEach(() => {
      spyOn(topTooltip, 'positionTooltip');
    });

    it('shows the tooltip after a timeout', () => {
      spyOn(topTooltip, 'setState');
      topTooltip.onShow();
      jasmine.clock().tick(300);
      expect(topTooltip.setState).toHaveBeenCalledWith({ isVisible: true });
    });

    it('calls positionTooltip after a timeout', () => {
      topTooltip.onShow();
      jasmine.clock().tick(300);
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
      jasmine.clock().uninstall();
      spyOn(window, 'clearTimeout');
      topTooltip.onHide();
      expect(window.clearTimeout).toHaveBeenCalledWith(topTooltip.timeout);
    });
  });

  describe('getTarget', () => {
    it('returns the target DOM element', () => {
      spyOn(ReactDOM, 'findDOMNode').and.callThrough();;
      topTooltip.getTarget();
      expect(ReactDOM.findDOMNode).toHaveBeenCalledWith(topTooltip._target);
    });
  });

  describe('getTooltip', () => {
    it('returns the tooltip DOM element', () => {
      spyOn(ReactDOM, 'findDOMNode').and.callThrough();
      topTooltip.getTooltip();
      expect(ReactDOM.findDOMNode).toHaveBeenCalledWith(topTooltip._tooltip);
    });
  });

  describe('positionTooltip', () => {
    describe('when positioned above the target', () => {
      beforeEach(()  => {
        spyOn(topTooltip, 'getTarget').and.returnValue(
            {
              offsetWidth: 30,
              offsetHeight: 30
            }
        );

        spyOn(topTooltip, 'getTooltip').and.returnValue(
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
        topTooltip.onShow();
        jasmine.clock().tick(300);
        let positionedTooltip = topTooltip.getTooltip()
        expect(positionedTooltip.style.left).toEqual('-35px');
        expect(positionedTooltip.style.top).toEqual('-57.5px');
      });
    });

    describe('when positioned below the target', () => {
      beforeEach(()  => {
        spyOn(bottomTooltip, 'getTarget').and.returnValue(
            {
              offsetWidth: 30,
              offsetHeight: 30
            }
        );

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
        jasmine.clock().tick(300);
        let positionedTooltip = bottomTooltip.getTooltip()
        expect(positionedTooltip.style.left).toEqual('-35px');
        expect(positionedTooltip.style.bottom).toEqual('-57.5px');
      });
    });

    describe('when positioned right of the target', () => {
      beforeEach(()  => {
        spyOn(rightTooltip, 'getTarget').and.returnValue(
            {
              offsetWidth: 30,
              offsetHeight: 30
            }
        );

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
        jasmine.clock().tick(300);
        let positionedTooltip = rightTooltip.getTooltip()
        expect(positionedTooltip.style.left).toEqual('37.5px');
        expect(positionedTooltip.style.top).toEqual('-10px');
      });
    });

    describe('when positioned left of the target', () => {
      beforeEach(()  => {
        spyOn(leftTooltip, 'getTarget').and.returnValue(
            {
              offsetWidth: 30,
              offsetHeight: 30
            }
        );

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
        jasmine.clock().tick(300);
        let positionedTooltip = leftTooltip.getTooltip()
        expect(positionedTooltip.style.left).toEqual('-107.5px');
        expect(positionedTooltip.style.top).toEqual('-10px');
      });
    });

    describe('when isVisible is set to false', () => {
      it('does not try to position the tooltip', () => {
        spyOn(topTooltip, 'getTooltip');
        topTooltip.onHide();
        topTooltip.positionTooltip();
        expect(topTooltip.getTooltip).not.toHaveBeenCalled();
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
  });

  describe('pointerProps', () => {
    it('sets the pointer to top when the tooltip is on bottom', () => {
      let props = bottomTooltip.pointerProps;
      expect(props.pointerPosition).toEqual('top');
    });

    it('sets the pointer to left when the tooltip is on right', () => {
      let props = rightTooltip.pointerProps;
      expect(props.pointerPosition).toEqual('left');
    });

    it('sets the pointer to right when the tooltip is on left', () => {
      let props = leftTooltip.pointerProps;
      expect(props.pointerPosition).toEqual('right');
    });

    it('defaults the pointer to bottom', () => {
      let props = topTooltip.pointerProps;
      expect(props.pointerPosition).toEqual('bottom');
    });

    describe('when no tooltip message is provided', () => {
      it('does not return custom props', () => {
        expect(noTooltip.pointerProps).not.toBeDefined();
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
});
