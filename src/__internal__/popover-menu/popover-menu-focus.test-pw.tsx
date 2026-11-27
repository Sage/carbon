import React, { useState } from "react";
import PopoverMenu from "./popover-menu.component";
import { MenuItem } from "./menu-item";
import Button from "../../components/button/__next__";

const PopoverMenuFocusExample = ({
  disablePortal,
}: {
  disablePortal: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  return (
    <PopoverMenu<HTMLButtonElement>
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => {
        setSubmenuOpen(false);
        setOpen(false);
      }}
      isButtonMenu
      disablePortal={disablePortal}
      popoverControl={(ref, props) => (
        <Button {...props} ref={ref} onClick={() => setOpen(true)}>
          Open focus menu
        </Button>
      )}
    >
      <MenuItem>
        <Button>First action</Button>
      </MenuItem>
      <MenuItem
        submenu={
          <>
            <Button>Nested first action</Button>
            <Button>Nested last action</Button>
          </>
        }
        submenuOpen={submenuOpen}
        onSubmenuOpen={() => setSubmenuOpen(true)}
        onSubmenuClose={() => setSubmenuOpen(false)}
      >
        <Button onClick={() => setSubmenuOpen((value) => !value)}>
          More actions
        </Button>
      </MenuItem>
      <MenuItem>
        <Button>Last action</Button>
      </MenuItem>
    </PopoverMenu>
  );
};

export default PopoverMenuFocusExample;
