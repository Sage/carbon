import React from "react";
import { StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "storybook/test";
import {
  MenuItem,
  MenuItemDivider,
  MenuItemHeading,
  MenuItemLabel,
  MenuItemLeading,
  MenuItemSubtext,
  PopoverMenu,
  PopoverMenuProps,
} from ".";
import Icon from "../../components/icon";
import TextInput from "../../components/textbox/__internal__/__next__";
import ButtonNext from "../../components/button/__next__";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";

export default {
  title: "Popover Menu/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

const items = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
];

type Size = NonNullable<PopoverMenuProps["size"]>;
type Width = NonNullable<PopoverMenuProps["width"]>;

const PopoverMenuWithState = ({
  size,
  hasDisabledItem,
  hasSelection,
  width,
}: {
  size: Size;
  hasDisabledItem?: boolean;
  hasSelection?: boolean;
  width?: Width;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(hasSelection ? "Delta" : "");

  return (
    <div style={{ margin: "220px" }}>
      <PopoverMenu<HTMLInputElement>
        size={size}
        width={width}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        popoverControl={(ref, props) => (
          <TextInput
            size={size}
            label={size}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={ref}
            {...props}
            onClick={() => setOpen((p) => !p)}
          />
        )}
      >
        {items.map((item, i) => (
          <MenuItem
            key={item}
            onClick={() => {
              setOpen(false);
              setValue(item);
            }}
            selected={value === item}
            disabled={hasDisabledItem && item === "Gamma"}
          >
            <MenuItemLeading selectedIcon={value === item}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix={`${i + 1}: `}>{item}</MenuItemLabel>
            {i % 3 === 0 && <MenuItemSubtext>Subtext</MenuItemSubtext>}
          </MenuItem>
        ))}
        <MenuItemDivider />
        <MenuItemHeading text="More options">
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Extra");
            }}
            selected={value === "Extra"}
          >
            <MenuItemLeading selectedIcon={value === "Extra"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel>Extra</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

const PopoverMenuButtonsWithState = ({
  size,
  hasDisabledItem,
  width,
}: {
  size: Size;
  hasDisabledItem?: boolean;
  hasSelection?: boolean;
  width?: Width;
}) => {
  const [open, setOpen] = React.useState(false);
  const [openSubmenu, setOpenSubmenu] = React.useState(false);

  return (
    <div style={{ margin: "220px" }}>
      <PopoverMenu<HTMLButtonElement>
        size={size}
        width={width}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isButtonMenu
        popoverControl={(ref, props) => (
          <ButtonNext
            ref={ref}
            {...props}
            size={size}
            onClick={() => setOpen((p) => !p)}
          >
            Trigger
          </ButtonNext>
        )}
      >
        {items.map((item, i) => (
          <MenuItem
            key={item}
            submenuOpen={i === 5 ? openSubmenu : undefined}
            onSubmenuOpen={() => setOpenSubmenu(true)}
            onSubmenuClose={() => setOpenSubmenu(false)}
            submenu={
              i === 5 ? (
                <>
                  <ButtonNext>Submenu</ButtonNext>
                  <ButtonNext>Submenu</ButtonNext>
                </>
              ) : undefined
            }
          >
            <ButtonNext disabled={hasDisabledItem && item === "Gamma"}>
              {item}
            </ButtonNext>
          </MenuItem>
        ))}
        <MenuItemDivider />
        <ButtonNext>Extra</ButtonNext>
      </PopoverMenu>
    </div>
  );
};

type Story = StoryObj<typeof PopoverMenuWithState>;

const storyParams = {
  chromatic: { disableSnapshot: false },
};

const decorator = (StoryToRender: React.ComponentType): React.ReactElement => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <StoryToRender />
  </div>
);

const getQueries = (isButtonMenu?: boolean) => {
  const triggerQuery = isButtonMenu ? "button" : "combobox";
  const listboxQuery = isButtonMenu ? "list" : "listbox";
  const itemQuery = isButtonMenu ? "button" : "option";

  return { triggerQuery, listboxQuery, itemQuery };
};

const playKeyboardDown = async ({
  canvasElement,
  isButtonMenu,
}: {
  canvasElement: HTMLElement;
  isButtonMenu?: boolean;
}) => {
  if (!allowInteractions()) return;

  const { triggerQuery, listboxQuery, itemQuery } = getQueries(isButtonMenu);
  const canvas = within(canvasElement);
  const triggerControl = canvas.getByRole(triggerQuery);
  if (!isButtonMenu) {
    await userEvent.click(triggerControl);
  } else {
    triggerControl.focus();
  }

  for (let i = 0; i < 11; i++) {
    await userEvent.keyboard("{ArrowDown}");
  }

  const listboxes = await within(document.body).findAllByRole(listboxQuery);

  await expect(listboxes[0]).toBeVisible();

  await waitFor(() => {
    const allOptions = within(listboxes[0]).getAllByRole(itemQuery);

    if (isButtonMenu) {
      // Does not loop, Gamma disabled so skipped, lands on Extra and stops
      expect(allOptions[8]).toHaveFocus();
      expect(allOptions[7]).not.toHaveFocus();

      return;
    }
    // Loop from first, Gamma disabled so skipped, land on Delta
    expect(allOptions[3]).toHaveAttribute("data-has-focus", "true");
    expect(allOptions[2]).not.toHaveAttribute("data-has-focus", "true");
  });
};

const playKeyboardUp = async ({
  canvasElement,
  isButtonMenu,
}: {
  canvasElement: HTMLElement;
  isButtonMenu?: boolean;
}) => {
  if (!allowInteractions()) return;

  const canvas = within(canvasElement);
  const { triggerQuery, listboxQuery, itemQuery } = getQueries(isButtonMenu);
  const triggerControl = canvas.getByRole(triggerQuery);
  if (!isButtonMenu) {
    await userEvent.click(triggerControl);
  } else {
    triggerControl.focus();
  }

  for (let i = 10; i > 0; i--) {
    await userEvent.keyboard("{ArrowUp}");
  }

  const listboxes = await within(document.body).findAllByRole(listboxQuery);

  await expect(listboxes[0]).toBeVisible();

  await waitFor(() => {
    const allOptions = within(listboxes[0]).getAllByRole(itemQuery);

    if (isButtonMenu) {
      // Does not loop, Gamma disabled so skipped, lands on Alpha and stops
      expect(allOptions[0]).toHaveFocus();
      expect(allOptions[1]).not.toHaveFocus();

      return;
    }

    // Loop from last, Gamma disabled so skipped, land on Theta
    expect(allOptions[7]).toHaveAttribute("data-has-focus", "true");
    expect(allOptions[2]).not.toHaveAttribute("data-has-focus", "true");
  });
};

const playKeyboardWithSubmenu = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  if (!allowInteractions()) return;

  const { triggerQuery, listboxQuery, itemQuery } = getQueries(true);
  const canvas = within(canvasElement);
  const triggerControl = canvas.getByRole(triggerQuery);
  await userEvent.click(triggerControl);

  for (let i = 4; i > 0; i--) {
    await userEvent.keyboard("{ArrowDown}");
  }

  await userEvent.keyboard("{ArrowRight}");

  const list = await within(document.body).findAllByRole(listboxQuery);

  await expect(list[0]).toBeVisible();
  await expect(list[1]).toBeVisible();

  await waitFor(() => {
    const submenuOptions = within(list[1]).getAllByRole(itemQuery);

    // Does not loop, Gamma disabled so skipped, lands on Alpha and stops
    expect(submenuOptions[0]).toHaveFocus();
  });
};

const playSelectedItemFocused = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  if (!allowInteractions()) return;

  const canvas = within(canvasElement);
  const input = canvas.getByRole("combobox") as HTMLInputElement;
  await userEvent.click(input);

  const listboxes = await within(document.body).findAllByRole("listbox");
  await expect(listboxes[0]).toBeVisible();

  await userEvent.keyboard("{ArrowUp}");

  await waitFor(() => {
    const options = within(document.body).getAllByRole("option");
    // Delta is pre-selected it should receive virtual focus
    expect(options[3]).toHaveAttribute("data-has-focus", "true");
  });
};

