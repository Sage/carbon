import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputPresentation from "./input-presentation.component";
import Input from "./input.component";
import { InputContext, InputGroupContext } from "../input-behaviour";
import StyledSelect from "../../components/select/select.style";

test("renders presentational div and presentation container elements", () => {
  render(<InputPresentation>Children</InputPresentation>);

  const inputPresentationContainer = screen.getByTestId(
    "input-presentation-container",
  );
  const inputPresentation = within(inputPresentationContainer).getByRole(
    "presentation",
  );

  const inputPresentationChildren =
    within(inputPresentation).getByText("Children");
  expect(inputPresentationChildren).toBeVisible();
});

test("renders a passed node via the `positionedChildren` prop before any other children", () => {
  render(
    <InputPresentation positionedChildren="Favourite Child.">
      Middle Child.
    </InputPresentation>,
  );

  const inputPresentationContainer = screen.getByTestId(
    "input-presentation-container",
  );

  expect(inputPresentationContainer).toHaveTextContent(
    "Favourite Child.Middle Child.",
  );
});

test("triggers a passed function via the `onMouseEnter` prop when the input is hovered", async () => {
  const onMouseEnterMock = jest.fn();

  render(
    <InputContext.Provider value={{ onMouseEnter: onMouseEnterMock }}>
      <InputPresentation>sample children</InputPresentation>
    </InputContext.Provider>,
  );

  const user = userEvent.setup();
  const inputPresentation = screen.getByRole("presentation");

  await user.hover(inputPresentation);

  expect(onMouseEnterMock).toHaveBeenCalled();
});

test("triggers a passed function via the `onMouseEnter` prop from the input context provider, when the input is hovered", async () => {
  const onMouseEnterMock = jest.fn();

  render(
    <InputGroupContext.Provider value={{ onMouseEnter: onMouseEnterMock }}>
      <InputPresentation>sample children</InputPresentation>
    </InputGroupContext.Provider>,
  );

  const user = userEvent.setup();
  const inputPresentation = screen.getByRole("presentation");

  await user.hover(inputPresentation);

  expect(onMouseEnterMock).toHaveBeenCalled();
});

test("triggers a passed function via the `onMouseLeave` prop when the input is hovered and un-hovered", async () => {
  const onMouseLeaveMock = jest.fn();

  render(
    <InputContext.Provider value={{ onMouseLeave: onMouseLeaveMock }}>
      <InputPresentation>sample children</InputPresentation>
    </InputContext.Provider>,
  );

  const user = userEvent.setup();
  const inputPresentation = screen.getByRole("presentation");

  await user.hover(inputPresentation);
  await user.unhover(inputPresentation);

  expect(onMouseLeaveMock).toHaveBeenCalled();
});

test("triggers a passed function via the `onMouseLeave` prop from the input context provider, when the input is hovered and un-hovered", async () => {
  const onMouseLeaveMock = jest.fn();

  render(
    <InputGroupContext.Provider value={{ onMouseLeave: onMouseLeaveMock }}>
      <InputPresentation>sample children</InputPresentation>
    </InputGroupContext.Provider>,
  );

  const user = userEvent.setup();
  const inputPresentation = screen.getByRole("presentation");

  await user.hover(inputPresentation);
  await user.unhover(inputPresentation);

  expect(onMouseLeaveMock).toHaveBeenCalled();
});

test("applies the correct z-index values when inside an open select", () => {
  render(
    <StyledSelect isOpen>
      <InputPresentation>
        <Input value="" />
      </InputPresentation>
      ,
    </StyledSelect>,
  );

  const inputPresentation = screen.getByRole("presentation");
  const backdropIndex =
    getComputedStyle(inputPresentation).getPropertyValue("z-index");

  // non-default value
  expect(backdropIndex).toContain("--adaptiveSidebarModalBackdrop");
  // default value
  expect(backdropIndex).toContain("9999");
});

/* Styling test for coverage */
test.each(["left", "right"])(
  "when `hasIcon` is true and the `align` prop is %s, the corresponding padding attribute is 0",
  (alignValue) => {
    render(
      <InputPresentation hasIcon align={alignValue}>
        <Input value="" />
      </InputPresentation>,
    );

    const inputPresentation = screen.getByRole("presentation");
    const input = within(inputPresentation).getByRole("textbox");
    expect(input).toHaveStyle(`padding-${alignValue}: 0`);
  },
);
