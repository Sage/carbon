import React from "react";
import { mount } from "enzyme";

import useLocale from "./index";
import I18nProvider from "../../../components/i18n-provider";

describe("useLocale custom hook", () => {
  it("when no I18nProvider exists should return a translation function", () => {
    const TestComponent = () => {
      const l = useLocale();
      return <span>{l.locale}</span>;
    };
    const wrapper = mount(<TestComponent />);

    expect(wrapper.find("span").text()).toEqual("en-GB");
  });

  it("when I18nProvider exists should return a translation function", () => {
    const TestComponent = () => {
      const l = useLocale();
      return <span>{l.test}</span>;
    };
    const wrapper = mount(
      <I18nProvider
        locale={{
          locale: "en-GB",
          test: "test",
        }}
      >
        <TestComponent />
      </I18nProvider>
    );

    expect(wrapper.find("span").text()).toEqual("test");
  });
});
