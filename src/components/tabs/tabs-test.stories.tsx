import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Tabs, Tab, TabList, TabPanel } from "./tabs.component";
import Box from "../box";
import Button from "../button";
import Typography from "../typography";
import Form from "../form";
import Textbox from "../textbox";

const meta: Meta<typeof Tabs> = {
  title: "Tabs/Test",
  component: Tabs,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender) => (
      <Box backgroundColor="#ddd" p={3}>
        <StoryToRender />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const FormExample: Story = ({ ...args }) => {
  const [textboxValue, setTextboxValue] = useState("");
  const [textboxError, setTextboxError] = useState<boolean | string>(false);
  const [textboxWarning, setTextboxWarning] = useState<boolean | string>(false);

  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Default" />
        <Tab id="tab-2" controls="tab-panel-2" label="Error" />
        <Tab id="tab-3" controls="tab-panel-3" label="Warning" />
      </TabList>

      <TabPanel id="tab-panel-1" tabId={"tab-1"}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            if (!textboxValue || textboxValue.length === 0) {
              setTextboxError("Textbox value must be provided");
              setTextboxWarning(false);

              return;
            }

            if (textboxValue.length < 5) {
              setTextboxError(false);
              setTextboxWarning(
                "Textbox value must be at least 5 characters long",
              );
              return;
            }

            setTextboxError(false);
            setTextboxWarning(false);
          }}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox
            label="Textbox"
            required
            onChange={(e) => setTextboxValue(e.target.value)}
            value={textboxValue}
            error={textboxError}
            warning={textboxWarning}
          />
        </Form>
      </TabPanel>

      <TabPanel id="tab-panel-2" tabId={"tab-2"}>
        <Typography>Content 2</Typography>
      </TabPanel>

      <TabPanel id="tab-panel-3" tabId={"tab-3"}>
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
FormExample.storyName = "Full Form Example";
FormExample.args = {
  orientation: "horizontal",
  size: "medium",
};
