import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
  RenderButtonProps,
  ActionPopoverHandle,
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
import Button from "../button";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof ActionPopover> = {
  title: "Action Popover",
  component: ActionPopover,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof ActionPopover>;

export const Default: Story = () => {
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
Default.storyName = "Default";

export const Icons: Story = () => {
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
Icons.storyName = "Icons";

export const DisabledItems: Story = () => {
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
DisabledItems.storyName = "Disabled Items";

export const MenuRightAligned: Story = () => {
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
MenuRightAligned.storyName = "Menu Right Aligned";

export const ContentAlignedRight: Story = () => {
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
ContentAlignedRight.storyName = "Content Aligned Right";

export const NoIcons: Story = () => {
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
NoIcons.storyName = "No Icons";

export const CustomMenuButton: Story = () => {
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
            aria-label={undefined}
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
          />
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
CustomMenuButton.storyName = "Custom Menu Button";

export const Submenu: Story = () => {
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
Submenu.storyName = "Submenu";

export const DisabledSubmenu: Story = () => {
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
DisabledSubmenu.storyName = "Disabled Submenu";

export const SubmenuPositionedRight: Story = () => {
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
SubmenuPositionedRight.storyName = "Sub Menu Positioned Right";

export const MenuOpeningAbove: Story = () => {
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
MenuOpeningAbove.storyName = "Menu Opening Above";

export const KeyboardNavigation: Story = () => {
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
KeyboardNavigation.storyName = "Keyboard Navigation";

export const KeyboardNavigationLeftAlignedSubmenu: Story = () => {
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
KeyboardNavigationLeftAlignedSubmenu.storyName =
  "Keyboard Navigation Left Aligned Submenu";

export const KeyboardNavigationRightAlignedSubmenu: Story = () => {
  return (
    <Box height={250}>
      <ActionPopover ml={0} rightAlignMenu submenuPosition="right">
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
KeyboardNavigationRightAlignedSubmenu.storyName =
  "Keyboard Navigation Right Aligned Submenu";

export const AdditionalOptions: Story = () => {
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
AdditionalOptions.storyName = "Additional Options";

export const DownloadButton: Story = () => {
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
DownloadButton.storyName = "Download Button";

export const InOverflowHiddenContainer: Story = () => {
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
InOverflowHiddenContainer.storyName = "In Overflow Hidden Container";

export const InFlatTable: Story = () => {
  const [highlightedRow, setHighlightedRow] = useState("");
  const handleHighlightRow = (id: string) => {
    setHighlightedRow(id);
  };
  return (
    <Box pt={120} height={250}>
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
    </Box>
  );
};
InFlatTable.storyName = "In Flat Table";

export const OpeningAModal: Story = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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
              setIsConfirmOpen(!isConfirmOpen);
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
OpeningAModal.storyName = "Opening a Modal";

export const ActionPopoverNestedInDialog: Story = () => {
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
ActionPopoverNestedInDialog.storyName = "Action Popover Nested in Dialog";

export const FocusButtonProgrammatically = () => {
  const ref = useRef<ActionPopoverHandle>(null);
  const refMore = useRef<ActionPopoverHandle>(null);

  const renderButton = (props: RenderButtonProps) => (
    <ActionPopoverMenuButton
      buttonType="tertiary"
      iconType="ellipsis_vertical"
      iconPosition="after"
      size="small"
      aria-label={undefined}
      {...props}
    >
      More
    </ActionPopoverMenuButton>
  );

  return (
    <>
      <Button
        onClick={() => {
          ref.current?.focusButton();
        }}
      >
        Focus
      </Button>
      <ActionPopover ref={ref}>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>

      <Button
        onClick={() => {
          refMore.current?.focusButton();
        }}
      >
        Focus More
      </Button>
      <ActionPopover renderButton={renderButton} ref={refMore} mt={3}>
        <ActionPopoverItem icon="email" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem onClick={() => {}} icon="delete">
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    </>
  );
};
FocusButtonProgrammatically.storyName = "Focus Button Programmatically";
