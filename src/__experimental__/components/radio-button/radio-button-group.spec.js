import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import { RadioButton, RadioButtonGroup } from '.';
import { StyledFieldset, StyledLegendContainer } from '../../../__internal__/fieldset/fieldset.style';
import RadioButtonGroupStyle from './radio-button-group.style';

const buttonValues = ['test-1', 'test-2'];
const name = 'test-group';

function render(renderer = TestRenderer.create, props) {
  const children = buttonValues.map((value, index) => (
    <RadioButton
      id={ `rId-${index}` } key={ `radio-key-${value}` }
      onChange={ jest.fn() } value={ value }
    />
  ));

  return renderer(
    <RadioButtonGroup
      name={ name }
      legend='Test RadioButtonGroup Legend'
      onBlur={ jest.fn() }
      onChange={ jest.fn() }
      { ...props }
    >
      {children}
    </RadioButtonGroup>
  );
}

describe('RadioButtonGroup', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  describe('styles', () => {
    it('applies the correct Legend Container styles', () => {
      assertStyleMatch(
        {
          display: 'flex'
        },
        mount(<RadioButtonGroupStyle inline />)
      );
    });
  });

  describe('validations', () => {
    it.each([
      ['error', 'string'],
      ['error', true],
      ['warning', 'string'],
      ['warning', true],
      ['info', 'string'],
      ['info', true]
    ])('when %s is passed as %s it is passed as boolean to RadioButton', (type, value) => {
      const wrapper = render(mount, { [type]: value });
      wrapper.find(RadioButton).forEach(node => expect(node.props()[type]).toBe(true));
    });
  });

  describe('style overrides', () => {
    let wrapper;
    const customStyleObject = {
      backgroundColor: 'red',
      display: 'flex',
      fontSize: '200px'
    };
    const styleOverride = {
      root: customStyleObject,
      content: customStyleObject,
      legend: customStyleObject
    };

    beforeEach(() => {
      wrapper = render(mount, { styleOverride });
    });

    it('renders root element with properly assigned styles', () => {
      assertStyleMatch(customStyleObject, wrapper.find(StyledFieldset));
    });

    it('renders content wrapper with properly assigned styles', () => {
      assertStyleMatch(customStyleObject, wrapper.find(RadioButtonGroupStyle));
    });

    it('renders legend element with properly assigned styles', () => {
      assertStyleMatch(customStyleObject, wrapper.find(StyledLegendContainer));
    });
  });
});
