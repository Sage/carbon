import React from "react";
import TestRenderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import { render, screen } from "@testing-library/react";
import OptionGroupHeader, { OptionGroupHeaderProps } from ".";
import guid from "../../../__internal__/utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../../../__internal__/utils/helpers/guid");

(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderOption(props: OptionGroupHeaderProps, renderer: any = shallow) {
  return renderer(<OptionGroupHeader {...props} />);
}

describe("OptionGroupHeader", () => {
  it("renders properly", () => {
    const props = { label: "Heading" };
    expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
  });

  describe("when icon prop is set", () => {
    it("then it should display the icon", () => {
      const props = { label: "Heading", icon: "individual" as const };
      expect(renderOption(props, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      const wrapper = mount(
        <OptionGroupHeader
          label="Heading"
          data-component="foo"
          data-element="bar"
          data-role="baz"
        />
      );

      expect(wrapper.getDOMNode().getAttribute("data-component")).toEqual(
        "foo"
      );
      expect(wrapper.getDOMNode().getAttribute("data-element")).toEqual("bar");
      expect(wrapper.getDOMNode().getAttribute("data-role")).toEqual("baz");
    });
  });
});

test("should not render the icon or label text when children are provided", () => {
  render(
    <OptionGroupHeader label="foo" icon="shop">
      <h2>bar</h2>
    </OptionGroupHeader>
  );

  expect(screen.getByRole("heading", { name: "bar", level: 2 })).toBeVisible();
  expect(
    screen.queryByRole("heading", { name: "foo", level: 4 })
  ).not.toBeInTheDocument();
  expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
});

test("should trigger a console warning when no label or children are provided", () => {
  const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
  render(<OptionGroupHeader />);

  expect(spy).toHaveBeenCalledWith(
    "OptionGroupHeader requires either a label or children to be provided"
  );
  spy.mockRestore();
});
