import React from 'react';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { css, ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';
import text from '../../../utils/helpers/text/text';
import Switch from '.';
import CheckableInput from '../checkable-input';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledSwitchSlider from './switch-slider.style';
import guid from '../../../utils/helpers/guid';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';
import mediumTheme from '../../../style/themes/medium';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';

jest.mock('../../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

describe('Switch', () => {
  describe('uncontrolled behaviour', () => {
    it('sets proper default internal state', () => {
      const wrapper = render({ defaultChecked: true }, mount);
      expect(wrapper.find(CheckableInput).prop('checked')).toBe(true);
    });

    it('changes internal state and passes event to the provided onChange prop when change is triggered', () => {
      const onChangeMock = jest.fn();
      const event = {
        target: {
          checked: true,
          name: 'some_name'
        }
      };
      const wrapper = render({ onChange: onChangeMock }, mount);
      act(() => {
        wrapper.find(CheckableInput).prop('onChange')(event);
      });
      expect(onChangeMock).toHaveBeenCalledWith(event);
      wrapper.update();
      expect(wrapper.find(CheckableInput).prop('checked')).toBe(true);
    });
  });

  describe('controlled behaviour', () => {
    it('passes checked value to the CheckableInput', () => {
      const wrapper = render({ checked: true }, mount);
      expect(wrapper.find(CheckableInput).prop('checked')).toBe(true);
    });

    it('reacts properly to checked prop change', () => {
      const wrapper = render({ checked: true }, mount);
      expect(wrapper.find(CheckableInput).prop('checked')).toBe(true);
      act(() => {
        wrapper.setProps({ checked: false });
      });
      wrapper.update();
      expect(wrapper.find(CheckableInput).prop('checked')).toBe(false);
    });

    it('passess event to the provided onChange prop when change is triggered', () => {
      const onChangeMock = jest.fn();
      const event = {
        target: {
          checked: true,
          name: 'some_name'
        }
      };
      const wrapper = render({ checked: false, onChange: onChangeMock }, mount);
      act(() => {
        wrapper.find(CheckableInput).prop('onChange')(event);
      });
      expect(onChangeMock).toHaveBeenCalledWith(event);
    });
  });

  describe('base theme', () => {
    it('renders as expected', () => {
      expect(render()).toMatchSnapshot();
    });

    describe('when reverse=false', () => {
      describe('default', () => {
        const wrapper = render({ reverse: false }).toJSON();

        it('applies the correct Label styles', () => {
          assertStyleMatch({
            marginTop: '8px'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });
      });

      describe('and labelInline=true', () => {
        const wrapper = render({ reverse: false, labelInline: true }).toJSON();

        it('applies the correct Label styles', () => {
          assertStyleMatch({
            marginLeft: '10px'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });
      });

      describe('and labelInline=true, fieldHelpInline=false', () => {
        const wrapper = render({ fieldHelpInline: false, labelInline: true, reverse: false }).toJSON();

        it('applies the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginLeft: '70px'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });
    });

    describe('when fieldHelpInline=true', () => {
      const wrapper = render({ fieldHelpInline: true }).toJSON();

      it('applies the correct FieldHelp styles', () => {
        assertStyleMatch({ marginRight: '32px' }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when labelInline=true', () => {
      const wrapper = render({ labelInline: true }).toJSON();

      it('applies the correct Label styles', () => {
        assertStyleMatch({
          margin: '0 32px 0 0',
          padding: '3px 0',
          width: 'auto'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });

      it('applies the correct FieldHelp styles', () => {
        assertStyleMatch({
          marginTop: '0'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when fieldHelpInline=true and labelInline=true', () => {
      const wrapper = render({ fieldHelpInline: true, labelInline: true }).toJSON();

      it('applies the correct Label styles', () => {
        assertStyleMatch({
          marginRight: '10px'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });

      it('applies the correct FieldHelp styles', () => {
        assertStyleMatch({
          marginTop: '0',
          padding: '3px 0'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('when setting a custom labelWidth', () => {
      it('renders the correct Label styles', () => {
        const wrapper = render({ labelWidth: 60 }).toJSON();

        assertStyleMatch({
          marginRight: '40%'
        }, wrapper, { modifier: css`${LabelStyle}` });
      });
    });

    describe('when size=large', () => {
      describe('default', () => {
        const wrapper = render({ size: 'large' }).toJSON();

        const largeSizes = {
          height: '40px',
          width: '78px'
        };

        it('applies the correct CheckableInput styles', () => {
          assertStyleMatch(largeSizes, wrapper, { modifier: css`${StyledCheckableInput}` });
        });

        it('applies the correct HiddenCheckableInput styles', () => {
          assertStyleMatch(largeSizes, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
        });

        it('applies the correct SwitchSlider styles', () => {
          assertStyleMatch(largeSizes, wrapper, { modifier: css`${StyledSwitchSlider}` });
        });
      });

      describe('and fieldHelpInline=true', () => {
        const wrapper = render({ size: 'large', fieldHelpInline: true }).toJSON();

        it('applies the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginTop: '0',
            padding: '10px 0'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });

      describe('and labelInline=true', () => {
        it('applies the correct Label styles', () => {
          const wrapper = render({ size: 'large', labelInline: true }).toJSON();

          assertStyleMatch({
            marginTop: '1px',
            padding: '10px 0'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });

        describe('and reverse=false', () => {
          const wrapper = render({ size: 'large', labelInline: true, reverse: false }).toJSON();

          it('applies the correct FieldHelp styles', () => {
            assertStyleMatch({
              marginLeft: '88px'
            }, wrapper, { modifier: css`${FieldHelpStyle}` });
          });
        });
      });
    });
  });

  describe('check icon when validating', () => {
    const wrapper = render({
      label: 'My Label',
      labelHelp: 'Please help me?',
      unblockValidation: true,
      useValidationIcon: true
    }, mount);
    const validationTypes = ['error', 'warning', 'info'];

    beforeEach(() => {
      const props = {
        tooltipMessage: 'The message',
        hasError: false,
        hasWarning: false,
        hasInfo: false
      };

      wrapper.setProps(props);
    });

    describe.each(validationTypes)('validation %s', (type) => {
      it(`displays ${type} icon`, () => {
        const propName = `has${text.titleCase(type)}`;
        wrapper.setProps({
          [propName]: true
        });

        expect(wrapper.find(StyledValidationIcon).prop('validationType')).toEqual(type);
      });
    });
  });

  describe('Classic theme', () => {
    const classicSize = { height: '28px', width: '55px' };

    describe('default', () => {
      const wrapper = renderWithTheme({}, classicTheme).toJSON();

      it('applies appropriate CheckableInput styles', () => {
        assertStyleMatch({
          borderRadius: '24px',
          ...classicSize
        }, wrapper, { modifier: css`${StyledCheckableInput}` });
      });

      it('applies appropriate HiddenCheckableInput styles', () => {
        assertStyleMatch({
          borderRadius: '24px',
          ...classicSize
        }, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
      });

      it('applies appropriate SwitchSlider styles', () => {
        assertStyleMatch({
          transition: 'box-shadow .1s linear'
        }, wrapper, { modifier: css`${StyledSwitchSlider}` });
      });

      it('applies appropriate SwitchSlider focus styles', () => {
        assertStyleMatch(
          {
            boxShadow: '0 0 6px 2px rgba(37,91,199,0.6)',
            outline: 'none'
          },
          wrapper,
          { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledSwitchSlider}`}` }
        );
      });

      it('applies appropriate SwitchSlider hover styles', () => {
        assertStyleMatch(
          {
            outline: 'none'
          },
          wrapper,
          { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledSwitchSlider}`}` }
        );
      });
    });

    describe('and disabled=true', () => {
      it('applies the correct Label color', () => {
        const wrapper = renderWithTheme({ disabled: true }, classicTheme).toJSON();

        assertStyleMatch(
          { color: baseTheme.text.color }, wrapper, { modifier: css`${LabelStyle}` }
        );
      });
    });

    describe('and labelInline=true', () => {
      describe('default', () => {
        const wrapper = renderWithTheme({ labelInline: true }, classicTheme).toJSON();

        it('applies the correct Label styles', () => {
          assertStyleMatch({
            padding: '5px 0'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });
      });
    });

    describe('and reverse=false', () => {
      const wrapper = renderWithTheme({ labelInline: true, reverse: false }, classicTheme).toJSON();

      it('applies the correct FieldHelp styles', () => {
        assertStyleMatch({
          marginLeft: '66px'
        }, wrapper, { modifier: css`${FieldHelpStyle}` });
      });
    });

    describe('and size=large', () => {
      const largeOpts = { size: 'large' };

      describe('default', () => {
        const wrapper = renderWithTheme(largeOpts, classicTheme).toJSON();

        it('applies the correct CheckableInput styles', () => {
          assertStyleMatch(classicSize, wrapper, { modifier: css`${StyledCheckableInput}` });
        });

        it('applies the correct HiddenCheckableInput styles', () => {
          assertStyleMatch(classicSize, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
        });

        it('applies the correct SwitchSlider styles', () => {
          assertStyleMatch(classicSize, wrapper, { modifier: css`${StyledSwitchSlider}` });
        });
      });

      describe('and fieldHelpInline=true', () => {
        const wrapper = renderWithTheme({ fieldHelpInline: true, ...largeOpts }, classicTheme).toJSON();

        it('applies the correct FieldHelp styles', () => {
          assertStyleMatch({
            marginTop: '0',
            padding: '3px 0'
          }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });
      });

      describe('and labelInline=true', () => {
        it('applies the correct Label styles', () => {
          const wrapper = renderWithTheme({ labelInline: true, ...largeOpts }, classicTheme).toJSON();

          assertStyleMatch({
            marginTop: '0',
            padding: '5px 0'
          }, wrapper, { modifier: css`${LabelStyle}` });
        });

        describe('and reverse=false', () => {
          const wrapper = renderWithTheme({ labelInline: true, reverse: false, ...largeOpts }, classicTheme).toJSON();

          it('applies the correct FieldHelp styles', () => {
            assertStyleMatch({
              marginLeft: '66px'
            }, wrapper, { modifier: css`${FieldHelpStyle}` });
          });
        });
      });
    });
  });

  describe('Small theme', () => {
    describe('default', () => {
      const wrapper = renderWithTheme({}, smallTheme).toJSON();

      describe('input hover / focus styles', () => {
        const hoverFocusStyles = { outline: `solid 3px ${smallTheme.colors.focus}` };

        it('applies the correct focus styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledSwitchSlider}`}` }
          );
        });

        it('applies the correct hover styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledSwitchSlider}`}` }
          );
        });
      });
    });
  });

  describe('Medium theme', () => {
    describe('default', () => {
      const wrapper = renderWithTheme({}, mediumTheme).toJSON();

      describe('input hover / focus styles', () => {
        const hoverFocusStyles = { outline: `solid 3px ${mediumTheme.colors.focus}` };

        it('applies the correct focus styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledSwitchSlider}`}` }
          );
        });

        it('applies the correct hover styles', () => {
          assertStyleMatch(
            hoverFocusStyles,
            wrapper,
            { modifier: css`${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledSwitchSlider}`}` }
          );
        });
      });
    });
  });
});

function render(props, renderer = TestRenderer.create) {
  return renderer(
    <Switch
      name='my-switch'
      value='test'
      { ...props }
    />
  );
}

function renderWithTheme(props, theme, renderer = TestRenderer.create) {
  return renderer(
    <ThemeProvider theme={ theme }>
      <Switch
        name='my-switch'
        value='test'
        { ...props }
      />
    </ThemeProvider>
  );
}
