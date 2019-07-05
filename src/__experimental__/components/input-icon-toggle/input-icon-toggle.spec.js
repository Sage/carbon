import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Icon from 'components/icon';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

import InputIconToggle from './input-icon-toggle.component';

function render(props, renderer = shallow) {
  return renderer(
    <InputIconToggle type='settings' { ...props } />
  );
}

describe('InputIconToggle', () => {
  describe('when initiated with the disabled prop set to true', () => {
    it('does not render anything', () => {
      expect(render({ disabled: true }).isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated with the readOnly prop set to true', () => {
    it('does not render anything', () => {
      expect(render({ readOnly: true }).isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated without children', () => {
    it('renders an Icon component with an icon type that was specified in the props', () => {
      expect(render({ type: 'settings' }).contains(<Icon type='settings' />)).toBeTruthy();
    });
  });

  describe('when initiated with children', () => {
    it('renders as expected', () => {
      expect(render({ children: 'mock content' }, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe('sizes', () => {
    [['small', '32px'], ['medium', '40px'], ['large', '48px']].forEach((size) => {
      it(`updates the width for ${size[0]}`, () => {
        assertStyleMatch({
          width: size[1]
        }, render({ size: size[0] }, TestRenderer.create).toJSON());
      });
    });
  });

  describe('clasic theme', () => {
    it('when active', () => {
      assertStyleMatch({
        backgroundColor: '#e6ebed'
      }, render({ theme: { name: 'classic' } }, TestRenderer.create).toJSON());
    });

    it('renders a narrow button when a dropdown', () => {
      assertStyleMatch({
        width: '20px'
      }, render({ type: 'dropdown', theme: { name: 'classic' } }, TestRenderer.create).toJSON());
    });
  });
});