export const SmallKeyboardDown: Story = {
  render: () => <PopoverMenuWithState size="small" hasDisabledItem />,
  play: ({ canvasElement }) =>
    playKeyboardDown({ canvasElement, isButtonMenu: false }),
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SmallKeyboardDown.storyName =
  "small — navigation arrow down skips disabled item";
SmallKeyboardDown.parameters = storyParams;

export const SmallKeyboardDownButtons: Story = {
  render: () => <PopoverMenuButtonsWithState size="small" hasDisabledItem />,
  play: ({ canvasElement }) =>
    playKeyboardDown({ canvasElement, isButtonMenu: true }),
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SmallKeyboardDownButtons.storyName =
  "small with buttons — navigation arrow down skips disabled item";
SmallKeyboardDownButtons.parameters = storyParams;

export const MediumKeyboardDown: Story = {
  render: () => <PopoverMenuWithState size="medium" hasDisabledItem />,
  play: playKeyboardDown,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
MediumKeyboardDown.storyName =
  "medium — navigation arrow down skips disabled item";
MediumKeyboardDown.parameters = storyParams;

export const MediumKeyboardDownButtons: Story = {
  render: () => <PopoverMenuButtonsWithState size="medium" hasDisabledItem />,
  play: ({ canvasElement }) =>
    playKeyboardDown({ canvasElement, isButtonMenu: true }),
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
MediumKeyboardDownButtons.storyName =
  "medium with buttons — navigation arrow down skips disabled item";
MediumKeyboardDownButtons.parameters = storyParams;

export const LargeKeyboardDown: Story = {
  render: () => <PopoverMenuWithState size="large" hasDisabledItem />,
  play: playKeyboardDown,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
LargeKeyboardDown.storyName =
  "large — navigation arrow down skips disabled item";
LargeKeyboardDown.parameters = storyParams;

export const LargeKeyboardDownButtons: Story = {
  render: () => <PopoverMenuButtonsWithState size="large" hasDisabledItem />,
  play: ({ canvasElement }) =>
    playKeyboardDown({ canvasElement, isButtonMenu: true }),
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
LargeKeyboardDownButtons.storyName =
  "large with buttons — navigation arrow down skips disabled item";
LargeKeyboardDownButtons.parameters = storyParams;

export const SmallKeyboardUp: Story = {
  render: () => <PopoverMenuWithState size="small" hasDisabledItem />,
  play: playKeyboardUp,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SmallKeyboardUp.storyName = "small — navigation arrow up skips disabled item";
SmallKeyboardUp.parameters = storyParams;

export const SmallKeyboardUpButtons: Story = {
  render: () => <PopoverMenuButtonsWithState size="small" hasDisabledItem />,
  play: ({ canvasElement }) =>
    playKeyboardUp({ canvasElement, isButtonMenu: true }),
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SmallKeyboardUpButtons.storyName =
  "small with buttons — navigation arrow up skips disabled item";
SmallKeyboardUpButtons.parameters = storyParams;

export const MediumKeyboardUp: Story = {
  render: () => <PopoverMenuWithState size="medium" hasDisabledItem />,
  play: playKeyboardUp,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
MediumKeyboardUp.storyName = "medium — navigation arrow up skips disabled item";
MediumKeyboardUp.parameters = storyParams;

export const MediumKeyboardUpButtons: Story = {
  render: () => <PopoverMenuButtonsWithState size="medium" hasDisabledItem />,
  play: ({ canvasElement }) =>
    playKeyboardUp({ canvasElement, isButtonMenu: true }),
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
MediumKeyboardUpButtons.storyName =
  "medium with buttons — navigation arrow up skips disabled item";
MediumKeyboardUpButtons.parameters = storyParams;

export const LargeKeyboardUp: Story = {
  render: () => <PopoverMenuWithState size="large" hasDisabledItem />,
  play: playKeyboardUp,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
LargeKeyboardUp.storyName = "large — navigation arrow up skips disabled item";
LargeKeyboardUp.parameters = storyParams;

export const LargeKeyboardUpButtons: Story = {
  render: () => <PopoverMenuButtonsWithState size="large" hasDisabledItem />,
  play: ({ canvasElement }) =>
    playKeyboardUp({ canvasElement, isButtonMenu: true }),
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
LargeKeyboardUpButtons.storyName =
  "large with buttons — navigation arrow up skips disabled item";
LargeKeyboardUpButtons.parameters = storyParams;

export const CustomWidth: Story = {
  render: () => (
    <PopoverMenuWithState size="medium" width="400px" hasDisabledItem />
  ),
  play: playKeyboardDown,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
CustomWidth.storyName = "custom width with middle item highlighted";
CustomWidth.parameters = storyParams;

export const CustomWidthButtons: Story = {
  render: () => (
    <PopoverMenuButtonsWithState size="medium" width="400px" hasDisabledItem />
  ),
  play: ({ canvasElement }) =>
    playKeyboardDown({ canvasElement, isButtonMenu: true }),
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
CustomWidthButtons.storyName = "custom width with buttons";
CustomWidthButtons.parameters = storyParams;

export const SelectedItemFocusedWithIcon: Story = {
  render: () => <PopoverMenuWithState size="medium" hasSelection />,
  play: playSelectedItemFocused,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SelectedItemFocusedWithIcon.storyName =
  "enter with pre-selected item — focuses selected item with icon";
SelectedItemFocusedWithIcon.parameters = storyParams;

export const SmallButtonsAndSubmenu: Story = {
  render: () => <PopoverMenuButtonsWithState size="small" hasDisabledItem />,
  play: playKeyboardWithSubmenu,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SmallButtonsAndSubmenu.storyName = "small with buttons and submenu";
SmallButtonsAndSubmenu.parameters = storyParams;

export const MediumButtonsAndSubmenu: Story = {
  render: () => <PopoverMenuButtonsWithState size="medium" hasDisabledItem />,
  play: playKeyboardWithSubmenu,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
MediumButtonsAndSubmenu.storyName = "medium with buttons and submenu";
MediumButtonsAndSubmenu.parameters = storyParams;

export const LargeButtonsAndSubmenu: Story = {
  render: () => <PopoverMenuButtonsWithState size="large" hasDisabledItem />,
  play: playKeyboardWithSubmenu,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
LargeButtonsAndSubmenu.storyName = "large with buttons and submenu";
LargeButtonsAndSubmenu.parameters = storyParams;
