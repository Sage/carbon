import React from "react";
import { mount, ReactWrapper } from "enzyme";

import Alert from ".";
import guid from "../../__internal__/utils/helpers/guid";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { StyledDialog } from "../dialog/dialog.style";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345"
);

// mock Logger.deprecate so that Typography (used for the alert dialog's heading) doesn't trigger a warning while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

describe("Alert", () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
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

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  it("include correct component, element and role data tags", () => {
    const alert = wrapper.find(Alert).first();
    expect(alert.prop("data-element")).toEqual("bar");
    expect(alert.prop("data-role")).toEqual("baz");
  });

  it("has the expected border radius styling", () => {
    assertStyleMatch(
      { borderRadius: "var(--borderRadius200)" },
      wrapper.find(StyledDialog)
    );
  });
});
