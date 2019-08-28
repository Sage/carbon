import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { Link as RouterLink } from 'react-router';
import Link from './link.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';
import { LinkStyleAnchor } from './link.style';
import { StyledIcon } from '../icon/icon.style';

function renderLink(props, renderer = mount) {
  return renderer(<Link { ...props }>Link Component</Link>);
}

const render = (props) => {
  return TestRenderer.create(<Link { ...props }>test</Link>);
};

describe('Link', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderLink({});
  });

  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  describe('when component has classic theme', () => {
    it('should render correct style', () => {
      expect(render({ theme: classicTheme })).toMatchSnapshot();
    });
  });

  describe('when component received a `disabled` prop', () => {
    it('should matches the expected style', () => {
      assertStyleMatch({
        cursor: 'not-allowed'
      }, render({ disabled: true }).toJSON());
    });
  });

  describe('when component received a `href` prop', () => {
    it('should render an `<a>` element', () => {
      wrapper.setProps({ href: '#' });

      expect(wrapper.find('a')).toHaveLength(1);
    });
  });

  describe('when component received a `to` prop', () => {
    it('should render a `<RouterLink />` element', () => {
      wrapper.setProps({ to: 'route' });

      expect(wrapper.find(RouterLink)).toHaveLength(1);
    });
  });

  describe('when component received an `icon` prop', () => {
    beforeEach(() => {
      wrapper.setProps({ icon: 'basket' });
    });

    it('should render an `Icon` correctly with the `basket` value', () => {
      expect(wrapper.find('Icon').props().type).toEqual('basket');
    });

    it('should render an `Icon` on the left side of the component by default', () => {
      assertStyleMatch({
        marginRight: '5px',
        position: 'relative'
      }, TestRenderer.create(wrapper.find(LinkStyleAnchor)).toJSON(), { modifier: `${StyledIcon}` });
    });

    it('should render an `Icon` on the right', () => {
      wrapper.setProps({ iconAlign: 'right' });
      assertStyleMatch({
        marginRight: '0',
        marginLeft: '5px',
        position: 'relative'

      }, TestRenderer.create(wrapper.find(LinkStyleAnchor)).toJSON(), { modifier: `${StyledIcon}` });
    });
  });

  describe('when the `onKeyDown` event is triggered', () => {
    let onClickFn;
    let onKeyDownFn;

    beforeEach(() => {
      onClickFn = jest.fn();
      onKeyDownFn = jest.fn();
    });

    it('should trigger an `onKeyDown` prop', () => {
      wrapper.setProps({ to: 'testRoute', onKeyDown: onKeyDownFn });
      wrapper.find(RouterLink).simulate('keydown', { keyCode: 13 });

      expect(onKeyDownFn).toHaveBeenCalled();
    });

    describe('and a `href` prop has been received', () => {
      it('should not trigger `onClick` prop', () => {
        wrapper.setProps({ href: '#', onKeyDown: onKeyDownFn, onClick: onClickFn });
        wrapper.find('a').simulate('keydown', { which: 13 });

        expect(onClickFn).not.toHaveBeenCalled();
      });
    });

    describe('and a `to` props has been recevied', () => {
      it('should trigger `onClick` prop', () => {
        wrapper.setProps({ to: 'testRoute', onClick: onClickFn });
        wrapper.find(RouterLink).simulate('keydown', { which: 13 });

        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe('and component received a `to` prop but a `onClick` props is not available', () => {
      beforeEach(() => {
        wrapper.setProps({ to: 'testRoute', onKeyDown: onKeyDownFn });
        wrapper.find(RouterLink).simulate('keydown', { which: 13 });
      });

      it('should trigger `onKeyDown` prop', () => {
        expect(onKeyDownFn).toHaveBeenCalled();
      });

      it('should not trigger an `onClick` prop', () => {
        expect(onClickFn).not.toHaveBeenCalled();
      });
    });
  });
});
