import React, { useState } from "react";
import {
  MenuItem,
  MenuItemDivider,
  MenuItemHeading,
  MenuItemLabel,
  MenuItemLeading,
  MenuItemSubtext,
  PopoverMenu,
} from ".";
import Icon from "../../components/icon";
import TextInput from "../../components/textbox/__internal__/__next__";
import Button from "../../components/button/__next__";

type Size = "small" | "medium" | "large";
interface PopoverMenuComponentProps {
  size?: Size;
  width?: string;
  withDisabledItems?: boolean;
  openByDefault?: boolean;
}

export const PopoverMenuComponent = ({
  size = "medium",
  width,
  withDisabledItems = false,
  openByDefault = false,
}: PopoverMenuComponentProps) => {
  const [open, setOpen] = useState(openByDefault);
  const [value, setValue] = useState("");

  return (
    <div style={{ margin: "200px", paddingBottom: "400px" }}>
      <PopoverMenu<HTMLInputElement>
        size={size}
        width={width}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        popoverControl={(ref, props) => (
          <TextInput
            size={size}
            label="Choose an option"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={ref}
            {...props}
            onClick={() => setOpen((p) => !p)}
          />
        )}
      >
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("One");
          }}
          selected={value === "One"}
        >
          <MenuItemLeading selectedIcon={value === "One"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
          <MenuItemSubtext>Subtext for one</MenuItemSubtext>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Two");
          }}
          selected={value === "Two"}
          disabled={withDisabledItems}
        >
          <MenuItemLeading selectedIcon={value === "Two"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">two</MenuItemLabel>
        </MenuItem>
        <MenuItemDivider />
        <MenuItemHeading text="More options">
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Three");
            }}
            selected={value === "Three"}
          >
            <MenuItemLeading selectedIcon={value === "Three"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">three</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
            disabled={withDisabledItems}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

export const PopoverButtonMenuComponent = ({
  size = "medium",
  width,
  withDisabledItems = false,
  openByDefault = false,
}: PopoverMenuComponentProps) => {
  const [open, setOpen] = useState(openByDefault);
  const [openSubmenu, setOpenSubmenu] = useState(openByDefault);

  return (
    <div style={{ margin: "200px", paddingBottom: "400px" }}>
      <PopoverMenu<HTMLButtonElement>
        size={size}
        width={width}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isButtonMenu
        popoverControl={(ref, { role, ...props }) => (
          <Button
            ref={ref}
            {...props}
            onClick={() => setOpen((p) => !p)}
            data-role="control-button"
          >
            Control
          </Button>
        )}
      >
        <MenuItem>
          <Button>
            <Icon type="home" />
            Action 1
          </Button>
        </MenuItem>
        <MenuItem disabled={withDisabledItems}>
          <Button>
            <Icon type="home" />
            Action 2
          </Button>
        </MenuItem>
        <MenuItem
          onSubmenuOpen={() => setOpenSubmenu(true)}
          onSubmenuClose={() => setOpenSubmenu(false)}
          submenuOpen={openSubmenu}
          submenu={
            <>
              <Button>Subaction 1</Button>
            </>
          }
        >
          <Button>
            <Icon type="home" />
            Action 3
          </Button>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

export const PopoverMenuWithPreselection = ({
  size = "medium",
}: {
  size?: Size;
}) => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("Two");

  return (
    <div style={{ margin: "200px", paddingBottom: "400px" }}>
      <PopoverMenu<HTMLInputElement>
        size={size}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        popoverControl={(ref, props) => (
          <TextInput
            size={size}
            label="Choose an option"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={ref}
            {...props}
            onClick={() => setOpen((p) => !p)}
          />
        )}
      >
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("One");
          }}
          selected={value === "One"}
        >
          <MenuItemLeading selectedIcon={value === "One"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Two");
          }}
          selected={value === "Two"}
        >
          <MenuItemLeading selectedIcon={value === "Two"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">two</MenuItemLabel>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Three");
          }}
          selected={value === "Three"}
        >
          <MenuItemLeading selectedIcon={value === "Three"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">three</MenuItemLabel>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};
