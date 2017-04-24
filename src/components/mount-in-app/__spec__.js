import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import MountInApp from './';
import TestUtils from 'react-dom/test-utils';

describe('MountInApp', () => {
  let instance, placeholder;

  function renderComponent() {
    placeholder = TestUtils.renderIntoDocument(<div/>);

    instance = mount(<MountInApp targetId="say_hello_here">
      <div>Hello!!</div>
    </MountInApp>);
  }

  describe('if the target element does not exist', () => {
    beforeEach(() => {
      renderComponent();
    });
    it("doesn't mount anything inside of the placeholder", () => {
      expect(placeholder.children.length).toEqual(0);
    });
  });

  describe('if the target element exists', () => {
    beforeEach(() => {
      spyOn(document, 'getElementById').and.callFake((elementId) => {
        return (elementId === 'say_hello_here') ? placeholder : null;
      });

      renderComponent();
    });

    it('mounts the specified children in the placeholder', () => {
      expect(placeholder.children.length).toEqual(1);

      let wrapperDiv = placeholder.children[0];
      expect(wrapperDiv.tagName).toEqual('DIV');
      expect(wrapperDiv.className).toEqual('carbon-mount-in-app');
      expect(wrapperDiv.children.length).toEqual(1);

      let contentDiv = wrapperDiv.children[0];
      expect(contentDiv.tagName).toEqual('DIV');
      expect(contentDiv.textContent).toEqual('Hello!!');
    });

    describe('componentWillUnmount', () => {
      it('removes all children', () => {
        instance.unmount();
        expect(placeholder.children.length).toEqual(0);
      });
    });
  });
});
