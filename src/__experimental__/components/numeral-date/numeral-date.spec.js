import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { act } from 'react-dom/test-utils';
import mintTheme from '../../../style/themes/mint';
import NumeralDate from './numeral-date.component';
import { StyledNumeralDate } from './numeral-date.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StyledTextInput from '../input/input-presentation.style';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

describe('NumeralDate', () => {
  let wrapper;
  const onBlur = jest.fn();
  const onChange = jest.fn();
  const onKeyDown = jest.fn();

  const renderThemedWrapper = (props, render = shallow) => {
    const defaultProps = { value: { dd: '12', mm: '', yyyy: '' }, dateFormat: ['dd', 'mm', 'yyyy'] };
    return (
      render(
        <ThemeProvider theme={ mintTheme }>
          <NumeralDate
            { ...defaultProps }
            { ...props }
          />
        </ThemeProvider>
      )
    );
  };

  const renderThemelessWrapper = (props, render = shallow) => {
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
      render(
        <NumeralDate
          { ...defaultProps }
          { ...props }
        />
      )
    );
  };

  describe('styles', () => {
    it('matches the expected styles', () => {
      assertStyleMatch({
        display: 'inline-flex',
        fontSize: '14px',
        fontWeight: '400'
      }, renderThemedWrapper({ }, mount));
    });

    it('applies the expected styling when component has focus', () => {
      wrapper = renderThemedWrapper({
        value: { dd: '03' },
        dateFormat: ['dd'],
        isActive: true
      }, mount);
      const input = wrapper.find('input');
      input.simulate('focus');
      assertStyleMatch({
      }, wrapper, { modifer: `${StyledTextInput}` });
    });

    it('applies the expected styling when component has an error', () => {
      wrapper = renderThemedWrapper({
        value: { dd: '03', mm: '03', yyyy: '2003' },
        dateFormat: ['yyyy', 'mm', 'dd'],
        error: true
      }, mount);
      assertStyleMatch({
        fontSize: '14px',
        fontWeight: '400',
        border: '1px solid transparent'
      }, wrapper);
    });

    it('applies the expected styling when component has an error and component consists of two textboxes', () => {
      wrapper = renderThemedWrapper({
        value: { dd: '03', mm: '03' },
        dateFormat: ['dd', 'mm'],
        error: true
      }, mount);
      assertStyleMatch({
        fontSize: '14px',
        fontWeight: '400',
        border: '1px solid transparent'
      }, wrapper);
    });
  });

  describe('Clicking off the component', () => {
    it('does not call onBlur when no prop is passed', () => {
      wrapper = renderThemelessWrapper({ onBlur: undefined }, mount);
      const input = wrapper.find('input');
      input.simulate('blur');
      expect(onBlur).not.toHaveBeenCalled();
    });

    it('calls onBlur if prop is passed', () => {
      wrapper = renderThemelessWrapper({}, mount);
      const input = wrapper.find('input');
      input.simulate('blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('supports being a controlled component', () => {
    it('does not call onChange prop', () => {
      wrapper = renderThemelessWrapper({ onChange: undefined }, mount);
      const input = wrapper.find('input');
      act(() => {
        input.simulate('change', { target: { value: '45' } });
      });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('accepts a value and calls onChange prop', () => {
      wrapper = renderThemelessWrapper({}, mount);
      const input = wrapper.find('input');
      act(() => {
        input.simulate('change', { target: { value: '45' } });
      });
      expect(onChange).toHaveBeenCalled();
    });

    // Need this test to hit else branch statement coverage
    it('accepts the same value and calls onChange prop', () => {
      wrapper = renderThemelessWrapper({}, mount);
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
      }, mount);
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
      }, mount);
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
