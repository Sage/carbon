import React, { useState } from "react";
import Box from "../box";
import Link from "../link";
import { Accordion } from "../accordion";
import Confirm from "../confirm";
import Dialog from "../dialog";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
} from ".";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "../table";

import exampleDownload from "../../../playwright/download-test/example.txt";

export const ActionPopoverCustom = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem data-element="submenu1" {...props}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem {...props}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled>Sub Menu 3</ActionPopoverItem>
    </ActionPopoverMenu>
  );
  const submenuWithIcons = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="graph">Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem icon="add">Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <div
      style={{
        marginTop: "40px",
        height: "275px",
      }}
    >
      <Table isZebraStriped>
        <TableHead>
          <TableRow id="row-1">
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>&nbsp;</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow id="row-2">
            <TableCell>John</TableCell>
            <TableCell>Doe</TableCell>
            <TableCell>
              <ActionPopover>
                <ActionPopoverItem
                  disabled
                  icon="graph"
                  submenu={submenu}
                  {...props}
                >
                  Business
                </ActionPopoverItem>
                <ActionPopoverItem icon="email" {...props}>
                  Email Invoice
                </ActionPopoverItem>
                <ActionPopoverItem icon="print" {...props} submenu={submenu}>
                  Print Invoice
                </ActionPopoverItem>
                <ActionPopoverItem icon="pdf" {...props} submenu={submenu}>
                  Download PDF
                </ActionPopoverItem>
                <ActionPopoverItem icon="csv" {...props}>
                  Download CSV
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem icon="delete" {...props}>
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
          <TableRow id="row-3">
            <TableCell>Jane</TableCell>
            <TableCell>Smith</TableCell>
            <TableCell>
              <ActionPopover>
                <ActionPopoverItem
                  download
                  {...props}
                  icon="download"
                  href={exampleDownload}
                >
                  Download
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
          <TableRow id="row-4">
            <TableCell>Bob</TableCell>
            <TableCell>Jones</TableCell>
            <TableCell>
              <ActionPopover>
                <ActionPopoverItem
                  icon="csv"
                  {...props}
                  submenu={submenuWithIcons}
                >
                  Download CSV
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export const ActionPopoverWithProps = ({ ...props }) => {
  return (
    <div
      style={{
        height: "250px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow id="row-1">
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Third Column</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow id="row-2">
            <TableCell>John</TableCell>
            <TableCell>Doe</TableCell>
            <TableCell>
              <ActionPopover {...props}>
                <ActionPopoverItem
                  data-element="menu-item1"
                  icon="email"
                  disabled
                  onClick={() => {}}
                >
                  Email Invoice
                </ActionPopoverItem>
                <ActionPopoverDivider />
                <ActionPopoverItem
                  data-element="menu-item2"
                  onClick={() => {}}
                  icon="delete"
                >
                  Delete
                </ActionPopoverItem>
              </ActionPopover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export const ActionPopoverWithIconsAndNoSubmenus = ({ ...props }) => (
  <ActionPopover {...props}>
    <ActionPopoverItem icon="graph" onClick={() => {}}>
      Business
    </ActionPopoverItem>
    <ActionPopoverItem icon="email" onClick={() => {}}>
      Email Invoice
    </ActionPopoverItem>
    <ActionPopoverItem icon="print" onClick={() => {}}>
      Print Invoice
    </ActionPopoverItem>
    <ActionPopoverItem icon="pdf" onClick={() => {}}>
      Download PDF
    </ActionPopoverItem>
    <ActionPopoverItem icon="csv" onClick={() => {}}>
      Download CSV
    </ActionPopoverItem>
    <ActionPopoverDivider />
    <ActionPopoverItem icon="delete" onClick={() => {}}>
      Delete
    </ActionPopoverItem>
    <ActionPopoverItem icon="home" onClick={() => {}}>
      Return Home
    </ActionPopoverItem>
  </ActionPopover>
);

export const ActionPopoverWithDifferentSubmenus = ({ ...props }) => {
  const businessSubmenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={() => {}}>
        Business Sub Menu Item
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  const emailSubmenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={() => {}}>
        Email Sub Menu Item
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem
        icon="graph"
        onClick={() => {}}
        submenu={businessSubmenu}
      >
        Business
      </ActionPopoverItem>
      <ActionPopoverItem icon="email" onClick={() => {}} submenu={emailSubmenu}>
        Email
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverWithSubmenusAndIcons = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 3</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 4</ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem
        data-element="menu-item1"
        icon="graph"
        onClick={() => {}}
        submenu={submenu}
      >
        Business
      </ActionPopoverItem>
      <ActionPopoverItem icon="email" onClick={() => {}} submenu={submenu}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
        Print Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="pdf" onClick={() => {}} submenu={submenu}>
        Download PDF
      </ActionPopoverItem>
      <ActionPopoverItem icon="csv" onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem icon="delete" onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem icon="home" onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverWithDownloadButton = () => (
  <ActionPopover rightAlignMenu>
    <ActionPopoverItem download icon="download" href={exampleDownload}>
      Download
    </ActionPopoverItem>
  </ActionPopover>
);

export const Default = () => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  const submenuWithIcons = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="graph" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem icon="add" onClick={() => {}}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <Box mt={40} height={275}>
      <ActionPopover onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem
          disabled
          icon="graph"
          submenu={submenu}
          onClick={() => {}}
        >
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem icon="delete" onClick={() => {}}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover>
        <ActionPopoverItem
          icon="csv"
          submenu={submenuWithIcons}
          onClick={() => {}}
        >
          Download CSV
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const AdditionalOptions = () => {
  return (
    <Box mt={40} height={275} maxWidth={800}>
      <ActionPopover rightAlignMenu>
        <ActionPopoverItem onClick={() => {}}>Enroll Device</ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Assign Owner</ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}}>Manage Devices</ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const ContentAlignedRight = () => {
  return (
    <Box height={250}>
      <ActionPopover horizontalAlignment="right">
        <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem icon="delete">Delete</ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const CustomMenuButton = () => {
  return (
    <Box height={250}>
      <ActionPopover
        renderButton={({
          tabIndex,
          "data-element": dataElement,
          ariaAttributes,
        }) => (
          <ActionPopoverMenuButton
            buttonType="tertiary"
            iconType="dropdown"
            iconPosition="after"
            size="small"
            tabIndex={tabIndex}
            data-element={dataElement}
            ariaAttributes={ariaAttributes}
          >
            More
          </ActionPopoverMenuButton>
        )}
      >
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover
        renderButton={({ "data-element": dataElement }) => (
          <Link onClick={() => {}} data-element={dataElement}>
            More
          </Link>
        )}
      >
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const DisabledItems = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled onClick={() => {}} icon="add">
          Add
        </ActionPopoverItem>
        <ActionPopoverItem disabled onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}} icon="tick">
          Tick
        </ActionPopoverItem>
        <ActionPopoverItem disabled onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}} icon="none">
          None
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const DisabledSubmenu = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem
          disabled
          icon="print"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
              <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Print
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const DownloadButton = () => {
  return (
    <Box mt={40} height={275} maxWidth={800}>
      <ActionPopover rightAlignMenu>
        <ActionPopoverItem download icon="download" href="example-img.jpg">
          Download
        </ActionPopoverItem>
        <ActionPopoverItem icon="settings" onClick={() => {}}>
          Assign Owner
        </ActionPopoverItem>
        <ActionPopoverItem disabled icon="download" href="example-img.jpg">
          Download
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const Icons = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const InOverflowHiddenContainer = () => {
  return (
    <Box mt={40} height={275} maxWidth={800}>
      <Accordion title="Heading">
        <Box>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
          <ActionPopover>
            <ActionPopoverItem onClick={() => {}}>
              Enroll Device
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => {}}>
              Assign Owner
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem onClick={() => {}}>
              Manage Devices
            </ActionPopoverItem>
          </ActionPopover>
        </Box>
      </Accordion>
    </Box>
  );
};

export const KeyboardNavigationLeftAlignedSubmenu = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem
          icon="csv"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem icon="csv" onClick={() => {}}>
                CSV
              </ActionPopoverItem>
              <ActionPopoverItem icon="pdf" onClick={() => {}}>
                PDF
              </ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Download
        </ActionPopoverItem>
        <ActionPopoverItem
          icon="pdf"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem icon="csv" onClick={() => {}}>
                CSV
              </ActionPopoverItem>
              <ActionPopoverItem icon="pdf" onClick={() => {}}>
                PDF
              </ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Print
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const KeyboardNavigationRightAlignedSubmenu = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem
          icon="csv"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem icon="csv" onClick={() => {}}>
                CSV
              </ActionPopoverItem>
              <ActionPopoverItem icon="pdf" onClick={() => {}}>
                PDF
              </ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Download
        </ActionPopoverItem>
        <ActionPopoverItem
          icon="pdf"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem icon="csv" onClick={() => {}}>
                CSV
              </ActionPopoverItem>
              <ActionPopoverItem icon="pdf" onClick={() => {}}>
                PDF
              </ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Print
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const KeyboardNavigation = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverItem disabled icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const MenuOpeningAbove = () => {
  return (
    <Box pt={120} height={250}>
      <ActionPopover placement="top">
        <ActionPopoverItem
          icon="print"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem onClick={() => {}}>CSV</ActionPopoverItem>
              <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Print
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const MenuRightAligned = () => {
  return (
    <Box height={250}>
      <ActionPopover rightAlignMenu>
        <ActionPopoverItem icon="email" disabled onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const NoIcons = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem onClick={() => {}}>Email Invoice</ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const OpeningAModal = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Box>
        <ActionPopover
          renderButton={({ ...props }) => (
            <ActionPopoverMenuButton {...props}>
              Open Actions
            </ActionPopoverMenuButton>
          )}
        >
          <ActionPopoverItem
            onClick={() => {
              setIsOpen(!isOpen);
              setIsConfirmOpen(isConfirmOpen);
            }}
          >
            Open Confirm Dialog
          </ActionPopoverItem>
          <ActionPopoverItem icon="settings" onClick={() => {}}>
            Do Nothing
          </ActionPopoverItem>
        </ActionPopover>
      </Box>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        confirmButtonDestructive
        cancelButtonDestructive
        disableConfirm
        open={isConfirmOpen}
        onConfirm={() => setIsConfirmOpen(!isConfirmOpen)}
        onCancel={() => setIsConfirmOpen(!isConfirmOpen)}
      >
        Content
      </Confirm>
    </>
  );
};

export const Submenu = () => {
  return (
    <Box height={250}>
      <ActionPopover>
        <ActionPopoverItem
          icon="print"
          onClick={() => {}}
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem disabled onClick={() => {}}>
                CSV
              </ActionPopoverItem>
              <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
              <ActionPopoverItem onClick={() => {}}>PDF</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          Print
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled onClick={() => {}} icon="add">
          Add
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const SubmenuPositionedRight = () => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <Box height={250}>
      <ActionPopover submenuPosition="right">
        <ActionPopoverItem icon="email" submenu={submenu}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem icon="delete" submenu={submenu}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};

export const ActionPopoverNestedInDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <ActionPopover>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>{" "}
    </Dialog>
  );
};

export const LongMenuExample = () => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
      <ActionPopoverItem disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  const submenuWithIcons = (
    <ActionPopoverMenu>
      <ActionPopoverItem icon="graph" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem icon="add" onClick={() => {}}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <Box mt={60} height={275}>
      <ActionPopover onOpen={() => {}} onClose={() => {}}>
        <ActionPopoverItem
          disabled
          icon="graph"
          submenu={submenu}
          onClick={() => {}}
        >
          Business
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoiceee
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoiceee
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoiceee
        </ActionPopoverItem>
        <ActionPopoverItem icon="print" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>
        <ActionPopoverItem icon="pdf" submenu={submenu} onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem disabled icon="delete" onClick={() => {}}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover>
        <ActionPopoverItem icon="csv" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>
      </ActionPopover>
      <ActionPopover>
        <ActionPopoverItem
          icon="csv"
          submenu={submenuWithIcons}
          onClick={() => {}}
        >
          Download CSV
        </ActionPopoverItem>
      </ActionPopover>
    </Box>
  );
};
