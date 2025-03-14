import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import useLocale from "./index";
import I18nProvider from "../../../components/i18n-provider";

test("when no I18nProvider exists, it should return a translation function that defaults to 'en-GB'", () => {
  const TestComponent = () => {
    const l = useLocale();
    return <span>{l.locale()}</span>;
  };
  render(<TestComponent />);

  expect(screen.getByText("en-GB")).toBeInTheDocument();
});

test("when I18nProvider exists, it should return a translation function that provides customized translations", () => {
  const TestComponent = () => {
    const l = useLocale();
    return <span>{l.message.closeButtonAriaLabel()}</span>;
  };
  render(
    <I18nProvider
      locale={{
        locale: () => "en-GB",
        message: {
          info: () => "Information",
          success: () => "Success",
          warning: () => "Warning",
          neutral: () => "Neutral",
          error: () => "Error",
          closeButtonAriaLabel: () => "test",
        },
      }}
    >
      <TestComponent />
    </I18nProvider>,
  );

  expect(screen.getByText("test")).toBeInTheDocument();
});
