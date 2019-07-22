import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import Help from '../../../components/help';
import Label from './label.component';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import classicTheme from '../../../style/themes/classic';
import baseTheme from '../../../style/themes/base';

function render(props, renderer = shallow) {
  return renderer(
    <Label { ...props }>
      Name:
    </Label>
  );
}

describe('Label', () => {
  it('renders the label', () => {
    expect(render({}, TestRenderer.create)).toMatchSnapshot();
  });

  describe('when initiated with the help prop', () => {
    it('contains Help component with the content specified in that prop', () => {
      const wrapper = render({ help: 'Help me!' });
      expect(wrapper.contains(<Help>Help me!</Help>)).toBeTruthy();
    });
  });

  describe('when inline', () => {
    it('applies styling for an inline label', () => {
      assertStyleMatch({
        boxSizing: 'border-box',
        paddingBottom: '0',
        paddingRight: '11px',
        textAlign: 'left',
        width: '30%'
      }, render({ inline: true }, TestRenderer.create).toJSON());
    });

    it('applies correct styling for inline label with 0 width', () => {
      assertStyleMatch({
        width: '30%'
      }, render({ inline: true, width: 0 }, TestRenderer.create).toJSON());
    });
  });

  describe('when disabled', () => {
    it('applies disabled color', () => {
      assertStyleMatch({
        color: baseTheme.disabled.disabled
      }, render({ disabled: true }, TestRenderer.create).toJSON());
    });
  });

  describe('when error', () => {
    it('applies error color', () => {
      assertStyleMatch({
        color: baseTheme.colors.error
      }, render({ hasError: true }, TestRenderer.create).toJSON());
    });
  });

  describe('classic theme', () => {
    it('renders with custom padding', () => {
      assertStyleMatch({
        paddingLeft: '6px',
        paddingRight: '6px'
      }, render({ theme: classicTheme }, TestRenderer.create).toJSON());
    });

    describe('when inline', () => {
      it('renders with custom padding', () => {
        assertStyleMatch({
          paddingLeft: '0',
          paddingRight: '8px'
        }, render({ theme: classicTheme, inline: true }, TestRenderer.create).toJSON());
      });
    });
  });
});
