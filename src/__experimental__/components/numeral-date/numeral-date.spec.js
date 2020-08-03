import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { act } from 'react-dom/test-utils';

import mintTheme from '../../../style/themes/mint';
import NumeralDate from './numeral-date.component';
import Textbox from '../textbox';
import { StyledNumeralDate, StyledDateField } from './numeral-date.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StyledInputPresentantion from '../input/input-presentation.style';
import FormField from '../form-field';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('NumeralDate', () => {
  let wrapper;
  const onBlur = jest.fn();
  const onChange = jest.fn();
  const onKeyDown = jest.fn();

  const renderThemedWrapper = (props) => {
    const defaultProps = { value: { dd: '12', mm: '', yyyy: '' } };
    return (
      mount(
        <ThemeProvider theme={ mintTheme }>
          <NumeralDate
            { ...defaultProps }
            { ...props }
          />
        </ThemeProvider>
      )
    );
  };

  const renderThemelessWrapper = (props) => {
    const defaultProps = {
      dateFormat: ['dd'],
      defaultValue: { dd: '30' },
      onBlur,
      onChange,
      onKeyDown,
      id: 'numeralDate_id',
      name: 'numeralDate_name'
    };
    return (
      mount(
        <NumeralDate
          { ...defaultProps }
          { ...props }
        />
      )
    );
  };

  describe('styles', () => {
    it('renders the component wrapped with FormField component with proper props passed on', () => {
      const formFieldProps = {
        label: 'Label',
        id: 'id',
        error: 'Error',
        warning: 'Warning',
        info: 'Info',
        labelInline: true,
        labelWidth: 30,
        labelAlign: 'right',
        labelHelp: 'label help',
        fieldHelp: 'field help'
      };
      wrapper = renderThemedWrapper({
        value: { dd: '03', mm: '03' },
        dateFormat: ['dd', 'mm'],
        validationOnLabel: true,
        ...formFieldProps
      });

      expect(wrapper.find(FormField).first().props()).toMatchObject({ ...formFieldProps, useValidationIcon: true });
    });

    it('matches the expected styles', () => {
      assertStyleMatch({
        display: 'inline-flex',
        border: '1px solid transparent',
        height: '40px',
        fontSize: '14px',
        fontWeight: '400',
        paddingBottom: '2px',
        paddingTop: '1px'
      }, renderThemedWrapper().find(StyledNumeralDate));
    });

    it('applies the expected styling when last input has a validation icon', () => {
      wrapper = renderThemedWrapper({
        value: { dd: '03', mm: '03' },
        dateFormat: ['dd', 'mm'],
        error: 'Error'
      });

      assertStyleMatch({
        width: '78px'
      }, wrapper.find(StyledDateField).at(1), { modifier: `${StyledInputPresentantion}` });
    });

    it('applies the expected styling when input is a year input', () => {
      wrapper = renderThemedWrapper({
        value: { dd: '03', mm: '03', yyyy: '2000' },
        dateFormat: ['dd', 'mm', 'yyyy']
      });

      assertStyleMatch({
        width: '78px'
      }, wrapper.find(StyledDateField).at(2), { modifier: `${StyledInputPresentantion}` });
    });

    it('renders validation icon only on last input when validationOnLabel prop is passed as false', () => {
      wrapper = renderThemedWrapper({
        value: { dd: '03', mm: '03', yyyy: '2000' },
        dateFormat: ['dd', 'mm', 'yyyy'],
        validationOnLabel: false,
        error: 'Error',
        warning: 'Warning',
        info: 'Info'
      });
      expect(wrapper.find(Textbox).at(0).props()).toMatchObject({ error: true, warning: true, info: true });
      expect(wrapper.find(Textbox).at(1).props()).toMatchObject({ error: true, warning: true, info: true });
      expect(wrapper.find(Textbox).at(2).props()).toMatchObject({ error: 'Error', warning: 'Warning', info: 'Info' });
    });
  });

  describe('Clicking off the component', () => {
    it('does not call onBlur when no prop is passed', () => {
      wrapper = renderThemelessWrapper({ onBlur: undefined });
      const input = wrapper.find('input');
      input.simulate('blur');
      expect(onBlur).not.toHaveBeenCalled();
    });

    it('calls onBlur if prop is passed', () => {
      wrapper = renderThemelessWrapper();
      const input = wrapper.find('input');
      input.simulate('blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('supports being a controlled component', () => {
    it('does not call onChange prop', () => {
      wrapper = renderThemelessWrapper({ onChange: undefined });
      const input = wrapper.find('input');
      act(() => {
        input.simulate('change', { target: { value: '45' } });
      });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('accepts a value and calls onChange prop', () => {
      wrapper = renderThemelessWrapper();
      const input = wrapper.find('input');
      act(() => {
        input.simulate('change', { target: { value: '45' } });
      });
      expect(onChange).toHaveBeenCalled();
    });

    // Need this test to hit else branch statement coverage
    it('accepts the same value and calls onChange prop', () => {
      wrapper = renderThemelessWrapper();
      const input = wrapper.find('input');
      act(() => {
        input.simulate('change', { target: { value: '30' } });
      });
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('supports being a uncontrolled component', () => {
    it('accepts a default value', () => {
      const props = {
        dateFormat: ['dd'],
        defaultValue: { dd: '30' },
        onBlur,
        onChange,
        onKeyDown,
        id: 'numeralDate_id',
        name: 'numeralDate_name'
      };
      wrapper = mount(
        <ThemeProvider theme={ mintTheme }>
          <NumeralDate
            { ...props }
          />
        </ThemeProvider>
      );
      const input = wrapper.find('input');
      expect(input.props().value).toEqual('30');
    });
  });

  describe('Component does not allow non-numeric characters to be entered', () => {
    beforeEach(() => {
      wrapper = renderThemedWrapper({
        dateFormat: ['dd'],
        onBlur,
        onChange,
        onKeyDown,
        id: 'numeralDate_id',
        name: 'numeralDate_name'
      });
    });
    afterEach(() => jest.clearAllMocks());
    it.each([['a', 65], ['/', 191]])('does not allow input', (key) => {
      const input = wrapper.find('input');
      const event = { key: key[0], which: key[1], preventDefault: jest.fn() };
      act(() => {
        input.simulate('keypress', event);
      });
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Valid characters', () => {
    beforeEach(() => {
      wrapper = renderThemedWrapper({
        dateFormat: ['dd'],
        onBlur,
        onChange,
        onKeyDown,
        id: 'numeralDate_id',
        name: 'numeralDate_name'
      });
    });
    it('allows numeric key presses', () => {
      const input = wrapper.find('input');
      const event = { key: '1', which: 49, preventDefault: jest.fn() };
      act(() => {
        input.simulate('keypress', event);
      });
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapperWithTags = shallow(
        <NumeralDate dateFormat={ ['dd', 'mm', 'yyyy'] } value={ { dd: '12', mm: '', yyyy: '' } } />
      );
      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapperWithTags.find(StyledNumeralDate), 'numeral-date');
      });
    });
  });
});
