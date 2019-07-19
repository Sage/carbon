import React from 'react';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { css } from 'styled-components';
import { RadioButton } from '.';
import FieldHelpStyle from '../field-help/field-help.style';
import LabelStyle from '../label/label.style';
import CheckableInput from '../checkable-input/checkable-input.component';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import guid from '../../../utils/helpers/guid';
import baseTheme from '../../../style/themes/base';
import classicTheme from '../../../style/themes/classic';

jest.mock('../../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

function render(props, renderer = TestRenderer.create) {
  return renderer(<RadioButton value='test' { ...props } />);
}

function renderClassic(props) {
  return TestRenderer.create(
    <RadioButton
      theme={ classicTheme } value='test'
      { ...props }
    />
  );
}

describe('RadioButton', () => {
  describe('tabindex', () => {
    describe('when checked === true', () => {
      it('sets the tabindex attribute to 0', () => {
        const input = render({ checked: true }, mount).find(CheckableInput);

        expect(input.props().tabindex).toEqual(0);
      });
    });

    describe('when checked === false', () => {
      it('sets the tabindex attribute to -1', () => {
        const input = render({ checked: false }, mount).find(CheckableInput);

        expect(input.props().tabindex).toEqual(-1);
      });
    });
  });

  describe('styles', () => {
    describe('base', () => {
      it('renders as expected', () => {
        expect(render()).toMatchSnapshot();
      });
    });

    describe('when checked === true', () => {
      it('applies the correct circle styles', () => {
        const wrapper = render({ checked: true }).toJSON();

        assertStyleMatch({ fill: baseTheme.colors.primary }, wrapper, { modifier: 'circle' });
      });
    });

    describe('when disabled === true', () => {
      describe('default', () => {
        it('applies the correct circle styles', () => {
          const wrapper = render({ disabled: true }).toJSON();

          assertStyleMatch({ fill: baseTheme.disabled.input }, wrapper, { modifier: 'circle' });
        });
      });

      describe('and checked === true', () => {
        it('applies the correct circle styles', () => {
          const wrapper = render({ checked: true, disabled: true }).toJSON();

          assertStyleMatch({ fill: baseTheme.disabled.border }, wrapper, { modifier: 'circle' });
        });
      });
    });

    describe('when size === "large"', () => {
      describe('default', () => {
        const wrapper = render({ size: 'large' }).toJSON();
        const dimensions = { height: '24px', width: '24px' };

        it('applies the correct Label styles', () => {
          assertStyleMatch({ padding: '4px 0' }, wrapper, { modifier: css`${LabelStyle}` });
        });

        it('applies the correct input styles', () => {
          assertStyleMatch({ marginRight: '14px', ...dimensions }, wrapper, { modifier: css`${StyledCheckableInput}` });
        });

        it('applies the correct hidden input styles', () => {
          assertStyleMatch(dimensions, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
        });

        it('applies the correct svg wrapper styles', () => {
          assertStyleMatch(dimensions, wrapper, { modifier: css`${StyledCheckableInputSvgWrapper}` });
        });

        it('applies the correct svg styles', () => {
          assertStyleMatch(dimensions, wrapper, { modifier: 'svg' });
        });

        it('applies the correct circle styles', () => {
          assertStyleMatch({ r: '3.75' }, wrapper, { modifier: 'circle' });
        });
      });

      describe('and reverse === true', () => {
        describe('default', () => {
          const wrapper = render({ reverse: true, size: 'large' }).toJSON();

          it('applies the correct input styles', () => {
            assertStyleMatch({ marginLeft: '6px' }, wrapper, { modifier: css`${StyledCheckableInput}` });
          });

          it('applies the correct FieldHelp styles', () => {
            assertStyleMatch({ padding: '0' }, wrapper, { modifier: css`${FieldHelpStyle}` });
          });
        });

        describe('and fieldHelpInline === true', () => {
          it('does not apply padding changes to FieldHelp', () => {
            const wrapper = render({ fieldHelpInline: true, reverse: true, size: 'large' }).toJSON();

            assertStyleMatch({ padding: undefined }, wrapper, { modifier: css`${FieldHelpStyle}` });
          });
        });
      });
    });

    describe('Classic theme', () => {
      describe('default', () => {
        const wrapper = renderClassic().toJSON();
        const dimensions = { height: '15px', width: '15px' };

        it('applies the correct input styles', () => {
          assertStyleMatch({ marginRight: '6px', ...dimensions }, wrapper, { modifier: css`${StyledCheckableInput}` });
        });

        it('applies the correct hidden input styles', () => {
          assertStyleMatch(dimensions, wrapper, { modifier: css`${HiddenCheckableInputStyle}` });
        });

        it('applies the correct svg wrapper styles', () => {
          assertStyleMatch(dimensions, wrapper, { modifier: css`${StyledCheckableInputSvgWrapper}` });
        });

        it('applies the correct svg styles', () => {
          assertStyleMatch(dimensions, wrapper, { modifier: 'svg' });
        });

        it('applies the correct FieldHelp styles', () => {
          assertStyleMatch({ marginLeft: '22px', padding: '0 6px' }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });

        it('applies the correct Label styles', () => {
          assertStyleMatch({ padding: '0 6px' }, wrapper, { modifier: css`${LabelStyle}` });
        });

        it('applies the correct hidden input svg focus styles', () => {
          assertStyleMatch(
            {
              boxShadow: '0 0 6px rgba(25,99,246,0.6)',
              transition: 'box-shadow 0.1s linear'
            },
            wrapper,
            {
              modifier: css`
                ${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledCheckableInputSvgWrapper} > svg`}
              `
            }
          );
        });
      });

      describe('when checked === true', () => {
        it('applies the correct circle styles', () => {
          const wrapper = renderClassic({ checked: true }).toJSON();

          assertStyleMatch({ fill: 'rgba(0,0,0,0.85)' }, wrapper, { modifier: 'circle' });
        });

        describe('and disabled=true', () => {
          const wrapper = renderClassic({ checked: true, disabled: true }).toJSON();

          it('renders the correct circle colour', () => {
            assertStyleMatch({
              fill: '#8099a4'
            }, wrapper, { modifier: 'circle' });
          });
        });
      });

      describe('when disabled=true', () => {
        const wrapper = renderClassic({ disabled: true }).toJSON();

        it('applies the appropriate circle styles', () => {
          assertStyleMatch({
            fill: '#e6ebed'
          }, wrapper, { modifier: 'circle' });
        });
      });

      describe.each(['fieldHelpInline', 'reverse'])('when %s === true', (prop) => {
        const opts = {};
        opts[prop] = true;
        const wrapper = renderClassic(opts).toJSON();

        it('applies the correct FieldHelp styles', () => {
          assertStyleMatch({ marginLeft: '0', marginRight: '6px' }, wrapper, { modifier: css`${FieldHelpStyle}` });
        });

        it('applies the correct input styles', () => {
          assertStyleMatch({ marginLeft: '6px' }, wrapper, { modifier: css`${StyledCheckableInput}` });
        });
      });
    });
  });
});
