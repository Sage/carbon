import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { Checkbox } from "../checkbox";
import Pill from "../pill";
import Icon from "../icon";
import Box from "../box";
import { Tabs, Tab } from ".";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const DefaultStory: Story = () => {
  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
DefaultStory.storyName = "Default";

export const PositionedTopAlignedRight: Story = () => {
  return (
    <Box p="4px">
      <Tabs align="right" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
PositionedTopAlignedRight.storyName = "Positioned Top Aligned Right";

export const PositionedLeftAndAlignedLeft: Story = () => {
  return (
    <Box p="32px" bg="#f2f5f6">
      <Tabs align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Box bg="white" p="32px" height="calc(100% - 64px)">
            Content for tab 1
          </Box>
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
PositionedLeftAndAlignedLeft.storyName = "Positioned Left Aligned Left";

export const PositionedLeftAndAlignedRight: Story = () => {
  return (
    <Box p="4px">
      <Tabs align="right" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
PositionedLeftAndAlignedRight.storyName = "Positioned Left Aligned Right";

export const WithLinkAsATab: Story = () => {
  return (
    <Box p="4px">
      <Tabs selectedTabId="tab-2" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
          href="https://carbon.sage.com/"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
};
WithLinkAsATab.storyName = "With Link as a Tab";

export const WithSpecifiedTabVisible: Story = () => {
  return (
    <Box p="4px">
      <Tabs selectedTabId="tab-2" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithSpecifiedTabVisible.storyName = "With Specified Tab Visible";

export const WithoutExtendedDividingLine: Story = () => {
  return (
    <Box p="4px">
      <Tabs extendedLine={false} align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithoutExtendedDividingLine.storyName = "Without Extended Dividing Line";

export const WithLargeTabsPositionedTop: Story = () => {
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithLargeTabsPositionedTop.storyName = "With Large Tabs Positioned Top";

export const WithLargeTabsPositionedLeft: Story = () => {
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithLargeTabsPositionedLeft.storyName = "With Large Tabs Positioned Left";

export const WithBordersPositionedTop: Story = () => {
  return (
    <Box p="4px">
      <Tabs borders="on" align="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithBordersPositionedTop.storyName = "With Borders Positioned Top";

export const WithNoSidesPositionedTop: Story = () => {
  return (
    <Box p="4px">
      <Tabs borders="no sides" align="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithNoSidesPositionedTop.storyName = "With No Sides Positioned Top";

export const WithBordersPositionedLeft: Story = () => {
  return (
    <Box p="4px">
      <Tabs borders="on" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithBordersPositionedLeft.storyName = "With Borders Positioned Left";

export const WithNoSidesPositionedLeft: Story = () => {
  return (
    <Box p="4px">
      <Tabs borders="no sides" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithNoSidesPositionedLeft.storyName = "With No Sides Positioned Left";

export const WithValidationsPositionedTop: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = useState({ one: true, two: true, three: true });
  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
            checked={errors.one}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.one}
            onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
            checked={warnings.one}
          />
          <Checkbox
            label="Add info"
            info={infos.one}
            onChange={() => setInfos({ ...infos, one: !infos.one })}
            checked={infos.one}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.two}
            onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
            checked={warnings.two}
          />
          <Checkbox
            label="Add info"
            info={infos.two}
            onChange={() => setInfos({ ...infos, two: !infos.two })}
            checked={infos.two}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.three}
            onChange={() =>
              setWarnings({ ...warnings, three: !warnings.three })
            }
          />
          <Checkbox
            label="Add info"
            info={infos.three}
            onChange={() => setInfos({ ...infos, three: !infos.three })}
            checked={infos.three}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithValidationsPositionedTop.storyName = "With Validations Positioned Top";

export const WithNewValidationRedesign: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = useState({ one: true, two: true, three: true });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box p="4px">
        <Tabs align="left" position="top">
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
          >
            <Checkbox
              label="Add error"
              error={errors.one}
              onChange={() => setErrors({ ...errors, one: !errors.one })}
              checked={errors.one}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.one}
              onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
              checked={warnings.one}
            />
            <Checkbox
              label="Add info"
              info={infos.one}
              onChange={() => setInfos({ ...infos, one: !infos.one })}
              checked={infos.one}
            />
          </Tab>
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
          >
            <Checkbox
              label="Add error"
              error={errors.two}
              onChange={() => setErrors({ ...errors, two: !errors.two })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.two}
              onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
              checked={warnings.two}
            />
            <Checkbox
              label="Add info"
              info={infos.two}
              onChange={() => setInfos({ ...infos, two: !infos.two })}
              checked={infos.two}
            />
          </Tab>
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
          >
            <Checkbox
              label="Add error"
              error={errors.three}
              onChange={() => setErrors({ ...errors, three: !errors.three })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.three}
              onChange={() =>
                setWarnings({ ...warnings, three: !warnings.three })
              }
            />
            <Checkbox
              label="Add info"
              info={infos.three}
              onChange={() => setInfos({ ...infos, three: !infos.three })}
              checked={infos.three}
            />
          </Tab>
        </Tabs>
      </Box>
    </CarbonProvider>
  );
};
WithNewValidationRedesign.storyName = "With New Validation Positioned Top";

export const WithNewValidationsSizedLargePositionedTop: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = useState({ one: true, two: true, three: true });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box p="4px">
        <Tabs size="large" align="left" position="top">
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
          >
            <Checkbox
              label="Add error"
              error={errors.one}
              onChange={() => setErrors({ ...errors, one: !errors.one })}
              checked={errors.one}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.one}
              onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
              checked={warnings.one}
            />
            <Checkbox
              label="Add info"
              info={infos.one}
              onChange={() => setInfos({ ...infos, one: !infos.one })}
              checked={infos.one}
            />
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
          >
            <Checkbox
              label="Add error"
              error={errors.two}
              onChange={() => setErrors({ ...errors, two: !errors.two })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.two}
              onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
              checked={warnings.two}
            />
            <Checkbox
              label="Add info"
              info={infos.two}
              onChange={() => setInfos({ ...infos, two: !infos.two })}
              checked={infos.two}
            />
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
          >
            <Checkbox
              label="Add error"
              error={errors.three}
              onChange={() => setErrors({ ...errors, three: !errors.three })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.three}
              onChange={() =>
                setWarnings({ ...warnings, three: !warnings.three })
              }
            />
            <Checkbox
              label="Add info"
              info={infos.three}
              onChange={() => setInfos({ ...infos, three: !infos.three })}
              checked={infos.three}
            />
          </Tab>
        </Tabs>
      </Box>
    </CarbonProvider>
  );
};
WithNewValidationsSizedLargePositionedTop.storyName =
  "With New Validations Sized Large Positioned Top";

export const WithValidationsSizedLargePositionedTop: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = useState({ one: true, two: true, three: true });
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
            checked={errors.one}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.one}
            onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
            checked={warnings.one}
          />
          <Checkbox
            label="Add info"
            info={infos.one}
            onChange={() => setInfos({ ...infos, one: !infos.one })}
            checked={infos.one}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.two}
            onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
            checked={warnings.two}
          />
          <Checkbox
            label="Add info"
            info={infos.two}
            onChange={() => setInfos({ ...infos, two: !infos.two })}
            checked={infos.two}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.three}
            onChange={() =>
              setWarnings({ ...warnings, three: !warnings.three })
            }
          />
          <Checkbox
            label="Add info"
            info={infos.three}
            onChange={() => setInfos({ ...infos, three: !infos.three })}
            checked={infos.three}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithValidationsSizedLargePositionedTop.storyName =
  "With Validations Sized Large Positioned Top";

export const WithValidationsPositionedLeft: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = useState({ one: true, two: true, three: true });
  return (
    <Box p="4px">
      <Tabs align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
            checked={errors.one}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.one}
            onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
            checked={warnings.one}
          />
          <Checkbox
            label="Add info"
            info={infos.one}
            onChange={() => setInfos({ ...infos, one: !infos.one })}
            checked={infos.one}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.two}
            onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
            checked={warnings.two}
          />
          <Checkbox
            label="Add info"
            info={infos.two}
            onChange={() => setInfos({ ...infos, two: !infos.two })}
            checked={infos.two}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.three}
            onChange={() =>
              setWarnings({ ...warnings, three: !warnings.three })
            }
          />
          <Checkbox
            label="Add info"
            info={infos.three}
            onChange={() => setInfos({ ...infos, three: !infos.three })}
            checked={infos.three}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithValidationsPositionedLeft.storyName = "With Validations Positioned Left";

export const WithValidationsPositionedLeftRedesign: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = useState({ one: true, two: true, three: true });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box p="4px">
        <Tabs align="left" position="left">
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
          >
            <Checkbox
              label="Add error"
              error={errors.one}
              onChange={() => setErrors({ ...errors, one: !errors.one })}
              checked={errors.one}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.one}
              onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
              checked={warnings.one}
            />
            <Checkbox
              label="Add info"
              info={infos.one}
              onChange={() => setInfos({ ...infos, one: !infos.one })}
              checked={infos.one}
            />
          </Tab>
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
          >
            <Checkbox
              label="Add error"
              error={errors.two}
              onChange={() => setErrors({ ...errors, two: !errors.two })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.two}
              onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
              checked={warnings.two}
            />
            <Checkbox
              label="Add info"
              info={infos.two}
              onChange={() => setInfos({ ...infos, two: !infos.two })}
              checked={infos.two}
            />
          </Tab>
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
          >
            <Checkbox
              label="Add error"
              error={errors.three}
              onChange={() => setErrors({ ...errors, three: !errors.three })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.three}
              onChange={() =>
                setWarnings({ ...warnings, three: !warnings.three })
              }
            />
            <Checkbox
              label="Add info"
              info={infos.three}
              onChange={() => setInfos({ ...infos, three: !infos.three })}
              checked={infos.three}
            />
          </Tab>
        </Tabs>
      </Box>
    </CarbonProvider>
  );
};
WithValidationsPositionedLeftRedesign.storyName =
  "With New Validation Positioned Left";

export const WithValidationsSizedLargePositionedLeft: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = useState({ one: true, two: true, three: true });
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
            checked={errors.one}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.one}
            onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
            checked={warnings.one}
          />
          <Checkbox
            label="Add info"
            info={infos.one}
            onChange={() => setInfos({ ...infos, one: !infos.one })}
            checked={infos.one}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.two}
            onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
            checked={warnings.two}
          />
          <Checkbox
            label="Add info"
            info={infos.two}
            onChange={() => setInfos({ ...infos, two: !infos.two })}
            checked={infos.two}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
          <Checkbox
            label="Add warning"
            warning={warnings.three}
            onChange={() =>
              setWarnings({ ...warnings, three: !warnings.three })
            }
          />
          <Checkbox
            label="Add info"
            info={infos.three}
            onChange={() => setInfos({ ...infos, three: !infos.three })}
            checked={infos.three}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithValidationsSizedLargePositionedLeft.storyName =
  "With Validations Sized Large Positioned Left";

export const WithNewValidationsSizedLargePositionedLeft: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = useState({ one: true, two: true, three: true });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box p="4px">
        <Tabs size="large" align="left" position="left">
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
          >
            <Checkbox
              label="Add error"
              error={errors.one}
              onChange={() => setErrors({ ...errors, one: !errors.one })}
              checked={errors.one}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.one}
              onChange={() => setWarnings({ ...warnings, one: !warnings.one })}
              checked={warnings.one}
            />
            <Checkbox
              label="Add info"
              info={infos.one}
              onChange={() => setInfos({ ...infos, one: !infos.one })}
              checked={infos.one}
            />
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
          >
            <Checkbox
              label="Add error"
              error={errors.two}
              onChange={() => setErrors({ ...errors, two: !errors.two })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.two}
              onChange={() => setWarnings({ ...warnings, two: !warnings.two })}
              checked={warnings.two}
            />
            <Checkbox
              label="Add info"
              info={infos.two}
              onChange={() => setInfos({ ...infos, two: !infos.two })}
              checked={infos.two}
            />
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
          >
            <Checkbox
              label="Add error"
              error={errors.three}
              onChange={() => setErrors({ ...errors, three: !errors.three })}
            />
            <Checkbox
              label="Add warning"
              warning={warnings.three}
              onChange={() =>
                setWarnings({ ...warnings, three: !warnings.three })
              }
            />
            <Checkbox
              label="Add info"
              info={infos.three}
              onChange={() => setInfos({ ...infos, three: !infos.three })}
              checked={infos.three}
            />
          </Tab>
        </Tabs>
      </Box>
    </CarbonProvider>
  );
};
WithNewValidationsSizedLargePositionedLeft.storyName =
  "With New Validations Sized Large Positioned Left";

