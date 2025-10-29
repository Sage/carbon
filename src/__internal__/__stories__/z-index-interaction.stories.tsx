/* eslint-disable react-hooks/rules-of-hooks */
import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import React, { useState } from "react";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

import Button from "../../components/button";
import DateInput, { DateChangeEvent } from "../../components/date";
import Dialog from "../../components/dialog";
import { Option, Select } from "../../components/select";
import Box from "../../components/box";
import PopoverContainer from "../../components/popover-container";
import DateRange, { DateRangeChangeEvent } from "../../components/date-range";
import AdvancedColorPicker from "../../components/advanced-color-picker";
import {
  ActionPopover,
  ActionPopoverItem,
  ActionPopoverMenu,
} from "../../components/action-popover";
import { Menu, MenuDivider, MenuItem } from "../../components/menu";
import MultiActionButton from "../../components/multi-action-button";
import Link from "../../components/link";
import { DraggableContainer, DraggableItem } from "../../components/draggable";
import { Checkbox } from "../../components/checkbox";
import { fireEvent } from "@testing-library/dom";

/**
 * The following stories are designed to provide visual checks to aid
 * in identifying any regressions that may occur as a result of changes
 * to a component's z-index values. They will only appear in builds
 * where the IGNORE_TESTS flag is not set, or set to false (i.e. in
 * the main documentation they will be unavilable)
 */

