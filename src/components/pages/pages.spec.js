import React from 'react';
import TestUtils from 'react-dom/test-utils';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { shallow, mount } from 'enzyme';
import BasePages, { Pages, Page } from './pages.component';
// import Page from '../page/page.component';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import {
  PagesButtonStyle,
  PagesSliderWrapper,
  PagesSelectorWrapperStyle,
  PagesSelectorLabelStyle,
  PagesSelectorInputWrapperStyle
} from './pages.style';
import classicTheme from '../../style/themes/classic';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import 'jest-styled-components';
/* global jest */

describe('BasePages', () => {
  let wrapper, page;

  beforeEach(() => {
    wrapper = shallow(
      <BasePages theme={ classicTheme } className='foobar' initialPageIndex={ 0 }>
        <Page title="Page One" />
        <Page title="Page Two" />
        <Page title="Page Three" />
      </BasePages>
    );

    page = wrapper.instance().visiblePage();
  });

  describe('componentWillMount', () => {
    describe('when pageIndex is passed', () => {
      it('sets the intial page to the prop', () => {
        const wrapper = shallow(
          <BasePages pageIndex={ 1 }>
            <Page />
            <Page />
            <Page />
          </BasePages>
        );

        expect(wrapper.state('pageIndex')).toEqual(1);
      });
    });

    describe('when initialPageIndex is passed', () => {
      it('sets the intial page to the prop', () => {
        const wrapper = shallow(
          <BasePages initialPageIndex={ 2 } pageIndex={ 2 }>
            <Page />
            <Page />
            <Page />
          </BasePages>
        );

        expect(wrapper.state('pageIndex')).toEqual(2);
      });
    });

    describe('when initialSelectedIndex is not passed', () => {
      it('defaults the initial page to page 0', () => {
        const wrapper = shallow(
          <BasePages theme={ classicTheme }>
            <Page />
            <Page />
            <Page />
          </BasePages>
        );

        expect(wrapper.state('pageIndex')).toEqual(0);
      });
    });
  });

  describe('componentDidUpdate', () => {
    it('navigates between slides correctly when the pageIndex prop changes', () => {
      // const wrapper = shallow(
      //   <BasePages theme={ classicTheme } initialPageIndex={ 0 }>
      //     <Page />
      //     <Page />
      //     <Page />
      //   </BasePages>
      // );
      // Initial state
      expect(wrapper.state().pageIndex).toEqual(0);
      expect(wrapper.instance().numOfPages()).toEqual(3);

      // Move to page 2
      wrapper.setProps({ pageIndex: 2 });

      expect(wrapper.state().pageIndex).toEqual(2);
      expect(wrapper.instance().transitionDirection).toEqual('next');

      // Move to page 1
      wrapper.setProps({ pageIndex: 1 });

      expect(wrapper.state().pageIndex).toEqual(1);
      expect(wrapper.instance().transitionDirection).toEqual('previous');

      // Move to page 3
      wrapper.setProps({ pageIndex: 3 });

      expect(wrapper.state().pageIndex).toEqual(0);
      expect(wrapper.instance().transitionDirection).toEqual('previous');

      // Move to page -1
      wrapper.setProps({ pageIndex: -1 });

      expect(wrapper.state().pageIndex).toEqual(2);
      expect(wrapper.instance().transitionDirection).toEqual('next');

      // Move to page 2
      wrapper.setProps({ pageIndex: 2 });

      expect(wrapper.state().pageIndex).toEqual(2);

      // Undefined pageIndex
      wrapper.setProps({ pageIndex: undefined });

      // Final state
      expect(wrapper.state().pageIndex).toEqual(2);
      expect(wrapper.instance().numOfPages()).toEqual(3);
    });
  });

  describe('numOfPages', () => {
    describe('when one child', () => {
      it('returns 1', () => {
        wrapper = shallow(
          <BasePages theme={ classicTheme } className='foobar' initialPageIndex={ 0 }>
            <Page />
          </BasePages>
        );

        expect(wrapper.instance().numOfPages()).toEqual(1);
      });
    });

    describe('when an array of children', () => {
      it('returns the number of children', () => {
        expect(wrapper.instance().numOfPages()).toEqual(3);
      });
    });
  });

  describe('visiblePage', () => {
    const instance = shallow(
      <BasePages theme={ classicTheme } className='foobar' initialPageIndex={ 0 }>
        <Page title="abc" />
      </BasePages>
    );

    const instancePage = instance.instance().visiblePage();

    it('returns a page instance', () => {
      expect(page.type).toEqual(instancePage.type);
    });

    it('has correct class name', () => {
      expect(instance.find(Page).at(0).dive().props().className).toEqual('carbon-page');
    });

    it('has correct title', () => {
      expect(instance.find(Page).props().title).toEqual('abc');
    });
  });

  describe('on back link click', () => {
    it('decrements the pageIndex', () => {
      wrapper.setProps({ pageIndex: 1 });
      expect(wrapper.state().pageIndex).toEqual(1);
    });

    it('sets the transistion direction to previous', () => {
      wrapper.setProps({ pageIndex: 1 });
      wrapper.setProps({ pageIndex: 0 });
      expect(wrapper.instance().transitionDirection).toEqual('previous');
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(
        <BasePages
          theme={ classicTheme }
          data-element='bar' data-role='baz'
          initialPageIndex={ 0 }
        >
          <Page />
        </BasePages>
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'carousel', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = mount(
        <BasePages theme={ classicTheme } initialPageIndex={ 0 }>
          <Page data-element='page' />
        </BasePages>
      );

      it('should has expected data elements', () => {
        wrapper.find('[data-element="page"]').exists();
        wrapper.find('[data-element="visible-page"]').exists();
      });
    });
  });

  describe('transitionName', () => {
    it('uses a custom name if supplied', () => {
      const wrapper = shallow(
        <BasePages theme={ classicTheme } transition='foo'>
          <Page />
        </BasePages>
      );

      const transitionGroup = wrapper.find(CSSTransitionGroup);
      expect(transitionGroup.props().transitionName).toEqual('carousel-transition-foo');
    });
  });
});
