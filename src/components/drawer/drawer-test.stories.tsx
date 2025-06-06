import React, { useState, useCallback } from "react";
import { action } from "storybook/actions";

import Drawer from ".";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from "../flat-table";
import { Checkbox } from "../checkbox";
import Typography from "../typography";
import Box from "../box";
import Button from "../button";

export default {
  title: "Drawer/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
    action("expansionToggled");
  }, [isExpanded]);
  return (
    <div>
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Drawer
          expandedWidth="40%"
          animationDuration="0.5s"
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </div>
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Drawer
          defaultExpanded
          expandedWidth="20%"
          animationDuration="0.5s"
          sidebar={
            <FlatTable>
              <FlatTableHead>
                <FlatTableRow>
                  <FlatTableHeader>Client</FlatTableHeader>
                  <FlatTableHeader>Client Type</FlatTableHeader>
                  <FlatTableHeader>Categories</FlatTableHeader>
                  <FlatTableHeader>Services</FlatTableHeader>
                  <FlatTableHeader>Client</FlatTableHeader>
                  <FlatTableHeader>Client Type</FlatTableHeader>
                  <FlatTableHeader>Categories</FlatTableHeader>
                  <FlatTableHeader>Services</FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                <FlatTableRow>
                  <FlatTableCell>John Doe</FlatTableCell>
                  <FlatTableCell>Business</FlatTableCell>
                  <FlatTableCell>Group1, Group2</FlatTableCell>
                  <FlatTableCell>Accounting</FlatTableCell>
                  <FlatTableCell>John Doe</FlatTableCell>
                  <FlatTableCell>Business</FlatTableCell>
                  <FlatTableCell>Group1, Group2</FlatTableCell>
                  <FlatTableCell>Accounting</FlatTableCell>
                </FlatTableRow>
                <FlatTableRow>
                  <FlatTableCell>Jane Doe</FlatTableCell>
                  <FlatTableCell>Business</FlatTableCell>
                  <FlatTableCell>Group1, Group3</FlatTableCell>
                  <FlatTableCell>Accounting</FlatTableCell>
                  <FlatTableCell>Jane Doe</FlatTableCell>
                  <FlatTableCell>Business</FlatTableCell>
                  <FlatTableCell>Group1, Group3</FlatTableCell>
                  <FlatTableCell>Accounting</FlatTableCell>
                </FlatTableRow>
                <FlatTableRow>
                  <FlatTableCell>John Smith</FlatTableCell>
                  <FlatTableCell>Charity</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Payroll</FlatTableCell>
                  <FlatTableCell>John Smith</FlatTableCell>
                  <FlatTableCell>Charity</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Payroll</FlatTableCell>
                </FlatTableRow>
                <FlatTableRow>
                  <FlatTableCell>Jane Smith</FlatTableCell>
                  <FlatTableCell>Partnership</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Final Tax</FlatTableCell>
                  <FlatTableCell>Jane Smith</FlatTableCell>
                  <FlatTableCell>Partnership</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Final Tax</FlatTableCell>
                </FlatTableRow>
                <FlatTableRow>
                  <FlatTableCell>Jane Smith</FlatTableCell>
                  <FlatTableCell>Partnership</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Final Tax</FlatTableCell>
                  <FlatTableCell>Jane Smith</FlatTableCell>
                  <FlatTableCell>Partnership</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Final Tax</FlatTableCell>
                </FlatTableRow>
                <FlatTableRow>
                  <FlatTableCell>Jane Smith</FlatTableCell>
                  <FlatTableCell>Partnership</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Final Tax</FlatTableCell>
                  <FlatTableCell>Jane Smith</FlatTableCell>
                  <FlatTableCell>Partnership</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Final Tax</FlatTableCell>
                </FlatTableRow>
                <FlatTableRow>
                  <FlatTableCell>Jane Smith</FlatTableCell>
                  <FlatTableCell>Partnership</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Final Tax</FlatTableCell>
                  <FlatTableCell>Jane Smith</FlatTableCell>
                  <FlatTableCell>Partnership</FlatTableCell>
                  <FlatTableCell>Group3</FlatTableCell>
                  <FlatTableCell>Final Tax</FlatTableCell>
                </FlatTableRow>
              </FlatTableBody>
            </FlatTable>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </div>
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Drawer
          expandedWidth="20%"
          animationDuration="0.5s"
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
        >
          <FlatTable>
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>Client</FlatTableHeader>
                <FlatTableHeader>Client Type</FlatTableHeader>
                <FlatTableHeader>Categories</FlatTableHeader>
                <FlatTableHeader>Services</FlatTableHeader>
                <FlatTableHeader>Client</FlatTableHeader>
                <FlatTableHeader>Client Type</FlatTableHeader>
                <FlatTableHeader>Categories</FlatTableHeader>
                <FlatTableHeader>Services</FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              <FlatTableRow>
                <FlatTableCell>John Doe</FlatTableCell>
                <FlatTableCell>Business</FlatTableCell>
                <FlatTableCell>Group1, Group2</FlatTableCell>
                <FlatTableCell>Accounting</FlatTableCell>
                <FlatTableCell>John Doe</FlatTableCell>
                <FlatTableCell>Business</FlatTableCell>
                <FlatTableCell>Group1, Group2</FlatTableCell>
                <FlatTableCell>Accounting</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Doe</FlatTableCell>
                <FlatTableCell>Business</FlatTableCell>
                <FlatTableCell>Group1, Group3</FlatTableCell>
                <FlatTableCell>Accounting</FlatTableCell>
                <FlatTableCell>Jane Doe</FlatTableCell>
                <FlatTableCell>Business</FlatTableCell>
                <FlatTableCell>Group1, Group3</FlatTableCell>
                <FlatTableCell>Accounting</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>John Smith</FlatTableCell>
                <FlatTableCell>Charity</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Payroll</FlatTableCell>
                <FlatTableCell>John Smith</FlatTableCell>
                <FlatTableCell>Charity</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Payroll</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Partnership</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Final Tax</FlatTableCell>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Partnership</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Final Tax</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Partnership</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Final Tax</FlatTableCell>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Partnership</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Final Tax</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Partnership</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Final Tax</FlatTableCell>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Partnership</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Final Tax</FlatTableCell>
              </FlatTableRow>
              <FlatTableRow>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Partnership</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Final Tax</FlatTableCell>
                <FlatTableCell>Jane Smith</FlatTableCell>
                <FlatTableCell>Partnership</FlatTableCell>
                <FlatTableCell>Group3</FlatTableCell>
                <FlatTableCell>Final Tax</FlatTableCell>
              </FlatTableRow>
            </FlatTableBody>
          </FlatTable>
        </Drawer>
      </div>
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Drawer
          expandedWidth="40%"
          animationDuration="0.5s"
          expanded={isExpanded}
          onChange={onChangeHandler}
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </div>
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Drawer
          defaultExpanded
          expandedWidth="40%"
          animationDuration="0.5s"
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </div>
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Drawer
          expandedWidth="40%"
          animationDuration="0.5s"
          backgroundColor="#FF0000"
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </div>
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Drawer
          title="My custom title"
          showControls
          expandedWidth="40%"
          animationDuration="0.5s"
          sidebar={
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </div>
      <div style={{ height: "400px", marginBottom: "20px" }}>
        <Drawer
          title={<Typography variant="h2">Drawer title</Typography>}
          stickyHeader
          showControls
          expandedWidth="40%"
          animationDuration="0.5s"
          sidebar={
            <>
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
                mb={4}
              />
            </>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </div>
      <div style={{ height: "400px", marginBottom: "20px" }}>
        <Drawer
          title={<Typography variant="h2">Drawer title</Typography>}
          stickyHeader
          stickyFooter
          showControls
          expandedWidth="40%"
          animationDuration="0.5s"
          footer={
            <Box display="flex" justifyContent="flex-end" p="16px 40px">
              <Button mr="16px">Cancel</Button>
              <Button buttonType="primary" type="submit">
                Action
              </Button>
            </Box>
          }
          sidebar={
            <>
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
              />
              <Checkbox
                label="Example checkbox"
                name="checkbox-default"
                ml="40px"
                mt="30px"
                mb={4}
              />
            </>
          }
        >
          content body content body content body content body content body
          content body content body
        </Drawer>
      </div>
    </div>
  );
};

DefaultStory.storyName = "default";
