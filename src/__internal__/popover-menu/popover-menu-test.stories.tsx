import React from "react";
import {
  MenuItem,
  MenuItemDivider,
  PopoverMenu,
  MenuItemHeading,
  MenuItemLabel,
  MenuItemLeading,
  MenuItemSubtext,
} from ".";
import Icon from "../../components/icon";

import TextInput from "../../components/textbox/__internal__/__next__";
import ButtonNext from "../../components/button/__next__";

export default {
  title: "Popover Menu/Test",
  includeStories: [
    "Small",
    "SmallWithDisabledItems",
    "SmallWithCustomWidth",
    "Medium",
    "MediumWithDisabledItems",
    "MediumWithCustomWidth",
    "Large",
    "LargeWithDisabledItems",
    "LargeWithCustomWidth",
    "HoverItem",
    "PopoverMenuButtonSmall",
    "PopoverMenuButtonMedium",
    "PopoverMenuButtonLarge",
    "PopoverMenuButtonSmallDisabledItems",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Small = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
      <PopoverMenu<HTMLInputElement>
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="small"
            label="small"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
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
            <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

Small.storyName = "small";

export const SmallWithDisabledItems = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
      <PopoverMenu<HTMLInputElement>
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="small"
            label="small"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("One");
            }}
            selected={value === "One"}
            disabled
          >
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItemHeading text="Heading">
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Six");
            }}
            disabled
          >
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">six</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Seven");
            }}
            selected={value === "Seven"}
          >
            <MenuItemLeading selectedIcon={value === "Seven"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">seven</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Eight");
            }}
            selected={value === "Eight"}
          >
            <MenuItemLeading selectedIcon={value === "Eight"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">eight</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

SmallWithDisabledItems.storyName = "small with disabled items";

export const SmallWithCustomWidth = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
      <PopoverMenu<HTMLInputElement>
        width="300px"
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="small"
            label="small"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
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
            <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

SmallWithCustomWidth.storyName = "small with custom width";

export const Medium = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "210px 180px 180px" }}>
      <PopoverMenu<HTMLInputElement>
        size="medium"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="medium"
            label="medium"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
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
            <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

Medium.storyName = "medium";

export const MediumWithDisabledItems = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "250px 180px 180px" }}>
      <PopoverMenu<HTMLInputElement>
        size="medium"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="medium"
            label="medium"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("One");
            }}
            selected={value === "One"}
            disabled
          >
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItemHeading text="Heading">
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Six");
            }}
            disabled
          >
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">six</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Seven");
            }}
            selected={value === "Seven"}
          >
            <MenuItemLeading selectedIcon={value === "Seven"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">seven</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Eight");
            }}
            selected={value === "Eight"}
          >
            <MenuItemLeading selectedIcon={value === "Eight"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">eight</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

MediumWithDisabledItems.storyName = "medium with disabled items";

export const MediumWithCustomWidth = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "210px 180px 180px" }}>
      <PopoverMenu<HTMLInputElement>
        width="300px"
        size="medium"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="medium"
            label="medium"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
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
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItemHeading text="Heading">
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

MediumWithCustomWidth.storyName = "medium with custom width";

export const Large = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "250px 180px 180px" }}>
      <PopoverMenu<HTMLInputElement>
        size="large"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="large"
            label="large"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
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
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItemHeading text="Heading">
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

Large.storyName = "large";

