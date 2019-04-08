import React from 'react';
import { shallow } from 'enzyme';
import Fieldset from './fieldset.component';
import Textbox from '../textbox';
import { LegendStyle } from './fieldset.style';
import classicTheme from '../../../style/themes/classic';

function render(props, renderType = shallow) {
  return renderType(
    <Fieldset { ...props }>
      <Textbox />
    </Fieldset>
  );
}

const basicWrapper = render();

describe('Fieldset', () => {
  it('renders correctly', () => {
    expect(basicWrapper).toMatchSnapshot();
  });

  describe('Fieldset Legend', () => {
    it('is rendered if supplied', () => {
      const wrapper = render({ legend: 'Legend' });
      expect(wrapper.find(LegendStyle).exists()).toEqual(true);
    });

    it('is not rendered if omited', () => {
      expect(basicWrapper.find(LegendStyle).exists()).toEqual(false);
    });

    it('applies classic theme styling', () => {
      const wrapper = render({ theme: classicTheme, legend: 'Legend' });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
