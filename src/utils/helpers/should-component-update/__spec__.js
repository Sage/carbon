import shouldComponentUpdate from "./should-component-update";
import Immutable from "immutable";
import { cloneDeep } from "lodash";

describe("shouldComponentUpdate", () => {
  let instance, nextProps, nextState;

  describe("plain objects", () => {
    beforeEach(() => {
      instance = {
        props: {
          foo: "foo",
          bar: "bar",
        },
        state: {
          foo: "foo",
          bar: "bar",
        },
      };
    });

    describe("two plain objects that are the same", () => {
      it("comparison to return false", () => {
        nextProps = cloneDeep(instance.props);
        nextState = cloneDeep(instance.state);
        expect(
          shouldComponentUpdate(instance, nextProps, nextState)
        ).toBeFalsy();
      });
    });

    describe("two plain objects that have different props", () => {
      it("comparison to return true", () => {
        nextProps = cloneDeep(instance.props);
        nextState = cloneDeep(instance.state);
        nextProps.foo = "not foo";
        expect(
          shouldComponentUpdate(instance, nextProps, nextState)
        ).toBeTruthy();
      });
    });

    describe("two plain objects that have different state", () => {
      it("comparison to return true", () => {
        nextProps = cloneDeep(instance.props);
        nextState = cloneDeep(instance.state);
        nextState.foo = "not foo";
        expect(
          shouldComponentUpdate(instance, nextProps, nextState)
        ).toBeTruthy();
      });
    });
  });

  describe("objects with immutable props", () => {
    beforeEach(() => {
      instance = {
        props: Immutable.fromJS([{ foo: "foo" }]),
        state: "foo",
      };
    });

    describe("two objects which contain unchanged immutable data", () => {
      it("comparison to return false", () => {
        nextProps = instance.props;
        nextState = instance.state;
        nextProps = instance.props.setIn([0, "foo"], "foo");
        expect(
          shouldComponentUpdate(instance, nextProps, nextState)
        ).toBeFalsy();
      });
    });

    describe("two objects which contain changed immutable data", () => {
      it("comparison to return true", () => {
        nextProps = instance.props;
        nextState = instance.state;
        nextProps = instance.props.setIn([0, "foo"], "not foo");
        expect(
          shouldComponentUpdate(instance, nextProps, nextState)
        ).toBeTruthy();
      });
    });
  });
});
