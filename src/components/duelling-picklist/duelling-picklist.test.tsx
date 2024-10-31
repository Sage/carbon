import React, { useReducer } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  DuellingPicklist,
  Picklist,
  PicklistItem,
  PicklistItemProps,
  PicklistDivider,
  PicklistPlaceholder,
  PicklistGroup,
} from ".";

const reducer = (
  oldState: { selected: number[]; unselected: number[] },
  action: { type: "add" | "remove"; item: number },
) => {
  const { selected, unselected } = oldState;
  switch (action.type) {
    case "add": {
      const index = unselected.findIndex(
        (listItem) => listItem === action.item,
      );
      const selectedItem = unselected[index];
      const tempNotSelectedItems = [...unselected];
      tempNotSelectedItems.splice(index, 1);

      return {
        selected: [...selected, selectedItem],
        unselected: tempNotSelectedItems,
      };
    }
    case "remove": {
      const index = selected.findIndex((listItem) => listItem === action.item);
      const notSelectedItem = selected[index];
      const tempSelectedItems = [...selected];
      tempSelectedItems.splice(index, 1);

      return {
        selected: tempSelectedItems,
        unselected: [...unselected, notSelectedItem],
      };
    }
    default:
      return oldState;
  }
};

const FullComponentExample = ({
  onAdd,
  onRemove,
}: {
  onAdd?: PicklistItemProps["onChange"];
  onRemove?: PicklistItemProps["onChange"];
}) => {
  const [{ selected, unselected }, dispatch] = useReducer(reducer, {
    selected: [3, 4, 5],
    unselected: [0, 1, 2],
  });

  const addItem = (item: number) => {
    dispatch({ type: "add", item });
    onAdd?.(item);
  };

  const removeItem = (item: number) => {
    dispatch({ type: "remove", item });
    onRemove?.(item);
  };

  return (
    <DuellingPicklist>
      <Picklist key="0">
        {unselected.map((item) => (
          <PicklistItem
            key={item}
            type="add"
            item={item}
            onChange={addItem as PicklistItemProps["onChange"]}
          >
            {item}
          </PicklistItem>
        ))}
      </Picklist>
      <PicklistDivider />
      <Picklist key="1">
        {selected.map((item) => (
          <PicklistItem
            key={item}
            type="remove"
            item={item}
            onChange={removeItem as PicklistItemProps["onChange"]}
          >
            {item}
          </PicklistItem>
        ))}
      </Picklist>
    </DuellingPicklist>
  );
};

const groupReducer = (
  oldState: {
    selected: { groupA: number[]; groupB: number[] };
    unselected: { groupA: number[]; groupB: number[] };
  },
  action: { type: "add" | "remove"; group: "groupA" | "groupB" },
) => {
  const { selected, unselected } = oldState;
  const { type, group } = action;
  switch (type) {
    case "add": {
      if (selected[group]) {
        return {
          selected: {
            ...selected,
            [group]: [...selected[group], ...unselected[group]],
          },
          unselected: {
            ...unselected,
            [group]: undefined,
          },
        };
      }
      return {
        selected: {
          ...selected,
          [group]: [...unselected[group]],
        },
        unselected: {
          ...unselected,
          [group]: undefined,
        },
      };
    }
    case "remove": {
      if (unselected[group]) {
        return {
          selected: { ...selected, [group]: undefined },
          unselected: {
            ...unselected,
            [group]: [...unselected[group], ...selected[group]],
          },
        };
      }
      return {
        selected: { ...selected, [group]: undefined },
        unselected: { ...unselected, [group]: [...selected[group]] },
      };
    }
    default:
      return oldState;
  }
};

