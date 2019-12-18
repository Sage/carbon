import React from 'react';
import 'jest-styled-components';
import { css } from 'styled-components';
import { shallow, mount } from 'enzyme';
import Fieldset from './fieldset.component';
import Textbox from '../textbox';
import { LegendContainerStyle } from './fieldset.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import classicTheme from '../../../style/themes/classic';
import ValidationIcon from '../../../components/validations/validation-icon.component';

function render(props, renderer = shallow) {
  return renderer(
    <Fieldset { ...props }>
      <Textbox />
    </Fieldset>
  );
}

const basicWrapper = render();
const validationTypes = ['hasError', 'hasWarning', 'hasInfo'];

describe('Fieldset', () => {
  it('renders correctly', () => {
    expect(basicWrapper).toMatchSnapshot();
  });

  describe('Fieldset Legend', () => {
    it('is rendered if supplied', () => {
      const wrapper = render({ legend: 'Legend' });
      expect(wrapper.find(LegendContainerStyle).exists()).toEqual(true);
    });

    it('is not rendered if omited', () => {
      expect(basicWrapper.find(LegendContainerStyle).exists()).toEqual(false);
    });

    it('applies classic theme styling', () => {
      assertStyleMatch({
        color: '#003349',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: '14px',
        padding: '0 6px'
      }, mount(<LegendContainerStyle theme={ classicTheme } />),
      { modifier: css`legend` });
    });
  });

  describe.each(validationTypes)('when prop %s === true', (vType) => {
    it('show validation icon', () => {
      const wrapper = render({ legend: 'Legend', [vType]: true, tooltipMessage: 'Message!' }, mount);
      const icon = wrapper.find(ValidationIcon);

      expect(icon.exists()).toEqual(true);
    });
  });
});
