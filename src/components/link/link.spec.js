import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import TestRenderer from 'react-test-renderer';
import { Link as RouterLink } from 'react-router';
import Link from './link.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

function renderLink(props, renderer = shallow) {
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

  it('matches the expected style if `disabled` prop has been passed to the component', () => {
    assertStyleMatch({
      cursor: 'not-allowed'
    }, render({ disabled: true }).toJSON());
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
      expect(wrapper.find('Icon').hasClass('carbon-link__icon--align-left')).toEqual(true);
    });

    describe('and component recevied an `iconAlign: right` prop', () => {
      it('should render an `Icon` on the right side of the component', () => {
        wrapper.setProps({ iconAlign: 'right' });

        expect(wrapper.find('Icon').hasClass('carbon-link__icon--align-right')).toEqual(true);
      });
    });
  });

  describe('when component received an `onKeyDown` prop', () => {
    let spy;

    beforeEach(() => {
      spy = jest.fn();
    });

    describe('and an `onClick` prop has been received', () => {
      it('should `RouterLink` be clickable', () => {
        wrapper.setProps({ onClick: spy, to: 'testRoute', onKeyDown: spy });
        wrapper.find(RouterLink).simulate('keydown', { keyCode: 13 });

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('and a `href` prop has been received', () => {
      it('should `a` be clickable', () => {
        wrapper.setProps({ href: '#', onClick: spy });
        wrapper.find('a').simulate('keydown', { which: 13 });

        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('and a `to` props has been recevied', () => {
      it('should `RouterLink` be clickable', () => {
        wrapper.setProps({ to: 'testRoute', onClick: spy });
        wrapper.find(RouterLink).simulate('keydown', { which: 13 });

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('and component received a `to` prop but a `onClick` props is not available', () => {
      it('should `RouterLink be clickable` correctly', () => {
        wrapper.setProps({ to: 'testRoute', onKeyDown: spy });
        wrapper.find(RouterLink).simulate('keydown', { which: 13 });

        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
