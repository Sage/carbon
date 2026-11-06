import React from "react";
import { render, screen } from "@testing-library/react";
import RequiredFieldsIndicator from ".";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

describe("RequiredFieldsIndicator", () => {
  it("renders its children with the required-fields-indicator data-component tag", () => {
    render(
      <RequiredFieldsIndicator>
        Indicates required information
      </RequiredFieldsIndicator>,
    );

    expect(screen.getByText("Indicates required information")).toHaveAttribute(
      "data-component",
      "required-fields-indicator",
    );
  });

  it.each([
    [undefined, "DIV"],
    ["span", "SPAN"],
  ] as const)("renders as the `%s` element type", (as, tagName) => {
    render(
      <RequiredFieldsIndicator as={as}>
        Indicates required information
      </RequiredFieldsIndicator>,
    );

    expect(screen.getByText("Indicates required information").tagName).toBe(
      tagName,
    );
  });

  testStyledSystemMargin(
    (props) => (
      <RequiredFieldsIndicator data-role="required-fields" {...props}>
        children
      </RequiredFieldsIndicator>
    ),
    () => screen.getByTestId("required-fields"),
  );
});
