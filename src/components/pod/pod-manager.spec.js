import React from "react";
import { mount } from "enzyme";
import PodManager from "./pod-manager.component";
import Pod from "./pod.component";

describe("MultiPodWrapper", () => {
  let wrapper;

  it("should render correctly", () => {
    wrapper = mount(
      <PodManager>
        <Pod>test</Pod>
      </PodManager>
    );

    expect(wrapper.find(Pod).exists()).toBe(true);
  });
});
