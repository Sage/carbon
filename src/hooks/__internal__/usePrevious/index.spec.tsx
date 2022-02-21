import React from "react";
import { mount } from "enzyme";
import usePrevious from "./index";

interface MockComponentProps {
  value: string;
}
const MockComponent = ({ value }: MockComponentProps) => {
  const prev = usePrevious(value);
  return (
    <>
      <span data-element="current" data-value={value} />
      <span data-element="previous" data-value={prev} />
    </>
  );
};

const render = (props: MockComponentProps) =>
  mount(<MockComponent {...props} />);

describe("usePrevious", () => {
  it("returns undefined on first render", () => {
    const wrapper = render({ value: "foo" });
    const previous = wrapper
      .find("[data-element='previous']")
      .prop("data-value");
    expect(previous).toBeUndefined();
  });

  it("when value changes, return the previous value", () => {
    const wrapper = render({ value: "foo" });
    expect(wrapper.find("[data-element='current']").prop("data-value")).toBe(
      "foo"
    );

    wrapper.setProps({ value: "bar" });

    expect(wrapper.find("[data-element='current']").prop("data-value")).toBe(
      "bar"
    );

    expect(wrapper.find("[data-element='previous']").prop("data-value")).toBe(
      "foo"
    );
  });
});
