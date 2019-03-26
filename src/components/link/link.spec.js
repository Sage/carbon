import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { Link as RouterLink } from 'react-router';
import Link from './link.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

const render = (props) => {
  return TestRenderer.create(<Link { ...props }>test</Link>);
};

describe('Link', () => {
  let wrapper;

  beforeEach(() => {
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    wrapper = shallow(<Link>test</Link>);
  });

  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });


  it('if `disabled` prop has been passed to the component', () => {
    assertStyleMatch({
      cursor: 'not-allowed'
    }, render({ disabled: true }).toJSON());
  });

  describe('should render a correct component based on prop', () => {
    it('if prop `href` has been passed to the component it should render `<a>`', () => {
      wrapper.setProps({ href: '#' });

      expect(wrapper.find('a')).toHaveLength(1);
    });

    it('if prop `to` has been passed to the component it should render `<Link />`', () => {
      wrapper.setProps({ to: 'route' });

      expect(wrapper.find(RouterLink)).toHaveLength(1);
    });
  });

  describe('should render an icon if prop `icon` has been passed to the component', () => {
    beforeEach(() => {
      wrapper.setProps({ icon: 'basket' });
    });

    it('the `Icon` rendered', () => {
      expect(wrapper.find('Icon').props().type).toEqual('basket');
    });

    it('default align of the icon should be left', () => {
      expect(wrapper.find('Icon').hasClass('carbon-link__icon--align-left')).toEqual(true);
    });

    it('if `iconAlign` prop is `right` then the icon should render on the right side of the component', () => {
      wrapper.setProps({ iconAlign: 'right' });

      expect(wrapper.find('Icon').hasClass('carbon-link__icon--align-right')).toEqual(true);
    });
  });

  describe('should generate correct events when `onKeyDown` prop has been passed to the component', () => {
    it('if prop `onClick` has been passed to the component', () => {
      const spy = jest.fn();
      wrapper.setProps({ onClick: spy, to: 'testRoute', onKeyDown: spy });
      wrapper.find(RouterLink).simulate('keydown', { keyCode: 13 });

      expect(spy).toHaveBeenCalled();
    });

    it('if prop `href` has been passed to the component', () => {
      const spy = jest.fn();
      wrapper.setProps({ href: '#', onClick: spy });
      wrapper.find('a').simulate('keydown', { which: 13 });

      expect(spy).not.toHaveBeenCalled();
    });

    it('if prop `to` has been passed to the component', () => {
      const spy = jest.fn();
      wrapper.setProps({ to: 'testRoute', onClick: spy });
      wrapper.find(RouterLink).simulate('keydown', { which: 13 });

      expect(spy).toHaveBeenCalled();
    });

    it('if prop `to` has been passed to the component but there was not `onClick` prop', () => {
      const spy = jest.fn();
      wrapper.setProps({ to: 'testRoute', onKeyDown: spy });
      wrapper.find(RouterLink).simulate('keydown', { which: 13 });

      expect(spy).toHaveBeenCalled();
    });
  });
});
