import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
} from ".";
import Link from "../link";
import Box from "../box";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from "../flat-table";
import Confirm from "../confirm";
import { Accordion } from "../accordion";
import Dialog from "../dialog";

export const ActionPopoverComponent: ComponentStory<
  typeof ActionPopover
> = () => {
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
    <div style={{ marginTop: "40px", height: "275px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentIcons: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentDisabledItems: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
        <ActionPopover>
          <ActionPopoverItem icon="email" disabled onClick={() => {}}>
            Email Invoice
          </ActionPopoverItem>
          <ActionPopoverDivider />
          <ActionPopoverItem onClick={() => {}} icon="delete">
            Delete
          </ActionPopoverItem>
        </ActionPopover>
      </Box>
    </div>
  );
};

export const ActionPopoverComponentMenuRightAligned: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentContentAlignedRight: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
        <ActionPopover horizontalAlignment="right">
          <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
          <ActionPopoverDivider />
          <ActionPopoverItem icon="delete">Delete</ActionPopoverItem>
        </ActionPopover>
      </Box>
    </div>
  );
};

export const ActionPopoverComponentNoIcons: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>
            Email Invoice
          </ActionPopoverItem>
          <ActionPopoverDivider />
          <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
        </ActionPopover>
      </Box>
    </div>
  );
};

export const ActionPopoverComponentCustomMenuButton: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentSubmenu: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
        <ActionPopover>
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
    </div>
  );
};

export const ActionPopoverComponentDisabledSubmenu: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentSubmenuAlignedRight: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
        <ActionPopover>
          <ActionPopoverItem
            icon="print"
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
    </div>
  );
};

export const ActionPopoverComponentMenuOpeningAbove: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ paddingTop: "120px", height: "250px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentKeyboardNavigation: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentKeyboardNaviationLeftAlignedSubmenu: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentKeyboardNaviationRightAlignedSubmenu: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ height: "250px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentAdditionalOptions: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ marginTop: "40px", height: "275px", maxWidth: "800px" }}>
      <Box>
        <ActionPopover rightAlignMenu>
          <ActionPopoverItem onClick={() => {}}>
            Enroll Device
          </ActionPopoverItem>
          <ActionPopoverItem onClick={() => {}}>Assign Owner</ActionPopoverItem>
          <ActionPopoverDivider />
          <ActionPopoverItem onClick={() => {}}>
            Manage Devices
          </ActionPopoverItem>
        </ActionPopover>
      </Box>
    </div>
  );
};

export const ActionPopoverComponentDownloadButton: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ marginTop: "40px", height: "275px", maxWidth: "800px" }}>
      <Box>
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
    </div>
  );
};

export const ActionPopoverComponentInOverflowHiddenContainer: ComponentStory<
  typeof ActionPopover
> = () => {
  return (
    <div style={{ marginTop: "40px", height: "275px", maxWidth: "800px" }}>
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
    </div>
  );
};

export const ActionPopoverComponentInFlatTable: ComponentStory<
  typeof ActionPopover
> = () => {
  const [highlightedRow, setHighlightedRow] = useState("");
  const handleHighlightRow = (id: string) => {
    setHighlightedRow(id);
  };
  return (
    <div style={{ paddingTop: "120px", height: "250px" }}>
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow
            onClick={() => handleHighlightRow("one")}
            highlighted={highlightedRow === "one"}
          >
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>
              <ActionPopover
                placement="top"
                onOpen={() => handleHighlightRow("one")}
              >
                <ActionPopoverItem
                  icon="print"
                  onClick={() => {}}
                  submenu={
                    <ActionPopoverMenu>
                      <ActionPopoverItem onClick={() => {}}>
                        CSV
                      </ActionPopoverItem>
                      <ActionPopoverItem onClick={() => {}}>
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
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow
            onClick={() => handleHighlightRow("two")}
            highlighted={highlightedRow === "two"}
          >
            <FlatTableCell>Jane Doe</FlatTableCell>
            <FlatTableCell>York</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>
              <ActionPopover
                placement="top"
                onOpen={() => handleHighlightRow("two")}
              >
                <ActionPopoverItem
                  icon="print"
                  onClick={() => {}}
                  submenu={
                    <ActionPopoverMenu>
                      <ActionPopoverItem onClick={() => {}}>
                        CSV
                      </ActionPopoverItem>
                      <ActionPopoverItem onClick={() => {}}>
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
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

export const ActionPopoverComponentOpeningAModal: ComponentStory<
  typeof ActionPopover
> = () => {
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

export const ActionPopoverNestedInDialog: ComponentStory<
  typeof ActionPopover
> = () => {
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