const FullGroupedComponentExample = () => {
  const [{ selected, unselected }, dispatch] = useReducer(groupReducer, {
    selected: {
      groupA: [1, 2],
      groupB: [4],
    },
    unselected: {
      groupA: [0],
      groupB: [3],
    },
  });

  const addGroup = (group: "groupA" | "groupB") => {
    dispatch({ type: "add", group });
  };

  const removeGroup = (group: "groupA" | "groupB") => {
    dispatch({ type: "remove", group });
  };

  return (
    <DuellingPicklist>
      <Picklist key="0">
        {unselected.groupA && (
          <PicklistGroup
            type="add"
            title="group a"
            onChange={() => addGroup("groupA")}
          >
            {unselected.groupA.map((item) => (
              <PicklistItem
                key={item}
                type="add"
                item={item}
                onChange={() => {}}
              >
                {item}
              </PicklistItem>
            ))}
          </PicklistGroup>
        )}
        {unselected.groupB && (
          <PicklistGroup
            type="add"
            title="group b"
            onChange={() => addGroup("groupB")}
          >
            {unselected.groupB.map((item) => (
              <PicklistItem
                key={item}
                type="add"
                item={item}
                onChange={() => {}}
              >
                {item}
              </PicklistItem>
            ))}
          </PicklistGroup>
        )}
      </Picklist>
      <PicklistDivider />
      <Picklist key="1">
        {selected.groupA && (
          <PicklistGroup
            type="remove"
            title="group a"
            onChange={() => removeGroup("groupA")}
          >
            {selected.groupA.map((item) => (
              <PicklistItem
                key={item}
                type="remove"
                item={item}
                onChange={() => {}}
              >
                {item}
              </PicklistItem>
            ))}
          </PicklistGroup>
        )}
        {selected.groupB && (
          <PicklistGroup
            type="remove"
            title="group b"
            onChange={() => removeGroup("groupB")}
          >
            {selected.groupB.map((item) => (
              <PicklistItem
                key={item}
                type="remove"
                item={item}
                onChange={() => {}}
              >
                {item}
              </PicklistItem>
            ))}
          </PicklistGroup>
        )}
      </Picklist>
    </DuellingPicklist>
  );
};

test("an item that is added to the selected items has an animation", async () => {
  const user = userEvent.setup();
  render(<FullComponentExample />);

  await user.click(screen.getAllByRole("button", { name: "add" })[0]);

  expect(
    within(screen.getAllByTestId("picklist")[1]).getAllByRole("listitem")[3],
  ).toHaveClass("picklist-item-enter");
});

test("an item that is removed from the selected items has no animation", async () => {
  const user = userEvent.setup();
  render(<FullComponentExample />);

  await user.click(screen.getAllByRole("button", { name: "remove" })[0]);

  expect(
    within(screen.getAllByTestId("picklist")[0]).getAllByRole("listitem")[3],
  ).not.toHaveClass("picklist-item-enter");
});

test("when the end key is pressed, the last item in the currently-focused list is focused", async () => {
  const user = userEvent.setup();
  render(<FullComponentExample />);

  const buttonsInFirstList = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByRole("button", { name: "add" });
  buttonsInFirstList[0].focus();

  await user.keyboard("{End}");

  expect(buttonsInFirstList[buttonsInFirstList.length - 1]).toHaveFocus();
});

test("when the home key is pressed, the first item in the currently-focused list is focused", async () => {
  const user = userEvent.setup();
  render(<FullComponentExample />);

  const buttonsInFirstList = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByRole("button", { name: "add" });
  buttonsInFirstList[2].focus();

  await user.keyboard("{Home}");

  expect(buttonsInFirstList[0]).toHaveFocus();
});

test("when the a key other than home/end is pressed, focus is not changed", async () => {
  const user = userEvent.setup();
  render(<FullComponentExample />);

  const buttonsInFirstList = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByRole("button", { name: "add" });
  buttonsInFirstList[1].focus();

  await user.keyboard("a");

  expect(buttonsInFirstList[1]).toHaveFocus();
});

test("the item's onChange callback is called with the corresponding argument when the button is clicked", async () => {
  const onAdd = jest.fn();
  const user = userEvent.setup();
  render(<FullComponentExample onAdd={onAdd} />);

  await user.click(screen.getAllByRole("button", { name: "add" })[1]);

  expect(onAdd).toHaveBeenCalledTimes(1);
  expect(onAdd).toHaveBeenCalledWith(1);
});

test.each([
  ["Space", " "],
  ["Enter", "{Enter}"],
])(
  "the item's onChange callback is called with the corresponding argument when the %s key is pressed",
  async (_, key) => {
    const onAdd = jest.fn();
    const user = userEvent.setup();
    render(<FullComponentExample onAdd={onAdd} />);
    screen.getAllByRole("button", { name: "add" })[1].focus();

    await user.keyboard(key);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(1);
  },
);

