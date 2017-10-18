import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import Browser from '../../utils/helpers/browser';
import { Sidebar } from './sidebar';
import Textbox from './../textbox';
import Portal from './../portal';
import Icon from './../icon';

describe('Sidebar', () => {
  let wrapper, portalContent, spy;

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
    portalContent = new ReactWrapper(
      wrapper.find(Portal).prop('children')
    );
  });

  describe('componentDidUpdate', () => {
    let mockWindow;
    let wrapper;
    let instance;

    beforeEach(() => {
      mockWindow = {
        addEventListener() {},
        removeEventListener() {}
      };

      spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
    });

    describe('when the Sidebar is open', () => {
      beforeEach(() => {
        wrapper = mount(
          <Sidebar open onCancel={ spy } />
        );
        instance = wrapper.instance();
      });

      it('sets up event listeners to resize and close the Sidebar', () => {
        spyOn(mockWindow, 'addEventListener');
        wrapper.setProps({ title: 'Sidebar title' });

        expect(mockWindow.addEventListener.calls.count()).toEqual(1);
        expect(mockWindow.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
      });

      describe('when the Sidebar is already listening', () => {
        it('does not set up event listeners', () => {
          spyOn(mockWindow, 'addEventListener');
          instance.listening = true;
          wrapper.setProps({ title: 'Already listening' });

          expect(mockWindow.addEventListener.calls.count()).toEqual(0);
          expect(mockWindow.addEventListener).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the Sidebar is closed', () => {
      beforeEach(() => {
        wrapper = mount(
          <Sidebar onCancel={ spy } />
        );
        instance = wrapper.instance();
        instance.listening = true;
      });

      it('removes event listeners for resize and closing', () => {
        spyOn(mockWindow, 'removeEventListener');
        wrapper.setProps({ title: 'Remove event handlers' });
        expect(mockWindow.removeEventListener.calls.count()).toEqual(1);
        expect(mockWindow.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
      });
    });
  });

  describe('sidebarClasses', () => {
    it('returns a base sidebar', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('render', () => {
    describe('when sidebar is closed', () => {
      it('sets all the correct classes', () => {
        wrapper = shallow(<Sidebar onCancel={ spy } />);
        portalContent = new ReactWrapper(
          wrapper.find(Portal).prop('children')
        );
        expect(portalContent.find('.carbon-sidebar').text()).toEqual('');
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
        portalContent = new ReactWrapper(
          wrapper.find(Portal).prop('children')
        );
        expect(portalContent.find('.carbon-modal__background').length).toEqual(0);
        expect(portalContent.find('.carbon-sidebar__sidebar--left').length).toEqual(1);
        expect(portalContent.find('.carbon-sidebar__sidebar--small').length).toEqual(1);
      });
    });

    describe('when there is no onCancel prop', () => {
      it('should not have a close button', () => {
        wrapper = shallow(
          <Sidebar
            open
          />
        );
        portalContent = new ReactWrapper(
          wrapper.find(Portal).prop('children')
        );
        expect(portalContent.find('.carbon-sidebar__close').length).toEqual(0);
      });
    });
  });

  describe('Behaviour', () => {
    describe('clicking the close icon sidebar', () => {
      it('closes the sidebar', () => {
        let icon = portalContent.find('.carbon-sidebar__close-icon');
        icon.simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
