import React from 'react';
import Icon from 'components/icon'
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import TooltipIDecorator from './tooltip-decorator';

class basicClass extends React.Component {
  props: {
    tooltipMessage: 'Hello'
  }

  render() {
    return (
      <div>
        <Icon tooltipMessage={this.props.tooltipMessage} type='question' />
      </div>
    )
  }
}

describe('tooltip-decorator', () => {
  let basicTarget;

  beforeEach(() => {
    let DecoratedClassOne = TooltipIDecorator(basicClass);
    basicTarget = TestUtils.renderIntoDocument(React.createElement(DecoratedClassOne));
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('show handler', () => {
    it('shows the tooltip after a timeout', () => {
      spyOn(basicTarget, 'setState');
      basicTarget.showHandler();
      jasmine.clock().tick(300);
      expect(basicTarget.setState).toHaveBeenCalledWith({ showTooltip: true });
    });

    it('calls positionTooltip after a timeout', () => {
      spyOn(basicTarget, 'positionTooltip');
      basicTarget.showHandler();
      jasmine.clock().tick(300);
      expect(basicTarget.positionTooltip).toHaveBeenCalled();
    });
  });

  describe('hideHandler', () => {
    it('hides the tooltip', () => {
      spyOn(basicTarget, 'setState');
      basicTarget.hideHandler();
      expect(basicTarget.setState).toHaveBeenCalledWith({ showTooltip: false });
    });
  });


  describe('positionTooltip', () => {
    describe('when positioned above the target', () => {
      it('sets the top and left styles', () => {
        // basicTarget.setState({showTooltip: true });
        basicTarget.showHandler();
        jasmine.clock().tick(300);
        debugger
        let rendered = TestUtils.findRenderedDOMComponentWithClass(basicTarget, 'ui-tooltip')
        // expect(basicTarget.)
      });
    });
  });
});
