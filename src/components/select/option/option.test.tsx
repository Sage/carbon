import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Option from ".";
import SelectListContext from "../__internal__/select-list/select-list.context";
import guid from "../../../__internal__/utils/helpers/guid";

const mockedGuid = "guid-12345";
jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

test("renders with `text` content visible", () => {
  render(
    <ul>
      <Option text="foo" value="1" />
    </ul>,
  );

  expect(screen.getByRole("option", { name: "foo" })).toBeVisible();
});

test("renders with `children` content visible instead of `text` when both are passed", () => {
  render(
    <ul>
      <Option text="foo" value="1">
        bar
      </Option>
    </ul>,
  );

  expect(screen.getByRole("option", { name: "bar" })).toBeVisible();
});

test("does not render when `hidden` prop is set", () => {
  render(
    <ul>
      <Option text="foo" value="1" hidden />
    </ul>,
  );

  expect(screen.queryByRole("option", { name: "foo" })).not.toBeInTheDocument();
});

test("should set the expected `data-` attributes when props passed", () => {
  render(
    <ul>
      <Option text="foo" value="1" data-element="bar" data-role="baz" />
    </ul>,
  );

  const option = screen.getByRole("option", { name: "foo" });

  expect(option).toHaveAttribute("data-component", "option");
  expect(option).toHaveAttribute("data-element", "bar");
  expect(option).toHaveAttribute("data-role", "baz");
});

test("should set guid as `id` on the element when none passed", () => {
  render(
    <ul>
      <Option text="foo" value="1" />
    </ul>,
  );

  expect(screen.getByRole("option", { name: "foo" })).toHaveAttribute(
    "id",
    mockedGuid,
  );
});

test("should set `id` on the element when passed", () => {
  render(
    <ul>
      <Option text="foo" value="1" id="bar" />
    </ul>,
  );

  expect(screen.getByRole("option", { name: "foo" })).toHaveAttribute(
    "id",
    "bar",
  );
});

test("should not render with cursor style pointer when no value or text is passed", () => {
  render(
    <ul>
      <Option>Foo</Option>
    </ul>,
  );

  expect(screen.getByRole("option")).not.toHaveStyle("cursor: pointer");
});

describe("when `disabled` prop is set", () => {
  it("should have expected style", () => {
    render(
      <ul>
        <Option text="foo" value="1" disabled />
      </ul>,
    );
    const option = screen.getByRole("option", { name: "foo" });

    expect(option).toHaveStyleRule("color", "var(--colorsUtilityYin030)");
    expect(option).toHaveStyle("cursor: not-allowed");
  });

  it("should set the aria-disabled attribute to true", () => {
    render(
      <ul>
        <Option text="foo" value="1" disabled />
      </ul>,
    );
    const option = screen.getByRole("option", { name: "foo" });

    expect(option).toHaveAttribute("aria-disabled", "true");
  });

  it("should not call `onSelect` or `onClick` when the user clicks on the element", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const onClick = jest.fn();
    render(
      <ul>
        <Option
          text="foo"
          value="1"
          onClick={onClick}
          onSelect={onSelect}
          disabled
        />
      </ul>,
    );

    await user.click(screen.getByRole("option", { name: "foo" }));

    expect(onSelect).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("when `disabled` prop is not set", () => {
  it("should have expected style", () => {
    render(
      <ul>
        <Option text="foo" value="1" />
      </ul>,
    );
    const option = screen.getByRole("option", { name: "foo" });

    expect(option).not.toHaveStyleRule("color", "var(--colorsUtilityYin030)");
    expect(option).toHaveStyle("cursor: pointer");
  });

  it("should not set the aria-disabled attribute", () => {
    render(
      <ul>
        <Option text="foo" value="1" />
      </ul>,
    );
    const option = screen.getByRole("option", { name: "foo" });

    expect(option).not.toHaveAttribute("aria-disabled");
  });

  it("should call `onSelect` and `onClick` when the user clicks on the element", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const onClick = jest.fn();
    render(
      <ul>
        <Option text="foo" value="1" onClick={onClick} onSelect={onSelect} />
      </ul>,
    );

    await user.click(screen.getByRole("option", { name: "foo" }));

    expect(onSelect).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });

  it("should call `onSelect` when the user clicks on the element with no `onClick` or custom `id` passed", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <ul>
        <Option text="foo" value="bar" onSelect={onSelect} />
      </ul>,
    );

    await user.click(screen.getByRole("option", { name: "foo" }));

    expect(onSelect).toHaveBeenCalledWith({
      text: "foo",
      value: "bar",
      id: mockedGuid,
    });
  });

  it("should call `onSelect` when the user clicks on the element with custom `id` is passed but no `onClick`", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <ul>
        <Option id="foo" text="bar" value="baz" onSelect={onSelect} />
      </ul>,
    );

    await user.click(screen.getByRole("option", { name: "bar" }));

    expect(onSelect).toHaveBeenCalledWith({
      id: "foo",
      text: "bar",
      value: "baz",
    });
  });

  it("should not call onClick and onSelect if both are passed but no value is set", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const onClick = jest.fn();
    const props = { text: "foo", onSelect, onClick };
    render(
      <ul>
        <Option {...props}>Foo</Option>
      </ul>,
    );
    await user.click(screen.getByRole("option"));

    expect(onSelect).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("when the `multiSelectValues` list is passed via context", () => {
  it("should set aria-selected to true when the value is in the list", () => {
    render(
      <SelectListContext.Provider value={{ multiselectValues: ["1"] }}>
        <ul>
          <Option text="foo" value="1" />
        </ul>
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
        <ul>
          <Option text="foo" value="1" />
        </ul>
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
        <ul>
          <Option text="foo" value="1" />
        </ul>
      </SelectListContext.Provider>,
    );

    expect(screen.getByRole("option", { name: "foo" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });
});
