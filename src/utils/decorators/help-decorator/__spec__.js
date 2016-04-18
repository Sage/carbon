import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDom from 'react-dom';
import HelpDecorator from './help-decorator';
import Help from 'components/help';

class DummyClass extends React.Component {
  render() {
    return (
      <div tooltipMessage={ this.props.tooltipMessage }>
        {this.helpHTML }
      </div>
    )
  }
};

class DummyClassNoHelp extends React.Component {
  render() {
    return (
      <div>
        {this.helpHTML }
      </div>
    )
  }
};

describe('HelpDecorator', () => {
  let instance, noHelpInstance;

  beforeEach(() => {
    let DecoratedClassOne = HelpDecorator(DummyClass);
    let DecoratedClassTwo = HelpDecorator(DummyClassNoHelp);

    instance = TestUtils.renderIntoDocument(<DecoratedClassOne tooltipMessage='Helpful Content'/>);
    noHelpInstance = TestUtils.renderIntoDocument(<DecoratedClassTwo />)
  });

  describe('helpHTML', () => {
    it('renders an inline help component', () => {
      let helpInstance = TestUtils.findRenderedComponentWithType(instance, Help);
      expect(helpInstance.props.className).toMatch('ui-help--inline');
      expect(helpInstance.props.inline).toBeTruthy();
    });
  });

  describe('when no tooltipMessage is provided', () => {
    it('does not render a help component', () => {
      let helpInstance = ReactDom.findDOMNode(noHelpInstance._help);
      expect(helpInstance).toEqual(null);
    });
  });
});
