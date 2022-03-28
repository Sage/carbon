import React from "react";
import { mount, ReactWrapper } from "enzyme";

import Alert from ".";
import guid from "../../__internal__/utils/helpers/guid";

jest.mock("../../__internal__/utils/helpers/guid");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(guid as jest.MockedFunction<any>).mockImplementation(() => "guid-12345");

describe("Alert", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Alert
        open
        onCancel={() => undefined}
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
