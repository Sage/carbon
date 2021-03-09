import React from "react";
import { mount } from "enzyme";
import i18n from "i18next";
import I18n from "./i18n.component";
import I18next from "../../__spec_helper__/I18next";

describe("I18n", () => {
  it("return default value", () => {
    const defaultValue = "Default translation";
    const wrapper = mount(<I18n params={["test", { defaultValue }]} />, {
      wrappingComponent: I18next,
    });

    expect(wrapper.text()).toBe(defaultValue);
  });

  it("return key", () => {
    const key = "test";
    const wrapper = mount(<I18n params={[key]} />, {
      wrappingComponent: I18next,
    });

    expect(wrapper.text()).toBe(key);
  });

  it("return translation", () => {
    const resources = {
      testValue: "test value",
    };
    i18n.addResourceBundle("en", "carbon", resources);

    const wrapper = mount(<I18n params={["testValue"]} />, {
      wrappingComponent: I18next,
    });

    expect(wrapper.text()).toBe(resources.testValue);
  });
});
