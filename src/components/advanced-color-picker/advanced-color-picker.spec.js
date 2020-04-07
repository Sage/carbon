import React from 'react';
import { mount as enzymeMount, shallow } from 'enzyme';
import { act } from 'react-test-renderer';
import AdvancedColorPicker from './advanced-color-picker.component';
import Dialog from '../dialog/dialog.component';
import { SimpleColor } from '../../__experimental__/components/simple-color-picker';
import guid from '../../utils/helpers/guid';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

describe('AdvancedColorPicker', () => {
  const defaultColor = '#EBAEDE';
  const demoColors = [
    { value: '#FFFFFF', label: 'white' },
    { value: 'transparent', label: 'transparent' },
    { value: '#000000', label: 'black' },
    { value: '#A3CAF0', label: 'blue' },
    { value: '#FD9BA3', label: 'pink' },
    { value: '#B4AEEA', label: 'purple' },
    { value: '#ECE6AF', label: 'goldenrod' },
    { value: '#EBAEDE', label: 'orchid' },
    { value: '#EBC7AE', label: 'desert' },
    { value: '#AEECEB', label: 'turquoise' },
    { value: '#AEECD6', label: 'mint' }
  ];

  const requiredProps = {
    name: 'advancedPicker',
    availableColors: demoColors,
    defaultColor
  };

  const container = { current: null };
  const wrapper = { current: null };

  const mount = (jsx) => {
    wrapper.current = enzymeMount(jsx, { attachTo: container.current });
  };

  function render(props = {}, renderer = mount) {
    return renderer(
      <AdvancedColorPicker { ...props } />
    );
  }

  function getElements() {
    const closeIcon = document.querySelector('[data-element="close"]');
    const defaultSimpleColor = document.querySelector(`input[value="${defaultColor}"]`);
    const simpleColors = document.querySelectorAll('[data-component="simple-color"] > input');

    return { closeIcon, defaultSimpleColor, simpleColors };
  }

  beforeEach(() => {
    container.current = document.createElement('div');
    document.body.appendChild(container.current);
  });

  afterEach(() => {
    document.body.removeChild(container.current);
    container.current = null;
    if (wrapper.current) {
      wrapper.current.unmount();
      wrapper.current = null;
    }
  });

  const aKey = new KeyboardEvent('keydown', { which: 65, keyCode: 65, key: 'a' });
  const spaceKey = new KeyboardEvent('keydown', { which: 32, keyCode: 32, key: 'Space' });
  const enterKey = new KeyboardEvent('keydown', { which: 13, keyCode: 13, key: 'Enter' });
  const tabKey = new KeyboardEvent('keydown', { which: 9, keyCode: 9, key: 'Tab' });


  describe('when uncontrolled', () => {
    it('should render internal composition to match uncontrolled snapshot', () => {
      expect(shallow(<AdvancedColorPicker { ...requiredProps } />)).toMatchSnapshot();
    });
  });

  describe('when controlled', () => {
    describe('on tabKey changes focus', () => {
      it('triggers focusTrap', () => {
        const additionalProps = {
          ...requiredProps,
          open: true
        };

        render(additionalProps);

        const { closeIcon, defaultSimpleColor } = getElements();

        expect(document.activeElement).toBe(defaultSimpleColor);
        closeIcon.focus();
        expect(document.activeElement).toBe(closeIcon);
        document.dispatchEvent(tabKey);
        expect(document.activeElement).toBe(defaultSimpleColor);
      });
    });

    describe('when dialog is open', () => {
      describe('for focus event', () => {
        describe('when activeElement is not selectedColor', () => {
          it('on Tab key focuses selectedColor', () => {
            render({ ...requiredProps, open: true });

            const closeButton = wrapper.current.find('[data-element="close"]').first();
            closeButton.getDOMNode().focus();

            expect(document.activeElement).toBe(closeButton.getDOMNode());

            document.dispatchEvent(tabKey);

            const { defaultSimpleColor } = getElements();

            expect(
              document.activeElement.getAttribute('value')
            ).toBe(defaultSimpleColor.getAttribute('value'));
          });

          it('renders transparent color', () => {
            const extraProps = {
              name: 'advancedPicker',
              availableColors: [
                { value: 'transparent', label: 'transparent' }
              ],
              defaultColor: 'transparent',
              open: true
            };

            render(extraProps);

            const { simpleColors } = getElements();

            expect(document.activeElement).toBe(simpleColors[0]);

            const simpleColor = wrapper.current.find(SimpleColor).at(0);
            const colorPreviewCell = simpleColor.find('ColorSampleBox').first().find('div').first();
            expect(
              document.activeElement.getAttribute('value')
            ).toBe(wrapper.current.find(SimpleColor).at(0).prop('value'));
            assertStyleMatch(
              {
                backgroundColor: '#EEEEEE',
                backgroundImage: 'url()',
                backgroundSize: '14px 14px'
              },
              colorPreviewCell
            );
          });
        });
      });
    });

    describe('onChange event', () => {
      describe('onClick event', () => {
        describe('when onChange is provided', () => {
          it('changes selection and triggers onChange callback', () => {
            const onChange = jest.fn();
            const extraProps = {
              ...requiredProps,
              open: true,
              onChange
            };

            render(extraProps);

            const { simpleColors } = getElements();

            expect(document.activeElement).toBe(simpleColors[7]);

            const color = wrapper.current.find(SimpleColor).at(8);
            color.find('input').first().getDOMNode().click();

            expect(onChange).toHaveBeenCalled();
            expect(
              document.activeElement.getAttribute('value')
            ).toBe(wrapper.current.find(SimpleColor).at(8).prop('value'));
          });
        });

        describe('when onChange is not provided', () => {
          it('changes selection, does not trigger onChange callback', () => {
            const onChange = jest.fn();
            const extraProps = {
              ...requiredProps,
              open: true
            };

            render(extraProps);

            const { simpleColors } = getElements();

            expect(document.activeElement).toBe(simpleColors[7]);
            const color = wrapper.current.find(SimpleColor).at(8);

            color.find('input').first().getDOMNode().click();

            expect(onChange).not.toHaveBeenCalled();
            expect(
              document.activeElement.getAttribute('value')
            ).toBe(wrapper.current.find(SimpleColor).at(8).prop('value'));
          });
        });

        it('changes selection and triggers onChange callback', () => {
          const onBlur = jest.fn();
          const extraProps = {
            ...requiredProps,
            open: true,
            onBlur
          };

          render(extraProps);

          const { simpleColors } = getElements();

          expect(document.activeElement).toBe(simpleColors[7]);

          const color = wrapper.current.find(SimpleColor).at(8);
          color.find('input').first().getDOMNode().click();

          expect(onBlur).toHaveBeenCalled();
          expect(
            document.activeElement.getAttribute('value')
          ).toBe(wrapper.current.find(SimpleColor).at(8).prop('value'));
        });
      });
    });

    describe('SimpleColor onKeyDown event triggers', () => {
      const keyDownEvents = [
        ['Enter', true, true, enterKey],
        ['Space', true, true, spaceKey],
        ['a', false, false, aKey]
      ];

      const extraProps = {
        ...requiredProps,
        open: true
      };

      test.each(keyDownEvents)(
        'on %p key dialog`s isOpen is: %p',
        (name, result, expectedResult, key) => {
          render(extraProps);
          act(() => {
            wrapper.current.find(SimpleColor).at(8).find('input').first()
              .simulate('keydown', { which: key.keyCode });
          });
          expect(result).toEqual(expectedResult);
        }
      );
    });

    describe('dialog', () => {
      const props = [[undefined, false], [false, false], [true, true]];

      test.each(props)(
        'when `open` prop is: %p, dialog`s isOpen is: %p',
        (result, expectedResult) => {
          render({
            ...requiredProps,
            open: result
          });
          expect(wrapper.current.find(Dialog).first().prop('open')).toEqual(expectedResult);
        }
      );

      describe('when dialog is closed', () => {
        it('uses defaultColor when selectedColor is not provided', () => {
          render({ ...requiredProps });
          expect(wrapper.current.find(AdvancedColorPicker).first().prop('defaultColor')).toBe(defaultColor);
        });

        it('uses selectedColor when provided', () => {
          const selectedColor = '#AEECD6';
          render({ ...requiredProps, selectedColor });
          expect(wrapper.current.find(AdvancedColorPicker).first().prop('selectedColor')).toBe(selectedColor);
        });

        describe('when focused on picker cell', () => {
          let colorPickerCell;

          beforeEach(() => {
            render({ ...requiredProps });
            colorPickerCell = wrapper.current.find('[data-element="color-picker-cell"]').first();
            colorPickerCell.getDOMNode().focus();
          });

          it('color picker cell is focused', () => {
            expect(document.activeElement).toBe(colorPickerCell.getDOMNode());
          });

          const keyDownEvents = [
            ['Enter', true, true, enterKey],
            ['Space', true, true, spaceKey],
            ['a', false, false, aKey]
          ];

          test.each(keyDownEvents)(
            'on %p key dialog`s isOpen is: %p',
            (name, result, expectedResult, key) => {
              act(() => {
                colorPickerCell.simulate('keydown', { which: key.keyCode });
              });
              expect(result).toEqual(expectedResult);
            }
          );

          describe('onOpen callback function is proivided', () => {
            describe('when open prop is uncontrolled', () => {
              it('opens color picker and calls onOpen callback function', () => {
                const onOpen = jest.fn();
                wrapper.current.setProps({ onOpen });
                wrapper.current.update();
                colorPickerCell = wrapper.current.find('[data-element="color-picker-cell"]').first();
                colorPickerCell.getDOMNode().focus();

                act(() => {
                  colorPickerCell.simulate('click');
                });

                const dialog = wrapper.current.find(Dialog).first();
                expect(dialog.prop('open')).toBeTruthy();
                expect(onOpen).toBeCalledTimes(1);
              });
            });
          });

          describe('when onClose event', () => {
            it('closes color picker and calls onClose callback function', () => {
              const onClose = jest.fn();

              wrapper.current.setProps({ onClose });
              wrapper.current.update();

              act(() => {
                colorPickerCell.simulate('click');
              });

              expect(wrapper.current.find(Dialog).first().prop('open')).toBeTruthy();

              const closeButton = wrapper.current.find('[data-element="close"]').first();

              act(() => {
                closeButton.simulate('click');
              });

              wrapper.current.update();

              expect(onClose).toBeCalledTimes(1);
              expect(wrapper.current.find(Dialog).first().prop('open')).toBeFalsy();
            });

            it('when callback function is not proivided', () => {
              const onClose = jest.fn();

              act(() => {
                colorPickerCell.simulate('click');
              });

              expect(wrapper.current.find(Dialog).first().prop('open')).toBeTruthy();

              const closeButton = wrapper.current.find('[data-element="close"]').first();

              act(() => {
                closeButton.simulate('click');
              });

              wrapper.current.update();

              expect(onClose).toBeCalledTimes(0);
              expect(wrapper.current.find(Dialog).first().prop('open')).toBeFalsy();
            });
          });
        });
      });
    });
  });
});