export const LargeWithDisabledItems = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "250px 180px 180px" }}>
      <PopoverMenu<HTMLInputElement>
        size="large"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="large"
            label="large"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("One");
            }}
            selected={value === "One"}
            disabled
          >
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItemHeading text="Heading">
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Six");
            }}
            disabled
          >
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">six</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Seven");
            }}
            selected={value === "Seven"}
          >
            <MenuItemLeading selectedIcon={value === "Seven"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">seven</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Eight");
            }}
            selected={value === "Eight"}
          >
            <MenuItemLeading selectedIcon={value === "Eight"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">eight</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

LargeWithDisabledItems.storyName = "large with disabled items";

export const LargeWithCustomWidth = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "250px 180px 180px" }}>
      <PopoverMenu<HTMLInputElement>
        width="300px"
        size="large"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, props) => (
          <TextInput
            size="large"
            label="large"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab" && open) {
                setOpen(false);
                return;
              }

              if ((e.key === "Enter" || e.key === "ArrowDown") && !open) {
                setOpen(true);
              }
            }}
            onClick={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
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
            <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Four");
            }}
            selected={value === "Four"}
          >
            <MenuItemLeading selectedIcon={value === "Four"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(false);
              setValue("Five");
            }}
            selected={value === "Five"}
          >
            <MenuItemLeading selectedIcon={value === "Five"}>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </PopoverMenu>
    </div>
  );
};

LargeWithCustomWidth.storyName = "large with custom width";

export const HoverItem = () => {
  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
      <PopoverMenu<HTMLInputElement>
        size="large"
        open
        onOpen={() => {}}
        onClose={() => {}}
        popoverControl={(ref, props) => (
          <TextInput
            size="large"
            label="large"
            value={""}
            onChange={() => {}}
            ref={ref}
            {...props}
          />
        )}
      >
        <MenuItemHeading text="Heading">
          <MenuItem onClick={() => {}}>
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
          <MenuItem data-role="hover-target" onClick={() => {}}>
            <MenuItemLeading selectedIcon>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">two</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
          <MenuItem>
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">three</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItem disabled>
          <MenuItemLeading>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItem>
          <MenuItemLeading>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItem>
          <MenuItemLeading>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">six</MenuItemLabel>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

HoverItem.storyName = "hover item";

HoverItem.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: {
    hover: "[data-role='hover-target']",
  },
};

export const PopoverMenuButtonSmall = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [submenuOpen, setSubmenuOpen] = React.useState<boolean>(false);

  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
      <PopoverMenu
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, { role, ...props }) => (
          <ButtonNext
            ref={ref}
            {...props}
            onClick={() => setOpen((p) => !p)}
            variantType="tertiary"
            size="small"
          >
            Small Button
          </ButtonNext>
        )}
        isButtonMenu
      >
        <MenuItem>
          <ButtonNext>
            <Icon type="home" />
            Action 1
          </ButtonNext>
        </MenuItem>
        <MenuItem
          onSubmenuClose={() => {
            setSubmenuOpen(false);
          }}
          onSubmenuOpen={() => setSubmenuOpen(true)}
          submenuOpen={submenuOpen}
          submenuWidth="200px"
          submenu={
            <>
              <ButtonNext onClick={() => alert("clicked submenu 1")}>
                <Icon type="home" />
                Subaction 1
              </ButtonNext>
              <ButtonNext onClick={() => alert("clicked submenu 2")}>
                <Icon type="home" />
                Subaction 2
              </ButtonNext>
            </>
          }
        >
          <ButtonNext onClick={() => setSubmenuOpen((p) => !p)}>
            <Icon type="home" />
            Action 2
          </ButtonNext>
        </MenuItem>
        <MenuItem>
          <ButtonNext>
            <Icon type="home" />
            Action 3
          </ButtonNext>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

PopoverMenuButtonSmall.storyName = "popover menu with buttons small";

export const PopoverMenuButtonSmallDisabledItems = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [submenuOpen, setSubmenuOpen] = React.useState<boolean>(false);

  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
      <PopoverMenu
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, { role, ...props }) => (
          <ButtonNext
            ref={ref}
            {...props}
            onClick={() => setOpen((p) => !p)}
            variantType="tertiary"
            size="small"
          >
            Small Button
          </ButtonNext>
        )}
        isButtonMenu
      >
        <MenuItem>
          <ButtonNext>
            <Icon type="home" />
            Action 1
          </ButtonNext>
        </MenuItem>
        <MenuItem
          onSubmenuClose={() => {
            setSubmenuOpen(false);
          }}
          onSubmenuOpen={() => setSubmenuOpen(true)}
          submenuOpen={submenuOpen}
          submenuWidth="200px"
          disabled
          submenu={
            <>
              <ButtonNext onClick={() => alert("clicked submenu 1")} disabled>
                <Icon type="home" />
                Subaction 1
              </ButtonNext>
              <ButtonNext onClick={() => alert("clicked submenu 2")}>
                <Icon type="home" />
                Subaction 2
              </ButtonNext>
            </>
          }
        >
          <ButtonNext onClick={() => setSubmenuOpen((p) => !p)}>
            <Icon type="home" />
            Action 2
          </ButtonNext>
        </MenuItem>
        <MenuItem>
          <ButtonNext>
            <Icon type="home" />
            Action 3
          </ButtonNext>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

