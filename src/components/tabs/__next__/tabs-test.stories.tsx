import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Tabs, Tab, TabList, TabPanel } from "./tabs.component";
import Box from "../../box";
import Button from "../../button";
import Typography from "../../typography";
import Form from "../../form";
import Textbox from "../../textbox";

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
  const [textboxInfo, setTextboxInfo] = useState<boolean | string>(false);

  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1--form" controls="tab-panel-1--form" label="Default" />
        <Tab id="tab-2--form" controls="tab-panel-2--form" label="Error" />
        <Tab id="tab-3--form" controls="tab-panel-3--form" label="Warning" />
        <Tab id="tab-4--form" controls="tab-panel-4--form" label="Info" />
      </TabList>

      <TabPanel id="tab-panel-1--form" tabId={"tab-1--form"}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            if (!textboxValue || textboxValue.length === 0) {
              setTextboxError("Textbox value must be provided");
              setTextboxWarning(false);
              setTextboxInfo(false);

              return;
            }

            if (textboxValue.length < 5) {
              setTextboxError(false);
              setTextboxWarning(
                "Textbox value must be at least 5 characters long",
              );
              setTextboxInfo(false);
              return;
            }

            if (textboxValue.length > 10) {
              setTextboxError(false);
              setTextboxWarning(false);
              setTextboxInfo("Textbox value encroaching on limit");
              return;
            }

            setTextboxError(false);
            setTextboxWarning(false);
            setTextboxInfo(false);
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
            info={textboxInfo}
          />
        </Form>
      </TabPanel>

      <TabPanel id="tab-panel-2--form" tabId={"tab-2--form"}>
        <Typography>Content 2</Typography>
      </TabPanel>

      <TabPanel id="tab-panel-3--form" tabId={"tab-3--form"}>
        <Typography>Content 3</Typography>
      </TabPanel>

      <TabPanel id="tab-panel-4--form" tabId={"tab-4--form"}>
        <Typography>Content 4</Typography>
      </TabPanel>
    </Tabs>
  );
};
FormExample.storyName = "Full Form Example";
FormExample.args = {
  orientation: "horizontal",
  size: "medium",
};

export const FocusAndHover: Story = {
  render: () => (
    <Box width="600px" height="60px">
      <Tabs>
        <TabList ariaLabel="Primary Tab Group">
          <Tab
            id="tab-1"
            controls="tab-panel-1"
            label="Default"
            data-role="target"
          />
          <Tab
            id="tab-2"
            controls="tab-panel-2"
            label="Info"
            info
            data-role="target"
          />
          <Tab
            id="tab-3"
            controls="tab-panel-3"
            label="Warning"
            warning
            data-role="target"
          />
          <Tab
            id="tab-4"
            controls="tab-panel-4"
            label="Error"
            error
            data-role="target"
          />
          <Tab
            id="tab-5"
            controls="tab-panel-5"
            label="Default 2"
            data-role="target"
          />
          <Tab
            id="tab-6"
            controls="tab-panel-6"
            label="Default 3"
            data-role="target"
          />
        </TabList>
        <TabPanel id="tab-panel-1" tabId={"tab-1"}>
          Content 1
        </TabPanel>

        <TabPanel id="tab-panel-2" tabId={"tab-2"}>
          Content 2
        </TabPanel>

        <TabPanel id="tab-panel-3" tabId={"tab-3"}>
          Content 3
        </TabPanel>

        <TabPanel id="tab-panel-4" tabId={"tab-4"}>
          Content 4
        </TabPanel>

        <TabPanel id="tab-panel-5" tabId={"tab-5"}>
          Content 5
        </TabPanel>

        <TabPanel id="tab-panel-6" tabId={"tab-6"}>
          Content 6
        </TabPanel>
      </Tabs>
      <br></br>
      <Tabs>
        <TabList ariaLabel="Error Tab Example">
          <Tab id="tab-7" controls="tab-panel-7" label="Error" error />
        </TabList>
        <TabPanel id="tab-panel-7" tabId="tab-7">
          Error Content
        </TabPanel>
      </Tabs>
      <Tabs>
        <TabList ariaLabel="Info Tab Example">
          <Tab id="tab-8" controls="tab-panel-8" label="Info" info />
        </TabList>
        <TabPanel id="tab-panel-8" tabId="tab-8">
          Info Content
        </TabPanel>
      </Tabs>
      <Tabs>
        <TabList ariaLabel="Warning Tab Example">
          <Tab id="tab-9" controls="tab-panel-9" label="Warning" warning />
        </TabList>
        <TabPanel id="tab-panel-9" tabId="tab-9">
          Warning Content
        </TabPanel>
      </Tabs>
    </Box>
  ),
};
FocusAndHover.storyName = "Focus and Hover";
FocusAndHover.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: {
    hover: '[role="tab"],[data-role="target"]',
    focus: "#tab-1, #tab-7, #tab-8, #tab-9",
  },
};
