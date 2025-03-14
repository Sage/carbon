import React, { useState } from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import PicklistGroup from "./picklist-group.component";
import PicklistItem from "../picklist-item/picklist-item.component";
import FocusContext, {
  FocusContextType,
} from "../__internal__/duelling-picklist.context";
import { StyledButton } from "../picklist-item/picklist-item.style";

const ComponentWithFocusContext = ({
  setElementToFocus,
}: {
  setElementToFocus: FocusContextType["setElementToFocus"];
}) => {
  const [focused, setFocused] = useState({});
  const elementToFocus = (
    itemIndex?: number,
    listIndex?: number,
    groupIndex?: number,
  ) => {
    setFocused({ itemIndex, listIndex, groupIndex });
    setElementToFocus(itemIndex, listIndex, groupIndex);
  };

  return (
    <FocusContext.Provider
      value={{ setElementToFocus: elementToFocus, elementToFocus: focused }}
    >
      <PicklistGroup
        title="Title"
        type="remove"
        onChange={() => {}}
        index={0}
        listIndex={0}
      >
        <PicklistItem type="add" onChange={() => {}} item={1}>
          Item content
        </PicklistItem>
        <PicklistItem type="add" onChange={() => {}} item={2}>
          Item content
        </PicklistItem>
      </PicklistGroup>
    </FocusContext.Provider>
  );
};

test("when the group button is clicked, the onChange callback prop and the setElementToFocus context callback should both be called with the appropriate arguments", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  const setElementToFocus = jest.fn();
  render(
    <FocusContext.Provider value={{ setElementToFocus, elementToFocus: {} }}>
      <PicklistGroup
        type="add"
        title="Title"
        onChange={onChange}
        index={6}
        listIndex={4}
      >
        <PicklistItem type="add" onChange={() => {}} item={1}>
          Item content
        </PicklistItem>
      </PicklistGroup>
    </FocusContext.Provider>,
  );

  await user.click(screen.getByTestId("picklist-group-button"));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(setElementToFocus).toHaveBeenCalledWith(6, 4);
});

test("when the enter key is pressed with the group button focused, the onChange callback prop and the setElementToFocus context callback should both be called with the appropriate arguments", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  const setElementToFocus = jest.fn();
  render(
    <FocusContext.Provider value={{ setElementToFocus, elementToFocus: {} }}>
      <PicklistGroup
        type="add"
        title="Title"
        onChange={onChange}
        index={6}
        listIndex={4}
      >
        <PicklistItem type="add" onChange={() => {}} item={1}>
          Item content
        </PicklistItem>
      </PicklistGroup>
    </FocusContext.Provider>,
  );

  act(() => {
    screen.getByTestId("picklist-group-button").focus();
  });
  await user.keyboard("{Enter}");

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(setElementToFocus).toHaveBeenCalledWith(6, 4);
});

test("when the space key is pressed with the group button focused, the onChange callback prop and the setElementToFocus context callback should both be called with the appropriate arguments", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  const setElementToFocus = jest.fn();
  render(
    <FocusContext.Provider value={{ setElementToFocus, elementToFocus: {} }}>
      <PicklistGroup
        type="add"
        title="Title"
        onChange={onChange}
        index={6}
        listIndex={4}
      >
        <PicklistItem type="add" onChange={() => {}} item={1}>
          Item content
        </PicklistItem>
      </PicklistGroup>
    </FocusContext.Provider>,
  );

  act(() => {
    screen.getByTestId("picklist-group-button").focus();
  });
  await user.keyboard(" ");

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(setElementToFocus).toHaveBeenCalledWith(6, 4);
});

test("when a key other than space or enter is pressed with the group button focused, the onChange callback prop and the setElementToFocus context callback should not be called", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  const setElementToFocus = jest.fn();
  render(
    <FocusContext.Provider value={{ setElementToFocus, elementToFocus: {} }}>
      <PicklistGroup
        type="add"
        title="Title"
        onChange={onChange}
        index={6}
        listIndex={4}
      >
        <PicklistItem type="add" onChange={() => {}} item={1}>
          Item content
        </PicklistItem>
      </PicklistGroup>
    </FocusContext.Provider>,
  );

  act(() => {
    screen.getByTestId("picklist-group-button").focus();
  });
  await user.keyboard("a");

  expect(onChange).not.toHaveBeenCalled();
  expect(setElementToFocus).not.toHaveBeenCalled();
});

