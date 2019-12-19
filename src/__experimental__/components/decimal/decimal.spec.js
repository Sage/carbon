import React from 'react';
import ReactDOM from 'react-dom';
import { mount as enzymeMount } from 'enzyme';
import I18n from 'i18n-js';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

import Decimal from './decimal.component';
import Textbox from '../textbox/textbox.component';
import StyledWiggle, { wiggleAnimation } from './decimal.style';

// These have been written in a way that we can change our testing library or component implementation with relative
// ease without having to touch the tests.
// Note that we're asserting e.preventDefault has been called in may places, but we're simulating from the rendered
// input, not calling the prop directly, this is important. By mounting we can make these assertions with
// confidence that the `onChange` will not be dispatched if e.preventDefault has been called
describe('Decimal', () => {
  const container = { current: null };
  const wrapper = { current: null };
  const onChange = jest.fn();

  const mount = (jsx) => {
    wrapper.current = enzymeMount(jsx, { attachTo: container.current });
  };

  const DOM = (jsx) => {
    ReactDOM.render(jsx, container.current);
  };

  function render(props = {}, renderer = mount) {
    const defaultProps = {
      onChange,
      ...props
    };

    renderer(
      <Decimal { ...defaultProps } />
    );
  }

  function setProps(obj) {
    wrapper.current.setProps(obj);
    wrapper.current.update();
  }

  function getElements() {
    const cw = wrapper.current;
    if (cw) {
      const textbox = cw.find(Textbox);
      return {
        input: textbox.find('input'),
        textbox,
        hiddenInput: wrapper.current.find('input').at(1)
      };
    }
    throw new Error('No wrapper found');
  }

  const value = () => {
    const { textbox } = getElements();
    return textbox.prop('value');
  };

  const hiddenValue = () => {
    const { hiddenInput } = getElements();
    return hiddenInput.prop('value');
  };

  const checkWhere = (where) => {
    const without = where.replace(/\|/g, '');
    if (without !== value()) {
      throw new Error(`Testing error: where (${without}) does not match the current value (${value()})`);
    }
  };

  const type = (typedValue) => {
    // This function does not trigger the onblur, so the number will not be auto formatted
    const { input } = getElements();
    input.simulate('change', { target: { value: typedValue } });
  };

  const blur = () => {
    const { input } = getElements();
    input.simulate('blur');
  };

  const press = (obj, where, method = 'keyPress') => {
    checkWhere(where);

    const preventDefault = jest.fn();
    const selectionStart = where.indexOf('|');
    const lastIndex = where.lastIndexOf('|');
    const selectionEnd = lastIndex === selectionStart ? lastIndex : lastIndex - 1;
    const { input } = getElements();
    input.simulate(method, { ...obj, preventDefault, target: { selectionStart, selectionEnd, value: value() } });
    return { preventDefault };
  };

  function ClipboardData(obj) {
    this.data = { ...obj };
  }

  ClipboardData.prototype.getData = function(dataType) {
    return this.data[dataType];
  };

  const paste = (obj, where) => {
    const clipboardData = new ClipboardData({ 'text/plain': obj.key });
    return press({ clipboardData }, where, 'paste');
  };
  let translations;

  beforeAll(() => {
    translations = { ...I18n.translations };
    I18n.translations.fr = {
      number: {
        format: {
          delimiter: '.',
          separator: ','
        }
      }
    };
  });

  afterAll(() => {
    I18n.translations = translations;
  });

  beforeEach(() => {
    container.current = document.createElement('div');
    document.body.appendChild(container.current);
    onChange.mockReset();
  });


  afterEach(() => {
    document.body.removeChild(container.current);
    container.current = null;
    if (wrapper.current) {
      wrapper.current.unmount();
      wrapper.current = null;
    }
  });

  it('renders in ReactDOM', () => {
    render(null, DOM);
  });

  describe('Wiggle animation', () => {
    const animation = `0.4s ${wiggleAnimation.name} 1 ease-in forwards`;

    it('is triggered by invalid keypress', () => {
      render();
      press({ key: '-' }, '0.|00');
      assertStyleMatch({ animation }, wrapper.current.find(StyledWiggle));
    });

    it('is triggered by pasting an invalid value', () => {
      render();
      paste({ key: 'a' }, '0.|00');
      assertStyleMatch({ animation }, wrapper.current.find(StyledWiggle));
    });

    it('is not triggered when Decimal has readOnly prop', () => {
      render({ readOnly: true });

      paste({ key: 'a' }, '0.|00');
      expect(wrapper.current.find(StyledWiggle)).not.toHaveStyleRule('animation');

      press({ key: '-' }, '0.|00');
      expect(wrapper.current.find(StyledWiggle)).not.toHaveStyleRule('animation');
    });

    it('turns off the animation after finishing', () => {
      render();
      paste({ key: 'a' }, '0.|00');
      assertStyleMatch({ animation }, wrapper.current.find(StyledWiggle));
      wrapper.current.find(StyledWiggle).props().onAnimationEnd();
      wrapper.current.update();
      expect(wrapper.current.find(StyledWiggle)).not.toHaveStyleRule('animation');
    });
  });

  describe('Uncontrolled', () => {
    it('has a defaultValue of 0.00', () => {
      render();
      expect(value()).toBe('0.00');
      expect(hiddenValue()).toBe('0.00');
    });

    it('allows the defaultValue to be defined', () => {
      render({ defaultValue: '12345.67' });
      expect(value()).toBe('12,345.67');
      expect(hiddenValue()).toBe('12345.67');
    });

    it('renders a negative value', () => {
      render({ defaultValue: '-1234.56' });
      expect(value()).toBe('-1,234.56');
      expect(hiddenValue()).toBe('-1234.56');
      expect(hiddenValue()).toBe('-1234.56');
    });

    it.each([
      ['0.00', {}],
      ['', { allowEmptyValue: true }]
    ])('entering a negative sign and blurring should revert to the defaultValue (%s)', (expectedValue, props) => {
      const onBlur = jest.fn();
      render({ onBlur, defaultValue: '-1234.56', ...props });
      type('-');
      blur();
      expect(value()).toBe(expectedValue);
      expect(hiddenValue()).toBe(expectedValue);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '-',
            rawValue: '-'
          }
        }
      }));
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: expectedValue,
            rawValue: expectedValue
          }
        }
      }));
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: expectedValue,
            rawValue: expectedValue
          }
        }
      }));
    });

    describe('invariant', () => {
      beforeEach(() => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {});
      });

      afterEach(() => {
        global.console.error.mockReset();
      });

      it.each([
        '12.85.1',
        '12.,85',
        '12a.85',
        '12,85'
      ])('throws if the defaultValue is not a number (%s)', (defaultValue) => {
        expect(() => {
          render({ defaultValue });
        }).toThrow(`The supplied decimal (${defaultValue}) is not a number`);
      });

      it('throws if the precision is greater than 15', () => {
        // Legacy restriction, probably something to do with the i18n implementation
        expect(() => {
          render({ defaultValue: '12345.654', precision: 16 });
        }).toThrow('Decimal `precision` prop cannot be greater than 15');
      });

      it('throws if the precision is not a number (string)', () => {
        expect(() => {
          render({ defaultValue: '12345.654', precision: '' });
        }).toThrow('Decimal `precision` prop should be a number');
      });

      it('throws if the precision is not a number (NaN)', () => {
        expect(() => {
          render({ defaultValue: '12345.654', precision: NaN });
        }).toThrow('Decimal `precision` prop should be a number');
      });

      it('throws if the precision is not a positive number', () => {
        expect(() => {
          render({ defaultValue: '12345.654', precision: -1 });
        }).toThrow('Decimal `precision` prop cannot be negative');
      });

      it('throws if the value is not a string', () => {
        expect(() => {
          render({ value: 123 });
        }).toThrow('Decimal `value` prop must be a string');
      });

      it('throws if the value is an empty string', () => {
        expect(() => {
          render({ value: '' });
        }).toThrow('Decimal `value` must not be an empty string. Please use `allowEmptyValue` or `0.00`');
      });
    });

    describe('precision', () => {
      it('has a default precision of 2 (rounding up)', () => {
        render({ defaultValue: '12345.655' });
        expect(value()).toBe('12,345.66');
        expect(hiddenValue()).toBe('12345.66');
      });

      it('has a default precision of 2 (rounding down)', () => {
        render({ defaultValue: '12345.654' });
        expect(value()).toBe('12,345.65');
        expect(hiddenValue()).toBe('12345.65');
      });

      it('supports having a bigger precision', () => {
        render({ defaultValue: '12345.654', precision: 3 });
        expect(value()).toBe('12,345.654');
        expect(hiddenValue()).toBe('12345.654');
      });

      it('allows the user to change the precision', () => {
        render({ defaultValue: '1234.56789', precision: 5 });

        expect(value()).toBe('1,234.56789');
        expect(hiddenValue()).toBe('1234.56789');

        setProps({ precision: 4 });


        expect(value()).toBe('1,234.5679');
        expect(hiddenValue()).toBe('1234.5679');
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
          target: {
            value: {
              formattedValue: '1,234.5679',
              rawValue: '1234.5679'
            }
          }
        }));

        setProps({ precision: 3 });

        expect(value()).toBe('1,234.568');
        expect(hiddenValue()).toBe('1234.568');

        setProps({ precision: 2 });

        expect(value()).toBe('1,234.57');
        expect(hiddenValue()).toBe('1234.57');

        setProps({ precision: 1 });

        expect(value()).toBe('1,234.6');
        expect(hiddenValue()).toBe('1234.6');

        setProps({ precision: 2 });

        expect(value()).toBe('1,234.60');
        expect(hiddenValue()).toBe('1234.60');

        onChange.mockReset();

        setProps({ precision: 3 });

        expect(value()).toBe('1,234.600');
        expect(hiddenValue()).toBe('1234.600');

        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
          target: {
            value: {
              formattedValue: '1,234.600',
              rawValue: '1234.600'
            }
          }
        }));
      });
    });

    it('calls onChange when the user enters a value', () => {
      render();
      type('12345.56');
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '12,345.56',
            rawValue: '12345.56'
          }
        }
      }));
    });

    it('calls onBlur when the field loses focus', () => {
      const onBlur = jest.fn();
      render({ onBlur });
      type('12345.56');
      blur();
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '12,345.56',
            rawValue: '12345.56'
          }
        }
      }));
    });

    it.each([
      '1a',
      '1b',
      '1c',
      '1d',
      '1e',
      '1f',
      '1g',
      '1h',
      '1i',
      '1j',
      '1k',
      '1l',
      '1m',
      '1n',
      '1o',
      '1p',
      '1q',
      '1r',
      '1s',
      '1t',
      '1u',
      '1v',
      '1w',
      '1x',
      '1y',
      '1z',
      '1A',
      '1B',
      '1C',
      '1D',
      '1E',
      '1F',
      '1G',
      '1H',
      '1I',
      '1J',
      '1K',
      '1L',
      '1M',
      '1N',
      '1O',
      '1P',
      '1Q',
      '1R',
      '1S',
      '1T',
      '1U',
      '1V',
      '1W',
      '1X',
      '1Y',
      '1Z',
      '1!',
      '1"',
      '1£',
      '1$',
      '1%',
      '1^',
      '1&',
      '1*',
      '1(',
      '1)',
      '1_',
      '1+',
      '1`',
      '1¬',
      '1\\',
      '1|',
      '1[',
      '1{',
      '1]',
      '1}',
      '1:',
      '1;',
      '1@',
      '1\'',
      '1~',
      '1#',
      '1<',
      '1>',
      '1?',
      '1/',
      'a1',
      'b1',
      'c1',
      'd1',
      'e1',
      'f1',
      'g1',
      'h1',
      'i1',
      'j1',
      'k1',
      'l1',
      'm1',
      'n1',
      'o1',
      'p1',
      'q1',
      'r1',
      's1',
      't1',
      'u1',
      'v1',
      'w1',
      'x1',
      'y1',
      'z1',
      'A1',
      'B1',
      'C1',
      'D1',
      'E1',
      'F1',
      'G1',
      'H1',
      'I1',
      'J1',
      'K1',
      'L1',
      'M1',
      'N1',
      'O1',
      'P1',
      'Q1',
      'R1',
      'S1',
      'T1',
      'U1',
      'V1',
      'W1',
      'X1',
      'Y1',
      'Z1',
      '!1',
      '"1',
      '£1',
      '$1',
      '%1',
      '^1',
      '&1',
      '*1',
      '(1',
      ')1',
      '_1',
      '+1',
      '`1',
      '¬1',
      '\\1',
      '|1',
      '[1',
      '{1',
      ']1',
      '}1',
      ':1',
      ';1',
      '@1',
      '\'1',
      '~1',
      '#1',
      '<1',
      '>1',
      '?1',
      '/1',
      '11111a',
      'a111111',
      '1111a1111'
    ])('prevents the user from pasting anything but a number, separator, delimiter or negative sign (%s)', (key) => {
      render();

      const { preventDefault } = paste({ key }, '0|.00');
      expect(preventDefault).toHaveBeenCalled();
    });

    it.each([
      '0|.00',
      '0.|00',
      '0.0|0',
      '0.00|'
    ])('prevents the user from typing the negative symbol within the number (%s)', (where) => {
      render();

      const { preventDefault } = press({ key: '-' }, where);
      expect(preventDefault).toHaveBeenCalled();
    });

    it('allows the user to type a negative symbol at the start of the number', () => {
      render();

      const { preventDefault } = press({ key: '-' }, '|0.00');
      expect(preventDefault).not.toHaveBeenCalled();
    });

    it('allows the user to interact with the page with control commands', () => {
      render();
      const { preventDefault } = press({ key: 'r', ctrlKey: true }, '0.00|');
      expect(preventDefault).not.toHaveBeenCalled();
    });

    it('allows the user to interact with the page with control commands (safari)', () => {
      render();
      const { preventDefault } = press({ key: 'r', metaKey: true }, '0.00|');
      expect(preventDefault).not.toHaveBeenCalled();
    });

    const PASTE_MULTIPLE = 'paste (multiple chars)';
    describe.each([
      ['type', press],
      ['paste (single char)', paste],
      [PASTE_MULTIPLE, paste, key => `${key}${key}`]
    ])('%s', (event, fn, mutate = key => key) => {
      it.each([
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '!',
        '"',
        '£',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '_',
        '+',
        '`',
        '¬',
        '\\',
        '|',
        '[',
        '{',
        ']',
        '}',
        ':',
        ';',
        '@',
        '\'',
        '~',
        '#',
        '<',
        '>',
        '?',
        '/'
      ])('prevents the user from entering anything but a number, separator, delimiter or negative sign (%s)', (key) => {
        render();

        const { preventDefault } = fn({ key: mutate(key) }, '0|.00');
        expect(preventDefault).toHaveBeenCalled();
      });


      it.each([
        '|123.45',
        '1|23.45',
        '12|3.45',
        '123|.45',
        '|1|23.45',
        '|12|3.45',
        '|123|.45',
        '|123.|45',
        '|123.4|5',
        '|123.45|',
        '1|2|3.45',
        '1|23|.45',
        '1|23.|45',
        '1|23.4|5',
        '1|23.45|',
        '12|3|.45',
        '12|3.|45',
        '12|3.4|5',
        '12|3.45|',
        '123|.|45',
        '123|.4|5',
        '123|.45|'
      ])('allows the user to change the whole (%s)', (which) => {
        render({ defaultValue: '123.45' });
        const { preventDefault } = fn({ key: mutate('1') }, which);
        expect(preventDefault).not.toHaveBeenCalled();
        // Unable to assert on value because the change event won't be triggered
      });

      it.each([
        '123.|45',
        '123.4|5',
        '123.45|'
      ])('prevent the user from extending the fraction beyond the precision (%s)',
        (where) => {
          render({ defaultValue: '123.45' });
          const { preventDefault } = fn({ key: mutate('1') }, where);
          expect(preventDefault).toHaveBeenCalled();
        });

      if (event === PASTE_MULTIPLE) {
        it('allows the user to replace the fraction (%s)', () => {
          render({ defaultValue: '123.45' });
          const { preventDefault } = fn({ key: mutate('1') }, '123.|45|');
          expect(preventDefault).not.toHaveBeenCalled();
        });
      } else {
        it.each(['123.|45|', '123.|4|5', '123.4|5|'])('allows the user to replace the fraction (%s)', (where) => {
          render({ defaultValue: '123.45' });
          const { preventDefault } = fn({ key: '1' }, where);
          expect(preventDefault).not.toHaveBeenCalled();
        });
      }


      it.each([
        '123.|4',
        '123.4|',
        '123.|4|'
      ])(`prevent the user from ${event} the delimiter in the fraction (%s)`,
        (where) => {
          render();
          // We're changing the value to be something that is less than the maximum precision to ensure it's not the
          // maximum precision preventing us from making the change
          type('123.4');
          const { preventDefault } = fn({ key: mutate(',') }, where);
          expect(preventDefault).toHaveBeenCalled();
        });
      it.each([
        '|1,234.56',
        '1|,234.56',
        '1,|234.56',
        '1,2|34.56',
        '1,23|4.56',
        '1,234|.56',
        '|1|,234.56',
        '1|,|234.56',
        '1,|2|34.56',
        '1,2|3|4.56',
        '1,23|4|.56',
        '|1,|234.56',
        '|1,2|34.56',
        '|1,23|4.56',
        '|1,234|.56',
        '1|,2|34.56',
        '1|,23|4.56',
        '1|,234|.56',
        '1,|23|4.56',
        '1,|234|.56',
        '1,2|34|.56'
      ])(`allow the user to ${event} the delimiter in the whole (%s)`,
        (where) => {
          render({ defaultValue: '1234.56' });
          const { preventDefault } = fn({ key: mutate(',') }, where);
          expect(preventDefault).not.toHaveBeenCalled();
        });

      it.each([
        '|1,234.56',
        '1|,234.56',
        '1,|234.56',
        '1,2|34.56',
        '1,23|4.56',
        '1,234|.56',
        '|1|,234.56',
        '1|,|234.56',
        '1,|2|34.56',
        '1,2|3|4.56',
        '1,23|4|.56',
        '|1,|234.56',
        '|1,2|34.56',
        '|1,23|4.56',
        '|1,234|.56',
        '1|,2|34.56',
        '1|,23|4.56',
        '1|,234|.56',
        '1,|23|4.56',
        '1,|234|.56',
        '1,2|34|.56'
      ])(`allow the user to ${event} the delimiter in the whole (%s)`,
        (where) => {
          render({ defaultValue: '1234.56' });
          const { preventDefault } = fn({ key: mutate(',') }, where);
          expect(preventDefault).not.toHaveBeenCalled();
        });

      if (event !== PASTE_MULTIPLE) {
        it.each([
          '1|23',
          '12|3',
          '123|',
          '|123|',
          '1|23|',
          '12|3|',
          '1|23|',
          '|12|3'
        ])(`allow the user to ${event} the separator in the whole (%s)`,
          (where) => {
            render();
            type('123');
            const { preventDefault } = fn({ key: '.' }, where);
            expect(preventDefault).not.toHaveBeenCalled();
          });

        // Multiple paste would fail this test because there are two separators, this is covered in another test
        it(`prevents the user ${event} the separator in the whole where it would exceed the precision`, () => {
          render();
          type('123');
          const { preventDefault } = fn({ key: '.' }, '|123');
          expect(preventDefault).toHaveBeenCalled();
        });
      }

      it.each([
        '|1,234.56',
        '1|,234.56',
        '1,|234.56',
        '1,2|34.56',
        '1,23|4.56',
        '1,234|.56',
        '1,234.5|6',
        '1,234.56|',
        '|1|,234.56',
        '1|,|234.56',
        '1,|2|34.56',
        '1,2|3|4.56',
        '1,23|4|.56',
        '1,234.|5|6',
        '1,234.5|6|',
        '|1,|234.56',
        '|1,2|34.56',
        '|1,23|4.56',
        '|1,234|.56',
        '1|,2|34.56',
        '1|,23|4.56',
        '1|,234|.56',
        '1,|23|4.56',
        '1,|234|.56',
        '1,2|3|4.56',
        '1,2|34|.56',
        '1,23|4|.56'
      ])(`prevents the user from ${event} the separator (.) if there is already a separator (%s)`,
        (where) => {
          render({ defaultValue: '1234.56' });
          const { preventDefault } = fn({ key: mutate('.') }, where);
          expect(preventDefault).toHaveBeenCalled();
        });

      if (event !== PASTE_MULTIPLE) {
        it.each([
          '1,234|.|56',
          '1,234|.5|6',
          '1,234|.56|',
          '|1,234.56|',
          '|1,234.5|6',
          '|1,234.|56',
          '1|,234.56|',
          '1|,234.5|6',
          '1|,234.|56',
          '1,|234.56|',
          '1,|234.5|6',
          '1,|234.|56',
          '1,2|34.56|',
          '1,2|34.5|6',
          '1,2|34.|56',
          '1,23|4.56|',
          '1,23|4.5|6',
          '1,23|4.|56'
        ])('allows the user to replace the separator (.) (%s)',
          (where) => {
            render({ defaultValue: '1234.56' });
            const { preventDefault } = fn({ key: '.' }, where);
            expect(preventDefault).not.toHaveBeenCalled();
          });
      }
      // END
    });

    describe.each([
      'Backspace',
      'Delete'
    ])('allows the user to delete part of the decimal (%s)', (key) => {
      it.each([
        '|1,234.56',
        '1|,234.56',
        '1,|234.56',
        '1,2|34.56',
        '1,23|4.56',
        '1,234|.56',
        '1,234.|56',
        '1,234.5|6',
        '1,234.56|',
        '|1|,234.56',
        '|1,|234.56',
        '|1,2|34.56',
        '|1,23|4.56',
        '|1,234|.56',
        '|1,234.|56',
        '|1,234.5|6',
        '|1,234.56|',
        '1|,|234.56',
        '1|,2|34.56',
        '1|,23|4.56',
        '1|,234|.56',
        '1|,234.|56',
        '1|,234.5|6',
        '1|,234.56|',
        '1,|2|34.56',
        '1,|23|4.56',
        '1,|234|.56',
        '1,|234.|56',
        '1,|234.5|6',
        '1,|234.56|',
        '1,2|3|4.56',
        '1,2|34|.56',
        '1,2|34.|56',
        '1,2|34.5|6',
        '1,2|34.56|',
        '1,23|4|.56',
        '1,23|4.|56',
        '1,23|4.5|6',
        '1,23|4.56|',
        '1,234|.|56',
        '1,234|.5|6',
        '1,234|.56|',
        '1,234.|5|6',
        '1,234.|56|',
        '1,234.5|6|',
        '|1,234.56|'
      ])('%s', (where) => {
        render({ defaultValue: '1234.56' });
        const { preventDefault } = press({ key }, where);
        expect(preventDefault).not.toHaveBeenCalled();
      });
    });

    describe('i18n', () => {
      beforeAll(() => {
        I18n.locale = 'fr';
      });

      afterAll(() => {
        I18n.locale = undefined;
      });

      it('has a defaultValue of 0,00', () => {
        render();
        expect(value()).toBe('0,00');
        expect(hiddenValue()).toBe('0.00');
      });

      it('allows the defaultValue to be defined', () => {
        render({ defaultValue: '12345.67' });
        expect(value()).toBe('12.345,67');
        expect(hiddenValue()).toBe('12345.67');
      });

      it('formats a value correctly', () => {
        render();
        type('1234576');
        blur();
        expect(value()).toBe('1.234.576,00');
        expect(hiddenValue()).toBe('1234576.00');
      });

      it('formats a value correctly (extra separator)', () => {
        render();
        type('1.2.34576,00');
        blur();
        expect(value()).toBe('1.234.576,00');
        expect(hiddenValue()).toBe('1234576.00');
      });

      it('renders a negative value', () => {
        render({ defaultValue: '-1234.56' });
        expect(value()).toBe('-1.234,56');
        expect(hiddenValue()).toBe('-1234.56');
      });

      it.each([
        ['0,00', '0.00', {}],
        ['', '', { allowEmptyValue: true }]
      ])('entering a negative sign and blurring should revert to the defaultValue (%s)',
        (formattedValue, rawValue, props) => {
          const onBlur = jest.fn();
          render({ onBlur, defaultValue: '-1234.56', ...props });
          type('-');
          blur();
          expect(value()).toBe(formattedValue);
          expect(hiddenValue()).toBe(rawValue);
          expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            target: {
              value: {
                formattedValue: '-',
                rawValue: '-'
              }
            }
          }));
          expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            target: {
              value: {
                formattedValue,
                rawValue
              }
            }
          }));
          expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
            target: {
              value: {
                formattedValue,
                rawValue
              }
            }
          }));
        });

      describe('precision', () => {
        it('has a default precision of 2 (rounding up)', () => {
          render({ defaultValue: '12345.655' });
          expect(value()).toBe('12.345,66');
          expect(hiddenValue()).toBe('12345.66');
        });

        it('has a default precision of 2 (rounding down)', () => {
          render({ defaultValue: '12345.654' });
          expect(value()).toBe('12.345,65');
          expect(hiddenValue()).toBe('12345.65');
        });

        it('supports having a bigger precision', () => {
          render({ defaultValue: '12345.654', precision: 3 });
          expect(value()).toBe('12.345,654');
          expect(hiddenValue()).toBe('12345.654');
        });

        it('allows the user to change the precision', () => {
          render({ defaultValue: '1234.56789', precision: 5 });

          expect(value()).toBe('1.234,56789');
          expect(hiddenValue()).toBe('1234.56789');

          setProps({ precision: 4 });

          expect(value()).toBe('1.234,5679');
          expect(hiddenValue()).toBe('1234.5679');
          expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            target: {
              value: {
                formattedValue: '1.234,5679',
                rawValue: '1234.5679'
              }
            }
          }));

          setProps({ precision: 3 });

          expect(value()).toBe('1.234,568');
          expect(hiddenValue()).toBe('1234.568');

          setProps({ precision: 2 });

          expect(value()).toBe('1.234,57');
          expect(hiddenValue()).toBe('1234.57');

          setProps({ precision: 1 });

          expect(value()).toBe('1.234,6');
          expect(hiddenValue()).toBe('1234.6');

          setProps({ precision: 2 });

          expect(value()).toBe('1.234,60');
          expect(hiddenValue()).toBe('1234.60');

          onChange.mockReset();

          setProps({ precision: 3 });

          expect(value()).toBe('1.234,600');
          expect(hiddenValue()).toBe('1234.600');

          expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
            target: {
              value: {
                formattedValue: '1.234,600',
                rawValue: '1234.600'
              }
            }
          }));
        });
      });

      it('calls onChange when the user enters a value', () => {
        render();
        type('12345,56');
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
          target: {
            value: {
              formattedValue: '12.345,56',
              rawValue: '12345.56'
            }
          }
        }));
      });

      it('calls onBlur when the field loses focus', () => {
        const onBlur = jest.fn();
        render({ onBlur });
        type('12345,56');
        blur();
        expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
          target: {
            value: {
              formattedValue: '12.345,56',
              rawValue: '12345.56'
            }
          }
        }));
      });

      describe.each([
        ['type', press],
        ['paste (single char)', paste],
        [PASTE_MULTIPLE, paste, key => `${key}${key}`]
      ])('%s', (event, fn, mutate = key => key) => {
        it.each([
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
          '!',
          '"',
          '£',
          '$',
          '%',
          '^',
          '&',
          '*',
          '(',
          ')',
          '_',
          '+',
          '`',
          '¬',
          '\\',
          '|',
          '[',
          '{',
          ']',
          '}',
          ':',
          ';',
          '@',
          '\'',
          '~',
          '#',
          '<',
          '>',
          '?',
          '/'
        ])('prevents the user from entering anything but a number, separator, delimiter or negative sign (%s)',
          (key) => {
            render();
            const { preventDefault } = fn({ key: mutate(key) }, '0|,00');
            expect(preventDefault).toHaveBeenCalled();
          });

        it.each([
          '|123,45',
          '1|23,45',
          '12|3,45',
          '123|,45',
          '|1|23,45',
          '|12|3,45',
          '|123|,45',
          '|123,|45',
          '|123,4|5',
          '|123,45|',
          '1|2|3,45',
          '1|23|,45',
          '1|23,|45',
          '1|23,4|5',
          '1|23,45|',
          '12|3|,45',
          '12|3,|45',
          '12|3,4|5',
          '12|3,45|',
          '123|,|45',
          '123|,4|5',
          '123|,45|'
        ])('allows the user to change the whole (%s)', (which) => {
          render({ defaultValue: '123.45' });
          const { preventDefault } = fn({ key: mutate('1') }, which);
          expect(preventDefault).not.toHaveBeenCalled();
          // Unable to assert on value because the change event won't be triggered
        });

        it.each([
          '123,|45',
          '123,4|5',
          '123,45|'
        ])('prevent the user from extending the fraction beyond the precision (%s)',
          (where) => {
            render({ defaultValue: '123.45' });
            const { preventDefault } = fn({ key: mutate('1') }, where);
            expect(preventDefault).toHaveBeenCalled();
          });

        if (event === PASTE_MULTIPLE) {
          it('allows the user to replace the fraction (%s)', () => {
            render({ defaultValue: '123.45' });
            const { preventDefault } = fn({ key: mutate('1') }, '123,|45|');
            expect(preventDefault).not.toHaveBeenCalled();
          });
        } else {
          it.each(['123,|45|', '123,|4|5', '123,4|5|'])('allows the user to replace the fraction (%s)', (where) => {
            render({ defaultValue: '123.45' });
            const { preventDefault } = fn({ key: '1' }, where);
            expect(preventDefault).not.toHaveBeenCalled();
          });
        }

        it.each([
          '123,|4',
          '123,4|',
          '123,|4|'
        ])(`prevent the user from ${event} the delimiter in the fraction (%s)`,
          (where) => {
            render();
            // We're changing the value to be something that is less than the maximum precision to ensure it's not the
            // maximum precision preventing us from making the change
            type('123,4');
            const { preventDefault } = fn({ key: mutate('.') }, where);
            expect(preventDefault).toHaveBeenCalled();
          });

        it.each([
          '|1.234,56',
          '1|.234,56',
          '1.|234,56',
          '1.2|34,56',
          '1.23|4,56',
          '1.234|,56',
          '|1|.234,56',
          '1|.|234,56',
          '1.|2|34,56',
          '1.2|3|4,56',
          '1.23|4|,56',
          '|1.|234,56',
          '|1.2|34,56',
          '|1.23|4,56',
          '|1.234|,56',
          '1|.2|34,56',
          '1|.23|4,56',
          '1|.234|,56',
          '1.|23|4,56',
          '1.|234|,56',
          '1.2|34|,56'
        ])(`allow the user to ${event} the delimiter in the whole (%s)`,
          (where) => {
            render({ defaultValue: '1234.56' });
            const { preventDefault } = fn({ key: mutate('.') }, where);
            expect(preventDefault).not.toHaveBeenCalled();
          });

        if (event !== PASTE_MULTIPLE) {
          it.each([
            '1|23',
            '12|3',
            '123|',
            '|123|',
            '1|23|',
            '12|3|',
            '1|23|',
            '|12|3'
          ])(`allow the user to ${event} the separator in the whole (%s)`,
            (where) => {
              render();
              type('123');
              const { preventDefault } = fn({ key: ',' }, where);
              expect(preventDefault).not.toHaveBeenCalled();
            });

          it(`prevents the user ${event} the separator in the whole where it would exceed the precision`, () => {
            render();
            type('123');
            const { preventDefault } = fn({ key: ',' }, '|123');
            expect(preventDefault).toHaveBeenCalled();
          });
        }

        it.each([
          '|1.234,56',
          '1|.234,56',
          '1.|234,56',
          '1.2|34,56',
          '1.23|4,56',
          '1.234|,56',
          '1.234,5|6',
          '1.234,56|',
          '|1|.234,56',
          '1|.|234,56',
          '1.|2|34,56',
          '1.2|3|4,56',
          '1.23|4|,56',
          '1.234,|5|6',
          '1.234,5|6|',
          '|1.|234,56',
          '|1.2|34,56',
          '|1.23|4,56',
          '|1.234|,56',
          '1|.2|34,56',
          '1|.23|4,56',
          '1|.234|,56',
          '1.|23|4,56',
          '1.|234|,56',
          '1.2|3|4,56',
          '1.2|34|,56',
          '1.23|4|,56'
        ])(`prevents the user from ${event} the separator (,) if there is already a separator (%s)`,
          (where) => {
            render({ defaultValue: '1234.56' });
            const { preventDefault } = fn({ key: mutate(',') }, where);
            expect(preventDefault).toHaveBeenCalled();
          });

        if (event !== PASTE_MULTIPLE) {
          it.each([
            '1.234|,|56',
            '1.234|,5|6',
            '1.234|,56|',
            '|1.234,56|',
            '|1.234,5|6',
            '|1.234,|56',
            '1|.234,56|',
            '1|.234,5|6',
            '1|.234,|56',
            '1.|234,56|',
            '1.|234,5|6',
            '1.|234,|56',
            '1.2|34,56|',
            '1.2|34,5|6',
            '1.2|34,|56',
            '1.23|4,56|',
            '1.23|4,5|6',
            '1.23|4,|56'
          ])('allows the user to replace the separator (,) (%s)',
            (where) => {
              render({ defaultValue: '1234.56' });
              const { preventDefault } = fn({ key: ',' }, where);
              expect(preventDefault).not.toHaveBeenCalled();
            });
        }
      });


      describe.each([
        'Backspace',
        'Delete'
      ])('allows the user to delete part of the decimal (%s)', (key) => {
        it.each([
          '|1.234,56',
          '1|.234,56',
          '1.|234,56',
          '1.2|34,56',
          '1.23|4,56',
          '1.234|,56',
          '1.234,|56',
          '1.234,5|6',
          '1.234,56|',
          '|1|.234,56',
          '|1.|234,56',
          '|1.2|34,56',
          '|1.23|4,56',
          '|1.234|,56',
          '|1.234,|56',
          '|1.234,5|6',
          '|1.234,56|',
          '1|.|234,56',
          '1|.2|34,56',
          '1|.23|4,56',
          '1|.234|,56',
          '1|.234,|56',
          '1|.234,5|6',
          '1|.234,56|',
          '1.|2|34,56',
          '1.|23|4,56',
          '1.|234|,56',
          '1.|234,|56',
          '1.|234,5|6',
          '1.|234,56|',
          '1.2|3|4,56',
          '1.2|34|,56',
          '1.2|34,|56',
          '1.2|34,5|6',
          '1.2|34,56|',
          '1.23|4|,56',
          '1.23|4,|56',
          '1.23|4,5|6',
          '1.23|4,56|',
          '1.234|,|56',
          '1.234|,5|6',
          '1.234|,56|',
          '1.234,|5|6',
          '1.234,|56|',
          '1.234,5|6|',
          '|1.234,56|'
        ])('%s', (where) => {
          render({ defaultValue: '1234.56' });
          const { preventDefault } = press({ key }, where);
          expect(preventDefault).not.toHaveBeenCalled();
        });
      });

      describe('invariant', () => {
        beforeEach(() => {
          jest.spyOn(global.console, 'error').mockImplementation(() => {});
        });

        afterEach(() => {
          global.console.error.mockReset();
        });

        it.each([
          '12,85,1',
          '12.85.1',
          '12a.85',
          '12,85'
        ])('throws if the defaultValue is not a number (%s)', (defaultValue) => {
          expect(() => {
            render({ defaultValue });
          }).toThrow(`The supplied decimal (${defaultValue}) is not a number`);
        });
      });
    });

    it('calls the onKeyPress callback', () => {
      const onKeyPress = jest.fn();

      render({ onKeyPress });
      press({ key: '1' }, '0.00|');
      expect(onKeyPress).toHaveBeenCalledWith(expect.objectContaining({ key: '1' }));
    });

    it('has the correct automation selectors', () => {
      render();
      expect(wrapper.current.find(Textbox).getDOMNode().getAttribute('data-component')).toBe('decimal');
    });

    it('works as a form-data component', () => {
      render({ onChange: undefined, name: 'example' });
      type('1.23');
      const { hiddenInput } = getElements();
      const html = hiddenInput.getDOMNode();
      expect(html.getAttribute('data-component')).toBe('hidden-input');
      expect(html.getAttribute('type')).toBe('hidden');
      expect(html.getAttribute('value')).toBe('1.23');
      expect(html.getAttribute('name')).toBe('example');
    });

    it('fires onChange when blurring only if the value has changed', () => {
      render({ allowEmptyValue: true });
      blur();
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  describe('Controlled', () => {
    it('can be controlled', () => {
      render({ value: '123' });
      expect(value()).toBe('123.00');
      expect(hiddenValue()).toBe('123.00');

      setProps({ value: '456' });
      expect(value()).toBe('456.00');
      expect(hiddenValue()).toBe('456.00');

      setProps({ value: '' });
      expect(value()).toBe('');
      expect(hiddenValue()).toBe('');
    });

    it('blurring a field does not trigger onChange if the value has not changes', () => {
      render({ value: '123' });
      blur();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('typing a negative value reverts to the default value', () => {
      render({ value: '123' });
      setProps({ value: '-' });
      expect(onChange).not.toHaveBeenCalled();
      expect(value()).toBe('0.00');
      expect(hiddenValue()).toBe('0.00');
    });

    it('typing a negative value reverts to the default value (allowEmptyValue)', () => {
      render({ value: '', allowEmptyValue: true });
      setProps({ value: '-' });
      expect(onChange).not.toHaveBeenCalled();
      expect(value()).toBe('');
      expect(hiddenValue()).toBe('');
    });

    it('formats a empty value prop when firing events (allowEmptyValue)', () => {
      const onBlur = jest.fn();
      render({
        value: '',
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true
      });

      blur();
      expect(value()).toBe('');
      expect(hiddenValue()).toBe('');
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '',
            rawValue: ''
          }
        }
      }));

      onBlur.mockReset();
      type('1');
      blur();
      expect(value()).toBe('1.00');
      expect(hiddenValue()).toBe('1.00');
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '1.00',
            rawValue: '1'
          }
        }
      }));

      onBlur.mockReset();
      type('');
      blur();
      expect(value()).toBe('');
      expect(hiddenValue()).toBe('');
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '',
            rawValue: ''
          }
        }
      }));
    });

    it('formats a empty value prop when firing events', () => {
      const onBlur = jest.fn();
      render({
        value: '0.00',
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        }
      });

      blur();
      expect(value()).toBe('0.00');
      expect(hiddenValue()).toBe('0.00');
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '0.00',
            rawValue: '0.00'
          }
        }
      }));

      onBlur.mockReset();
      type('1');
      blur();
      expect(value()).toBe('1.00');
      expect(hiddenValue()).toBe('1.00');
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '1.00',
            rawValue: '1'
          }
        }
      }));

      onBlur.mockReset();
      type('');
      blur();
      expect(value()).toBe('0.00');
      expect(hiddenValue()).toBe('0.00');
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        target: {
          value: {
            formattedValue: '0.00',
            rawValue: '0.00'
          }
        }
      }));
    });
  });
});
