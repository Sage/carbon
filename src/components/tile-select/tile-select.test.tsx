import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TileSelect, { TileSelectProps } from "./tile-select.component";
import { testStyledSystemMarginRTL } from "../../__spec_helper__/__internal__/test-utils";
import TileSelectGroup, {
  TileSelectGroupProps,
} from "./tile-select-group/tile-select-group.component";
import Button from "../button";
import Icon from "../icon";

testStyledSystemMarginRTL(
  (props) => <TileSelect data-role="tile-select-wrapper" {...props} />,
  // we are setting the data- attributes on more than one element
  // FE-6834 raised to address this
  () => screen.getAllByTestId("tile-select-wrapper")[0],
);

testStyledSystemMarginRTL(
  (props) => (
    <TileSelectGroup
      data-role="tile-select-group"
      name="tile-select-group"
      {...props}
    >
      <TileSelect name="test" />
    </TileSelectGroup>
  ),
  () => screen.getByTestId("tile-select-group"),
);

test("the deselect action button is rendered when TileSelect is checked", () => {
  render(<TileSelect checked />);

  expect(screen.getByRole("button")).toBeVisible();
});

test("should disable deselect action button button if `disabled` prop is provided", () => {
  render(<TileSelect checked disabled />);

  expect(screen.getByRole("button")).toBeDisabled();
});

test("component should invoke passed onChange callback", async () => {
  const user = userEvent.setup({ delay: null });
  const onChangeMock = jest.fn();

  render(<TileSelect checked onChange={onChangeMock} id="foo" name="bar" />);

  const actionButtonElement = screen.getByRole("button");
  await user.click(actionButtonElement);

  expect(onChangeMock).toHaveBeenCalledWith({
    target: {
      id: "foo",
      name: "bar",
      value: null,
      checked: false,
    },
  });
});

test("calls onFocus callback if prop is passed and input is focused", async () => {
  const user = userEvent.setup({ delay: null });
  const onFocusMock = jest.fn();

  render(<TileSelect onFocus={onFocusMock} id="foo" name="bar" />);
  await user.click(screen.getByRole("checkbox"));

  expect(onFocusMock).toHaveBeenCalled();
});

test("calls onBlur callback if prop is passed and input is blurred", async () => {
  const user = userEvent.setup({ delay: null });
  const onBlurMock = jest.fn();
  render(<TileSelect onBlur={onBlurMock} id="foo" name="bar" />);

  const TileSelectElement = screen.getByRole("checkbox");
  await user.click(TileSelectElement);
  await user.tab();

  expect(onBlurMock).toHaveBeenCalled();
});

test("renders title element as h3 when title prop is passed as string", () => {
  render(<TileSelect title="Title" />);

  expect(screen.getByRole("heading", { level: 3 })).toBeVisible();
});

test("renders title element as a div when title prop is passed as node", () => {
  render(<TileSelect title={<div>Title</div>} />);

  const titleElement = screen.getByText("Title");
  expect(titleElement).toBeVisible();
});

test("renders subtitle element as h4 when subtitle prop is passed as string", () => {
  render(<TileSelect subtitle="Subtitle" />);

  expect(screen.getByRole("heading", { level: 4 })).toBeVisible();
});

test("renders subtitle element as a div when subtitle prop is passed as node", () => {
  render(<TileSelect subtitle={<div>Subtitle</div>} />);

  const subtitleElement = screen.getByText("Subtitle");

  expect(subtitleElement).toBeVisible();
});

test("renders description element as p when description prop is passed as string", () => {
  render(<TileSelect description="Description" />);

  const descriptionElement = screen.getByText("Description");

  expect(descriptionElement).toBeVisible();
});

test("renders description element as a div when description prop is passed as node", () => {
  render(<TileSelect description={<div>Description</div>} />);

  const descriptionElement = screen.getByText("Description");

  expect(descriptionElement).toBeVisible();
});

test("renders titleAdornment element", () => {
  render(<TileSelect titleAdornment={<div>Adornment</div>} />);

  expect(screen.getByText("Adornment")).toBeVisible();
});

// Required for styling coverage
test("renders actionButtonAdornment with expected styling", () => {
  render(
    <TileSelect
      customActionButton={() => (
        <Button onClick={() => {}} buttonType="tertiary" type="button">
          Reactivate
        </Button>
      )}
      actionButtonAdornment={<Icon type="info" />}
    />,
  );

  expect(screen.getByTestId("deselect-wrapper")).toHaveStyleRule(
    "margin-right: var(--sizing200)",
  );
});

test("clicking the customActionButton invokes the passed onChange callback", async () => {
  const user = userEvent.setup({ delay: null });
  const onChangeMock = jest.fn();

  render(
    <TileSelect
      onChange={onChangeMock}
      checked
      id="id"
      name="name"
      customActionButton={(onClick) => (
        <Button
          onClick={() => {
            onClick();
          }}
          aria-label="custom-action-button"
          iconType="close"
        />
      )}
    />,
  );

  const actionButtonElement = screen.getByRole("button", {
    name: "custom-action-button",
  });
  await user.click(actionButtonElement);

  expect(onChangeMock).toHaveBeenCalledWith({
    target: {
      id: "id",
      name: "name",
      value: null,
      checked: false,
    },
  });
});

