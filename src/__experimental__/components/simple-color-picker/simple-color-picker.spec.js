import React from 'react';
import TestRenderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { css } from 'styled-components';
import { mount } from 'enzyme';
import { SimpleColor, SimpleColorPicker } from '.';
import { LegendContainerStyle } from '../fieldset/fieldset.style';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

const colorValues = ['#00A376', '#0073C1'];
const name = 'test-group';

function render(renderer = TestRenderer.create, props, childProps) {
  const children = colorValues.map((color, index) => (
    <SimpleColor
      id={ `rId-${index}` }
      key={ `radio-key-${color}` }
      onChange={ jest.fn() }
      value={ color }
      { ...childProps }
    />
  ));

  return renderer(
    <SimpleColorPicker
      name={ name }
      legend='SimpleColorPicker Legend'
      onChange={ jest.fn() }
      { ...props }
    >
      {children}
    </SimpleColorPicker>
  );
}

describe('SimpleColorPicker', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  describe('events', () => {
    let wrapper, onBlur, documentMousedownCallback, fireDocumentMousedown;

    beforeEach(() => {
      document.addEventListener = jest.fn((eventName, callback) => {
        if (eventName === 'mousedown') {
          documentMousedownCallback = callback;
        }
      });
      fireDocumentMousedown = () => {
        const customEvent = { target: document };
        act(() => {
          documentMousedownCallback(customEvent);
        });
      };
      onBlur = jest.fn();
      wrapper = render(mount, { onBlur });
    });

    describe('handleOnMouseDown', () => {
      describe('if a SimpleColor receives "mousedown, blur"', () => {
        it('SimpleColorPicker calls onBlur', () => {
          const firstSCinput = wrapper.find(SimpleColor).first().find('input').first();
          firstSCinput.simulate('mousedown');
          fireDocumentMousedown();
          firstSCinput.simulate('blur');
          expect(onBlur).toHaveBeenCalledTimes(1);
        });
      });

      describe('if a SimpleColor receives "mousedown, mousedown, blur"', () => {
        it('SimpleColorPicker calls onBlur', () => {
          const firstSCinput = wrapper.find(SimpleColor).first().find('input').first();
          firstSCinput.simulate('mousedown');
          firstSCinput.simulate('mousedown');
          fireDocumentMousedown();
          firstSCinput.simulate('blur');
          expect(onBlur).toHaveBeenCalledTimes(1);
        });
      });

      describe('if a mousedown is received by first SimpleColor and then second SimpleColor', () => {
        it('SimpleColorPicker calls onBlur', () => {
          const firstSCinput = wrapper.find(SimpleColor).first().find('input').first();
          const lastSCinput = wrapper.find(SimpleColor).last().find('input').first();
          firstSCinput.simulate('mousedown');
          lastSCinput.simulate('mousedown');
          fireDocumentMousedown();
          firstSCinput.simulate('blur');
          expect(onBlur).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('handleClickOutside', () => {
      describe('if a mousedown event occurs inside a SimpleColor', () => {
        it('SimpleColorPicker does not call onBlur', () => {
          const firstSCinput = wrapper.find(SimpleColor).first().find('input').first();
          const customEvent = { target: firstSCinput.getDOMNode() };
          documentMousedownCallback(customEvent);
          expect(onBlur).not.toHaveBeenCalled();
        });
      });

      describe('if a mousedown event occurs outside a SimpleColor', () => {
        it('SimpleColorPicker does not call onBlur', () => {
          fireDocumentMousedown();
          expect(onBlur).not.toHaveBeenCalled();
        });
      });
    });

    describe('handleOnBlur', () => {
      describe('if document is clicked and is outside of the component', () => {
        describe('when blur is not blocked', () => {
          it('calls onBlur on blur event', () => {
            wrapper.find(SimpleColor).first().find('input').first()
              .simulate('blur');
            expect(onBlur).toHaveBeenCalledTimes(1);
          });
        });

        describe('when blur is blocked', () => {
          it('calls onBlur on blur event', () => {
            wrapper = render(mount, { isBlurBlocked: true, onBlur });
            wrapper.find(SimpleColor).first().find('input').first()
              .simulate('blur');
            expect(onBlur).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
  });
  describe('styles', () => {
    it('applies the correct Legend Container styles', () => {
      assertStyleMatch(
        {
          height: '26px',
          marginBottom: '16px'
        },
        render().toJSON(),
        {
          modifier: css`
            ${LegendContainerStyle}
          `
        }
      );
    });

    it('applies the correct legend styles', () => {
      assertStyleMatch(
        {
          fontSize: '14px',
          marginLeft: '-2px'
        },
        render().toJSON(),
        { modifier: css`${LegendContainerStyle} legend` }
      );
    });
  });

  describe('propTypes', () => {
    it('validates the incorrect children prop', () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});

      mount(
        <SimpleColorPicker name={ name } legend='SimpleColorPicker Legend'>
          <p>Invalid children</p>
          <p>Invalid children</p>
        </SimpleColorPicker>
      );

      const expected = 'Warning: Failed prop type: `SimpleColorPicker` only accepts children of'
        + ' type `SimpleColor`.\n    in SimpleColorPicker';

      expect(console.error).toHaveBeenCalledWith(expected); // eslint-disable-line no-console
    });
  });
});
