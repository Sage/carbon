import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import TileHeader from './tile-header.component';
import Icon from '../icon';
import Heading from '../heading/heading';
import { StyledHeadingWrapper, StyledCollapsableContent } from './tile.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import StyledIcon from '../icon/icon.style';

describe('Tile Header', () => {
  describe('collapsable', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <TileHeader collapsable>
          <div>test content</div>
        </TileHeader>
      );
    });

    it('should render correctly', () => {
      expect(wrapper.find(Icon).exists()).toBe(true);

      assertStyleMatch({
        transform: 'rotate(90deg)'
      }, wrapper.find(StyledHeadingWrapper), { modifier: `${StyledIcon}` });

      expect(wrapper.find(Heading).exists()).toBe(true);
    });

    describe('onClick', () => {
      it('should open', () => {
        act(() => { wrapper.find(StyledHeadingWrapper).props().onClick(); });

        wrapper.update();

        assertStyleMatch({
          visibility: 'visible'
        }, wrapper.find(StyledCollapsableContent));
      });
      it('should change icon style', () => {
        act(() => { wrapper.find(StyledHeadingWrapper).props().onClick(); });

        wrapper.update();

        assertStyleMatch({
          transform: undefined
        }, wrapper.find(StyledHeadingWrapper), { modifier: `${StyledIcon}` });
      });
    });

    describe('onKeyDown', () => {
      it('should open if enter key pressed', () => {
        act(() => {
          wrapper.find(StyledHeadingWrapper).props().onKeyDown({
            which: 13, preventDefault: () => {}
          });
        });

        wrapper.update();

        assertStyleMatch({
          visibility: 'visible'
        }, wrapper.find(StyledCollapsableContent));
      });

      it('should open if space key presseed', () => {
        act(() => {
          wrapper.find(StyledHeadingWrapper).props().onKeyDown({
            which: 32, preventDefault: () => {}
          });
        });

        wrapper.update();

        assertStyleMatch({
          visibility: 'visible'
        }, wrapper.find(StyledCollapsableContent));
      });

      it('should not open if different key pressed', () => {
        act(() => {
          wrapper.find(StyledHeadingWrapper).props().onKeyDown({
            which: 65, preventDefault: () => {}
          });
        });

        wrapper.update();

        assertStyleMatch({
          visibility: 'hidden'
        }, wrapper.find(StyledCollapsableContent));
      });
    });
  });

  describe('not collapsable', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <TileHeader>
          <div>test content</div>
        </TileHeader>
      );
    });

    it('should render only Heading component', () => {
      expect(wrapper.find(Heading).exists()).toBe(true);
      expect(wrapper.find(Icon).exists()).toBe(false);
    });
  });
});
