import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Button from './button';
import Link from 'components/link';


describe('Button', () => {

  let defaultButton, primary, secondary, small, large, disabled, anchor, to, wrapper;
  let spy = jasmine.createSpy('spy')

  beforeEach(() => {

    defaultButton = TestUtils.renderIntoDocument(
      <Button>Save</Button>
    );

    primary = TestUtils.renderIntoDocument(
      <Button
        name="Primary Button"
        as="primary"
        onClick={ spy }
      >Primary</Button>
    );

    secondary = TestUtils.renderIntoDocument(
      <Button
        name="Secondary Button"
        className="customClass"
        theme='red'
      >Secondary</Button>
    );

    small = TestUtils.renderIntoDocument(
      <Button
        name="Small Button"
        size='small'
      >Small</Button>
    );

    large = TestUtils.renderIntoDocument(
      <Button
        name="Large Button"
        size='large'
      >Large</Button>
    );

    disabled = TestUtils.renderIntoDocument(
      <Button
        name="Disabled Button"
        disabled={ true }
      >Disabled</Button>
    );

    anchor = TestUtils.renderIntoDocument(
      <Button href="/foo">Anchor</Button>
    );

    to = TestUtils.renderIntoDocument(
      <Button to="/foo">To</Button>
    );

    wrapper = shallow(<Button data-role='contacts' data-element='button'>A Button</Button>);
  });

  describe('A basic button', () => {
    it('renders a button with defaults', () => {
      expect(defaultButton.props.as).toEqual('secondary');
      expect(defaultButton.props.children).toEqual('Save');
      expect(defaultButton.props.disabled).toEqual(false);
      expect(defaultButton.props.size).toEqual('medium');
      expect(defaultButton.props.theme).toEqual('blue');
    });
  });

  describe('A primary button', () => {
    it('renders a primary button', () => {
      expect(primary.props.name).toEqual('Primary Button');
      expect(primary.props.as).toEqual('primary');
      expect(primary.props.children).toEqual('Primary');
      expect(primary.props.disabled).toEqual(false);
    });
  });

  describe('A secondary button', () => {
    it('renders a secondary button', () => {
      expect(secondary.props.name).toEqual('Secondary Button');
      expect(secondary.props.as).toEqual('secondary');
      expect(secondary.props.children).toEqual('Secondary');
      expect(secondary.props.disabled).toEqual(false);
    });
  });

  describe('A small button', () => {
    it('renders a small button', () => {
      expect(small.props.name).toEqual('Small Button');
      expect(small.props.size).toEqual('small');
      expect(small.props.children).toEqual('Small');
      expect(small.props.disabled).toEqual(false);
    });
  });

  describe('A large button', () => {
    it('renders a large button', () => {
      expect(large.props.name).toEqual('Large Button');
      expect(large.props.size).toEqual('large');
      expect(large.props.children).toEqual('Large');
      expect(large.props.disabled).toEqual(false);
    });
  });

  describe('A disabled button', () => {
    it('renders a disabled button', () => {
      expect(disabled.props.name).toEqual('Disabled Button');
      expect(disabled.props.as).toEqual('secondary');
      expect(disabled.props.children).toEqual('Disabled');
      expect(disabled.props.disabled).toEqual(true);
    });
  });

  describe('Class names', () => {
    let defaultDOM, disabledDOM, primaryDOM, secondaryDOM, smallDOM, largeDOM;

    beforeEach(() => {
      defaultDOM = ReactDOM.findDOMNode(defaultButton);
      primaryDOM = ReactDOM.findDOMNode(primary);
      secondaryDOM = ReactDOM.findDOMNode(secondary);
      smallDOM = ReactDOM.findDOMNode(small);
      disabledDOM = ReactDOM.findDOMNode(disabled);
      largeDOM = ReactDOM.findDOMNode(large);
    });

    it('adds a className of carbon-button to all buttons', () => {
      expect(defaultDOM.classList).toMatch('carbon-button');
      expect(primaryDOM.classList).toMatch('carbon-button');
      expect(secondaryDOM.classList).toMatch('carbon-button');
      expect(disabledDOM.classList).toMatch('carbon-button');
      expect(smallDOM.classList).toMatch('carbon-button');
      expect(largeDOM.classList).toMatch('carbon-button');
    });

    it('adds a secondary class depending on its type', () => {
      expect(primaryDOM.classList).toMatch('carbon-button--primary')
      expect(secondaryDOM.classList).toMatch('carbon-button--secondary')
    });

    it('adds a disabled class if the button is disabled', () => {
      expect(disabledDOM.classList).toMatch('carbon-button--disabled');
    });

    it('adds a theme class depending on the theme prop', () => {
      expect(defaultDOM.classList).toMatch('carbon-button--blue');
      expect(secondaryDOM.classList).toMatch('carbon-button--red');
    });

    it('adds a size class depending on size prop', () => {
      expect(smallDOM.classList).toMatch('carbon-button--small');
      expect(largeDOM.classList).toMatch('carbon-button--large');
    });
  });

  describe('Passing a custom onClick', () => {
    let primaryDOM;

    beforeEach(() => {
      primaryDOM = ReactDOM.findDOMNode(primary)
    });

    it('triggers when the button is clicked', () => {
      TestUtils.Simulate.click(primaryDOM);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    describe('default', () => {
      it('renders a button', () => {
        let b = TestUtils.findRenderedDOMComponentWithClass(defaultButton, 'carbon-button');
        expect(b.tagName).toEqual('BUTTON');
      });
    });

    describe('with href', () => {
      it('renders an anchor', () => {
        expect(TestUtils.findRenderedComponentWithType(anchor, Link)).toBeDefined();
      });
    });

    describe('with to', () => {
      it('renders an anchor', () => {
        expect(TestUtils.findRenderedComponentWithType(to, Link)).toBeDefined();
      });
    });
  });

  describe('smallFont prop', () => {
    it('adds a modify class if set to small', () => {
      wrapper.setProps({ size: 'large', smallFont: true });
      expect(wrapper.find('.carbon-button--small-font').length).toEqual(1);
    });

    describe('invalid states', () => {
      const sizesForInvalid = [
        'small',
        'medium'
      ];

      beforeEach(() => {
        spyOn(window, 'Error');
      });

      sizesForInvalid.forEach((size) => {
        it(`throws an error if it is used on a ${size} button`, () => {
          shallow(<Button size={ size } smallFont>Test</Button>);
          expect(window.Error).toHaveBeenCalledWith('smallFont prop has no effect unless the button is large');
        });
      });

      it('only lets a Boolean through', () => {
        shallow(<Button smallFont='Test' />);
        expect(window.Error).toHaveBeenCalledWith('smallFont needs to be a Boolean');
      });
    });
  });

  describe('subtext prop', () => {
    describe('rendered correctly', () => {
      beforeEach(() => {
        wrapper.setProps({ size: 'large', subtext: 'Test' });
      });
      it('adds a modify class', () => {
        expect(wrapper.find('.carbon-button--subtext').length).toEqual(1);
      });
      it('outputs in the correct child element', () => {
        const subtextElement = wrapper.find('[data-element="subtext"]');
        expect(subtextElement.text()).toEqual('Test');
      });
    });

    describe('invalid states', () => {
      const sizesForInvalid = [
        'small',
        'medium'
      ];

      beforeEach(() => {
        spyOn(window, 'Error');
      });

      sizesForInvalid.forEach((size) => {
        it(`throws an error if it is used on a ${size} button`, () => {
          shallow(<Button size={ size } subtext='Test'>Test</Button>);
          expect(window.Error).toHaveBeenCalledWith('subtext prop has no effect unless the button is large');
        });
      });
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<Button data-element='bar' data-role='baz'>Test</Button>);

    it('includes correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'button', 'bar', 'baz');
    });
  });
});
