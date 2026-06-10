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
        listboxAriaLabel={`${size} list`}
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

type Story = StoryObj<typeof PopoverMenuWithState>;

const storyParams = {
  chromatic: { disableSnapshot: false },
};

const decorator = (StoryToRender: React.ComponentType): React.ReactElement => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <StoryToRender />
  </div>
);

const playKeyboardDown = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  if (!allowInteractions()) return;

  const canvas = within(canvasElement);
  const input = canvas.getByRole("combobox");
  await userEvent.click(input);

  await expect(await within(document.body).findByRole("listbox")).toBeVisible();

  for (let i = 0; i < 11; i++) {
    await userEvent.keyboard("{ArrowDown}");
  }

  await waitFor(() => {
    const allOptions = within(document.body).getAllByRole("option");

    // Loop from first, Gamma disabled so skipped, land on Delta
    expect(allOptions[3]).toHaveFocus();
    expect(allOptions[2]).not.toHaveFocus();
  });
};

const playKeyboardUp = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  if (!allowInteractions()) return;

  const canvas = within(canvasElement);
  const input = canvas.getByRole("combobox");
  await userEvent.click(input);

  await expect(await within(document.body).findByRole("listbox")).toBeVisible();

  for (let i = 10; i > 0; i--) {
    await userEvent.keyboard("{ArrowUp}");
  }

  await waitFor(() => {
    const allOptions = within(document.body).getAllByRole("option");

    // Loop from last, Gamma disabled so skipped, land on Theta
    expect(allOptions[7]).toHaveFocus();
    expect(allOptions[2]).not.toHaveFocus();
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

  await expect(await within(document.body).findByRole("listbox")).toBeVisible();

  await userEvent.keyboard("{ArrowUp}");

  await waitFor(() => {
    const options = within(document.body).getAllByRole("option");
    // Delta is pre-selected it should receive virtual focus
    expect(options[3]).toHaveFocus();
  });
};

export const SmallKeyboardDown: Story = {
  render: () => <PopoverMenuWithState size="small" hasDisabledItem />,
  play: playKeyboardDown,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SmallKeyboardDown.storyName =
  "small — navigation arrow down skips disabled item";
SmallKeyboardDown.parameters = storyParams;

export const MediumKeyboardDown: Story = {
  render: () => <PopoverMenuWithState size="medium" hasDisabledItem />,
  play: playKeyboardDown,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
MediumKeyboardDown.storyName =
  "medium — navigation arrow down skips disabled item";
MediumKeyboardDown.parameters = storyParams;

export const LargeKeyboardDown: Story = {
  render: () => <PopoverMenuWithState size="large" hasDisabledItem />,
  play: playKeyboardDown,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
LargeKeyboardDown.storyName =
  "large — navigation arrow down skips disabled item";
LargeKeyboardDown.parameters = storyParams;

export const SmallKeyboardUp: Story = {
  render: () => <PopoverMenuWithState size="small" hasDisabledItem />,
  play: playKeyboardUp,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SmallKeyboardUp.storyName = "small — navigation arrow up skips disabled item";
SmallKeyboardUp.parameters = storyParams;

export const MediumKeyboardUp: Story = {
  render: () => <PopoverMenuWithState size="medium" hasDisabledItem />,
  play: playKeyboardUp,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
MediumKeyboardUp.storyName = "medium — navigation arrow up skips disabled item";
MediumKeyboardUp.parameters = storyParams;

export const LargeKeyboardUp: Story = {
  render: () => <PopoverMenuWithState size="large" hasDisabledItem />,
  play: playKeyboardUp,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
LargeKeyboardUp.storyName = "large — navigation arrow up skips disabled item";
LargeKeyboardUp.parameters = storyParams;

export const CustomWidth: Story = {
  render: () => (
    <PopoverMenuWithState size="medium" width="400px" hasDisabledItem />
  ),
  play: playKeyboardDown,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
CustomWidth.storyName = "custom width with middle item highlighted";
CustomWidth.parameters = storyParams;

export const SelectedItemFocusedWithIcon: Story = {
  render: () => <PopoverMenuWithState size="medium" hasSelection />,
  play: playSelectedItemFocused,
  decorators: [(StoryToRender) => decorator(StoryToRender)],
};
SelectedItemFocusedWithIcon.storyName =
  "enter with pre-selected item — focuses selected item with icon";
SelectedItemFocusedWithIcon.parameters = storyParams;
