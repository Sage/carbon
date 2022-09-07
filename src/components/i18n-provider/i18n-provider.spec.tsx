import React from "react";
import { mount } from "enzyme";
import I18nProvider from "./i18n-provider.component";
import useLocale from "../../hooks/__internal__/useLocale";

const TestComponent = () => {
  const l = useLocale();

  return <>{`${l.locale()}-${l.actions.delete()}-${l.actions.edit()}`}</>;
};

describe("I18nProvider", () => {
  it("doesn't use locale", () => {
    const wrapper = mount(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(wrapper.text()).toBe("en-GB-Delete-Edit");
  });

  it("uses locale", () => {
    const wrapper = mount(
      <I18nProvider
        locale={{
          locale: () => "fr-FR",
          actions: { delete: () => "Effacer", edit: () => "Edit" },
        }}
      >
        <TestComponent />
      </I18nProvider>
    );

    expect(wrapper.text()).toBe("fr-FR-Effacer-Edit");
  });
});
