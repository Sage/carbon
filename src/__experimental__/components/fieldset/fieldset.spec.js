import React from 'react';
import { shallow } from 'enzyme';
import Fieldset from './fieldset.component';
import Textbox from '../textbox';
import { LegendStyle } from './fieldset.style';

function render(props, renderType = shallow) {
  return renderType(
    <Fieldset { ...props }>
      <Textbox />
    </Fieldset>
  );
}

describe('Fieldset', () => {
  it('renders correctly', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  describe('Fieldset Legend', () => {
    it('is rendered if supplied', () => {
      const wrapper = render({ legend: 'Legend' });
      expect(wrapper.find(LegendStyle).length).toEqual(1);
    });

    it('is not rendered if omited', () => {
      const wrapper = render();
      expect(wrapper.find(LegendStyle).length).toEqual(0);
    });
  });
});
