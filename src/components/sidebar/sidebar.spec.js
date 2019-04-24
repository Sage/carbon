import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import Sidebar from './sidebar.component';
import Textbox from '../textbox/textbox';
import { SidebarStyle, SidebarCloseStyle } from './sidebar.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';

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
        const icon = wrapper.find('.carbon-sidebar__close-icon');
        icon.simulate('click');
        expect(spy).toHaveBeenCalled();
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
        boxShadow: '-10px 0 15px rgba(0,0,0,0.05)',
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
        boxShadow: '10px 0 15px rgba(0,0,0,0.05)',
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

      expect(wrapper).toMatchSnapshot();
      expect(closeIconWrapper).toMatchSnapshot();
    });

    describe('when classic style is passed to the component and position is right', () => {
      wrapper = mount(<SidebarStyle theme={ classicTheme } position='right' />);

      assertStyleMatch({
        borderLeft: '1px solid #ccd6db'
      }, wrapper);
    });
  });
});
