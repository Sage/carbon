import React from 'react';
import { mount } from 'enzyme';
import Fieldset from './fieldset.component';

import { StyledLegendContainer, StyledFieldsetContent } from './fieldset.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

import ValidationIcon from '../../components/validations/validation-icon.component';

const Component = () => <div />;

const render = props => mount(
  <Fieldset { ...props }>
    <Component />
  </Fieldset>
);

const validationTypes = ['error', 'warning', 'info'];

describe('Fieldset', () => {
  let wrapper;

  it('renders passed on children', () => {
    wrapper = render();
    expect(wrapper.find(Component).exists()).toBe(true);
  });

  it('applies the correct inline styles', () => {
    wrapper = render({ inline: true });
    assertStyleMatch(
      {
        display: 'flex'
      },
      wrapper.find(StyledFieldsetContent),
    );
  });

  describe('Fieldset Legend', () => {
    it('is rendered if supplied', () => {
      wrapper = render({ legend: 'Legend' });
      expect(wrapper.find(StyledLegendContainer).exists()).toEqual(true);
    });

    it('is not rendered if omited', () => {
      wrapper = render();
      expect(wrapper.find(StyledLegendContainer).exists()).toEqual(false);
    });

    it('applies the correct inline styles', () => {
      wrapper = render({ inline: true, legend: 'Legend' });
      assertStyleMatch({
        marginRight: '32px',
        height: '34px'
      }, wrapper.find(StyledLegendContainer));
    });
  });

  describe.each(validationTypes)('when prop %s === string', (validationType) => {
    it('shows validation icon with proper type', () => {
      wrapper = render({ legend: 'Legend', [validationType]: 'Message' });
      const icon = wrapper.find(ValidationIcon);

      expect(icon.props()[validationType]).toEqual('Message');
    });
  });
});
