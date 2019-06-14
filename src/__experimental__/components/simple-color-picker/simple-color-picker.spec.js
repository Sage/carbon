import React from 'react';
import { mount, shallow } from 'enzyme';
import { findIndex } from 'lodash';
import ColorOption from './color-option';
import SimpleColorPicker from '.';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('SimpleColorPicker', () => {
  let wrapper, selectedColor;

  const onChangeHandler = jasmine.createSpy('onChangeHandler').and.callFake((ev) => {
    selectedColor = ev.target.value;
  });

  const props = {
    availableColors: ['transparent', '#ff00bb', '#112233'],
    selectedColor: '#112233',
    name: 'settings[page_color]',
    onChange: onChangeHandler
  };

  beforeEach(() => {
    wrapper = mount(<SimpleColorPicker { ...props } />);
  });

  it('renders three ColorOptions with appropriate colors', () => {
    const colorOptions = wrapper.find(ColorOption);
    expect(colorOptions.length).toEqual(3);

    const selectedColorIdx = findIndex(props.availableColors, color => color === props.selectedColor);

    colorOptions.forEach((option, idx) => {
      expect(option.prop('name')).toEqual(props.name);
      expect(option.prop('onChange')).toEqual(props.onChange);
      expect(option.prop('color')).toEqual(props.availableColors[idx]);

      const isChecked = idx === selectedColorIdx;
      expect(option.prop('checked')).toEqual(isChecked);
    });
  });

  it('calls the onChange callback when the selected color is changed', () => {
    const lastColor = wrapper.find('input').last();
    lastColor.simulate('change');

    expect(onChangeHandler).toHaveBeenCalled();
    expect(selectedColor).toEqual('#112233');
  });

  describe('tags on component', () => {
    it('include correct component, element and role data tags', () => {
      wrapper = shallow(
        <SimpleColorPicker
          availableColors={ [] }
          data-element='bar'
          data-role='baz'
        />
      );
      rootTagTest(wrapper, 'simple-color-picker', 'bar', 'baz');
    });
  });
});
