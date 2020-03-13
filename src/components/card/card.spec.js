import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Card from './card.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import Icon from '../icon';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Card', () => {
  describe('when the content is added as children', () => {
    it('then that content should be rendered inside the component', () => {
      const content = (
        <div><span>content</span></div>
      );
      const wrapper = renderCard({
        children: content
      });

      expect(wrapper.containsMatchingElement(content)).toBe(true);
    });

    describe.each(OptionsHelper.sizesRestricted)('and the "spacing" prop is set to %s', (spacing) => {
      it(`then all children should have the "spacing" prop added and set to "${spacing}"`, () => {
        const content = [
          <div className='mockedContent' key='content1'>content</div>,
          <div className='mockedContent' key='content2'>content2</div>
        ];
        const wrapper = renderCard({
          children: content,
          spacing
        });
        expect(wrapper.find('.mockedContent').at(0).props().spacing).toBe(spacing);
        expect(wrapper.find('.mockedContent').at(1).props().spacing).toBe(spacing);
      });
    });
  });

  describe('when the "draggable" prop is set to true', () => {
    it('then a "drag" icon should be rendered', () => {
      const wrapper = renderCard({
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
        const wrapper = renderCard({
          interactive: true,
          action
        });

        wrapper.simulate('click');

        expect(action).toHaveBeenCalled();
      });

      describe('and with the "draggable" prop set to true', () => {
        it('then the method passed in the "action" prop should not be called', () => {
          const action = jest.fn();
          const wrapper = renderCard({
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
        const wrapper = renderCard({
          action
        });

        wrapper.simulate('click');

        expect(action).not.toHaveBeenCalled();
      });
    });
  });

  describe('when width is not passed as a prop', () => {
    const wrapper = renderCard();
    const elem = wrapper.find('[data-element="card"]');
    it('width fills containing element', () => {
      expect(elem).not.toHaveStyleRule('width');
    });
  });

  describe('when width is passed as a percentage value', () => {
    const widthPct = '50%';
    const wrapper = renderCard({ cardWidth: widthPct }, TestRenderer.create);

    it(`Card has style rule of width: ${widthPct}`, () => {
      assertStyleMatch({
        width: widthPct
      }, wrapper.toJSON());
    });
  });

  describe('when width is passed as a pixel value', () => {
    const widthPx = '500px';
    const wrapper = renderCard({ cardWidth: widthPx }, TestRenderer.create);

    it(`Card has style rule of width: ${widthPx}`, () => {
      assertStyleMatch({
        width: widthPx
      }, wrapper.toJSON());
    });
  });

  describe('when the "interactive" prop is set to true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderCard({ interactive: true }, TestRenderer.create);
    });

    it('then the cursor when hovered over the Card should change to pointer', () => {
      assertStyleMatch({
        cursor: 'pointer'
      }, wrapper.toJSON());
    });

    it.each([
      ['hovered over', ':hover'],
      ['focused', ':focus']
    ])('then the Card when %s should have a specific box-shadow and no outline', (description, selector) => {
      assertStyleMatch({
        boxShadow: '0 3px 3px 0 rgba(0,20,29,0.2),0 2px 4px 0 rgba(0,20,29,0.15)',
        outline: 'none'
      }, wrapper.toJSON(), selector);
    });
  });

  describe('when the "draggable" prop is set to true', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderCard({ draggable: true }, TestRenderer.create);
    });

    it('then the cursor when hovered over the Card should change to move', () => {
      assertStyleMatch({
        cursor: 'move'
      }, wrapper.toJSON());
    });
  });

  it('include correct component and role data tags', () => {
    const wrapper = renderCard({ dataRole: 'foo' }, shallow);

    rootTagTest(wrapper, 'card', undefined, 'foo');
  });

  it('include correct component and role tag when no prop passed', () => {
    const wrapper = renderCard({}, shallow);

    rootTagTest(wrapper, 'card', undefined, undefined);
  });
});

function renderCard(props = {}, renderer = shallow) {
  const children = props.children || <div />;

  return renderer(
    <Card { ...props }>
      { children }
    </Card>
  );
}
