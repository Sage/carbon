import React from "react";
import { mount } from "enzyme";

import Alert from ".";
import guid from "../../utils/helpers/guid";

jest.mock("../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

describe("Alert", () => {
  let wrapper;
  let onCancel;

  beforeEach(() => {
    onCancel = jasmine.createSpy("cancel");

    wrapper = mount(
      <Alert
        open
        onCancel={onCancel}
        title="Alert title"
        subtitle="Alert Subtitle"
        data-element="bar"
        data-role="baz"
      />
    );
  });

  it("include correct component, element and role data tags", () => {
    const alert = wrapper.find(Alert).first();
    expect(alert.prop("data-element")).toEqual("bar");
    expect(alert.prop("data-role")).toEqual("baz");
  });
});
