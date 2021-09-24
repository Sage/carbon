import React from "react";
import { mount } from "enzyme";
import ValidationMessage from ".";

const render = (props) => mount(<ValidationMessage {...props} />);

describe("ValidationMessage component", () => {
  let wrapper;

  it("renders message correctly when error prop is passed", () => {
    wrapper = render({ error: "Validation Error" });
    expect(wrapper.text()).toEqual("Validation Error");
  });

  it("renders message correctly when warning prop is passed", () => {
    wrapper = render({ warning: "Validation Warning" });
    expect(wrapper.text()).toEqual("Validation Warning");
  });

  it("renders message correctly when info prop is passed", () => {
    wrapper = render({ info: "Validation Info" });
    expect(wrapper.text()).toEqual("Validation Info");
  });

  it("does not render message when passed props are booleans", () => {
    wrapper = render({ info: true, warning: true, error: true });
    expect(wrapper.text()).toEqual("");
  });

  it("does not render message when no props passed", () => {
    wrapper = render();
    expect(wrapper.text()).toEqual("");
  });
});
