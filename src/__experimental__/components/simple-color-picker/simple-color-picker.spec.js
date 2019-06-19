import React from 'react';
import { shallow } from 'enzyme';
import ColorOption from './color-option';
import SimpleColorPicker from '.';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('SimpleColorPicker', () => {
  let wrapper;

  const onChangeHandler = jasmine.createSpy('onChangeHandler');
  const availableColors = ['transparent', '#ff00bb', '#f33c'],
      selectedColor = '#f33c';

  beforeEach(() => {
    wrapper = shallow(
      <SimpleColorPicker
        availableColors={ availableColors }
        selectedColor={ selectedColor }
        name='simpleColorPicker'
        onChange={ onChangeHandler }
      />
    );
  });

  it('renders three ColorOptions with appropriate colors', () => {
    const colorOptions = wrapper.find(ColorOption);
    expect(colorOptions.length).toEqual(3);

    colorOptions.forEach((option, idx) => {
      expect(option.prop('color')).toEqual(availableColors[idx]);
    });
  });

  it('calls the onChange callback when the color option is selected', () => {
    const lastColor = wrapper.find(ColorOption).first();
    lastColor.simulate('change');
    expect(onChangeHandler).toHaveBeenCalled();
  });

  describe('tags on component', () => {
    it('include correct component, element and role data tags', () => {
      wrapper = shallow(<SimpleColorPicker
        availableColors={ [] } data-element='bar'
        data-role='baz'
      />);
      rootTagTest(wrapper, 'simple-color-picker', 'bar', 'baz');
    });
  });
});
