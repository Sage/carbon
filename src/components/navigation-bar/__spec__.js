import React from 'react';
import TestUtils from 'react-dom/test-utils';
import NavigationBar from './navigation-bar';
import AppWrapper from './../app-wrapper';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';


describe('NavigationBar', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <NavigationBar className='foobar'>
        foo
      </NavigationBar>
    );
  });

  it('renders with correct classes', () => {
    let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
    expect(div.className).toEqual('carbon-navigation-bar foobar carbon-navigation-bar--primary');
  });

  it('renders with secondary class', () => {
    instance = TestUtils.renderIntoDocument(
      <NavigationBar className='foobar' as='secondary'>
        foo
      </NavigationBar>
    );
    let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
    expect(div.className).toEqual('carbon-navigation-bar foobar carbon-navigation-bar--secondary');
  });

  it('renders an AppWrapper', () => {
    let appWrapper = TestUtils.findRenderedComponentWithType(instance, AppWrapper);
    expect(appWrapper.props.children).toEqual('foo');
  });

  describe('tags', () => {
    let wrapper = shallow(
      <NavigationBar
        data-element='bar'
        data-role='baz'
      >
        foo
      </NavigationBar>
    );

    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'navigation-bar', 'bar', 'baz');
      });
    });
  });
});
