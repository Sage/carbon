import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Card from './card.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import 'jest-styled-components';
import Icon from '../icon';

function render(props = {}, renderer = shallow) {
  const children = props.children || <div />;

  return renderer(
    <Card { ...props }>
      { children }
    </Card>
  );
}

describe('Card', () => {
  describe('when the content is added as children', () => {
    it('then that content should be rendered inside the component', () => {
      const content = (
        <div><span>content</span></div>
      );
      const wrapper = render({
        children: content
      });

      expect(wrapper.containsMatchingElement(content)).toBe(true);
    });

    it('then all children should have the "spacing" prop added and set to "medium"', () => {
      const content = [
        <div className='mockedContent' key='content1'>content</div>,
        <div className='mockedContent' key='content2'>content2</div>
      ];
      const wrapper = render({
        children: content
      });
      expect(wrapper.find('.mockedContent').at(0).props().spacing).toBe('medium');
      expect(wrapper.find('.mockedContent').at(1).props().spacing).toBe('medium');
    });
  });

  describe('when the "draggable" prop is set to true', () => {
    it('then a "drag" icon should be rendered', () => {
      const wrapper = render({
        draggable: true
      });

      expect(wrapper.find(Icon).exists()).toBe(true);
      expect(wrapper.find(Icon).props().type).toBe('drag');
    });
  });

  describe('when the "action" prop is set', () => {
    describe('with the "interactive" prop set to true', () => {
      it('then the method passed in the "action" prop should be called after click is triggered', () => {
        const action = jest.fn();
        const wrapper = render({
          interactive: true,
          action
        });

        wrapper.simulate('click');

        expect(action).toHaveBeenCalled();
      });

      describe('and a key is pressed', () => {
        it('then the method passed in the "action" prop should be called if the key is "enter"', () => {
          const action = jest.fn();
          const wrapper = render({
            interactive: true,
            action
          });

          wrapper.simulate('keyDown', { which: 13 });

          expect(action).toHaveBeenCalled();
        });

        it('then the method passed in the "action" prop should be not called if the key is other than "enter"', () => {
          const action = jest.fn();
          const wrapper = render({
            interactive: true,
            action
          });

          wrapper.simulate('keyDown', { which: 10 });

          expect(action).not.toHaveBeenCalled();
        });
      });

      describe('and with the "draggable" prop set to true', () => {
        it('then the method passed in the "action" prop should not be called', () => {
          const action = jest.fn();
          const wrapper = render({
            interactive: true,
            draggable: true,
            action
          });

          wrapper.simulate('click');

          expect(action).not.toHaveBeenCalled();
        });
      });
    });

    describe('with the "interactive" prop not set', () => {
      it('then the method passed in the "action" prop should not be called', () => {
        const action = jest.fn();
        const wrapper = render({
          action
        });

        wrapper.simulate('click');

        expect(action).not.toHaveBeenCalled();
      });
    });
  });

  describe('when width is not passed as a prop', () => {
    const wrapper = render();
    const elem = wrapper.find('[data-element="card"]');
    it('width fills containing element', () => {
      expect(elem).not.toHaveStyleRule('width');
    });
  });

  describe('when width is passed as a percentage value', () => {
    const widthPct = '50%';
    const wrapper = render({ cardWidth: widthPct }, TestRenderer.create);

    it(`Card has style rule of width: ${widthPct}`, () => {
      assertStyleMatch({
        width: widthPct
      }, wrapper.toJSON());
    });
  });

  describe('when width is passed as a pixel value', () => {
    const widthPx = '500px';
    const wrapper = render({ cardWidth: widthPx }, TestRenderer.create);

    it(`Card has style rule of width: ${widthPx}`, () => {
      assertStyleMatch({
        width: widthPx
      }, wrapper.toJSON());
    });
  });
});
