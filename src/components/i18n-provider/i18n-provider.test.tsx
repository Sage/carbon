import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../__spec_helper__/__internal__/test-utils";

import I18nProvider from "./i18n-provider.component";
import useLocale from "../../hooks/__internal__/useLocale";
import { deDE, enCA, enUS, esES, frCA, frFR } from "../../locales";
import Loader from "../loader";

const TestComponent = () => {
  const l = useLocale();

  return (
    <>
      <Loader />
      {l.locale()}
    </>
  );
};

it("defaults to the 'en-gb' locale when no other locale is specified", () => {
  render(
    <I18nProvider>
      <TestComponent />
    </I18nProvider>,
  );

  const localeText = screen.getByText("en-GB");
  expect(localeText).toBeInTheDocument();
});

it("should support overriding the default locale with 'de-DE'", () => {
  render(
    <I18nProvider locale={deDE}>
      <TestComponent />
    </I18nProvider>,
  );

  const localeText = screen.getByText("de-DE");
  expect(localeText).not.toHaveTextContent("en-GB");
});

it("should support overriding the default locale with 'en-CA'", () => {
  render(
    <I18nProvider locale={enCA}>
      <TestComponent />
    </I18nProvider>,
  );

  const localeText = screen.getByText("en-CA");
  expect(localeText).not.toHaveTextContent("en-GB");
});

it("should support overriding the default locale with 'en-US'", () => {
  render(
    <I18nProvider locale={enUS}>
      <TestComponent />
    </I18nProvider>,
  );

  const localeText = screen.getByText("en-US");
  expect(localeText).not.toHaveTextContent("en-GB");
});

it("should support overriding the default locale with 'es-ES'", () => {
  render(
    <I18nProvider locale={esES}>
      <TestComponent />
    </I18nProvider>,
  );

  const localeText = screen.getByText("es-ES");
  expect(localeText).not.toHaveTextContent("en-GB");
});

it("should support overriding the default locale with 'fr-CA'", () => {
  render(
    <I18nProvider locale={frCA}>
      <TestComponent />
    </I18nProvider>,
  );

  const localeText = screen.getByText("fr-CA");
  expect(localeText).not.toHaveTextContent("en-GB");
});

it("should support overriding the default locale with 'fr-FR'", () => {
  render(
    <I18nProvider locale={frFR}>
      <TestComponent />
    </I18nProvider>,
  );

  const localeText = screen.getByText("fr-FR");
  expect(localeText).not.toHaveTextContent("en-GB");
});

it("should support overriding the default locale with a spread locale object", () => {
  render(
    <I18nProvider
      locale={{
        ...frFR,
        loader: {
          loading: () => "foo",
        },
      }}
    >
      <TestComponent />
    </I18nProvider>,
  );

  const localeText = screen.getByText("fr-FR");
  const loaderText = screen.getByText("foo");
  expect(localeText).not.toHaveTextContent("en-GB");
  expect(loaderText).toBeInTheDocument();
});
