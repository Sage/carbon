import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ColorOption from './color-option';
import SimpleColorPicker from './';
import { shallow  } from 'enzyme';
import { findIndex } from 'lodash';

describe('SimpleColorPicker', () => {
  let instance;

  let props = {
    availableColors: ['transparent', '#ff00bb', '#112233'],
    selectedColor: '#112233',
    name: 'settings[page_color]',
    onChange: () => { console.log('oops, something changed') }
  }

  beforeEach(() => {
    instance = shallow(<SimpleColorPicker {...props}/>);
  });

  it('has the carbon-simple-color-picker CSS class', () => {
    expect(instance.prop('className')).toEqual('carbon-simple-color-picker');
  });

  it('renders three ColorOptions with appropriate colors', () => {
    let colorOptions = instance.find(ColorOption);
    expect(colorOptions.length).toEqual(3);

    let selectedColorIdx = findIndex(props.availableColors, (color) => color == props.selectedColor);

    colorOptions.forEach((option, idx) => {
      expect(option.prop('name')).toEqual(props.name);
      expect(option.prop('onChange')).toEqual(props.onChange);
      expect(option.prop('color')).toEqual(props.availableColors[idx]);

      let isChecked = idx == selectedColorIdx;
      expect(option.prop('checked')).toEqual(isChecked);
    });
  })

});

