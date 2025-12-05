import React from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, screen, expect, waitFor } from "@storybook/test";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

import Button from "../../components/button";
import DateInput from "../../components/date";
import Dialog from "../../components/dialog";
import { Option, Select } from "../../components/select";
import Box from "../../components/box";
import PopoverContainer from "../../components/popover-container";
import AdvancedColorPicker from "../../components/advanced-color-picker";
import {
  ActionPopover,
  ActionPopoverItem,
  ActionPopoverMenu,
} from "../../components/action-popover";
import { Menu, MenuItem } from "../../components/menu";
import MultiActionButton from "../../components/multi-action-button";
import Link from "../../components/link";
import { DraggableContainer, DraggableItem } from "../../components/draggable";
import { Checkbox } from "../../components/checkbox";
import Form from "../../components/form";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableCheckbox,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
  FlatTableRowHeader,
} from "../../components/flat-table";
import Typography from "../../components/typography";
import GlobalHeader from "../../components/global-header";

/**
 * The following stories are designed to provide visual checks to aid
 * in identifying any regressions that may occur as a result of changes
 * to a component's z-index values. They will only appear in builds
 * where the IGNORE_TESTS flag is not set, or set to false (i.e. in
 * the main documentation they will be unavailable)
 */

export default {
  title: "Internals/Z-Indexing",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const DateInputInDialog: StoryObj = {
  render: () => (
    <Dialog open>
      <Form
        stickyFooter
        saveButton={<Button buttonType="primary">Accept</Button>}
      >
        <DateInput
          label="Date"
          name="date-input"
          value="04/04/2019"
          onChange={() => {}}
        />
      </Form>
    </Dialog>
  ),
  play: async () => {
    if (!allowInteractions()) return;

    const modal = screen.getByTestId("modal");
    await waitFor(async () => {
      await expect(modal).toHaveAttribute("data-state", "open");
    });

    const icon = await screen.findByTestId("icon");
    await userEvent.click(icon);

    const datePicker = await screen.findByTestId("date-picker");
    expect(datePicker).toBeVisible();
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
  render: () => (
    <Dialog open>
      <Box mt="40px">
        <AdvancedColorPicker
          name="color"
          selectedColor="orchid"
          availableColors={[
            { value: "#FFFFFF", label: "white" },
            { value: "#000000", label: "black" },
            { value: "#AEECD6", label: "mint" },
            { value: "#EBAEDE", label: "orchid" },
          ]}
          onChange={() => {}}
          open
        />
      </Box>
    </Dialog>
  ),
};

export const ActionPopoverInDialog: StoryObj = {
  render: () => (
    <Dialog open>
      <Box mt="40px">
        <ActionPopover>
          <ActionPopoverItem
            icon="csv"
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem icon="graph">Sub Menu 1</ActionPopoverItem>
                <ActionPopoverItem icon="add">Sub Menu 2</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            Download CSV
          </ActionPopoverItem>
        </ActionPopover>
      </Box>
    </Dialog>
  ),
  play: async () => {
    if (!allowInteractions()) return;

    const modal = screen.getByTestId("modal");
    await waitFor(async () => {
      await expect(modal).toHaveAttribute("data-state", "open");
    });

    const actions = screen.getByRole("button", { name: /actions/i });
    await userEvent.click(actions);

    const downloadCSV = await screen.findByRole("button", {
      name: /download csv/i,
    });
    await userEvent.click(downloadCSV);

    const submenu1 = await screen.findByRole("button", { name: /sub menu 1/i });
    expect(submenu1).toBeVisible();
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
  render: () => (
    <Dialog open>
      <Form
        stickyFooter
        saveButton={<Button buttonType="primary">Accept</Button>}
      >
        <Box mt="40px">
          <Select
            name="simple"
            id="simple"
            label="Color"
            value={""}
            onChange={() => {}}
          >
            <Option text="Red" value="red" />
            <Option text="Blue" value="blue" />
            <Option text="Green" value="green" />
            <Option text="Yellow" value="yellow" />
            <Option text="Black" value="black" />
            <Option text="White" value="white" />
          </Select>
        </Box>
      </Form>
    </Dialog>
  ),
  play: async () => {
    if (!allowInteractions()) return;

    const modal = screen.getByTestId("modal");
    await waitFor(async () => {
      await expect(modal).toHaveAttribute("data-state", "open");
    });

    const select = screen.getByRole("combobox", { name: /color/i });
    await userEvent.click(select);

    const option = await screen.findByRole("option", { name: /red/i });
    await waitFor(async () => {
      await expect(option).toBeVisible();
    });
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
  render: () => (
    <Dialog open>
      <Form
        stickyFooter
        saveButton={<Button buttonType="primary">Accept</Button>}
      >
        <MultiActionButton text="Multi Action Button">
          <Button onClick={() => {}}>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </MultiActionButton>
      </Form>
    </Dialog>
  ),
  play: async () => {
    if (!allowInteractions()) return;

    const modal = screen.getByTestId("modal");
    await waitFor(async () => {
      await expect(modal).toHaveAttribute("data-state", "open");
    });

    const multiActionButton = screen.getByRole("button", {
      name: /multi action button/i,
    });
    await userEvent.click(multiActionButton);

    const button1 = await screen.findByRole("button", { name: /button 1/i });
    expect(button1).toBeVisible();
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
  render: () => (
    <Dialog open>
      <Form
        stickyFooter
        saveButton={<Button buttonType="primary">Accept</Button>}
      >
        <PopoverContainer
          title="Filter"
          renderOpenComponent={({ ref, ...rest }) => (
            <Button
              iconPosition="after"
              iconType="filter_new"
              ref={ref}
              {...rest}
            >
              Filter
            </Button>
          )}
        >
          <Box py={4}>Popover Content</Box>
        </PopoverContainer>
      </Form>
    </Dialog>
  ),
  play: async () => {
    if (!allowInteractions()) return;

    const modal = screen.getByTestId("modal");
    await waitFor(async () => {
      await expect(modal).toHaveAttribute("data-state", "open");
    });

    const popoverButton = screen.getByRole("button", { name: /filter/i });
    await userEvent.click(popoverButton);

    const popover = await screen.findByRole("dialog", { name: /filter/i });
    await waitFor(async () => {
      await expect(popover).toBeVisible();
    });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const ComplexPopoverContainer: StoryObj = {
  render: () => (
    <Box height={330}>
      <PopoverContainer title="Popover Container Title" open>
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
  ),
  play: async () => {
    if (!allowInteractions()) return;

    const select = screen.getByRole("combobox", { name: /color/i });
    await userEvent.click(select);

    const option = await screen.findByRole("option", { name: /amber/i });
    await waitFor(async () => {
      await expect(option).toBeVisible();
    });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const DateInPopoverContainer: StoryObj = {
  render: () => (
    <Box width="100vw" height="100vh">
      <Typography>FlatTableRowHeader should appear below popover</Typography>

      <PopoverContainer
        title="Filter"
        open
        renderOpenComponent={({ ref, ...rest }) => (
          <Button
            iconPosition="after"
            iconType="filter_new"
            ref={ref}
            {...rest}
          >
            Filter
          </Button>
        )}
      >
        <Box py={4}>
          <DateInput
            label="Date"
            name="date-input"
            value="04/04/2019"
            onChange={() => {}}
          />
        </Box>
      </PopoverContainer>
      <FlatTable my={2} width="380px" overflowX="auto" title="FlatTable">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Select</FlatTableHeader>
            <FlatTableRowHeader>Name</FlatTableRowHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-1-cell-1 ft-row-1-cell-2 ft-row-1-cell-3"
              checked
              onChange={() => {}}
            />
            <FlatTableRowHeader id="ft-row-1-cell-1">
              John Doe
            </FlatTableRowHeader>
            <FlatTableCell id="ft-row-1-cell-2">London</FlatTableCell>
            <FlatTableCell id="ft-row-1-cell-3">Single</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCheckbox
              ariaLabelledBy="ft-row-2-cell-1 ft-row-2-cell-2 ft-row-2-cell-3"
              checked
              onChange={() => {}}
            />
            <FlatTableRowHeader id="ft-row-2-cell-1">
              Jane Doe
            </FlatTableRowHeader>
            <FlatTableCell id="ft-row-2-cell-2">York</FlatTableCell>
            <FlatTableCell id="ft-row-2-cell-3">Married</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </Box>
  ),
  play: async () => {
    if (!allowInteractions()) return;

    const icon = document.querySelector(
      '[data-component="icon"][data-element="calendar"]',
    );

    if (icon) await userEvent.click(icon);

    const datePicker = await screen.findByTestId("date-picker");
    expect(datePicker).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const PopoverInGlobalHeader: StoryObj = {
  render: () => (
    <GlobalHeader>
      <Menu menuType="black" flex="1">
        <MenuItem flex="0 0 auto">
          <PopoverContainer
            title="Notifications"
            shouldCoverButton
            open
            renderOpenComponent={({ ref, onClick }) => (
              <Button ref={ref} onClick={onClick}>
                Notifications
              </Button>
            )}
          >
            <Box p={2}>Popover Content</Box>
          </PopoverContainer>
        </MenuItem>
      </Menu>
    </GlobalHeader>
  ),
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
