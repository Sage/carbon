import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import Help from '../../../components/help/help';
import Label from './label.component';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import BaseTheme from '../../../style/themes/base';

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
        paddingRight: BaseTheme.input.medium.padding,
        paddingTop: '12px',
        textAlign: 'left',
        width: '30%'
      }, render({ inline: true }, TestRenderer.create).toJSON());
    });
  });
});
