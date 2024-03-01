import React from "react";

import Drawer, { DrawerProps } from ".";
import Typography from "../typography";
import { Checkbox } from "../checkbox";
import Box from "../box";
import Button from "../button";

export const DrawerCustom = (props: Partial<DrawerProps>) => {
  return (
    <Drawer
      aria-label="toggle sidebar"
      sidebar={
        <ul>
          <li>link a</li>
          <li>link b</li>
          <li>link c</li>
        </ul>
      }
      title={<Typography variant="h2">Drawer title</Typography>}
      {...props}
    >
      content body for Drawer
    </Drawer>
  );
};

export const DrawerCustomFooterHeader = (props: Partial<DrawerProps>) => {
  return (
    <Drawer
      aria-label="toggle sidebar"
      sidebar={
        <Box mb={9}>
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
          <Checkbox
            label="Example checkbox"
            name="checkbox-default"
            ml="40px"
            mt="40px"
          />
        </Box>
      }
      footer={
        <Box>
          <Button mr="16px">Cancel</Button>
          <Button buttonType="primary" type="submit">
            Action
          </Button>
        </Box>
      }
      title={<Typography variant="h2">Drawer title</Typography>}
      {...props}
    >
      content body for Drawer
    </Drawer>
  );
};

export const DrawerCustomSidebar = () => {
  return (
    <Drawer
      aria-label="toggle sidebar"
      sidebar={
        <ul>
          <li>playwright</li>
        </ul>
      }
    >
      content body for Drawer
    </Drawer>
  );
};
