import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import { rootTagTest } from '../../../../utils/helpers/tags/tags-specs';
import FormButton from './form-button.component';
import Button from '../../../../components/button';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';
import Classic from '../../../../style/themes/classic';
import Small from '../../../../style/themes/small';
import { isClassic } from '../../../../utils/helpers/style-helper';
import StyledButton from '../../../../components/button/button.style';

const renderFormButtonWithTheme = (props, render = shallow, theme = Classic) => {
  return render(
    <ThemeProvider theme={ theme }>
      <FormButton
        { ...props }
      />
    </ThemeProvider>
  );
};

const renderFormButton = (props, render = shallow) => {
  return render(
    <FormButton
      { ...props }
    />
  );
};

describe('FormButton', () => {
  let wrapper, clickFunction, button;

  describe.each([Classic, Small])(
    'the Form Buttons match the expected styling',
    (theme) => {
      it(`when the theme is set to ${theme.name}`, () => {
        wrapper = renderFormButtonWithTheme({
          formButtonName: 'cancel'
        }, TestRenderer.create, theme);

        assertStyleMatch({
          alignItems: 'center',
          display: 'flex',
          marginLeft: isClassic(theme) ? '15px' : '16px'
        }, wrapper.toJSON(), { modifier: `${StyledButton}` });
      });
    }
  );

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
