import React from 'react';
import 'jest-styled-components';
import { mount } from 'enzyme';
import Sidebar from './sidebar.component';
import Textbox from '../../__deprecated__/components/textbox';
import { SidebarStyle, SidebarCloseStyle } from './sidebar.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';

describe('Sidebar', () => {
  let wrapper, spy, preventDefault;

  beforeEach(() => {
    spy = jasmine.createSpy();
    preventDefault = jest.fn();
    wrapper = mount(
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

  describe('render', () => {
    describe('when sidebar is closed', () => {
      it('sets all the correct classes', () => {
        wrapper = mount(<Sidebar onCancel={ spy } />);
        expect(wrapper.find('div[data-component="sidebar"]').text()).toEqual('');
      });
    });

    describe('when onCancel is fired', () => {
      it('should remove focus', () => {
        jest.useFakeTimers();
        const tempDiv = document.createElement('div');
        const element = document.body.appendChild(tempDiv);

        wrapper = mount(
          <Sidebar open onCancel={ jest.fn }>
            <button type='button'>test content</button>
          </Sidebar>, { attachTo: element }
        );

        jest.runAllTimers();

        expect(document.activeElement).toMatchObject(wrapper.find('button'));
        wrapper.setProps({ open: false });
        expect(document.activeElement).toMatchObject(document.body);

        jest.clearAllTimers();
      });
    });

    describe('when enableBackgroundUI is enabled', () => {
      it('sets all the correct classes', () => {
        wrapper = mount(
          <Sidebar
            open
            enableBackgroundUI
            size='small'
            position='left'
            onCancel={ spy }
          />
        );
        expect(wrapper.find('[data-element="modal-background"]').length).toEqual(0);
      });
    });

    describe('when there is no onCancel prop', () => {
      it('should not have a close button', () => {
        wrapper = mount(
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
        const icon = wrapper.find('.carbon-sidebar__close-icon');
        icon.at(0).simulate('click');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('pressing Enter key on the close icon sidebar', () => {
      it('closes the sidebar', () => {
        const icon = wrapper.find('.carbon-sidebar__close-icon');
        icon.at(0).props().onKeyDown({ which: 13, preventDefault });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('pressing other key than Enter or Space', () => {
      it('does not close the sidebar', () => {
        const icon = wrapper.find('.carbon-sidebar__close-icon');
        icon.at(0).props().onKeyDown({ which: 16 });
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});

describe('SidebarStyle', () => {
  describe('when prop size is passed to the component and position is set to right', () => {
    const wrapper = mount(<SidebarStyle
      open size='extra-small'
      position='right'
    />);

    it('should render correct style', () => {
      assertStyleMatch({
        width: '150px',
        boxShadow: '0 10px 30px 0 rgba(0,20,29,0.1),0 30px 60px 0 rgba(0,20,29,0.1)',
        right: '0'
      }, wrapper);
    });
  });

  describe('when prop left is passed to the component', () => {
    const wrapper = mount(<SidebarStyle
      open size='extra-small'
      position='left'
    />);

    it('should render correct style', () => {
      assertStyleMatch({
        boxShadow: '0 10px 30px 0 rgba(0,20,29,0.1),0 30px 60px 0 rgba(0,20,29,0.1)',
        left: '0'
      }, wrapper);
    });
  });

  describe('When classic style is passed to the component', () => {
    const closeIconWrapper = mount(<SidebarCloseStyle theme={ classicTheme } />);
    let wrapper;

    it('should render correct style', () => {
      wrapper = mount(<SidebarStyle
        theme={ classicTheme }
        open size='extra-small'
        position='left'
      />);

      assertStyleMatch({
        backgroundColor: '#e6ebed',
        borderRadius: '1px',
        bottom: '0',
        position: 'fixed',
        top: '0',
        padding: '20px',
        zIndex: '1002'
      }, wrapper);

      assertStyleMatch({
        color: 'rgba(0,0,0,0.85)',
        position: 'absolute',
        right: '20px',
        top: '15px',
        zIndex: '1'
      }, closeIconWrapper);
    });

    describe('when classic style is passed to the component and position is right', () => {
      wrapper = mount(<SidebarStyle theme={ classicTheme } position='right' />);

      assertStyleMatch({
        borderLeft: '1px solid #ccd6db'
      }, wrapper);
    });
  });
});