test("the Picklist component renders a custom empty placeholder when no children are present", () => {
  render(<Picklist placeholder="nothing to see here" />);

  expect(screen.getByText("nothing to see here")).toBeVisible();
});

test("the Picklist component renders a PicklistPlaceholder component if specified when no children are present", () => {
  render(
    <Picklist
      placeholder={<PicklistPlaceholder text="nothing to see here" />}
    />,
  );

  expect(screen.getByText("nothing to see here")).toBeVisible();
  expect(screen.getByText("nothing to see here")).toHaveAttribute(
    "data-element",
    "picklist-placeholder",
  );
});

test("the left label is rendered when the `leftLabel` prop is provided", () => {
  render(<DuellingPicklist leftLabel="Left Label" />);

  expect(screen.getByText("Left Label")).toBeVisible();
  expect(screen.getByText("Left Label")).toHaveAttribute(
    "data-element",
    "picklist-left-label",
  );
});

test("the right label is rendered when the `rightLabel` prop is provided", () => {
  render(<DuellingPicklist rightLabel="Right Label" />);

  expect(screen.getByText("Right Label")).toBeVisible();
  expect(screen.getByText("Right Label")).toHaveAttribute(
    "data-element",
    "picklist-right-label",
  );
});

test("the left controls are rendered when the `leftControls` prop is provided", () => {
  render(
    <DuellingPicklist
      leftControls={<p data-element="custom-left-controls">left controls</p>}
    />,
  );

  expect(screen.getByText("left controls")).toBeVisible();
  expect(screen.getByText("left controls")).toHaveAttribute(
    "data-element",
    "custom-left-controls",
  );
});

test("the right controls are rendered when the `rightControls` prop is provided", () => {
  render(
    <DuellingPicklist
      rightControls={<p data-element="custom-right-controls">right controls</p>}
    />,
  );

  expect(screen.getByText("right controls")).toBeVisible();
  expect(screen.getByText("right controls")).toHaveAttribute(
    "data-element",
    "custom-right-controls",
  );
});

test("no error is thrown when incorrect children are provided to the `Picklist` component", () => {
  expect(() => {
    render(
      <DuellingPicklist>
        <Picklist>invalid</Picklist>
      </DuellingPicklist>,
    );
  }).not.toThrow();
});

test("when the add button is clicked on an item, focus moves to the next item in the list of unselected items", async () => {
  const user = userEvent.setup();
  render(<FullComponentExample />);

  const buttonsInFirstList = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByRole("button", { name: "add" });
  await user.click(buttonsInFirstList[1]);

  const remainingButtonsInFirstList = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByRole("button", { name: "add" });
  expect(remainingButtonsInFirstList[1]).toHaveFocus();
});

test("when the last item button in the first picklist is clicked, focus moves to the first item in the second picklist", async () => {
  const user = userEvent.setup();
  render(<FullComponentExample />);

  const allSourceButtons = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByRole("button", { name: "add" });
  await user.click(allSourceButtons[allSourceButtons.length - 1]);

  expect(
    within(screen.getAllByTestId("picklist")[1]).getAllByRole("button", {
      name: "remove",
    })[0],
  ).toHaveFocus();
});

test("when the last item button in the second picklist is clicked, focus moves to the first item in the first picklist", async () => {
  const user = userEvent.setup();
  render(<FullComponentExample />);

  const allSourceButtons = within(
    screen.getAllByTestId("picklist")[1],
  ).getAllByRole("button", { name: "remove" });
  await user.click(allSourceButtons[allSourceButtons.length - 1]);

  expect(
    within(screen.getAllByTestId("picklist")[0]).getAllByRole("button", {
      name: "add",
    })[0],
  ).toHaveFocus();
});

test.each([
  ["Enter", "{Enter}"],
  ["Space", " "],
])(
  "when the last item button in the first picklist is focused, focus moves to the first item in the second picklist when the %s key is pressed",
  async (_, key) => {
    const user = userEvent.setup();
    render(<FullComponentExample />);

    const allSourceButtons = within(
      screen.getAllByTestId("picklist")[0],
    ).getAllByRole("button", { name: "add" });
    allSourceButtons[allSourceButtons.length - 1].focus();
    await user.keyboard(key);

    expect(
      within(screen.getAllByTestId("picklist")[1]).getAllByRole("button", {
        name: "remove",
      })[0],
    ).toHaveFocus();
  },
);

