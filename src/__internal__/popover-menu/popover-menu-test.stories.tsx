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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label small"
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label small"
      >
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("One");
          }}
          selected={value === "One"}
          disabled
        >
          <MenuItemLeading selectedIcon={value === "One"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Four");
          }}
          selected={value === "Four"}
          disabled
        >
          <MenuItemLeading selectedIcon={value === "Four"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Six");
          }}
          selected={value === "Six"}
        >
          <MenuItemLeading selectedIcon={value === "Six"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">six</MenuItemLabel>
        </MenuItem>
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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label small"
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label medium"
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label medium"
      >
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("One");
          }}
          selected={value === "One"}
          disabled
        >
          <MenuItemLeading selectedIcon={value === "One"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Four");
          }}
          selected={value === "Four"}
          disabled
        >
          <MenuItemLeading selectedIcon={value === "Four"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Six");
          }}
          selected={value === "Six"}
        >
          <MenuItemLeading selectedIcon={value === "Six"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">six</MenuItemLabel>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

MediumWithDisabledItems.storyName = "medium with disabled items";

export const MediumWithCustomWidth = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label medium"
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label large"
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label large"
      >
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("One");
          }}
          selected={value === "One"}
          disabled
        >
          <MenuItemLeading selectedIcon={value === "One"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Four");
          }}
          selected={value === "Four"}
          disabled
        >
          <MenuItemLeading selectedIcon={value === "Four"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen(false);
            setValue("Six");
          }}
          selected={value === "Six"}
        >
          <MenuItemLeading selectedIcon={value === "Six"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">six</MenuItemLabel>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

LargeWithDisabledItems.storyName = "large with disabled items";

export const LargeWithCustomWidth = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  return (
    <div style={{ display: "flex", gap: "24px", margin: "180px" }}>
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

              if (e.key === "Enter" && !open) {
                setOpen(true);
              }
            }}
            ref={ref}
            {...props}
          />
        )}
        listboxAriaLabel="List aria label large"
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
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
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
        listboxAriaLabel="List aria label large"
      >
        <MenuItem onClick={() => {}}>
          <MenuItemLeading>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">one</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItemDivider />
        <MenuItemHeading text="Heading">
          <MenuItem data-role="hover-target" onClick={() => {}}>
            <MenuItemLeading selectedIcon>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">two</MenuItemLabel>
            <MenuItemSubtext>Subtext</MenuItemSubtext>
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <MenuItemLeading>
              <Icon type="home" />
            </MenuItemLeading>
            <MenuItemLabel prefix="Item: ">three</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
        <MenuItemDivider />
        <MenuItem onClick={() => {}} disabled>
          <MenuItemLeading>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">four</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <MenuItemLeading>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">five</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <MenuItemLeading>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="Item: ">six</MenuItemLabel>
        </MenuItem>
      </PopoverMenu>
    </div>
  );
};

HoverItem.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: {
    hover: "[data-role='hover-target']",
  },
};