export default {
  title: "Internals/Z-Indexing",
  parameters: {
    chromatic: { disableSnapshot: false },

    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const DateInputInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [dateValue, setDateValue] = useState("04/04/2019");

    const handleChange = (ev: DateChangeEvent) =>
      setDateValue(ev.target.value.formattedValue);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open DateInput Dialog</Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <Box mt="40px">
            <DateInput
              label="Date"
              name="date-input"
              value={dateValue}
              onChange={handleChange}
            />
          </Box>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    const icon = document.querySelector(
      '[data-component="icon"][data-element="calendar"]',
    );

    if (icon) await userEvent.click(icon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const DateRangeInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState(["01/10/2016", "30/10/2016"]);

    const handleChange = (ev: DateRangeChangeEvent) => {
      const newRange = [
        ev.target.value[0].formattedValue,
        ev.target.value[1].formattedValue,
      ];
      setRange(newRange);
    };

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open DateRange Dialog</Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <Box mt="40px">
            <DateRange
              startLabel="Start"
              endLabel="End"
              value={range}
              onChange={handleChange}
            />
          </Box>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    const icons = document.querySelectorAll(
      '[data-component="icon"][data-element="calendar"]',
    );

    if (icons[0]) await userEvent.click(icons[0]);

    if (icons[1]) await userEvent.click(icons[1]);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const AdvancedColorPickerInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [color, setColor] = useState("orchid");

    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
      setColor(target.value);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open ColorPicker Dialog</Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <Box mt="40px">
            <AdvancedColorPicker
              name="color"
              selectedColor={color}
              availableColors={[
                { value: "#FFFFFF", label: "white" },
                { value: "#000000", label: "black" },
                { value: "#AEECD6", label: "mint" },
                { value: "#EBAEDE", label: "orchid" },
              ]}
              onChange={onChange}
              onOpen={() => setPickerOpen(true)}
              onClose={() => setPickerOpen(false)}
              open={pickerOpen}
              onBlur={() => {}}
            />
          </Box>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    const icon = document.querySelector('[data-element="color-picker-cell"]');
    if (icon) await userEvent.click(icon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const ActionPopoverInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open ActionPopover Dialog</Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <Box mt="40px">
            <ActionPopover>
              <ActionPopoverItem
                icon="csv"
                submenu={
                  <ActionPopoverMenu>
                    <ActionPopoverItem icon="graph">
                      Sub Menu 1
                    </ActionPopoverItem>
                    <ActionPopoverItem icon="add">Sub Menu 2</ActionPopoverItem>
                  </ActionPopoverMenu>
                }
              >
                Download CSV
              </ActionPopoverItem>
            </ActionPopover>
          </Box>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    const icon = document.querySelector(
      '[data-component="icon"][data-element="ellipsis_vertical"]',
    );

    if (icon) await userEvent.click(icon);

    const subIcon = document.querySelector(
      '[data-component="icon"][data-element="action-popover-menu-item-chevron"]',
    );

    if (subIcon) await userEvent.click(subIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const MenuInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Menu Dialog</Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <Box mt="40px">
            <Menu menuType="white">
              <MenuItem icon="settings" href="#">
                Menu Item One
              </MenuItem>
              <MenuItem icon="settings">Menu Item Two</MenuItem>
              <MenuDivider />
              <MenuItem submenu="Menu Item Three">
                <MenuItem href="#">Submenu One</MenuItem>
                <MenuItem href="#">Submenu Two</MenuItem>
              </MenuItem>
            </Menu>
          </Box>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard(" ");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const SelectInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Select Dialog</Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <Box mt="40px">
            <Select
              name="simple"
              id="simple"
              label="Color"
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
            >
              <Option text="Red" value="red" />
              <Option text="Blue" value="blue" />
              <Option text="Green" value="green" />
            </Select>
          </Box>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard(" ");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const MultiActionButtonInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open MultiActionButton Dialog
        </Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <Box mt="40px">
            <MultiActionButton text="Multi Action Button">
              <Button href="#">Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
            </MultiActionButton>
          </Box>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard(" ");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const PopoverContainerInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open PopoverContainer Dialog
        </Button>
        <Dialog open={open} onCancel={() => setOpen(false)}>
          <Box mt="40px">
            <PopoverContainer
              title="Custom Open & Close Button"
              renderOpenComponent={({
                isOpen,
                "data-element": dataElement,
                onClick,
                ref,
                "aria-label": ariaLabel,
                id,
                "aria-expanded": ariaExpanded,
                "aria-haspopup": ariaHasPopup,
              }) => (
                <Button
                  iconType={!isOpen ? "filter_new" : "close"}
                  iconPosition="after"
                  data-element={dataElement}
                  aria-label={ariaLabel}
                  aria-haspopup={ariaHasPopup}
                  aria-expanded={ariaExpanded}
                  ref={ref}
                  id={id}
                  onClick={onClick}
                >
                  Filter
                </Button>
              )}
              renderCloseComponent={({
                "data-element": dataElement,
                onClick,
                ref,
                "aria-label": ariaLabel,
              }) => (
                <Button
                  data-element={dataElement}
                  aria-label={ariaLabel}
                  ref={ref}
                  onClick={onClick}
                >
                  Close
                </Button>
              )}
            >
              Popover Content
            </PopoverContainer>
          </Box>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", { name: /open/i });
    await userEvent.click(openButton);

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.keyboard(" ");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const ComplexPopoverContainerInDialog: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    return (
      <Box height={330}>
        <PopoverContainer
          title="Popover Container Title"
          open={open}
          onOpen={onOpen}
          onClose={onClose}
        >
          <Link href="#example">This is example link text</Link>
          <Box p="25px 0 15px 0">
            <Button>Small</Button>
            <Button ml={2}>Compact</Button>
          </Box>
          <Box mt="4px" mb="4px">
            <Select
              name="simple"
              id="simple"
              label="color"
              labelInline
              value=""
              onChange={() => {}}
            >
              <Option text="Amber" value="1" />
              <Option text="Black" value="2" />
              <Option text="Blue" value="3" />
              <Option text="Brown" value="4" />
              <Option text="Green" value="5" />
              <Option text="Orange" value="6" />
              <Option text="Pink" value="7" />
              <Option text="Purple" value="8" />
              <Option text="Red" value="9" />
              <Option text="White" value="10" />
              <Option text="Yellow" value="11" />
            </Select>
          </Box>
          <DraggableContainer>
            <DraggableItem key="1" id={1}>
              <Checkbox
                name="one"
                label="Draggable Label One"
                checked
                onChange={() => {}}
              />
            </DraggableItem>
            <DraggableItem key="2" id={2}>
              <Checkbox
                name="two"
                label="Draggable Label Two"
                checked
                onChange={() => {}}
              />
            </DraggableItem>
            <DraggableItem key="3" id={3}>
              <Checkbox
                name="three"
                label="Draggable Label Three"
                checked
                onChange={() => {}}
              />
            </DraggableItem>
            <DraggableItem key="4" id={4}>
              <Checkbox
                name="four"
                label="Draggable Label Four"
                checked
                onChange={() => {}}
              />
            </DraggableItem>
          </DraggableContainer>
        </PopoverContainer>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", {
      name: /popover container title/i,
    });
    await userEvent.click(openButton);

    const dropdown = document.querySelector("[role='combobox']");

    if (dropdown) await fireEvent.click(dropdown);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ComplexPopoverContainerInDialog.storyName = "Complex";