PopoverMenuButtonSmallDisabledItems.storyName =
  "popover menu with buttons small disabled items";

export const PopoverMenuButtonMedium = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [submenuOpen, setSubmenuOpen] = React.useState<boolean>(false);

  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
      <PopoverMenu
        size="medium"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
          }
        }}
        popoverControl={(ref, { role, ...props }) => (
          <ButtonNext
            ref={ref}
            {...props}
            onClick={() => setOpen((p) => !p)}
            variantType="tertiary"
            size="medium"
          >
            Medium Button
          </ButtonNext>
        )}
        isButtonMenu
        width="200px"
      >
        <MenuItem>
          <ButtonNext>
            <Icon type="home" />
            Action 1
          </ButtonNext>
        </MenuItem>
        <MenuItem
          onSubmenuClose={() => {
            setSubmenuOpen(false);
          }}
          onSubmenuOpen={() => setSubmenuOpen(true)}
          submenuOpen={submenuOpen}
          submenuWidth="200px"
          submenu={
            <>
              <ButtonNext onClick={() => alert("clicked submenu 1")}>
                <Icon type="home" />
                Subaction 1
              </ButtonNext>
              <ButtonNext onClick={() => alert("clicked submenu 2")}>
                <Icon type="home" />
                Subaction 2
              </ButtonNext>
            </>
          }
        >
          <ButtonNext onClick={() => setSubmenuOpen((p) => !p)}>
            <Icon type="home" />
            Action 2
          </ButtonNext>
        </MenuItem>
        <MenuItem>
          <ButtonNext>
            <Icon type="home" />
            Action 3
          </ButtonNext>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

PopoverMenuButtonMedium.storyName = "popover menu with buttons medium";

export const PopoverMenuButtonLarge = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [submenuOpen, setSubmenuOpen] = React.useState<boolean>(false);

  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
      <PopoverMenu
        size="large"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          if (open) {
            setOpen(false);
            setSubmenuOpen(false);
          }
        }}
        popoverControl={(ref, { role, ...props }) => (
          <ButtonNext
            ref={ref}
            {...props}
            onClick={() => setOpen((p) => !p)}
            variantType="tertiary"
            size="large"
          >
            Large Button
          </ButtonNext>
        )}
        isButtonMenu
      >
        <MenuItem>
          <ButtonNext>
            <Icon type="home" />
            Action 1
          </ButtonNext>
        </MenuItem>
        <MenuItem
          onSubmenuClose={() => {
            setSubmenuOpen(false);
          }}
          onSubmenuOpen={() => setSubmenuOpen(true)}
          submenuOpen={submenuOpen}
          submenuWidth="200px"
          submenu={
            <>
              <ButtonNext onClick={() => alert("clicked submenu 1")}>
                <Icon type="home" />
                Subaction 1
              </ButtonNext>
              <ButtonNext onClick={() => alert("clicked submenu 2")}>
                <Icon type="home" />
                Subaction 2
              </ButtonNext>
            </>
          }
        >
          <ButtonNext onClick={() => setSubmenuOpen((p) => !p)}>
            <Icon type="home" />
            Action 2
          </ButtonNext>
        </MenuItem>
        <MenuItem>
          <ButtonNext>
            <Icon type="home" />
            Action 3
          </ButtonNext>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

PopoverMenuButtonLarge.storyName = "popover menu with buttons large";
