import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import ActionToolbar from './action-toolbar.component.js';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';

describe('action toolbar', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<ActionToolbar actions={ { foo: {}, bar: {} } } className='foo' />);
  });

  describe('componentWillMount', () => {
    describe('if attachActionToolbar exists', () => {
      it('calls attachActionToolbar', () => {
        const spy = jasmine.createSpy();
        instance.context = {
          attachActionToolbar: spy
        };
        instance.componentWillMount();
        expect(spy).toHaveBeenCalledWith(instance);
      });
    });

    describe('if attachActionToolbar does not exist', () => {
      it('calls does not fail', () => {
        expect(instance.componentWillMount()).toBe(undefined);
      });
    });
  });

  describe('componentWillUnmount', () => {
    describe('if detachActionToolbar exists', () => {
      it('calls detachActionToolbar', () => {
        const spy = jasmine.createSpy();
        instance.context = {
          detachActionToolbar: spy
        };
        instance.componentWillUnmount();
        expect(spy).toHaveBeenCalledWith(instance);
      });
    });

    describe('if detachActionToolbar does not exist', () => {
      it('calls does not fail', () => {
        expect(instance.componentWillUnmount()).toBe(undefined);
      });
    });
  });

  describe('buildAction', () => {
    it('returns a link with props', () => {
      const spy = jasmine.createSpy('onClick');
      const event = jasmine.createSpy('event');
      instance.setState({ selected: true });
      const action = instance.buildAction(
        {
          onClick: (event, selected) => {
            spy(selected, event);
          },
          text: 'foo',
          className: 'bar'
        },
        1
      );
      expect(action.props.className).toEqual('bar');
      expect(action.props.children).toEqual('foo');
      action.props.onClick(event);
      expect(spy).toHaveBeenCalledWith(event, instance.state.selected);
    });
  });

  describe('actions', () => {
    it('returns an array of links', () => {
      expect(instance.actions().length).toEqual(2);
    });
  });

  describe('isActive', () => {
    it('returns true when total is greater than 0', () => {
      instance.setState({ total: 1 });
      expect(instance.isActive()).toBeTruthy();
    });

    it('returns false when total is equal to 0', () => {
      instance.setState({ total: 0 });
      expect(instance.isActive()).toBeFalsy();
    });
  });

  describe('children', () => {
    it('calls children prop if present', () => {
      const childFunction = jest.fn(() => {
        return <div>foo</div>;
      });

      shallow(<ActionToolbar actions={ {} }>{childFunction}</ActionToolbar>);

      expect(childFunction).toHaveBeenCalledWith({
        disabled: true,
        selected: {},
        total: 0
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(<ActionToolbar
        actions={ {} } data-element='bar'
        data-role='baz'
      />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'action-toolbar', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = shallow(<ActionToolbar actions={ { foo: 'bar' } } />);

      elementsTagTest(wrapper, ['action', 'total']);
    });
  });
});
