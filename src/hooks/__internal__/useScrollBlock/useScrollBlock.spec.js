import React, { useEffect } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import useScrollBlock from ".";

const TestComponent = () => {
  const { blockScroll, allowScroll } = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => {
      allowScroll();
    };
  }, [allowScroll, blockScroll]);
  return <div id="observed-node" />;
};

describe("useScrollBlock", () => {
  beforeEach(() => {
    window.innerWidth = 200;
    jest
      .spyOn(document.documentElement, "clientWidth", "get")
      .mockImplementation(() => 180);
  });

  afterEach(() => {
    window.innerWidth = 1024;
    jest.resetAllMocks();
  });

  it("sets proper styles on the documentElement and body element on mount and resets them on unmount", () => {
    const wrapper = mount(<TestComponent />);
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.documentElement.style.position).toBe("relative");
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.position).toBe("relative");
    expect(document.body.style.paddingRight).toBe("20px");
    act(() => {
      wrapper.unmount();
    });
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.documentElement.style.position).toBe("");
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.position).toBe("");
    // Unable to test if `paddingRight` reset due to bug in JSDOM
    // https://github.com/jsdom/jsdom/issues/2504
    // expect(document.body.style.paddingRight).toBe("");
  });
});
