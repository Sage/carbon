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
  FlatTable,
  FlatTableRow,
  FlatTableCell,
  FlatTableHeader,
} from "../flat-table";

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
    info: {
      disable: true,
    },
  },
};

export const Default = () => (
  <div style={{ marginTop: "40px", height: "275px" }}>
    <FlatTable isZebra>
      <FlatTableRow>
        <FlatTableHeader>First Name</FlatTableHeader>
        <FlatTableHeader>Last Name</FlatTableHeader>
        <FlatTableHeader>&nbsp;</FlatTableHeader>
      </FlatTableRow>
      <FlatTableRow>
        <FlatTableCell>John</FlatTableCell>
        <FlatTableCell>Doe</FlatTableCell>
        <FlatTableCell>
          <ActionPopover
            onOpen={action("popover opened")}
            onClose={action("popover closed")}
          >
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
        </FlatTableCell>
      </FlatTableRow>
      <FlatTableRow>
        <FlatTableCell>Jane</FlatTableCell>
        <FlatTableCell>Smith</FlatTableCell>
        <FlatTableCell>
          <ActionPopover>
            <ActionPopoverItem icon="csv" onClick={action("csv")}>
              Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </FlatTableCell>
      </FlatTableRow>
      <FlatTableRow>
        <FlatTableCell>Bob</FlatTableCell>
        <FlatTableCell>Jones</FlatTableCell>
        <FlatTableCell>
          <ActionPopover>
            <ActionPopoverItem
              icon="csv"
              submenu={submenuWithIcons}
              onClick={action("csv")}
            >
              Download CSV
            </ActionPopoverItem>
          </ActionPopover>
        </FlatTableCell>
      </FlatTableRow>
    </FlatTable>
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

export const StylesOverriden = () => (
  <div style={{ marginTop: "40px", height: "275px", maxWidth: "800px" }}>
    <FlatTable isZebra>
      <FlatTableRow>
        <FlatTableHeader colSpan="3">Services</FlatTableHeader>
      </FlatTableRow>
      <FlatTableRow>
        <FlatTableCell>Accounting</FlatTableCell>
        <FlatTableCell>Payroll</FlatTableCell>
        <FlatTableCell>
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
        </FlatTableCell>
      </FlatTableRow>
      <FlatTableRow>
        <FlatTableCell>Accounting</FlatTableCell>
        <FlatTableCell>Payroll</FlatTableCell>
        <FlatTableCell>
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
        </FlatTableCell>
      </FlatTableRow>
    </FlatTable>
  </div>
);

StylesOverriden.story = {
  name: "styles overriden",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