export const WithAdditionalTitleSiblings: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="home" key="icon" />,
          ]}
          titlePosition="before"
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
            checked={errors.one}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
          titlePosition="after"
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="home" key="icon" />,
          ]}
          titlePosition="after"
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithAdditionalTitleSiblings.storyName = "With Additional Title Siblings";

export const WithAdditionalTitleSiblingsRedesign: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box p="4px">
        <Tabs align="left" position="top">
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
            siblings={[
              <Pill size="S" pillRole="status" fill key="pill">
                12
              </Pill>,
              <Icon type="home" key="icon" />,
            ]}
            titlePosition="before"
          >
            <Checkbox
              label="Add error"
              error={errors.one}
              onChange={() => setErrors({ ...errors, one: !errors.one })}
              checked={errors.one}
            />
          </Tab>
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
            titlePosition="after"
          >
            <Checkbox
              label="Add error"
              error={errors.two}
              onChange={() => setErrors({ ...errors, two: !errors.two })}
            />
          </Tab>
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
            siblings={[
              <Pill size="S" pillRole="status" fill key="pill">
                12
              </Pill>,
              <Icon type="home" key="icon" />,
            ]}
            titlePosition="after"
          >
            <Checkbox
              label="Add error"
              error={errors.three}
              onChange={() => setErrors({ ...errors, three: !errors.three })}
            />
          </Tab>
        </Tabs>
      </Box>
    </CarbonProvider>
  );
};
WithAdditionalTitleSiblingsRedesign.storyName =
  "With New Validation Additional Title Siblings";

