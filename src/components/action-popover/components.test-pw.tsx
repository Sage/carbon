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
  ActionPopoverProps,
  ActionPopoverMenuButton,
  RenderButtonProps,
} from ".";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from "../flat-table";

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
      <FlatTable isZebra>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>First Name</FlatTableHeader>
            <FlatTableHeader>Last Name</FlatTableHeader>
            <FlatTableHeader>&nbsp;</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John</FlatTableCell>
            <FlatTableCell>Doe</FlatTableCell>
            <FlatTableCell>
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
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane</FlatTableCell>
            <FlatTableCell>Smith</FlatTableCell>
            <FlatTableCell>
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
            </FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Bob</FlatTableCell>
            <FlatTableCell>Jones</FlatTableCell>
            <FlatTableCell>
              <ActionPopover>
                <ActionPopoverItem
                  icon="csv"
                  {...props}
                  submenu={submenuWithIcons}
                >
                  Download CSV
                </ActionPopoverItem>
              </ActionPopover>
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
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
      <FlatTable>
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>First Name</FlatTableHeader>
            <FlatTableHeader>Last Name</FlatTableHeader>
            <FlatTableHeader>Third Column</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John</FlatTableCell>
            <FlatTableCell>Doe</FlatTableCell>
            <FlatTableCell>
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
            </FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

export const ActionPopoverWithRenderProp = ({ ...props }) => {
  return (
    <ActionPopoverWithProps
      renderButton={({
        tabIndex,
        "data-element": dataElement,
        ariaAttributes,
      }: RenderButtonProps) => (
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
      {...props}
    />
  );
};

export const ActionPopoverWithNoIconsOrSubmenus = ({ ...props }) => (
  <ActionPopover {...props}>
    <ActionPopoverItem onClick={() => {}}>Business</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Email Invoice</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Print Invoice</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Download PDF</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Download CSV</ActionPopoverItem>
    <ActionPopoverDivider />
    <ActionPopoverItem onClick={() => {}}>Delete</ActionPopoverItem>
    <ActionPopoverItem onClick={() => {}}>Return Home</ActionPopoverItem>
  </ActionPopover>
);

export const ActionPopoverWithSomeSubmenusAndNoIcons = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem data-element="submenu1" icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu2" onClick={() => {}}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu3" onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu4" onClick={() => {}}>
        Sub Menu 4
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem onClick={() => {}}>Business</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Print Invoice</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Download PDF</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverWithSubmenusAndNoIcons = ({ ...props }) => {
  const submenu = (
    <ActionPopoverMenu>
      <ActionPopoverItem data-element="submenu1" icon="bin" onClick={() => {}}>
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu2" onClick={() => {}}>
        Sub Menu 2
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu3" onClick={() => {}}>
        Sub Menu 3
      </ActionPopoverItem>
      <ActionPopoverItem data-element="submenu4" onClick={() => {}}>
        Sub Menu 4
      </ActionPopoverItem>
    </ActionPopoverMenu>
  );
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Business
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Print Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Download PDF
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Download CSV
      </ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Delete
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Return Home
      </ActionPopoverItem>
    </ActionPopover>
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

export const ActionPopoverWithIconsAndSomeSubmenus = ({ ...props }) => {
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

export const ActionPopoverWithSubmenusAndSomeIcons = ({ ...props }) => {
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
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Business
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
        Print Invoice
      </ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}} submenu={submenu}>
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

export const ActionPopoverWithVariableChildren = ({ ...props }) => {
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
      <ActionPopoverItem onClick={() => {}}>Business</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Email Invoice</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Print Invoice</ActionPopoverItem>
      <ActionPopoverItem onClick={() => {}}>Download PDF</ActionPopoverItem>
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

export const ActionPopoverMenuWithProps = ({ ...props }) => {
  return (
    <ActionPopover>
      <ActionPopoverItem
        submenu={
          <ActionPopoverMenu {...props}>
            <ActionPopoverItem icon="graph">Sub Menu 1</ActionPopoverItem>
            <ActionPopoverItem icon="add">Sub Menu 2</ActionPopoverItem>
            <ActionPopoverItem icon="print" disabled>
              Sub Menu 3
            </ActionPopoverItem>
            <ActionPopoverItem icon="bin">Sub Menu 4</ActionPopoverItem>
          </ActionPopoverMenu>
        }
      >
        Sub Menu 1
      </ActionPopoverItem>
      <ActionPopoverItem>Sub Menu 2</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponent = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Sub Menu 1</ActionPopoverItem>
      <ActionPopoverItem>Sub Menu 2</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithFirstAndLastDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem disabled>Item 1</ActionPopoverItem>
      <ActionPopoverItem>Item 2</ActionPopoverItem>
      <ActionPopoverItem>Item 3</ActionPopoverItem>
      <ActionPopoverItem>Item 4</ActionPopoverItem>
      <ActionPopoverItem>Item 5</ActionPopoverItem>
      <ActionPopoverItem>Item 6</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithOnlyFirstAndLastNotDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 2</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 3</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 4</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 5</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 6</ActionPopoverItem>
      <ActionPopoverItem>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithOnlyFirstDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem disabled>Item 1</ActionPopoverItem>
      <ActionPopoverItem>Item 2</ActionPopoverItem>
      <ActionPopoverItem>Item 3</ActionPopoverItem>
      <ActionPopoverItem>Item 4</ActionPopoverItem>
      <ActionPopoverItem>Item 5</ActionPopoverItem>
      <ActionPopoverItem>Item 6</ActionPopoverItem>
      <ActionPopoverItem>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithOnlyLastDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
      <ActionPopoverItem>Item 2</ActionPopoverItem>
      <ActionPopoverItem>Item 3</ActionPopoverItem>
      <ActionPopoverItem>Item 4</ActionPopoverItem>
      <ActionPopoverItem>Item 5</ActionPopoverItem>
      <ActionPopoverItem>Item 6</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentWithSomeDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 2</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 3</ActionPopoverItem>
      <ActionPopoverItem>Item 4</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 5</ActionPopoverItem>
      <ActionPopoverItem>Item 6</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 7</ActionPopoverItem>
    </ActionPopover>
  );
};

export const ActionPopoverPropsComponentAllDisabled = (
  props: Partial<ActionPopoverProps>,
) => {
  return (
    <ActionPopover {...props}>
      <ActionPopoverItem disabled>Item 1</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 2</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 3</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 4</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 5</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 6</ActionPopoverItem>
      <ActionPopoverItem disabled>Item 7</ActionPopoverItem>
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

export const InFlatTable = () => {
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
