import React from "react";
import { render, screen } from "@testing-library/react";

import SimpleColor from "./simple-color.component";
import guid from "../../../__internal__/utils/helpers/guid";
import Logger from "../../../__internal__/utils/logger";

const mockedGuid = "guid-12345";
jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

test("has the correct data-component tag", () => {
  render(<SimpleColor value="#0073C2" data-role="test-example" />);

  // the data tags get passed to both the wrapping div and the input inside, so just getByTestId errors due to there being more
  // than one element found. The data-component tag is only on the div so we can't use getByRole - so the only way is to use
  // getAllByTestId and take the first element
  expect(screen.getAllByTestId("test-example")[0]).toHaveAttribute(
    "data-component",
    "simple-color",
  );
});

test("accepts data values passed as a props", () => {
  render(
    <SimpleColor
      value="#0073C2"
      data-element="custom-element"
      data-role="custom-role"
    />,
  );

  expect(screen.getAllByTestId("custom-role")[0]).toHaveAttribute(
    "data-element",
    "custom-element",
  );
});

test("renders a white icon when the background color is dark", () => {
  render(<SimpleColor checked value="#000000" />);

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYang100)",
    { modifier: "::before" },
  );
});

test("renders a black icon when the background color is light", () => {
  render(<SimpleColor checked value="#ffffff" />);

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYin090)",
    { modifier: "::before" },
  );
});

test("assigns a guid as id to the input element when the `id` prop is not passed", () => {
  render(<SimpleColor value="#0073C2" />);

  expect(screen.getByRole("radio")).toHaveAttribute("id", mockedGuid);
});

test("throws a deprecation warning if the 'className' prop is set", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});
  render(<SimpleColor value="#0073C2" className="foo" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'className' prop has been deprecated and will soon be removed from the 'SimpleColor' component.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);

  loggerSpy.mockRestore();
});
