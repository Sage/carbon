import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { rootTagTest } from '../../../../utils/helpers/tags/tags-specs/tags-specs';
import FormButton from './form-button.component';
import Button from '../../../../components/button';

const renderFormButton = (props, render = shallow) => {
  return render(
    <FormButton
      { ...props }
    />
  );
};

describe('FormButton', () => {
  let wrapper, clickFunction, button;

  describe.each(['save', 'cancel'])(
    'the primary action buttons',
    (name) => {
      beforeEach(() => {
        wrapper = renderFormButton({
          formButtonName: name,
          [`${name}ButtonProps`]: { className: 'my-custom-button-class' }
        });
      });

      it('renders a custom class if provided', () => {
        expect(wrapper.find('.my-custom-button-class').exists()).toBeTruthy();
      });

      it('renders the default text', () => {
        button = wrapper.find(Button);
        const buttonName = name.charAt(0).toUpperCase() + name.slice(1);
        expect(button.prop('children')).toEqual(buttonName);
      });

      it('renders custom text when provided', () => {
        wrapper = renderFormButton({
          formButtonName: name,
          [`${name}Text`]: `This is a ${name} button`
        }, shallow);

        button = wrapper.find(Button);
        expect(button.prop('children')).toEqual(`This is a ${name} button`);
      });

      it('adds the onClick prop to the button', () => {
        clickFunction = () => { };
        wrapper = renderFormButton({
          formButtonName: 'cancel',
          cancelText: 'This is a cancel button',
          cancelClick: clickFunction
        }, shallow);

        button = wrapper.find(Button);
        expect(button.prop('onClick')).toEqual(clickFunction);
      });
    }
  );

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        wrapper = renderFormButton({
          formButtonName: 'cancel',
          'data-element': 'bar',
          'data-role': 'baz'
        });

        rootTagTest(wrapper, 'cancel', 'bar', 'baz');
      });
    });
  });
});