test.each([
  ["Enter", "{Enter}"],
  ["Space", " "],
])(
  "when the last item button in the second picklist is focused, focus moves to the first item in the first picklist when the %s key is pressed",
  async (_, key) => {
    const user = userEvent.setup();
    render(<FullComponentExample />);

    const allSourceButtons = within(
      screen.getAllByTestId("picklist")[1],
    ).getAllByRole("button", { name: "remove" });
    allSourceButtons[allSourceButtons.length - 1].focus();
    await user.keyboard(key);

    expect(
      within(screen.getAllByTestId("picklist")[0]).getAllByRole("button", {
        name: "add",
      })[0],
    ).toHaveFocus();
  },
);

test("when the add button is clicked for an entire group, focus moves to the next group's add button", async () => {
  const user = userEvent.setup();
  render(<FullGroupedComponentExample />);

  const groupAddButtons = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByTestId("picklist-group-button");
  expect(groupAddButtons).toHaveLength(2);
  await user.click(groupAddButtons[0]);

  const remainingGroupAddButtons = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByTestId("picklist-group-button");
  expect(remainingGroupAddButtons).toHaveLength(1);
  expect(remainingGroupAddButtons[0]).toHaveFocus();
});

test("when the last group button in the first picklist is clicked, and the list is grouped, focus moves to the first group button in the second picklist", async () => {
  const user = userEvent.setup();
  render(<FullGroupedComponentExample />);

  const allSourceGroupButtons = within(
    screen.getAllByTestId("picklist")[0],
  ).getAllByTestId("picklist-group-button");
  await user.click(allSourceGroupButtons[allSourceGroupButtons.length - 1]);

  expect(
    within(screen.getAllByTestId("picklist")[1]).getAllByTestId(
      "picklist-group-button",
    )[0],
  ).toHaveFocus();
});

test("when the last group button in the second picklist is clicked, and the list is grouped, focus moves to the first group button in the first picklist", async () => {
  const user = userEvent.setup();
  render(<FullGroupedComponentExample />);

  const allSourceGroupButtons = within(
    screen.getAllByTestId("picklist")[1],
  ).getAllByTestId("picklist-group-button");
  await user.click(allSourceGroupButtons[allSourceGroupButtons.length - 1]);

  expect(
    within(screen.getAllByTestId("picklist")[0]).getAllByTestId(
      "picklist-group-button",
    )[0],
  ).toHaveFocus();
});

test.each([
  ["Enter", "{Enter}"],
  ["Space", " "],
])(
  "when the last group button in the first picklist is focused, and the list is grouped, focus moves to the first group button in the second picklist when the %s key is pressed",
  async (_, key) => {
    const user = userEvent.setup();
    render(<FullGroupedComponentExample />);

    const allSourceGroupButtons = within(
      screen.getAllByTestId("picklist")[0],
    ).getAllByTestId("picklist-group-button");
    allSourceGroupButtons[allSourceGroupButtons.length - 1].focus();
    await user.keyboard(key);

    expect(
      within(screen.getAllByTestId("picklist")[1]).getAllByTestId(
        "picklist-group-button",
      )[0],
    ).toHaveFocus();
  },
);

test.each([
  ["Enter", "{Enter}"],
  ["Space", " "],
])(
  "when the last group button in the second picklist is focused, and the list is grouped, focus moves to the first group button in the first picklist when the %s key is pressed",
  async (_, key) => {
    const user = userEvent.setup();
    render(<FullGroupedComponentExample />);

    const allSourceGroupButtons = within(
      screen.getAllByTestId("picklist")[1],
    ).getAllByTestId("picklist-group-button");
    allSourceGroupButtons[allSourceGroupButtons.length - 1].focus();
    await user.keyboard(key);

    expect(
      within(screen.getAllByTestId("picklist")[0]).getAllByTestId(
        "picklist-group-button",
      )[0],
    ).toHaveFocus();
  },
);

// for coverage (styles are also tested in Playwright)
test("renders overlay if DuellingPicklistOverlay has disabled prop set", () => {
  render(<DuellingPicklist disabled />);

  expect(screen.getByTestId("duelling-picklist-overlay")).toHaveStyle({
    opacity: "0.2",
    pointerEvents: "none",
    userSelect: "none",
  });
});
