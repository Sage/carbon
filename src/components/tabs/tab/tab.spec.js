import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import Tab from './tab.component';
import Textbox from '../../textbox/textbox';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

describe('Tab', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Tab title='Tab Title 1' tabId='uniqueid1' id='uniqueid1'>
        <Textbox name='foo'/>
        <Textbox name='bar'/>
      </Tab>);
  });

  describe('setValidity', () => {
    it('calls the parent tab context with the new state', () => {
      let spy = jasmine.createSpy('spy');
      instance.context = { tabs: { changeValidity: spy } };
      instance.setValidity(false)

      expect(spy).toHaveBeenCalledWith(instance.props.id, false);
    });
  });

  describe('setWarning', () => {
    it('calls the parent tab context with the new state', () => {
      let spy = jasmine.createSpy('spy');
      instance.context = { tabs: { changeWarning: spy } };
      instance.setWarning(true)

      expect(spy).toHaveBeenCalledWith(instance.props.id, true);
    });
  });
});

function render(props) {
  return TestRenderer.create(
    <Tab title='Tab Title 1' tabId='uniqueid1' id='uniqueid1' {...props}>Tab content
    </Tab>
  );
}

describe('Tab', () => {
  let wrapper;
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });
  
  describe('when a tab is selected', () => {
    wrapper = render({
      isTabSelected: true,
    });
    
    it('matches the snaphot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when position prop is set to vertical', () => {
      it('matches the snaphot', () => {
        wrapper = render({
          isTabSelected: true,
          position: 'left'
        })
        expect(wrapper).toMatchSnapshot();
      })
    })
  });

  describe('when position prop is set to vertical', () => {
    it('matches the snaphot', () => {
      wrapper = render({
        position: 'left',
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
})