test("accepts ref as a ref object", () => {
  const ref = { current: null };

  render(<TileSelect ref={ref} />);

  expect(ref.current).toBe(screen.getByRole("checkbox"));
});

test("accepts ref as a ref callback", () => {
  const ref = jest.fn();

  render(<TileSelect ref={ref} />);

  expect(ref).toHaveBeenCalledWith(screen.getByRole("checkbox"));
});

test("sets ref to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(<TileSelect ref={ref} />);

  unmount();

  expect(ref.current).toBe(null);
});

describe("TileSelectGroup", () => {
  const TileSelectGroupComponent = (props?: Partial<TileSelectGroupProps>) => {
    return (
      <TileSelectGroup
        name="TileSelectGroup"
        description="A group of TileSelects"
        legend="Radio Tile Group"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        {...props}
      >
        {["val1", "val2", "val3"].map((value, index) => (
          <TileSelect
            id={`rId-${index}`}
            key={`radio-key-${value}`}
            value={value}
          />
        ))}
      </TileSelectGroup>
    );
  };

  // FIXME: FE-6796 - Investigate why the following test fails when using `toBeVisible()`
  it('in default single select mode, the children have prop `type="radio"` passed on', () => {
    render(<TileSelectGroupComponent />);

    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toBeInTheDocument();
    });
  });

  // FIXME: FE-6796 - Investigate why the following test fails when using `toBeVisible()`
  it("in multi select mode, it renders the children and is not wrapped by RadioButtonMapper", () => {
    render(<TileSelectGroupComponent multiSelect />);

    expect(
      screen.queryByTestId("tile-select-group-radio-button-mapper"),
    ).not.toBeInTheDocument();

    screen.getAllByRole("checkbox").forEach((checkbox) => {
      expect(checkbox).toBeInTheDocument();
    });
  });

  it("does not throw when incorrect children are passed", () => {
    const consoleSpy = jest.spyOn(global.console, "error").mockImplementation();

    expect(() => {
      render(
        <TileSelectGroup name="TileSelectGroup" legend="Radio Tile Group">
          string
        </TileSelectGroup>,
      );
    }).not.toThrow();

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});

// Required for styling coverage
test("`additionalInformation` prop renders the passed in node", () => {
  const MyComp = () => <div>foo</div>;
  render(
    <TileSelect
      title="foo"
      titleAdornment={<div>bar</div>}
      additionalInformation={<MyComp />}
    />,
  );

  expect(screen.getByTestId("title-adornment")).toHaveStyle(
    "margin-bottom: 4px",
  );
});

test("when input becomes disabled, the focus outline is removed", async () => {
  const user = userEvent.setup({ delay: null });
  const { rerender } = render(<TileSelect />);

  const inputElement = screen.getByRole("checkbox");
  await user.click(inputElement);

  expect(screen.getByTestId("focus-wrapper")).toHaveStyleRule(
    "box-shadow: 0px 0px 0px var(--borderWidth300) var(--colorsSemanticFocus500),0px 0px 0px var(--borderWidth600) var(--colorsUtilityYin090)",
  );

  rerender(<TileSelect disabled />);

  expect(screen.getByTestId("focus-wrapper")).not.toHaveStyleRule(
    "box-shadow: 0px 0px 0px var(--borderWidth300) var(--colorsSemanticFocus500),0px 0px 0px var(--borderWidth600) var(--colorsUtilityYin090)",
  );
});

test("when the `footer` prop is rendered, the component renders with the expected styling", () => {
  render(
    <TileSelect
      checked
      footer={
        <>
          <Button>Foo</Button>
        </>
      }
    />,
  );

  expect(screen.getByTestId("tile-select-footer")).toHaveStyle({
    width: "fit-content",
    position: "relative",
    zIndex: 200,
  });
});

test("`prefixAdornment` prop renders the passed in node", () => {
  const MyComp = () => <div>foo</div>;

  render(<TileSelect checked prefixAdornment={<MyComp />} />);

  expect(screen.getByTestId("prefix-adornment")).toBeVisible();
});

test("`prefixAdornment` prop renders with the expected styling when `disabled` is true", () => {
  const MyComp = () => <div>foo</div>;

  render(<TileSelect checked disabled prefixAdornment={<MyComp />} />);

  expect(screen.getByTestId("prefix-adornment")).toHaveStyle("opacity: 0.3");
});

// Required for styling coverage
test("Accordion footer renders the node passed in via the accordionContent prop and applies the expected styling", () => {
  const MyComp = () => <div>foo</div>;
  const AccordionControl: TileSelectProps["accordionControl"] = (
    controlId,
    contentId,
  ) => (
    <Button aria-controls={contentId} id={controlId}>
      Foo
    </Button>
  );

  render(
    <TileSelect
      accordionControl={AccordionControl}
      checked
      accordionContent={<MyComp />}
    />,
  );

  expect(screen.getByTestId("accordion-footer")).toHaveStyle({
    width: "fit-content",
    position: "relative",
    zIndex: "200",
    left: "-12px",
  });

  expect(screen.getByTestId("accordion-footer")).toHaveStyleRule(
    "transform",
    "rotate(-90deg)",
    { modifier: 'span[data-element="chevron_down"]' },
  );
});
