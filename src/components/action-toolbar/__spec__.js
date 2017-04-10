import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ActionToolbar from './action-toolbar';
import { shallow, mount } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/test';
import Link from './../link';

describe('action toolbar', () => {
  let instance, wrapper, mountable;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<ActionToolbar actions={[ {}, {} ]} className='foo' />);

    wrapper = shallow(
      <ActionToolbar
        actions={[ {onClick: () => {}, text: 'myAction', icon: 'add'} ]}
        className='foo'
        data-element='bar'
        data-role='baz'
      />
    );
  });

  describe('componentWillMount', () => {
    describe('if attachActionToolbar exists', () => {
      let spy = jasmine.createSpy(),
          mountable = mount(
            <ActionToolbar
              actions={[ {onClick: () => {}, text: 'myAction', icon: 'add'} ]}
              className='foo'
              element='bar'
              role='baz'
            />,
            { context: { attachActionToolbar: spy} }
          );

      it('calls attachActionToolbar', () => {
        mountable.unmount();
        mountable.mount();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('if attachActionToolbar does not exist', () => {
      mountable = mount(
        <ActionToolbar
          actions={[ {onClick: () => {}, text: 'myAction', icon: 'add'} ]}
          className='foo'
          element='bar'
          role='baz'
        />
      );

      it('calls do not fail', () => {
        expect(mountable.unmount()).toBeTruthy();
      });
    });
  });

  describe('componentWillUnmount', () => {
    describe('if detachActionToolbar exists', () => {
      let spy = jasmine.createSpy(),
          mountable = mount(
            <ActionToolbar
              actions={[ {onClick: () => {}, text: 'myAction', icon: 'add'} ]}
              className='foo'
              element='bar'
              role='baz'
            />,
            { context: { detachActionToolbar: spy} }
          );

      it('calls detachActionToolbar', () => {
        mountable.unmount();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('if detachActionToolbar does not exist', () => {
      mountable = mount(
        <ActionToolbar
          actions={[ {onClick: () => {}, text: 'myAction', icon: 'add'} ]}
          className='foo'
          element='bar'
          role='baz'
        />
      );

      it('calls does not fail', () => {
        expect(mountable.unmount()).toBeTruthy();
      });
    });
  });

  describe('buildAction', () => {
    it('returns a link with props', () => {
      let action = instance.buildAction({
        onClick: () => {},
        text: 'foo',
        className: 'bar'
      }, 1);

      expect(action.props.className).toEqual('carbon-action-toolbar__action bar');
      expect(action.props.children).toEqual('foo');
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

  describe('mainClasses', () => {
    it('returns the correct classes', () => {
      expect(instance.mainClasses()).toEqual('carbon-action-toolbar foo');
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <ActionToolbar
          data-element='bar'
          data-role='baz'
        />
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'action-toolbar', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<ActionToolbar actions={ [ ()=>{} ] } />);

      elementsTagTest(wrapper, [
        'action',
        'total'
      ]);
    });
  });
});
