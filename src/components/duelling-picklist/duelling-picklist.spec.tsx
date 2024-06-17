import React, { useState } from "react";
import { mount, ReactWrapper } from "enzyme";
import { CSSTransition } from "react-transition-group";
import { act } from "react-dom/test-utils";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import {
  DuellingPicklist,
  Picklist,
  PicklistItem,
  PicklistItemProps,
  PicklistDivider,
  PicklistPlaceholder,
  PicklistGroup,
  DuellingPicklistProps,
} from ".";
import {
  StyledDuellingPicklistOverlay,
  StyledLabel,
  StyledControl,
} from "./duelling-picklist.style";
import {
  StyledPicklistItem,
  StyledButton,
} from "./picklist-item/picklist-item.style";
import {
  StyledGroupButton,
  StyledPicklistGroup,
} from "./picklist-group/picklist-group.style";
import { StyledPicklist } from "./picklist/picklist.style";
import StyledPicklistDivider from "./picklist-divider/picklist-divider.style";
import Logger from "../../__internal__/utils/logger";

// mock Logger.deprecate so that no console warnings occur while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

const EmptyComponent = () => <div />;

describe("DuellingPicklist", () => {
  let wrapper: ReactWrapper;
  let onAdd: jest.Mock;
  let onRemove: jest.Mock;

  type PicklistItemType = {
    key: string;
    title: string;
  };

  const notSelectedItems: PicklistItemType[] = [
    { key: "1", title: "content 1" },
    { key: "2", title: "content 2" },
    { key: "3", title: "content 3" },
    { key: "4", title: "content 4" },
    { key: "5", title: "content 5" },
    { key: "6", title: "content 6" },
  ];

  const selectedItems: PicklistItemType[] = [
    { key: "1", title: "content 1" },
    { key: "2", title: "content 2" },
    { key: "3", title: "content 3" },
    { key: "4", title: "content 4" },
    { key: "5", title: "content 5" },
    { key: "6", title: "content 6" },
  ];

  const notSelectedGroups = {
    groupA: [0],
    groupB: [3],
  };

  const selectedGroups = {
    groupA: [1, 2],
    groupB: [4],
  };

  interface RenderType extends DuellingPicklistProps {
    selected?: PicklistItemType[];
    notSelected?: PicklistItemType[];
    divider?: boolean;
    placeholder?: React.ReactNode;
  }

  const render = ({
    disabled,
    selected = selectedItems,
    notSelected = notSelectedItems,
    leftControls,
    rightControls,
    leftLabel,
    rightLabel,
    placeholder,
    divider = true,
  }: RenderType) => {
    wrapper = mount(
      <DuellingPicklist
        disabled={disabled}
        leftControls={leftControls}
        leftLabel={leftLabel}
        rightControls={rightControls}
        rightLabel={rightLabel}
      >
        <Picklist disabled={disabled} placeholder={placeholder}>
          {notSelected.map((item) => (
            <PicklistItem
              key={item.key}
              type="add"
              item={item}
              onChange={onAdd}
            >
              {item.title}
            </PicklistItem>
          ))}
        </Picklist>
        {divider && <PicklistDivider />}
        <Picklist disabled={disabled} placeholder={placeholder}>
          {selected.map((item) => (
            <PicklistItem
              key={item.key}
              type="remove"
              item={item}
              onChange={onRemove}
            >
              {item.title}
            </PicklistItem>
          ))}
        </Picklist>
      </DuellingPicklist>
    );
  };

  testStyledSystemMargin((props) => (
    <DuellingPicklist {...props}>
      <Picklist />
      <PicklistDivider />
      <Picklist />
    </DuellingPicklist>
  ));

  const renderAttached = ({
    disabled,
    selected = selectedItems,
    notSelected = notSelectedItems,
    leftControls,
    rightControls,
    leftLabel,
    rightLabel,
    placeholder,
  }: RenderType) => {
    wrapper = mount(
      <DuellingPicklist
        disabled={disabled}
        leftControls={leftControls}
        leftLabel={leftLabel}
        rightControls={rightControls}
        rightLabel={rightLabel}
      >
        <Picklist disabled={disabled} placeholder={placeholder}>
          {notSelected.map((item) => (
            <PicklistItem
              key={item.key}
              type="add"
              item={item}
              onChange={onAdd}
            >
              {item.title}
            </PicklistItem>
          ))}
        </Picklist>
        <PicklistDivider />
        <Picklist disabled={disabled} placeholder={placeholder}>
          {selected.map((item) => (
            <PicklistItem
              key={item.key}
              type="remove"
              item={item}
              onChange={onRemove}
            >
              {item.title}
            </PicklistItem>
          ))}
        </Picklist>
      </DuellingPicklist>,
      { attachTo: document.getElementById("enzymeContainer") }
    );
  };

  // eslint-disable-next-line react/prop-types
  const MockComponent = ({ grouped }: { grouped?: boolean }) => {
    const [notSelectedListItems, setNotSelectedItems] = useState([0, 1, 2]);
    const [selectedListItems, setSelectedItems] = useState([3, 4, 5]);
    const [notSelectedListGroups, setNotSelectedGroups] = useState(
      notSelectedGroups
    );
    const [selectedListGroups, setSelectedGroups] = useState(selectedGroups);

    const addItem = (item: PicklistItemProps["item"]) => {
      const index = notSelectedListItems.findIndex(
        (listItem) => listItem === item
      );
      const selectedItem = notSelectedListItems[index];
      const tempNotSelectedItems = notSelectedListItems.splice(
        index,
        index + 1
      );

      setNotSelectedItems([...tempNotSelectedItems]);
      setSelectedItems([...selectedListItems, selectedItem]);
    };

    const removeItem = (item: PicklistItemProps["item"]) => {
      const index = selectedListItems.findIndex(
        (listItem) => listItem === item
      );
      const notSelectedItem = selectedListItems[index];
      const tempSelectedItems = selectedListItems.splice(index, index + 1);

      setSelectedItems([...tempSelectedItems]);
      setNotSelectedItems([...notSelectedListItems, notSelectedItem]);
    };

    const addGroup = (group: "groupA" | "groupB") => {
      if (selectedGroups[group]) {
        setSelectedGroups({
          ...selectedGroups,
          [group]: [
            ...selectedListGroups[group],
            ...notSelectedListGroups[group],
          ],
        });
      } else {
        setSelectedGroups({
          ...selectedGroups,
          [group]: [...notSelectedListGroups[group]],
        });
      }
      setNotSelectedGroups({ ...notSelectedGroups, [group]: undefined });
    };

    const removeGroup = (group: "groupA" | "groupB") => {
      if (notSelectedGroups[group]) {
        setNotSelectedGroups({
          ...notSelectedGroups,
          [group]: [...notSelectedGroups[group], ...selectedGroups[group]],
        });
      } else {
        setNotSelectedGroups({
          ...notSelectedGroups,
          [group]: [...selectedGroups[group]],
        });
      }
      setSelectedGroups({ ...selectedGroups, [group]: undefined });
    };

    return (
      <DuellingPicklist>
        <Picklist key="0">
          {!grouped &&
            notSelectedListItems.map((item) => (
              <PicklistItem
                key={item}
                type="add"
                item={item}
                onChange={addItem}
              >
                {item}
              </PicklistItem>
            ))}
          {grouped && notSelectedListGroups.groupA && (
            <PicklistGroup
              type="add"
              title="group a"
              onChange={() => addGroup("groupA")}
            >
              {notSelectedListGroups.groupA.map((item) => (
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
          {grouped && notSelectedListGroups.groupB && (
            <PicklistGroup
              type="add"
              title="group b"
              onChange={() => addGroup("groupB")}
            >
              {notSelectedListGroups.groupB.map((item) => (
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
          {!grouped &&
            selectedListItems.map((item) => (
              <PicklistItem
                key={item}
                type="remove"
                item={item}
                onChange={removeItem}
              >
                {item}
              </PicklistItem>
            ))}
          {grouped && selectedListGroups.groupA && (
            <PicklistGroup
              type="remove"
              title="group a"
              onChange={() => removeGroup("groupA")}
            >
              {selectedListGroups.groupA.map((item) => (
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
          {grouped && selectedListGroups.groupB && (
            <PicklistGroup
              type="remove"
              title="group b"
              onChange={() => removeGroup("groupB")}
            >
              {selectedListGroups.groupB.map((item) => (
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
      </DuellingPicklist>
    );
  };

  const renderAttachedInMockComponent = (props = {}) => {
    wrapper = mount(<MockComponent {...props} />, {
      attachTo: document.getElementById("enzymeContainer"),
    });
  };

  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  describe("Styles", () => {
    beforeEach(() => {
      onAdd = jest.fn();
      onRemove = jest.fn();
      render({});
    });

    it("renders overlay if DuellingPicklistOverlay has disabled prop set", () => {
      render({ disabled: true });

      assertStyleMatch(
        {
          opacity: "0.2",
          pointerEvents: "none",
          userSelect: "none",
        },
        wrapper.find(StyledDuellingPicklistOverlay)
      );

      render({ disabled: false });

      assertStyleMatch(
        {
          opacity: undefined,
          pointerEvents: undefined,
          userSelect: undefined,
        },
        wrapper.find(StyledDuellingPicklistOverlay)
      );
    });

    it("PicklistItem with type add has no animation", () => {
      expect(
        wrapper.find(Picklist).at(0).find(CSSTransition).at(0).props().enter
      ).toBe(false);
    });

    it("PicklistItem with type remove has animation", () => {
      expect(
        wrapper.find(Picklist).at(1).find(CSSTransition).at(0).props().enter
      ).toBe(undefined);
    });

    it("adds the correct margins to the divider", () => {
      assertStyleMatch(
        {
          marginRight: "16px",
          marginLeft: "16px",
        },
        wrapper.find(StyledPicklistDivider)
      );
    });

    describe("without a divider", () => {
      it("adds the correct spacings around the picklists", () => {
        render({ divider: false });

        assertStyleMatch(
          {
            padding: "8px 8px 8px 8px",
            margin: "0",
          },
          wrapper.find(StyledPicklist).at(0)
        );

        assertStyleMatch(
          {
            padding: "8px 8px 8px 8px",
            margin: "0",
          },
          wrapper.find(StyledPicklist).at(1)
        );

        assertStyleMatch(
          {
            marginLeft: "32px",
          },
          wrapper.find(StyledPicklist).at(1),
          {
            modifier: `& + ${StyledPicklist}`,
          }
        );
      });
    });
  });

  describe("functionality", () => {
    let container: HTMLDivElement | null;
    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      onAdd = jest.fn();
      onRemove = jest.fn();
      renderAttached({});
    });

    afterEach(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
    });

    it("focuses on last PicklistItem when end key is pressed", () => {
      act(() => {
        wrapper
          .find(StyledPicklist)
          .at(0)
          .props()
          .onKeyDown({ key: "End", preventDefault: () => {} });
      });

      expect(
        wrapper
          .find(Picklist)
          .at(0)
          .find(StyledPicklistItem)
          .at(2)
          .find(StyledButton)
      ).toBeFocused();
    });

    it("focuses on first PicklistItem when home key is pressed", () => {
      act(() => {
        wrapper
          .find(StyledPicklist)
          .at(0)
          .props()
          .onKeyDown({ key: "Home", preventDefault: () => {} });
      });

      expect(
        wrapper
          .find(Picklist)
          .at(0)
          .find(StyledPicklistItem)
          .at(0)
          .find(StyledButton)
      ).toBeFocused();
    });

    it("does nothing when other key is pressed", () => {
      wrapper
        .find(StyledPicklist)
        .at(0)
        .props()
        .onKeyDown({ key: "a", preventDefault: () => {} });

      expect(
        wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(0)
      ).not.toBeFocused();
    });

    it("does nothing when other key is pressed on item", () => {
      act(() => {
        wrapper
          .find(Picklist)
          .at(0)
          .find(StyledPicklistItem)
          .at(0)
          .props()
          .onKeyDown({ key: "a", preventDefault: () => {} });
      });

      expect(
        wrapper.find(Picklist).at(0).find(StyledPicklistItem).at(0)
      ).not.toBeFocused();
    });

    it("calls passed onChange function with proper item passed as an argument when clicked on the button", () => {
      act(() => {
        wrapper
          .find(Picklist)
          .at(0)
          .find(PicklistItem)
          .at(0)
          .find(StyledButton)
          .props()
          .onClick();
      });

      expect(onAdd.mock.calls[0][0]).toEqual({ key: "1", title: "content 1" });
    });

    it.each([
      ["Space", " "],
      ["Enter", "Enter"],
    ])(
      "calls passed onChange function with proper item passed as an argument when %s key pressed",
      (_, key) => {
        act(() => {
          wrapper
            .find(Picklist)
            .at(0)
            .find(PicklistItem)
            .at(0)
            .find(StyledPicklistItem)
            .props()
            .onKeyDown({ key, preventDefault: () => {} });
        });

        expect(onAdd.mock.calls[0][0]).toEqual({
          key: "1",
          title: "content 1",
        });
      }
    );

    it("renders custom empty placeholder when no Picklist child provided", () => {
      render({ selected: [], placeholder: <EmptyComponent /> });
      expect(wrapper.find(Picklist).at(1).find(EmptyComponent)).toHaveLength(1);
    });

    it("renders PicklistPlaceholder with proper text when no Picklist child provided", () => {
      render({
        selected: [],
        placeholder: <PicklistPlaceholder text="Empty" />,
      });
      expect(
        wrapper.find(Picklist).at(1).find(PicklistPlaceholder).contains("Empty")
      ).toBe(true);
    });

    it("renders left label when leftLabel prop is provided", () => {
      render({ leftLabel: "Left Label" });
      expect(
        wrapper.find(DuellingPicklist).find(StyledLabel).at(0).props().children
      ).toBe("Left Label");
    });

    it("renders right label when rightLabel prop is provided", () => {
      render({ rightLabel: "Right Label" });
      expect(
        wrapper.find(DuellingPicklist).find(StyledLabel).at(1).props().children
      ).toBe("Right Label");
    });

    it("renders left controls when leftControls prop is provided", () => {
      const ControlComp = () => <div />;
      render({ leftControls: <ControlComp /> });
      expect(
        wrapper
          .find(DuellingPicklist)
          .find(StyledControl)
          .at(0)
          .find(ControlComp)
      ).toHaveLength(1);
    });

    it("renders right controls when rightControls prop is provided", () => {
      const ControlComp = () => <div />;
      render({ rightControls: <ControlComp /> });
      expect(
        wrapper
          .find(DuellingPicklist)
          .find(StyledControl)
          .at(1)
          .find(ControlComp)
      ).toHaveLength(1);
    });
  });

  describe("children", () => {
    it("does not throw when incorrect children provided", () => {
      expect(() => {
        mount(
          <DuellingPicklist>
            <Picklist>invalid</Picklist>
          </DuellingPicklist>
        );
      }).not.toThrow();
    });
  });

  describe("focus behaviour", () => {
    describe("without groups", () => {
      let container: HTMLDivElement | null = null;
      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        onAdd = jest.fn();
        onRemove = jest.fn();
        renderAttachedInMockComponent();
      });

      afterEach(() => {
        wrapper.unmount();
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }

        container = null;
      });

      it("moves focus to the next item in the same picklist when the first item button is clicked", () => {
        act(() => {
          wrapper
            .find(Picklist)
            .at(0)
            .find(PicklistItem)
            .first()
            .find(StyledButton)
            .props()
            .onClick();
        });

        expect(
          wrapper
            .find(Picklist)
            .at(0)
            .find(StyledPicklistItem)
            .at(1)
            .find(StyledButton)
        ).toBeFocused();
      });

      it.each([
        [0, 1],
        [1, 0],
      ])(
        "moves focus to the first item in the other picklist when the last item button is clicked",
        (current, result) => {
          act(() => {
            wrapper
              .find(Picklist)
              .at(current)
              .find(PicklistItem)
              .last()
              .find(StyledButton)
              .props()
              .onClick();
          });

          expect(
            wrapper
              .find(Picklist)
              .at(result)
              .find(StyledPicklistItem)
              .at(0)
              .find(StyledButton)
          ).toBeFocused();
        }
      );

      it.each([
        ["Space", " ", 0, 1],
        ["Enter", "Enter", 1, 0],
        ["Space", " ", 1, 0],
        ["Enter", "Enter", 0, 1],
      ])(
        "moves focus to the first item in the other picklist when the last item receives %s key press",
        (_, key, current, result) => {
          act(() => {
            wrapper
              .find(Picklist)
              .at(current)
              .find(StyledPicklistItem)
              .last()
              .props()
              .onKeyDown({ key, preventDefault: () => {} });
          });

          expect(
            wrapper
              .find(Picklist)
              .at(result)
              .find(StyledPicklistItem)
              .first()
              .find(StyledButton)
          ).toBeFocused();
        }
      );
    });

    describe("with groups", () => {
      let container: HTMLDivElement | null = null;
      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        onAdd = jest.fn();
        onRemove = jest.fn();
        renderAttachedInMockComponent({ grouped: true });
      });

      afterEach(() => {
        wrapper.unmount();
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }

        container = null;
      });

      it("moves focus to the next item in the same picklist when the first item button is clicked", () => {
        act(() => {
          wrapper
            .find(Picklist)
            .at(0)
            .find(PicklistGroup)
            .first()
            .find(StyledGroupButton)
            .props()
            .onClick();
        });

        expect(
          wrapper
            .find(Picklist)
            .at(0)
            .find(PicklistGroup)
            .at(0)
            .find(StyledGroupButton)
        ).toBeFocused();

        act(() => {
          wrapper
            .find(Picklist)
            .at(1)
            .find(PicklistGroup)
            .first()
            .find(StyledGroupButton)
            .props()
            .onClick();
        });

        expect(
          wrapper
            .find(Picklist)
            .at(1)
            .find(PicklistGroup)
            .at(0)
            .find(StyledGroupButton)
        ).toBeFocused();
      });

      it.each([
        [0, 1],
        [1, 0],
      ])(
        "moves focus to the first item in the other picklist when the last item button is clicked",
        (current, result) => {
          act(() => {
            wrapper
              .find(Picklist)
              .at(current)
              .find(PicklistGroup)
              .last()
              .find(StyledGroupButton)
              .props()
              .onClick();
          });

          expect(
            wrapper
              .find(Picklist)
              .at(result)
              .find(PicklistGroup)
              .at(0)
              .find(StyledGroupButton)
          ).toBeFocused();
        }
      );

      it.each([
        ["Space", " ", 0, 1],
        ["Enter", "Enter", 1, 0],
        ["Space", " ", 1, 0],
        ["Enter", "Enter", 0, 1],
      ])(
        "moves focus to the first item in the other picklist when the last item receives %s key press",
        (_, key, current, result) => {
          act(() => {
            wrapper
              .find(Picklist)
              .at(current)
              .find(StyledPicklistGroup)
              .last()
              .props()
              .onKeyDown({ key, preventDefault: () => {} });
          });

          expect(
            wrapper
              .find(Picklist)
              .at(result)
              .find(StyledPicklistGroup)
              .first()
              .find(StyledGroupButton)
          ).toBeFocused();
        }
      );
    });
  });
});
