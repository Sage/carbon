import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import guid from '../../utils/helpers/guid';
import classicTheme from '../../style/themes/classic';
import smallTheme from '../../style/themes/small';
import ButtonToggle from './button-toggle.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { StyledButtonToggleIcon } from './button-toggle.style';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

const testRender = (props) => {
  return TestRenderer.create(<ButtonToggle { ...props }>Button</ButtonToggle>);
};

const render = (props) => {
  return mount(<ButtonToggle { ...props }>Button</ButtonToggle>);
};

describe('ButtonToggle', () => {
  describe('Classic theme', () => {
    it('renders correctly with default settings', () => {
      const wrapper = testRender({ theme: classicTheme });
      expect(wrapper).toMatchSnapshot();
    });
    it('renders correctly with large buttonIcon and large size', () => {
      const wrapper = render({
        theme: classicTheme,
        buttonIcon: 'add',
        buttonIconSize: 'large',
        size: 'large'
      });
      assertStyleMatch({
        height: 'auto',
        paddingTop: '15px',
        paddingBottom: '15px'
      }, wrapper.find('label'));
    });
    it('renders correctly with small size', () => {
      const wrapper = render({
        theme: classicTheme,
        size: 'small'
      });
      assertStyleMatch({
        height: 'auto',
        padding: '5px 8px',
        fontWeight: '700',
        fontSize: '12px'
      }, wrapper.find('label'));
    });
  });
  describe('Modern themes', () => {
    it('renders correctly with small theme', () => {
      const wrapper = testRender({
        theme: smallTheme
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('renders correctly with a large icon', () => {
      const wrapper = render({
        theme: smallTheme,
        buttonIcon: 'add',
        buttonIconSize: 'large'
      });
      assertStyleMatch({
        minWidth: '104px',
        height: '102px',
        padding: '0 16px'
      }, wrapper.find('label'));
    });
  });
  describe('General styling', () => {
    it('renders correctly when disabled', () => {
      const wrapper = render({
        theme: classicTheme,
        disabled: true
      });
      assertStyleMatch({
        backgroundColor: '#E5EAEC !important',
        borderColor: '#E5EAEC !important',
        color: 'rgba(0,0,0,.2) !important'
      }, wrapper.find('label'));
    });
    it('renders correctly with small icon', () => {
      const wrapper = render({
        theme: classicTheme,
        buttonIcon: 'add',
        buttonIconSize: 'small'
      });
      assertStyleMatch({
        marginRight: '3px'
      }, wrapper.find(StyledButtonToggleIcon));
    });
    it('renders correctly when grouped', () => {
      const props = {
        theme: classicTheme,
        grouped: true,
        children: 'Text'
      };
      const wrapper = TestRenderer.create(
        <div>
          <ButtonToggle { ...props } />
          <ButtonToggle { ...props } />
        </div>
      );
      // Uses snapshot as jest/enzyme doesnt support :first-of-type
      expect(wrapper).toMatchSnapshot();
    });
  });
});
