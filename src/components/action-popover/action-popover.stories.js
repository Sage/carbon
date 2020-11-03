import React from "react";
import { action } from "@storybook/addon-actions";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
} from ".";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../.storybook/theme-selectors";
import { Table, TableRow, TableCell, TableHeader } from "../table";

const submenu = (
  <ActionPopoverMenu>
    <ActionPopoverItem onClick={action("sub menu 1")}>
      Sub Menu 1
    </ActionPopoverItem>
    <ActionPopoverItem onClick={action("sub menu 2")}>
      Sub Menu 2
    </ActionPopoverItem>
    <ActionPopoverItem disabled onClick={action("sub menu 3")}>
      Sub Menu 3
    </ActionPopoverItem>
  </ActionPopoverMenu>
);

const submenuWithIcons = (
  <ActionPopoverMenu>
    <ActionPopoverItem icon="graph" onClick={action("sub menu 1")}>
      Sub Menu 1
    </ActionPopoverItem>
    <ActionPopoverItem icon="add" onClick={action("sub menu 2")}>
      Sub Menu 2
    </ActionPopoverItem>
    <ActionPopoverItem icon="print" disabled onClick={action("sub menu 3")}>
      Sub Menu 3
    </ActionPopoverItem>
  </ActionPopoverMenu>
);

export default {
  title: "Design System/Action Popover/Test",
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => (
  <div style={{ marginTop: "40px", height: "275px" }}>
    <Table isZebra>
      <TableRow>
        <TableHeader>First Name</TableHeader>
        <TableHeader>Last Name</TableHeader>
        <TableHeader>&nbsp;</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>John</TableCell>
        <TableCell>Doe</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              disabled
              icon="graph"
              submenu={submenu}
              onClick={action("email")}
            >
              Business
            </ActionPopoverItem>
            <ActionPopoverItem icon="email" onClick={action("email")}>
              Email Invoice
            </ActionPopoverItem>
            <ActionPopoverItem
              icon="print"
              onClick={action("print")}
              submenu={submenu}
            >
              Print Invoice
            </ActionPopoverItem>
            <ActionPopoverItem
              icon="pdf"
              submenu={submenu}
              onClick={action("pdf")}
            >
              Download PDF
            </ActionPopoverItem>
            <ActionPopoverItem icon="csv" onClick={action("csv")}>
              Download CSV
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem icon="delete" onClick={action("delete")}>
              Delete
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jane</TableCell>
        <TableCell>Smith</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem icon="csv" onClick={action("csv")}>
              Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bob</TableCell>
        <TableCell>Jones</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              icon="csv"
              submenu={submenuWithIcons}
              onClick={action("csv")}
            >
              Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
    </Table>
  </div>
);

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};

export const Classic = () => (
  <div style={{ height: "275px" }}>
    <Table isZebra>
      <TableRow>
        <TableHeader>First Name</TableHeader>
        <TableHeader>Last Name</TableHeader>
        <TableHeader>&nbsp;</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>John</TableCell>
        <TableCell>Doe</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              disabled
              icon="graph"
              submenu={submenu}
              onClick={action("business")}
            >
              Business
            </ActionPopoverItem>
            <ActionPopoverItem icon="email" onClick={action("email")}>
              Email Invoice
            </ActionPopoverItem>
            <ActionPopoverItem
              icon="print"
              onClick={action("print")}
              submenu={submenu}
            >
              Print Invoice
            </ActionPopoverItem>
            <ActionPopoverItem
              icon="pdf"
              submenu={submenu}
              onClick={action("pdf")}
            >
              Download PDF
            </ActionPopoverItem>
            <ActionPopoverItem icon="csv" onClick={action("csv")}>
              Download CSV
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem icon="delete" onClick={action("delete")}>
              Delete
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Jane</TableCell>
        <TableCell>Smith</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem icon="csv" onClick={action("csv")}>
              Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bob</TableCell>
        <TableCell>Jones</TableCell>
        <TableCell>
          <ActionPopover>
            <ActionPopoverItem
              icon="csv"
              submenu={submenuWithIcons}
              onClick={action("csv")}
            >
              Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
    </Table>
  </div>
);

Classic.story = {
  name: "classic",
  parameters: {
    themeSelector: classicThemeSelector,
    chromatic: {
      disable: true,
    },
  },
};

export const StylesOverriden = () => (
  <div style={{ marginTop: "40px", height: "275px", maxWidth: "800px" }}>
    <Table isZebra>
      <TableRow>
        <TableHeader colSpan="3">Services</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>Accounting</TableCell>
        <TableCell>Payroll</TableCell>
        <TableCell>
          <ActionPopover
            rightAlignMenu
            renderButton={({ tabIndex, "data-element": dataElement }) => (
              <ActionPopoverMenuButton
                buttonType="tertiary"
                iconType="dropdown"
                iconPosition="after"
                size="small"
                tabIndex={tabIndex}
                data-element={dataElement}
              >
                More
              </ActionPopoverMenuButton>
            )}
          >
            <ActionPopoverItem onClick={action("auto entry")}>
              Auto Entry
            </ActionPopoverItem>
            <ActionPopoverItem onClick={action("corporation tax")}>
              Corporation Tax
            </ActionPopoverItem>
            <ActionPopoverItem onClick={action("final accounts")}>
              Final Accounts
            </ActionPopoverItem>
            <ActionPopoverItem onClick={action("vat centre")}>
              VAT Centre
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={action("manage services")}>
              Manage Services
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Accounting</TableCell>
        <TableCell>Payroll</TableCell>
        <TableCell>
          <ActionPopover
            rightAlignMenu
            renderButton={({ tabIndex, "data-element": dataElement }) => (
              <ActionPopoverMenuButton
                buttonType="tertiary"
                iconType="dropdown"
                iconPosition="after"
                size="small"
                tabIndex={tabIndex}
                data-element={dataElement}
              >
                More
              </ActionPopoverMenuButton>
            )}
          >
            <ActionPopoverItem onClick={action("auto entry")}>
              Auto Entry
            </ActionPopoverItem>
            <ActionPopoverItem onClick={action("corporation tax")}>
              Corporation Tax
            </ActionPopoverItem>
            <ActionPopoverItem onClick={action("final accounts")}>
              Final Accounts
            </ActionPopoverItem>
            <ActionPopoverItem onClick={action("vat centre")}>
              VAT Centre
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={action("manage services")}>
              Manage Services
            </ActionPopoverItem>
          </ActionPopover>
        </TableCell>
      </TableRow>
    </Table>
  </div>
);

StylesOverriden.story = {
  name: "styles overriden",
  parameters: {
    themeSelector: dlsThemeSelector,
    chromatic: {
      disable: false,
    },
  },
};
