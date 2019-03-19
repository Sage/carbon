import React from 'react';
import { shallow, mount } from 'enzyme';
import Browser from '../../utils/helpers/browser';
import { Sidebar } from './sidebar';
import Textbox from './../textbox';
import Portal from './../portal';
import Icon from './../icon';

describe('Sidebar', () => {
  let wrapper, spy;

  beforeEach(() => {
    spy = jasmine.createSpy();

    wrapper = shallow(
      <Sidebar
        open
        title='Test'
        className='custom-class'
        data-role='baz'
        data-element='bar'
        onCancel={ spy }
      >
        <Textbox />
        <Textbox />
        <Textbox />
      </Sidebar>
    );
  });

  describe('sidebarClasses', () => {
    it('returns a base sidebar', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('render', () => {
    describe('when sidebar is closed', () => {
      it('sets all the correct classes', () => {
        wrapper = mount(<Sidebar onCancel={ spy } />);
        expect(wrapper.find('.carbon-sidebar').text()).toEqual('');
      });
    });

    describe('when enableBackgroundUI is enabled', () => {
      it('sets all the correct classes', () => {
        wrapper = shallow(
          <Sidebar
            open
            enableBackgroundUI
            size='small'
            position='left'
            onCancel={ spy }
          />
        );
        expect(wrapper.find('.carbon-modal__background').length).toEqual(0);
        expect(wrapper.find('.carbon-sidebar__sidebar--left').length).toEqual(1);
        expect(wrapper.find('.carbon-sidebar__sidebar--small').length).toEqual(1);
      });
    });

    describe('when there is no onCancel prop', () => {
      it('should not have a close button', () => {
        wrapper = shallow(
          <Sidebar
            open
          />
        );
        expect(wrapper.find('.carbon-sidebar__close').length).toEqual(0);
      });
    });
  });

  describe('Behaviour', () => {
    describe('clicking the close icon sidebar', () => {
      it('closes the sidebar', () => {
        let icon = wrapper.find('.carbon-sidebar__close-icon');
        icon.simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
