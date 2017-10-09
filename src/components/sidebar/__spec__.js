import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import Browser from '../../utils/helpers/browser';
import { Sidebar } from './sidebar';
import Textbox from './../textbox';
import Portal from './../portal';
import Icon from './../icon';

describe('Sidebar', () => {
  let wrapper, leftWrapper, leftPortalContent, portalContent, spy;

  beforeEach(() => {
    spy = jasmine.createSpy();

    wrapper = shallow(
      <Sidebar
        open
        onCancel={ spy }
        className='custom-class'
      >
        <Textbox />
        <Textbox />
        <Textbox />
      </Sidebar>
    );
    portalContent = new ReactWrapper(
      wrapper.find(Portal).prop('children')
    );

    leftWrapper = shallow(
      <Sidebar
        open
        size='small'
        position='left'
        enableBackgroundUI
      />
    );
    leftPortalContent = new ReactWrapper(
      leftWrapper.find(Portal).prop('children')
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

    it('returns a base lefthand sidebar', () => {
      expect(leftWrapper).toMatchSnapshot();
    });
  });

  describe('render', () => {
    describe('when sidebar is closed', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Sidebar
            onCancel={ spy }
            open={ false }
          >
          </Sidebar>
        );
      });

      it('sets all the correct classes', () => {
        expect(leftWrapper).toMatchSnapshot();
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

  describe('tags', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Sidebar
          open
          title='Test'
          onCancel={ () => {} }
          onConfirm={ () => {} }
          data-role='baz'
          data-element='bar'
        >
        </Sidebar>
      );
    });

    it('include correct component, element and role data tags', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
