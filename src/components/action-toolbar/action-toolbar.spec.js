import React from "react";
import { shallow } from "enzyme";
import ActionToolbar from ".";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs/tags-specs";
import I18next from "../../__spec_helper__/I18next";

describe("action toolbar", () => {
  let instance, spy, wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ActionToolbar actions={{ foo: {}, bar: {} }} className="foo" />,
      { context: {} },
      {
        wrappingComponent: I18next,
      }
    );
    instance = wrapper.instance();
  });

  describe("componentWillMount", () => {
    describe("if attachActionToolbar exists", () => {
      it("calls attachActionToolbar", () => {
        spy = jasmine.createSpy();
        wrapper.setContext({
          attachActionToolbar: spy,
        });
        instance.UNSAFE_componentWillMount();
        expect(spy).toHaveBeenCalledWith(instance);
      });
    });

    describe("if attachActionToolbar does not exist", () => {
      it("calls does not fail", () => {
        expect(instance.UNSAFE_componentWillMount()).toBe(undefined);
      });
    });
  });

  describe("componentWillUnmount", () => {
    describe("if detachActionToolbar exists", () => {
      it("calls detachActionToolbar", () => {
        spy = jasmine.createSpy();
        instance.context = {
          detachActionToolbar: spy,
        };
        instance.componentWillUnmount();
        expect(spy).toHaveBeenCalledWith(instance);
      });
    });

    describe("if detachActionToolbar does not exist", () => {
      it("calls does not fail", () => {
        expect(instance.componentWillUnmount()).toBe(undefined);
      });
    });
  });

  describe("buildAction", () => {
    it("returns a link with props", () => {
      spy = jasmine.createSpy("onClick");
      const actionEvent = jasmine.createSpy("event");
      instance.setState({ selected: true });
      const action = instance.buildAction(
        {
          onClick: (event, selected) => {
            spy(selected, event);
          },
          text: "foo",
          className: "bar",
        },
        1
      );
      expect(action.props.className).toEqual("bar");
      expect(action.props.children).toEqual("foo");
      action.props.onClick(actionEvent);
      expect(spy).toHaveBeenCalledWith(actionEvent, instance.state.selected);
    });
  });

  describe("actions", () => {
    it("returns an array of links", () => {
      expect(instance.actions().length).toEqual(2);
    });
  });

  describe("isActive", () => {
    it("returns true when total is greater than 0", () => {
      instance.setState({ total: 1 });
      expect(instance.isActive()).toBeTruthy();
    });

    it("returns false when total is equal to 0", () => {
      instance.setState({ total: 0 });
      expect(instance.isActive()).toBeFalsy();
    });
  });

  describe("children", () => {
    it("calls children prop if present", () => {
      const childFunction = jest.fn(() => {
        return <div>foo</div>;
      });

      shallow(<ActionToolbar actions={{}}>{childFunction}</ActionToolbar>, {
        wrappingComponent: I18next,
      });

      expect(childFunction).toHaveBeenCalledWith({
        disabled: true,
        selected: {},
        total: 0,
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      it("include correct component, element and role data tags", () => {
        wrapper = shallow(
          <ActionToolbar actions={{}} data-element="bar" data-role="baz" />,
          {
            wrappingComponent: I18next,
          }
        );
        rootTagTest(wrapper, "action-toolbar", "bar", "baz");
      });
    });

    describe("on internal elements", () => {
      wrapper = shallow(<ActionToolbar actions={{ foo: "bar" }} />, {
        wrappingComponent: I18next,
      });

      elementsTagTest(wrapper, ["action", "total"]);
    });
  });
});
