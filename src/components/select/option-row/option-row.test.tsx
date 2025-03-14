import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import OptionRow from "./option-row.component";
import SelectListContext from "../__internal__/select-list/select-list.context";
import guid from "../../../__internal__/utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

test("renders with children content visible", () => {
  render(
    <table>
      <tbody>
        <OptionRow value="1" text="foo">
          <td>bar</td>
        </OptionRow>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("option", { name: "bar" })).toBeVisible();
});

test("should not render when hidden prop is set", () => {
  render(
    <table>
      <tbody>
        <OptionRow value="1" text="foo" hidden>
          <td>bar</td>
        </OptionRow>
      </tbody>
    </table>,
  );

  expect(screen.queryByRole("option", { name: "bar" })).not.toBeInTheDocument();
});

test("should set guid as `id` on the element when none passed", () => {
  render(
    <table>
      <tbody>
        <OptionRow value="1" text="foo">
          <td>bar</td>
        </OptionRow>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("option", { name: "bar" })).toHaveAttribute(
    "id",
    mockedGuid,
  );
});

test("should set custom `id` on the element when passed", () => {
  render(
    <table>
      <tbody>
        <OptionRow id="foo" value="1" text="bar">
          <td>baz</td>
        </OptionRow>
      </tbody>
    </table>,
  );

  expect(screen.getByRole("option", { name: "baz" })).toHaveAttribute(
    "id",
    "foo",
  );
});

describe("when `disabled` prop is set", () => {
  it("should have expected style", () => {
    render(
      <table>
        <tbody>
          <OptionRow value="1" text="foo" disabled>
            <td>bar</td>
          </OptionRow>
        </tbody>
      </table>,
    );
    const optionRow = screen.getByRole("option", { name: "bar" });

    expect(optionRow).toHaveStyleRule("color", "var(--colorsUtilityYin030)");
    expect(optionRow).toHaveStyle("cursor: not-allowed");
  });

  it("should render with aria-disabled attribute set to true", () => {
    render(
      <table>
        <tbody>
          <OptionRow value="1" text="foo" disabled>
            <td>bar</td>
          </OptionRow>
        </tbody>
      </table>,
    );
    const optionRow = screen.getByRole("option", { name: "bar" });

    expect(optionRow).toHaveAttribute("aria-disabled", "true");
  });

  it("should not call onSelect when the user clicks on the element", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <table>
        <tbody>
          <OptionRow value="1" text="foo" disabled onSelect={onSelect}>
            <td>bar</td>
          </OptionRow>
        </tbody>
      </table>,
    );
    const optionRow = screen.getByRole("option", { name: "bar" });
    await user.click(optionRow);

    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe("when `disabled` prop is not set", () => {
  it("should have expected style", () => {
    render(
      <table>
        <tbody>
          <OptionRow value="1" text="foo">
            <td>bar</td>
          </OptionRow>
        </tbody>
      </table>,
    );
    const optionRow = screen.getByRole("option", { name: "bar" });

    expect(optionRow).not.toHaveStyleRule(
      "color",
      "var(--colorsUtilityYin030)",
    );
    expect(optionRow).toHaveStyle("cursor: pointer");
  });

  it("should not have aria-disabled attribute set", () => {
    render(
      <table>
        <tbody>
          <OptionRow value="1" text="foo">
            <td>bar</td>
          </OptionRow>
        </tbody>
      </table>,
    );
    const optionRow = screen.getByRole("option", { name: "bar" });

    expect(optionRow).not.toHaveAttribute("aria-disabled");
  });

  it("should call `onSelect` when the user clicks on the element and custom `id` set", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <table>
        <tbody>
          <OptionRow id="foo" text="bar" value="baz" onSelect={onSelect}>
            <td>bar</td>
          </OptionRow>
        </tbody>
      </table>,
    );
    const optionRow = screen.getByRole("option", { name: "bar" });
    await user.click(optionRow);

    expect(onSelect).toHaveBeenCalledWith({
      id: "foo",
      text: "bar",
      value: "baz",
    });
  });

  it("should call `onSelect` when the user clicks on the element and custom `id` not set", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <table>
        <tbody>
          <OptionRow text="bar" value="baz" onSelect={onSelect}>
            <td>bar</td>
          </OptionRow>
        </tbody>
      </table>,
    );
    const optionRow = screen.getByRole("option", { name: "bar" });
    await user.click(optionRow);

    expect(onSelect).toHaveBeenCalledWith({
      id: mockedGuid,
      text: "bar",
      value: "baz",
    });
  });
});

test("should render with `data-` attributes set when props are passed", () => {
  render(
    <table>
      <tbody>
        <OptionRow value="1" text="foo" data-element="bar" data-role="baz">
          <td>bar</td>
        </OptionRow>
      </tbody>
    </table>,
  );
  const optionRow = screen.getByRole("option", { name: "bar" });

  expect(optionRow).toHaveAttribute("data-component", "option-row");
  expect(optionRow).toHaveAttribute("data-element", "bar");
  expect(optionRow).toHaveAttribute("data-role", "baz");
});

describe("when the `multiSelectValues` list is passed via context", () => {
  it("should set aria-selected to true when the value is in the list", () => {
    render(
      <SelectListContext.Provider value={{ multiselectValues: ["1"] }}>
        <table>
          <tbody>
            <OptionRow id="1" value="1" text="foo">
              <td>foo</td>
            </OptionRow>
          </tbody>
        </table>
      </SelectListContext.Provider>,
    );

    expect(screen.getByRole("option", { name: "foo" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("should set aria-selected to false when the value is not in the list", () => {
    render(
      <SelectListContext.Provider value={{ multiselectValues: ["2"] }}>
        <table>
          <tbody>
            <OptionRow id="1" value="1" text="foo">
              <td>foo</td>
            </OptionRow>
          </tbody>
        </table>
      </SelectListContext.Provider>,
    );

    expect(screen.getByRole("option", { name: "foo" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("should set aria-selected to false when the list is empty", () => {
    render(
      <SelectListContext.Provider value={{ multiselectValues: [] }}>
        <table>
          <tbody>
            <OptionRow id="1" value="1" text="foo">
              <td>foo</td>
            </OptionRow>
          </tbody>
        </table>
      </SelectListContext.Provider>,
    );

    expect(screen.getByRole("option", { name: "foo" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });
});
