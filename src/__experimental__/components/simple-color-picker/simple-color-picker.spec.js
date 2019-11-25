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
    let wrapper;
    describe('handleMouseDown', () => {
      describe('if target is inside of the component', () => {
        it('calls onMouseDown', () => {
          const onMouseDown = jest.fn();
          wrapper = render(mount, { onMouseDown });
          const lastSimpleColor = wrapper.find(SimpleColor).last();
          lastSimpleColor.find('input').first().simulate('mousedown');
        });
      });

      describe('if target is clicked twice and is inside of the component', () => {
        it('calls onMouseDown', () => {
          const onMouseDown = jest.fn();
          wrapper = render(mount, { onMouseDown });
          const lastSimpleColor = wrapper.find(SimpleColor).last();
          lastSimpleColor.find('input').first().simulate('mousedown');
          lastSimpleColor.find('input').first().simulate('mousedown');
        });
      });

      describe('if document is clicked and is outside of the component', () => {
        it('calls document onMouseDown event', () => {
          const onMouseDown = jest.fn();
          wrapper = render(mount);

          act(() => {
            document.addEventListener('mousedown', onMouseDown);
            document.dispatchEvent(new CustomEvent('mousedown'));
          });

          expect(onMouseDown).toHaveBeenCalledTimes(1);
        });

        it('calls document onMouseDown event', () => {
          const onMouseDown = jest.fn();
          const domWrapper = document.createElement('div');
          wrapper = mount(
            <SimpleColorPicker
              name='a'
              legend='SimpleColorPicker Legend'
              onChange={ jest.fn() }

            >
              <SimpleColor
                id='rId-1'
                key='radio-key-#00A376'
                onChange={ jest.fn() }
                color='#00A376'

              />
            </SimpleColorPicker>, { attachTo: domWrapper }
          );
          document.body.appendChild(domWrapper);


          act(() => {
            const input = document.getElementById('rId-1');
            input.addEventListener('mousedown', onMouseDown);
            input.dispatchEvent(new CustomEvent('mousedown'));
          });

          expect(onMouseDown).toHaveBeenCalledTimes(1);
        });
      });

      describe('if document is clicked and is outside of the component', () => {
        describe('when blur is not blocked', () => {
          it('calls onBlur on blur event', () => {
            const onBlur = jest.fn();
            wrapper = render(mount, { onBlur });
            wrapper.find(SimpleColor).first().find('input').first()
              .simulate('blur');
            expect(onBlur).toHaveBeenCalledTimes(1);
          });
        });

        describe('when blur is blocked', () => {
          it('calls onBlur on blur event', () => {
            const onBlur = jest.fn();
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