export const WithAdditionalTitleSiblingsSizeLarge: Story = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="home" key="icon" />,
          ]}
          titlePosition="before"
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
            checked={errors.one}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
          titlePosition="after"
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="settings" key="icon" />,
          ]}
          titlePosition="after"
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithAdditionalTitleSiblingsSizeLarge.storyName =
  "With Additional Title Siblings Size Large";

export const WithCustomLayout: Story = () => {
  const [errors, setErrors] = useState({
    one: false,
    two: false,
    three: false,
  });
  return (
    <Box p="4px">
      <Tabs size="default" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
          customLayout={
            <Box
              width="calc(100% - 30px)"
              display="flex"
              flexDirection="column"
              padding="4px 4px 22px 14px"
            >
              <Box display="flex" justifyContent="flex-end">
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
              <Box display="flex" justifyContent="flex-start">
                Tab 1
              </Box>
            </Box>
          }
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
          customLayout={
            <Box
              width="calc(100% - 30px)"
              display="flex"
              flexDirection="column"
              padding="4px 4px 22px 14px"
            >
              <Box display="flex" justifyContent="flex-end">
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
              <Box display="flex" justifyContent="flex-start">
                Tab 2
              </Box>
            </Box>
          }
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
          customLayout={
            <Box
              width="calc(100% - 30px)"
              display="flex"
              flexDirection="column"
              padding="4px 4px 22px 14px"
            >
              <Box display="flex" justifyContent="flex-end">
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
              <Box display="flex" justifyContent="flex-start">
                Tab 3
              </Box>
            </Box>
          }
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithCustomLayout.storyName = "With Custom Layout";

export const WithCustomLayoutRedesign: Story = () => {
  const [errors, setErrors] = useState({
    one: false,
    two: false,
    three: false,
  });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box p="4px">
        <Tabs size="default" align="left" position="left">
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
            customLayout={
              <Box
                width="calc(100% - 30px)"
                display="flex"
                flexDirection="column"
                padding="4px 4px 22px 14px"
              >
                <Box display="flex" justifyContent="flex-end">
                  <Icon type="settings" color="primary" />
                  <Icon type="home" />
                </Box>
                <Box display="flex" justifyContent="flex-start">
                  Tab 1
                </Box>
              </Box>
            }
          >
            <Checkbox
              label="Add error"
              error={errors.one}
              onChange={() => setErrors({ ...errors, one: !errors.one })}
            />
          </Tab>
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
            customLayout={
              <Box
                width="calc(100% - 30px)"
                display="flex"
                flexDirection="column"
                padding="4px 4px 22px 14px"
              >
                <Box display="flex" justifyContent="flex-end">
                  <Icon type="settings" color="primary" />
                  <Icon type="home" />
                </Box>
                <Box display="flex" justifyContent="flex-start">
                  Tab 2
                </Box>
              </Box>
            }
          >
            <Checkbox
              label="Add error"
              error={errors.two}
              onChange={() => setErrors({ ...errors, two: !errors.two })}
            />
          </Tab>
          <Tab
            errorMessage="this is an error message"
            warningMessage="this is a warning message"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
            customLayout={
              <Box
                width="calc(100% - 30px)"
                display="flex"
                flexDirection="column"
                padding="4px 4px 22px 14px"
              >
                <Box display="flex" justifyContent="flex-end">
                  <Icon type="settings" color="primary" />
                  <Icon type="home" />
                </Box>
                <Box display="flex" justifyContent="flex-start">
                  Tab 3
                </Box>
              </Box>
            }
          >
            <Checkbox
              label="Add error"
              error={errors.three}
              onChange={() => setErrors({ ...errors, three: !errors.three })}
            />
          </Tab>
        </Tabs>
      </Box>
    </CarbonProvider>
  );
};
WithCustomLayoutRedesign.storyName = "With New Validation Custom Layout";

export const WithAlternateStyling: Story = () => {
  const [errors, setErrors] = useState({
    one: false,
    two: false,
    three: false,
  });
  return (
    <Box p="4px">
      <Tabs variant="alternate" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Checkbox
            label="Add error"
            error={errors.one}
            onChange={() => setErrors({ ...errors, one: !errors.one })}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Checkbox
            label="Add error"
            error={errors.two}
            onChange={() => setErrors({ ...errors, two: !errors.two })}
          />
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          <Checkbox
            label="Add error"
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithAlternateStyling.storyName = "With Alternate Styling";

export const WithHeaderWidth: Story = () => {
  return (
    <Box p="4px">
      <Tabs headerWidth="400px" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tabs-1-tab-1"
          title="Very long title for Tab 1 without headerWidth prop it would be not well aligned with the second Tabs group"
          key="tabs-1-tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tabs-1-tab-2"
          title="Tab 2"
          key="tabs-1-tab-2"
        >
          Content for tab 2
        </Tab>
      </Tabs>
      <Tabs headerWidth="400px" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tabs-2-tab-1"
          title="Tab 1"
          key="tabs-2-tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tabs-2-tab-2"
          title="Tab 2"
          key="tabs-2-tab-2"
        >
          Content for tab 2
        </Tab>
      </Tabs>
    </Box>
  );
};
WithHeaderWidth.storyName = "With Header Width";

export const WithCustomSpacing: Story = () => {
  return (
    <Box p="4px">
      <Tabs m={8} align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
          p={5}
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithCustomSpacing.storyName = "With Custom Spacing";

export const WithStringValidationsSummarised: Story = () => {
  type TabValidations = { one: string | boolean; two: string | boolean };
  const [errors, setErrors] = useState<TabValidations>({
    one: "This is an error",
    two: "Here is another error",
  });
  const [warnings, setWarnings] = useState<TabValidations>({
    one: "This is a warning",
    two: "Here is another warning",
  });
  const [infos, setInfos] = useState<TabValidations>({
    one: "This is an info",
    two: "Here is another info",
  });
  return (
    <Box p="4px">
      <Tabs align="left" position="top" showValidationsSummary>
        <Tab tabId="tab-1" title="Tab 1" key="tab-1">
          <Checkbox
            label="Error 1"
            error={errors.one}
            onChange={(e) =>
              e.target.checked
                ? setErrors({ ...errors, one: "This is an error" })
                : setErrors({ ...errors, one: "" })
            }
            checked={!!errors.one}
          />
          <Checkbox
            label="Error 2"
            error={errors.two}
            onChange={(e) =>
              e.target.checked
                ? setErrors({ ...errors, two: "Here is another error" })
                : setErrors({ ...errors, two: "" })
            }
            checked={!!errors.two}
          />
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2">
          <Checkbox
            label="Warning 1"
            warning={warnings.one}
            onChange={(e) =>
              e.target.checked
                ? setWarnings({ ...warnings, one: "This is a warning" })
                : setWarnings({ ...warnings, one: "" })
            }
            checked={!!warnings.one}
          />
          <Checkbox
            label="Warning 2"
            warning={warnings.two}
            onChange={(e) =>
              e.target.checked
                ? setWarnings({
                    ...warnings,
                    two: "Here is another warning",
                  })
                : setWarnings({ ...warnings, two: "" })
            }
            checked={!!warnings.two}
          />
        </Tab>
        <Tab tabId="tab-3" title="Tab 3" key="tab-3">
          <Checkbox
            label="Info 1"
            info={infos.one}
            onChange={(e) =>
              e.target.checked
                ? setInfos({ ...infos, one: true })
                : setInfos({ ...infos, one: "" })
            }
            checked={!!infos.one}
          />
          <Checkbox
            label="Info 2"
            info={infos.two}
            onChange={(e) =>
              e.target.checked
                ? setInfos({ ...infos, two: "This is a warning" })
                : setInfos({ ...infos, two: "" })
            }
            checked={!!infos.two}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};
WithStringValidationsSummarised.storyName =
  "With String Validations Summarised";
WithStringValidationsSummarised.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Responsive: Story = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
Responsive.storyName = "Responsive - Horizontal";

export const ResponsiveValidation: Story = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
      errorMessage: index === 5 ? "error" : undefined,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
            {tabData.errorMessage && (
              <Checkbox
                label="Add error"
                error="error"
                onChange={() => {}}
                checked
              />
            )}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
ResponsiveValidation.storyName = "Responsive - Horizontal with validation";

export const ResponsiveVertical: Story = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="left">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
ResponsiveVertical.storyName = "Responsive - Vertical";

export const ResponsiveLarge: Story = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
      errorMessage: index === 5 ? "error" : undefined,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" size="large" position="top">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
            {tabData.errorMessage && (
              <Checkbox
                label="Add error"
                error="error"
                onChange={() => {}}
                checked
              />
            )}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
ResponsiveLarge.storyName = "Responsive - Large Tabs";