test("when an 'add' button is hovered over, it should change the background colour of PicklistItem buttons in the group", async () => {
  const user = userEvent.setup();
  render(
    <PicklistGroup type="add" title="Title" onChange={() => {}}>
      <PicklistItem type="add" onChange={() => {}} item={1}>
        Item content
      </PicklistItem>
    </PicklistGroup>,
  );

  await user.hover(screen.getByTestId("picklist-group-button"));

  expect(screen.getAllByRole("listitem")[0]).toHaveStyleRule(
    "background",
    "var(--colorsActionMajor600)",
    { modifier: `${StyledButton}` },
  );

  await user.unhover(screen.getByTestId("picklist-group-button"));

  expect(screen.getAllByRole("listitem")[0]).not.toHaveStyleRule(
    "background",
    "var(--colorsActionMajor600)",
    { modifier: `${StyledButton}` },
  );
});

test("when a 'remove' button is hovered over, it should change the background colour of PicklistItem buttons in the group", async () => {
  const user = userEvent.setup();
  render(
    <PicklistGroup type="remove" title="Title" onChange={() => {}}>
      <PicklistItem type="remove" onChange={() => {}} item={1}>
        Item content
      </PicklistItem>
    </PicklistGroup>,
  );

  await user.hover(screen.getByTestId("picklist-group-button"));

  expect(screen.getAllByRole("listitem")[0]).toHaveStyleRule(
    "background",
    "var(--colorsSemanticNegative600)",
    { modifier: `${StyledButton}` },
  );

  await user.unhover(screen.getByTestId("picklist-group-button"));

  expect(screen.getAllByRole("listitem")[0]).not.toHaveStyleRule(
    "background",
    "var(--colorsSemanticNegative600)",
    { modifier: `${StyledButton}` },
  );
});

test("when an 'add' button is focused, it should change the background colour of PicklistItem buttons in the group", async () => {
  const user = userEvent.setup();
  render(
    <PicklistGroup type="add" title="Title" onChange={() => {}}>
      <PicklistItem type="add" onChange={() => {}} item={1}>
        Item content
      </PicklistItem>
    </PicklistGroup>,
  );

  act(() => {
    screen.getByTestId("picklist-group-button").focus();
  });

  expect(screen.getAllByRole("listitem")[0]).toHaveStyleRule(
    "background",
    "var(--colorsActionMajor600)",
    { modifier: `${StyledButton}` },
  );

  await user.tab();

  expect(screen.getAllByRole("listitem")[0]).not.toHaveStyleRule(
    "background",
    "var(--colorsActionMajor600)",
    { modifier: `${StyledButton}` },
  );
});

test("when a 'remove' button is focused, it should change the background colour of PicklistItem buttons in the group", async () => {
  const user = userEvent.setup();
  render(
    <PicklistGroup type="remove" title="Title" onChange={() => {}}>
      <PicklistItem type="remove" onChange={() => {}} item={1}>
        Item content
      </PicklistItem>
    </PicklistGroup>,
  );

  act(() => {
    screen.getByTestId("picklist-group-button").focus();
  });

  expect(screen.getAllByRole("listitem")[0]).toHaveStyleRule(
    "background",
    "var(--colorsSemanticNegative600)",
    { modifier: `${StyledButton}` },
  );

  await user.tab();

  expect(screen.getAllByRole("listitem")[0]).not.toHaveStyleRule(
    "background",
    "var(--colorsSemanticNegative600)",
    { modifier: `${StyledButton}` },
  );
});

test("no error is thrown when incorrect children are provided", () => {
  expect(() => {
    render(
      <FocusContext.Provider
        value={{ setElementToFocus: () => {}, elementToFocus: {} }}
      >
        <PicklistGroup title="Title" onChange={() => {}} type="add">
          invalid
        </PicklistGroup>
      </FocusContext.Provider>,
    );
  }).not.toThrow();
});

it.each([
  ["first", 0, 0, 0],
  ["last", 1, 0, undefined],
])(
  "calls the context callback with the correct parameters when the %s group item is clicked",
  async (_, itemIndex, listIndex, groupIndex) => {
    const user = userEvent.setup();
    const setElementToFocus = jest.fn();
    render(<ComponentWithFocusContext setElementToFocus={setElementToFocus} />);

    await user.click(screen.getAllByRole("button", { name: "add" })[itemIndex]);

    expect(setElementToFocus).toHaveBeenCalledWith(
      itemIndex,
      listIndex,
      groupIndex,
    );
  },
);
