import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs/tags-specs';
import FormButton from './form-button.component';
import Button from '../../button';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StyledButton from '../../button/button.style';

const renderFormButton = (props, render = shallow) => {
  return render(
    <FormButton
      { ...props }
    />
  );
};

describe('FormButton', () => {
  let wrapper, clickFunction, button;

  describe('the Form Buttons match the expected styling', () => {
    it('renders a form button to match the expected style', () => {
      wrapper = renderFormButton({
        formButtonName: 'cancel'
      }, TestRenderer.create);

      assertStyleMatch({
        alignItems: 'center',
        display: 'flex'
      }, wrapper.toJSON(), { modifier: `${StyledButton}` });
    });
  });

  describe.each(['save', 'cancel'])(
    'the primary action buttons',
    (name) => {
      let id;

      beforeEach(() => {
        id = name === 'save' ? 'saveButtonProps' : 'cancelButtonProps';
        wrapper = renderFormButton({
          formButtonName: name,
          [id]: { className: 'my-custom-button-class' }
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
        id = name === 'save' ? 'saveText' : 'cancelText';
        wrapper = renderFormButton({
          formButtonName: name,
          [id]: `This is a ${name} button`
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
