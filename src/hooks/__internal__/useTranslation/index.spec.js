import React from "react";
import { mount } from "enzyme";

import useTranslation from "./index";
import I18nProvider from "../../../components/I18nProvider";

describe("useTranslation custom hook", () => {
  it("when no I18nProvider exists should throw an error", () => {
    const TestComponent = () => {
      useTranslation();
      return null;
    };

    try {
      mount(<TestComponent />);
    } catch (error) {
      expect(error.message).toBe("No I18nProvider exists.");
    }
  });

  it("when I18nProvider exists should return translation function", () => {
    const TestComponent = () => {
      const t = useTranslation();
      return <span>{t("test")}</span>;
    };
    const wrapper = mount(
      <I18nProvider t={(str) => str}>
        <TestComponent />
      </I18nProvider>
    );

    expect(wrapper.find("span").text()).toEqual("test");
  });
});
