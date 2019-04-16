import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import Help from '../../../components/help/help';
import Label from './label.component';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import classicTheme from '../../../style/themes/classic';

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
        paddingTop: '12px',
        textAlign: 'left',
        width: '30%'
      }, render({ inline: true }, TestRenderer.create).toJSON());
    });

    it('applies correct styling for inline label with 0 width', () => {
      assertStyleMatch({
        width: '30%'
      }, render({ inline: true, width: 0 }, TestRenderer.create).toJSON());
    });

    describe('when it uses different input sizes', () => {
      it('renders the correct padding-top', () => {
        assertStyleMatch(
          { paddingTop: '8px' },
          render({
            inline: true, inputSize: 'small'
          }, TestRenderer.create).toJSON()
        );

        assertStyleMatch(
          { paddingTop: '16px' },
          render({
            inline: true, inputSize: 'large'
          }, TestRenderer.create).toJSON()
        );
      });
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
          paddingTop: '7px',
          paddingRight: '8px'
        }, render({ theme: classicTheme, inline: true }, TestRenderer.create).toJSON());
      });
    });
  });
});
