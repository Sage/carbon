import React from 'react';
import 'jest-styled-components';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import Pill from './pill.component';

describe('Pill', () => {
  let instance, pill, spy;

  beforeEach(() => {
    spy = jasmine.createSpy('click');

    instance = TestUtils.renderIntoDocument(
      <Pill
        className='customClass'
        onClick={ spy }
      >My Text
      </Pill>
    );
  });

  describe('render', () => {
    it('renders a span tag with the given children', () => {
      instance = mount(
        <Pill
          className='customClass'
          onClick={ spy }
        >
          My Text
        </Pill>
      );
      pill = instance.find('span').hostNodes();
      // TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pill');

      expect(pill.length).toEqual(1);
      expect(pill.props().children[0]).toEqual('My Text');
    });
  });

  describe('passing additional props', () => {
    xit('adds props to the component', () => {
      pill = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pill');

      TestUtils.Simulate.click(pill);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('classNames', () => {
    describe('as', () => {
      describe('when using the default', () => {
        xit('adds a class of carbon-pill--default', () => {
          expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pill--default--empty').length).toEqual(1);
        });
      });

      describe('when not using the default', () => {
        xit('uses the passed as', () => {
          instance = TestUtils.renderIntoDocument(
            <Pill
              as='warning'
            >
              My Text
            </Pill>
          );
          expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pill--warning--empty').length).toEqual(1);
        });

        xit('uses the passed fill', () => {
          instance = TestUtils.renderIntoDocument(
            <Pill fill>
              My Text
            </Pill>
          );
          expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pill--default--fill').length).toEqual(1);
        });
      });
    });

    describe('when passing a custom class', () => {
      xit('adds the class to the component', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'customClass').length).toEqual(1);
      });
    });
  });

  describe('tags on component', () => {
    const wrapper = shallow(
      <Pill
        data-element='bar'
        data-role='baz'
      >
        My Text
      </Pill>
    );

    xit('includes correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'pill', 'bar', 'baz');
    });
  });

  describe('onDelete adds "close" icon to component', () => {
    let wrapper, icon;

    beforeEach(() => {
      wrapper = shallow(
        <Pill
          onDelete={ spy }
        >
          My Text
        </Pill>
      );
    });

    xit('includes "close" icon when onDelete prop passed', () => {
      icon = wrapper.find('[data-element="close"]');
      expect(icon.exists()).toBeTruthy();
      expect(icon.length).toEqual(1);
    });

    xit('triggers the click when the icon is clicked', () => {
      wrapper.find('[data-element="close"]').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    xit('does not include "close" icon when onDelete prop not passed', () => {
      wrapper = shallow(
        <Pill>
          My Text
        </Pill>
      );
      icon = wrapper.find('[data-element="close"]');
      expect(icon.exists()).toBeFalsy();
      expect(icon.length).toEqual(0);
    });
  });
});
