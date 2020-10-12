import React, { useRef } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { assertStyleMatch, testStyledSystemSpacing } from '../../../__spec_helper__/test-utils';
import SimpleSelect from './simple-select.component';
import Textbox from '../../../__experimental__/components/textbox';
import Option from '../option/option.component';
import SelectList from '../select-list/select-list.component';
import InputIconToggleStyle from '../../../__experimental__/components/input-icon-toggle/input-icon-toggle.style';
import StyledInput from '../../../__experimental__/components/input/input.style';
import InputPresentationStyle from '../../../__experimental__/components/input/input-presentation.style';
import { baseTheme } from '../../../style/themes';

describe('SimpleSelect', () => {
  it('the Textbox should have type of "select"', () => {
    const wrapper = renderSelect();

    expect(wrapper.find(Textbox).prop('type')).toBe('select');
  });

  testStyledSystemSpacing(props => <SimpleSelect { ...props } />);

  it('the input ref should be forwarded', () => {
    let mockRef;

    const WrapperComponent = () => {
      mockRef = useRef();

      return (
        <SimpleSelect
          name='testSelect'
          id='testSelect'
          ref={ mockRef }
        >
          <Option value='opt1' text='red' />
          <Option value='opt2' text='green' />
          <Option value='opt3' text='blue' />
          <Option value='opt4' text='black' />
        </SimpleSelect>
      );
    };

    const wrapper = mount(<WrapperComponent />);

    expect(mockRef.current).toBe(wrapper.find('input').getDOMNode());
  });

  it('the input text should have proper paddings', () => {
    const wrapper = renderSelect();

    assertStyleMatch({
      paddingLeft: '11px'
    }, wrapper, { modifier: `${StyledInput}` });
  });

  it('the input toggle icon should have proper left margin', () => {
    const wrapper = renderSelect();

    assertStyleMatch({
      marginRight: '0'
    }, wrapper, { modifier: `${InputIconToggleStyle}` });
  });

  it('the input text should have proper paddings', () => {
    const wrapper = renderSelect();

    assertStyleMatch({
      paddingLeft: '0',
      paddingRight: '0'
    }, wrapper, { modifier: `${InputPresentationStyle}` });
  });

  it('the input text should have proper styling for the transparent type', () => {
    const wrapper = renderSelect({ transparent: true });

    assertStyleMatch({
      cursor: 'pointer',
      userSelect: 'none',
      textShadow: `0 0 0 ${baseTheme.text.color}`
    }, wrapper, { modifier: `${StyledInput}` });

    assertStyleMatch({
      textShadow: `0 0 0 ${baseTheme.text.placeholder}`
    }, wrapper, { modifier: `${StyledInput}::placeholder` });
  });

  it('the input text should have proper styling when disabled', () => {
    const wrapper = renderSelect({ disabled: true });

    assertStyleMatch({
      cursor: 'not-allowed',
      color: baseTheme.disabled.disabled,
      textShadow: 'none'
    }, wrapper, { modifier: `${StyledInput}` });
  });

  it('the input text should have proper styling when readOnly', () => {
    const wrapper = renderSelect({ readOnly: true });

    assertStyleMatch({
      cursor: 'default',
      color: baseTheme.readOnly.textboxText,
      textShadow: 'none'
    }, wrapper, { modifier: `${StyledInput}` });
  });

  describe('when the transparent prop is set to true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderSelect({ transparent: true });
    });

    it('then the input should have transparent background and no border', () => {
      assertStyleMatch({
        background: 'transparent',
        border: 'none'
      }, wrapper, { modifier: `${InputPresentationStyle}` });
    });

    it('then the input text should be right aligned with font weight set to 900', () => {
      assertStyleMatch({
        textAlign: 'right',
        fontWeight: '900'
      }, wrapper, { modifier: `${StyledInput}` });
    });

    it('then the input toggle text should have width set to auto', () => {
      assertStyleMatch({
        width: 'auto'
      }, wrapper, { modifier: `${InputIconToggleStyle}` });
    });
  });

  describe('when the value prop is passed', () => {
    it('then the formatted value should be set to corresponding option text', () => {
      const wrapper = renderSelect({ value: 'opt2', onChange: jest.fn() });

      expect(wrapper.find(Textbox).prop('formattedValue')).toBe('green');
    });
  });

  describe('when the inputRef prop is specified', () => {
    it('then the input reference should be returned on call', () => {
      const inputRefFn = jest.fn();
      const wrapper = renderSelect({ inputRef: inputRefFn });

      expect(inputRefFn).toHaveBeenCalledWith({ current: wrapper.find('input').getDOMNode() });
    });
  });

  describe('when the openOnFocus prop is set', () => {
    describe('and the Textbox Input is focused', () => {
      it('the SelectList should be rendered', () => {
        const wrapper = renderSelect({ openOnFocus: true });

        wrapper.find('input').simulate('focus');
        expect(wrapper.find(SelectList).exists()).toBe(true);
      });

      describe.each(['readOnly', 'disabled'])('with the %s prop passed', (prop) => {
        it('the SelectList should not be rendered', () => {
          const obj = { [prop]: true, openOnFocus: true };
          const wrapper = renderSelect(obj);

          wrapper.find('input').simulate('focus');
          expect(wrapper.find(SelectList).exists()).toBe(false);
        });
      });

      describe('with the onFocus prop passed', () => {
        it('then that prop should be called', () => {
          const onFocusFn = jest.fn();
          const wrapper = renderSelect({ onFocus: onFocusFn, openOnFocus: true });

          wrapper.find('input').simulate('focus');
          expect(onFocusFn).toHaveBeenCalled();
        });
      });

      describe('with the onOpen prop passed', () => {
        let wrapper;
        let onOpenFn;

        beforeEach(() => {
          onOpenFn = jest.fn();
          wrapper = renderSelect({ onOpen: onOpenFn, openOnFocus: true });
        });

        it('then that prop should be called', () => {
          wrapper.find('input').simulate('focus');

          expect(onOpenFn).toHaveBeenCalled();
        });

        describe('and the SelectList already open', () => {
          it('then that prop should not be called', () => {
            wrapper.find('input').simulate('click');
            onOpenFn.mockReset();
            expect(wrapper.find(SelectList).exists()).toBe(true);
            wrapper.find('input').simulate('focus');
            expect(onOpenFn).not.toHaveBeenCalled();
          });
        });

        describe('and the focus triggered by mouseDown', () => {
          it('then that prop should not be called', () => {
            wrapper.find('input').simulate('mouseDown');
            wrapper.find('input').simulate('focus');
            expect(onOpenFn).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('when the Textbox Input is focused', () => {
    let onOpenFn;
    let wrapper;

    beforeEach(() => {
      onOpenFn = jest.fn();
      wrapper = renderSelect({ onOpen: onOpenFn });
    });

    it('the SelectList should not be rendered', () => {
      wrapper.find('input').simulate('focus');
      expect(wrapper.find(SelectList).exists()).toBe(false);
    });

    describe.each([
      'Enter',
      'ArrowDown',
      'ArrowUp',
      'Home',
      'End',
      ' '// spacebar
    ])('and the "%s" key is pressed', (key) => {
      it('the SelectList should be rendered', () => {
        wrapper.find('input').simulate('keydown', { key });
        expect(wrapper.find(SelectList).exists()).toBe(true);
      });

      it('the onOpen prop should be called', () => {
        wrapper.find('input').simulate('keydown', { key });
        expect(onOpenFn).toHaveBeenCalled();
      });

      describe('with the SelectList already open', () => {
        it('the onOpen prop should not be called', () => {
          wrapper.find('input').simulate('click');
          onOpenFn.mockReset();
          expect(wrapper.find(SelectList).exists()).toBe(true);
          wrapper.find('input').simulate('keydown', { key });
          expect(onOpenFn).not.toHaveBeenCalled();
        });
      });
    });

    describe('and a key other than Enter, Up or Down is pressed', () => {
      it('the SelectList should not be rendered', () => {
        wrapper.find('input').simulate('keydown', { key: 'b' });
        expect(wrapper.find(SelectList).exists()).toBe(false);
      });
    });
  });

  describe('when the Textbox Input is clicked', () => {
    it('the SelectList should be rendered', () => {
      const wrapper = renderSelect();

      wrapper.find('input').simulate('click');
      expect(wrapper.find(SelectList).exists()).toBe(true);
    });

    describe.each(['disabled', 'readOnly'])('and the %s prop is set to true', (prop) => {
      it('then the "onClick" prop should not be called', () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn, [prop]: true });

        wrapper.find('input').simulate('click');
        expect(onClickFn).not.toHaveBeenCalled();
      });

      it('then the SelectList should not be rendered', () => {
        const wrapper = renderSelect({ [prop]: true });

        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(false);
      });
    });

    describe('and the onClick prop is passed', () => {
      it('then that prop should be called', () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        wrapper.find('input').simulate('click');
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe('and the onOpen prop is passed', () => {
      it('then that prop should be called', () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        wrapper.find('input').simulate('click');
        expect(onOpenFn).toHaveBeenCalled();
      });
    });

    describe('and the SelectList is open', () => {
      it('then the SelectList should be closed', () => {
        const wrapper = renderSelect();

        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(false);
      });
    });
  });

  describe('when the Dropdown Icon in the Textbox has been clicked', () => {
    it('the SelectList should be rendered', () => {
      const wrapper = renderSelect();

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate('click');
      expect(wrapper.find(SelectList).exists()).toBe(true);
    });

    describe('and the SelectList is open', () => {
      it('then the SelectList should be closed', () => {
        const wrapper = renderSelect();

        wrapper.find(Textbox).find('[type="dropdown"]').first().simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        wrapper.find(Textbox).find('[type="dropdown"]').first().simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(false);
      });
    });
  });

  describe('when a printable character has been typed in the Textbox', () => {
    it('then the first option with text starting with that character should be selected', () => {
      const wrapper = renderSelect();

      wrapper.find('input').simulate('change', { target: { value: 'b' } });
      wrapper.update();
      expect(wrapper.find(Textbox).prop('value')).toBe('opt3');
      wrapper.unmount();
    });

    describe('and the same character is typed in a short amount of time', () => {
      it('then the second option with text starting with that character should be selected', () => {
        const wrapper = renderSelect();

        wrapper.find('input').simulate('change', { target: { value: 'b' } });
        wrapper.find('input').simulate('change', { target: { value: 'b' } });
        wrapper.update();
        expect(wrapper.find(Textbox).prop('value')).toBe('opt4');
        wrapper.unmount();
      });
    });

    describe('and other character that does not match the text in any option has been typed', () => {
      it('then the option starting with previous character should remain selected', () => {
        const wrapper = renderSelect();

        wrapper.find('input').simulate('change', { target: { value: 'b' } });
        wrapper.find('input').simulate('change', { target: { value: 'x' } });
        wrapper.update();
        expect(wrapper.find(Textbox).prop('value')).toBe('opt3');
        wrapper.unmount();
      });
    });

    describe('and another characters are typed in a short amount of time', () => {
      it('then an option with matching text should be selected', () => {
        const wrapper = renderSelect({ openOnFocus: true });

        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('change', { target: { value: 'b' } });
        wrapper.find('input').simulate('change', { target: { value: 'l' } });
        wrapper.find('input').simulate('change', { target: { value: 'a' } });
        wrapper.update();
        expect(wrapper.find(Textbox).prop('value')).toBe('opt4');
        wrapper.unmount();
      });
    });

    describe('and another characters are typed with a long break before the last change', () => {
      it('then the first option with text starting the last typed character should be selected', () => {
        jest.useFakeTimers();
        const wrapper = renderSelect();

        act(() => {
          wrapper.find('input').simulate('focus');
          wrapper.find('input').simulate('change', { target: { value: 'b' } });
          wrapper.find('input').simulate('change', { target: { value: 'l' } });
          jest.runAllTimers();
          wrapper.find('input').simulate('change', { target: { value: 'g' } });
        });

        expect(wrapper.update().find(Textbox).prop('value')).toBe('opt2');
      });
    });

    describe('and the onChange prop is passed', () => {
      it('then that prop should be called with the value of first matching option', () => {
        const textboxProps = {
          name: 'testName',
          id: 'testId'
        };
        const mockEventObject = {
          target: {
            ...textboxProps,
            value: 'opt3'
          }
        };
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ ...textboxProps, onChange: onChangeFn });

        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('change', { target: { value: 'b' } });
        expect(onChangeFn).toHaveBeenCalledWith(mockEventObject);
      });
    });

    describe.each([
      'deleteContentBackward',
      'deleteContentForward',
      'delete'
    ])('and the "%s" change event is triggered with a value present', (deleteEventType) => {
      const mockChangeEvent = {
        target: { value: 'blu' },
        nativeEvent: { inputType: deleteEventType }
      };

      it('the value should not be changed', () => {
        const wrapper = renderSelect({ defaultValue: 'opt3' });

        expect(wrapper.find(Textbox).prop('value')).toBe('opt3');
        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('change', mockChangeEvent);
        expect(wrapper.find(Textbox).prop('value')).toBe('opt3');
      });
    });
  });

  describe('when the onSelect is called in the SelectList', () => {
    const navigationKeyOptionObject = {
      value: 'Foo',
      text: 'Bar',
      selectionType: 'navigationKey'
    };
    const clickOptionObject = {
      value: 'Foo',
      text: 'Bar',
      selectionType: 'click'
    };
    const textboxProps = {
      name: 'testName',
      id: 'testId'
    };
    const expectedEventObject = {
      target: {
        ...textboxProps,
        value: 'Foo'
      }
    };

    describe('with "selectionType" as "click"', () => {
      it('the SelectList should be closed', () => {
        const wrapper = renderSelect();

        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(SelectList).prop('onSelect')(clickOptionObject);
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(false);
      });
    });

    describe('with "selectionType" as "navigationKey"', () => {
      it('the SelectList should be open and the value should be selected', () => {
        const wrapper = renderSelect();

        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(SelectList).prop('onSelect')(navigationKeyOptionObject);
        });
        wrapper.update();
        expect(wrapper.find(SelectList).exists()).toBe(true);
        expect(wrapper.find(Textbox).prop('value')).toBe('Foo');
        expect(wrapper.find(Textbox).prop('formattedValue')).toBe('Bar');
      });
    });

    describe('and the onChange prop is passed', () => {
      it('then that prop should be called with the same value', () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ ...textboxProps, onChange: onChangeFn });

        wrapper.find('input').simulate('click');
        act(() => {
          wrapper.find(SelectList).prop('onSelect')(clickOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedEventObject);
      });
    });

    describe('by clicking on an Option', () => {
      it('then the SelectList should be closed', () => {
        const wrapper = renderSelect();

        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(Option).first().simulate('click');
        });
        wrapper.find('input').simulate('focus');
        expect(wrapper.update().find(SelectList).exists()).toBe(false);
      });
    });
  });

  describe('when the onSelectListClose is called in the SelectList', () => {
    it('the SelectList should be closed', () => {
      const wrapper = renderSelect();

      wrapper.find('input').simulate('click');
      expect(wrapper.find(SelectList).exists()).toBe(true);
      act(() => {
        wrapper.find(SelectList).prop('onSelectListClose')();
      });
      expect(wrapper.update().find(SelectList).exists()).toBe(false);
    });
  });

  describe('when an HTML element is clicked when the SelectList is open', () => {
    let wrapper;
    let domNode;

    beforeEach(() => {
      wrapper = mount(getSelect());
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    describe('and that element is an Option of the Select List', () => {
      it('then the SelectList should be closed', () => {
        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(Option).first().getDOMNode().dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(false);
      });
    });

    describe('and that element is not part of the Select', () => {
      it('then the SelectList should be closed', () => {
        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(false);
      });
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });
  });

  describe('when the onKeyDown prop is passed', () => {
    const expectedEventObject = {
      key: 'ArrowDown',
      which: 40
    };

    it('then when a key is pressed, that prop should be called with expected values', () => {
      const onKeyDownFn = jest.fn();
      const wrapper = renderSelect({ onKeyDown: onKeyDownFn });

      wrapper.find('input').simulate('keyDown', expectedEventObject);

      expect(onKeyDownFn).toHaveBeenCalledWith(expect.objectContaining({
        ...expectedEventObject
      }));
    });
  });

  describe('when the component is controlled', () => {
    const expectedObject = {
      target: {
        id: 'testSelect',
        name: 'testSelect',
        value: 'opt3'
      }
    };

    const clickOptionObject = {
      value: 'opt3',
      text: 'black',
      selectionType: 'click'
    };

    describe('and an option is selected', () => {
      it('then the onChange prop should be called with expected value', () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ onChange: onChangeFn, value: 'opt1' });

        wrapper.find('input').simulate('click');
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(SelectList).prop('onSelect')(clickOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
      });
    });

    describe('when a printable character has been typed in the Textbox', () => {
      let onChangeFn;
      let wrapper;

      beforeEach(() => {
        onChangeFn = jest.fn();
        wrapper = renderSelect({ onChange: onChangeFn, value: 'opt1' });
        wrapper.find('input').simulate('change', { target: { value: 'b' } });
        wrapper.update();
      });

      it('then the value should not change', () => {
        expect(wrapper.find(Textbox).prop('value')).toBe('opt1');
      });

      it('then the onChange function should have been called with with the expected value', () => {
        expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
      });
    });
  });
});

function renderSelect(props = {}, renderer = mount) {
  return renderer(getSelect(props));
}

function getSelect(props) {
  return (
    <SimpleSelect
      name='testSelect'
      id='testSelect'
      { ...props }
    >
      <Option value='opt1' text='red' />
      <Option value='opt2' text='green' />
      <Option value='opt3' text='blue' />
      <Option value='opt4' text='black' />
    </SimpleSelect>
  );
}
