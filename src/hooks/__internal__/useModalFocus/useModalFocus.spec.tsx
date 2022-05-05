import React, { useState } from "react";
import { mount, ReactWrapper } from "enzyme";

import useModalFocus from "./index";

describe("useModalFocus custom hook", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const TestComponent = () => {
      const [open, setOpen] = useState(false);
      const focusProps = useModalFocus(open);
      return (
        <div {...focusProps} id="container">
          <button type="button" id="button" onClick={() => setOpen(true)}>
            set open state
          </button>
        </div>
      );
    };
    wrapper = mount(<TestComponent />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("the container initially has tabindex 0", () => {
    expect(wrapper.find("div").props().tabIndex).toBe(0);
  });

  it("when open and the wrapper is blurred, the tabindex is removed", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.find("div").props().tabIndex).toBe(0);
    wrapper.find("div").simulate("blur");
    expect(wrapper.find("div").props().tabIndex).toBeUndefined();
  });
});
