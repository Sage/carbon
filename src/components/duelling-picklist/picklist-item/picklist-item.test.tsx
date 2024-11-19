import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PicklistItem from "./picklist-item.component";
import FocusContext from "../__internal__/duelling-picklist.context";
import iconUnicodes from "../../icon/icon-unicodes";

test("the context callback is called with the expected arguments when isLastItem and isLastGroup are both falsy", async () => {
  const user = userEvent.setup();
  const setElementToFocus = jest.fn();
  render(
    <FocusContext.Provider value={{ elementToFocus: {}, setElementToFocus }}>
      <PicklistItem
        type="add"
        onChange={() => {}}
        item={1}
        listIndex={1}
        groupIndex={0}
        index={1}
      >
        Item content
      </PicklistItem>
    </FocusContext.Provider>,
  );

  await user.click(screen.getByTestId("picklist-item-button"));

  expect(setElementToFocus).toHaveBeenCalledWith(1, 1, 0);
});

test("the context callback is called with the expected arguments when isLastItem and isLastGroup are both true", async () => {
  const user = userEvent.setup();
  const setElementToFocus = jest.fn();
  render(
    <FocusContext.Provider value={{ elementToFocus: {}, setElementToFocus }}>
      <PicklistItem
        type="add"
        onChange={() => {}}
        item={1}
        listIndex={1}
        groupIndex={0}
        index={1}
        isLastGroup
        isLastItem
      >
        Item content
      </PicklistItem>
    </FocusContext.Provider>,
  );

  await user.click(screen.getByTestId("picklist-item-button"));

  expect(setElementToFocus).toHaveBeenCalledWith(0, 0, undefined);
});

test("the context callback is called with the expected arguments when isLastItem is true and isLastGroup is falsy", async () => {
  const user = userEvent.setup();
  const setElementToFocus = jest.fn();
  render(
    <FocusContext.Provider value={{ elementToFocus: {}, setElementToFocus }}>
      <PicklistItem
        type="add"
        onChange={() => {}}
        item={1}
        listIndex={1}
        groupIndex={0}
        index={0}
        isLastItem
      >
        Item content
      </PicklistItem>
    </FocusContext.Provider>,
  );

  await user.click(screen.getByTestId("picklist-item-button"));

  expect(setElementToFocus).toHaveBeenCalledWith(0, 1, undefined);
});

// test purely for coverage - the `locked` prop is tested in both Chromatic and Playwright
test("should render a locked icon with expected styling when the `locked` prop is set", () => {
  render(
    <PicklistItem type="add" onChange={() => {}} item={1} locked>
      Item content
    </PicklistItem>,
  );

  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "content",
    `"${iconUnicodes.locked}"`,
    { modifier: "&::before" },
  );
});
