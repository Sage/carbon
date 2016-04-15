import React from 'react';
import Icon from 'components/icon'
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import TooltipIDecorator from './tooltip-decorator';

class BasicClass extends React.Component {
  render() {
    return (
      <div>
        <Icon tooltipMessage='Hello' type='question' />
      </div>
    )
  }
}

class BottomClass extends React.Component {
  render() {
    return (
      <div>
        <Icon tooltipMessage='Hello' type='question' tooltipPosition='bottom'/>
      </div>
    )
  }
}

class RightClass extends React.Component {
  render() {
    return (
      <div>
        <Icon tooltipMessage='Hello' type='question' tooltipPosition='right'/>
      </div>
    )
  }
}

class LeftClass extends React.Component {
  render() {
    return (
      <div>
        <Icon tooltipMessage='Hello' type='question' tooltipPosition='left'/>
      </div>
    )
  }
}

describe('tooltip-decorator', () => {
  let topTooltip, bottomToolTip, rightTooltip, leftToolTip;

  beforeEach(() => {
    let DecoratedClassOne = TooltipIDecorator(BasicClass);
    topTooltip = TestUtils.renderIntoDocument(React.createElement(DecoratedClassOne));

    let DecoratedClassTwo = TooltipIDecorator(BottomClass);
    bottomToolTip = TestUtils.renderIntoDocument(React.createElement(DecoratedClassTwo));

    let DecoratedClassThree = TooltipIDecorator(RightClass);
    rightTooltip = TestUtils.renderIntoDocument(React.createElement(DecoratedClassThree));

    let DecoratedClassFour = TooltipIDecorator(LeftClass);
    leftToolTip = TestUtils.renderIntoDocument(React.createElement(DecoratedClassFour));

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('on show', () => {
    it('shows the tooltip after a timeout', () => {
      spyOn(topTooltip, 'setState');
      topTooltip.onShow();
      jasmine.clock().tick(300);
      expect(topTooltip.setState).toHaveBeenCalledWith({ showTooltip: true });
    });

    it('calls positionTooltip after a timeout', () => {
      spyOn(topTooltip, 'positionTooltip');
      topTooltip.onShow();
      jasmine.clock().tick(300);
      expect(topTooltip.positionTooltip).toHaveBeenCalled();
    });
  });

  describe('on hide', () => {
    it('hides the tooltip', () => {
      spyOn(topTooltip, 'setState');
      topTooltip.onHide();
      expect(topTooltip.setState).toHaveBeenCalledWith({ showTooltip: false });
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
        expect(positionedTooltip.style.top).toEqual('-53.5px');
      });
    });

    describe('when positioned below the target', () => {
      beforeEach(()  => {
        spyOn(bottomToolTip, 'getTarget').and.returnValue(
            {
              offsetWidth: 30,
              offsetHeight: 30
            }
        );

        spyOn(bottomToolTip, 'getTooltip').and.returnValue(
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
        bottomToolTip.onShow();
        jasmine.clock().tick(300);
        let positionedTooltip = bottomToolTip.getTooltip()
        expect(positionedTooltip.style.left).toEqual('-35px');
        expect(positionedTooltip.style.top).toEqual('-53.5px');
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
        expect(positionedTooltip.style.left).toEqual('-35px');
        expect(positionedTooltip.style.top).toEqual('-53.5px');
      });
    });

    describe('when positioned left of the target', () => {
      beforeEach(()  => {
        spyOn(leftToolTip, 'getTarget').and.returnValue(
            {
              offsetWidth: 30,
              offsetHeight: 30
            }
        );

        spyOn(leftToolTip, 'getTooltip').and.returnValue(
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
        leftToolTip.onShow();
        jasmine.clock().tick(300);
        let positionedTooltip = leftToolTip.getTooltip()
        expect(positionedTooltip.style.left).toEqual('-35px');
        expect(positionedTooltip.style.top).toEqual('-53.5px');
      });
    });
  });
});
