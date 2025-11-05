import React, { useState } from "react";
import { Tabs as Tabs, Tab as Tab, TabsProps, TabProps } from ".";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import Box from "../box";
import Form from "../form";
import Textbox from "../textbox";
import CarbonProvider from "../carbon-provider";
import { Checkbox } from "../checkbox";
import Pill from "../pill";
import Icon from "../icon";

export default {
  title: "Deprecated/Tabs/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    align: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    position: {
      options: ["top", "left"],
      control: {
        type: "select",
      },
    },
    borders: {
      options: ["off", "on", "no sides", "no left side", "no right side"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["default", "large"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "alternate"],
      control: {
        type: "select",
      },
    },
  },
};

export const LegacyDefault = (args: TabsProps) => {
  return (
    <Tabs {...args}>
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
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-6"
        title="Tab 6"
        key="tab-6"
        href="https://carbon.sage.com/"
      />
    </Tabs>
  );
};

LegacyDefault.storyName = "Default";

export const LegacyValidationPositionTop = () => {
  return (
    <Tabs position="top">
      <Tab errorMessage="Error Message" tabId="tab-1" title="Tab 1" key="tab-1">
        <Textbox label="textbox" error onChange={() => {}} value="" />
      </Tab>
      <Tab
        warningMessage="Warning Message"
        tabId="tab-2"
        title="Tab 2"
        key="tab-2"
      >
        <Textbox label="textbox" warning onChange={() => {}} value="" />
      </Tab>
      <Tab infoMessage="Info Message" tabId="tab-3" title="Tab 3" key="tab-3">
        <Textbox label="textbox" info onChange={() => {}} value="" />
      </Tab>
    </Tabs>
  );
};
LegacyValidationPositionTop.storyName = "Validation position top";
LegacyValidationPositionTop.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const LegacyValidationPositionLeft = () => {
  return (
    <Tabs position="left">
      <Tab errorMessage="Error Message" tabId="tab-1" title="Tab 1" key="tab-1">
        <Textbox label="textbox" error onChange={() => {}} value="" />
      </Tab>
      <Tab
        warningMessage="Warning Message"
        tabId="tab-2"
        title="Tab 2"
        key="tab-2"
      >
        <Textbox label="textbox" warning onChange={() => {}} value="" />
      </Tab>
      <Tab infoMessage="Info Message" tabId="tab-3" title="Tab 3" key="tab-3">
        <Textbox label="textbox" info onChange={() => {}} value="" />
      </Tab>
    </Tabs>
  );
};
LegacyValidationPositionLeft.storyName = "Validation position left";
LegacyValidationPositionLeft.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const LegacyNewValidationPositionTop = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Tabs position="top">
        <Tab
          errorMessage="Tab Error Message"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Textbox
            label="textbox"
            error="Error Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
        <Tab
          warningMessage="Tab Warning Message"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Textbox
            label="textbox"
            warning="Warning Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
      </Tabs>
    </CarbonProvider>
  );
};
LegacyNewValidationPositionTop.storyName = "New Validation position top";
LegacyNewValidationPositionTop.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const LegacyNewValidationPositionLeft = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Tabs position="left">
        <Tab
          errorMessage="Tab Error Message"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Textbox
            label="textbox"
            error="Error Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
        <Tab
          warningMessage="Tab Warning Message"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Textbox
            label="textbox"
            warning="Warning Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
      </Tabs>
    </CarbonProvider>
  );
};
LegacyNewValidationPositionLeft.storyName = "New Validation position left";
LegacyNewValidationPositionLeft.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const LegacyWithAdditionalTitleSiblingsRedesign = () => {
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
            errorMessage="Tab Error Message"
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
              m={2}
            />
          </Tab>
          <Tab
            errorMessage="Tab Error Message"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
            titlePosition="after"
          >
            <Checkbox
              label="Add error"
              error={errors.two}
              checked={errors.two}
              onChange={() => setErrors({ ...errors, two: !errors.two })}
              m={2}
            />
          </Tab>
          <Tab
            errorMessage="Tab Error Message"
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
              checked={errors.three}
              onChange={() => setErrors({ ...errors, three: !errors.three })}
              m={2}
            />
          </Tab>
        </Tabs>
      </Box>
    </CarbonProvider>
  );
};
LegacyWithAdditionalTitleSiblingsRedesign.storyName =
  "New Validation Additional Title Siblings";
LegacyWithAdditionalTitleSiblingsRedesign.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const LegacyWithStringValidationsSummarised = () => {
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
LegacyWithStringValidationsSummarised.storyName =
  "With String Validations Summarised";

export const LegacyResponsiveValidation = () => {
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
LegacyResponsiveValidation.storyName = "Responsive with error";
LegacyResponsiveValidation.parameters = {
  chromatic: { disableSnapshot: false, viewports: [1200, 500] },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const LegacyResponsiveLarge = () => {
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
LegacyResponsiveLarge.storyName = "Responsive Large with error";
LegacyResponsiveLarge.parameters = {
  chromatic: { disableSnapshot: false, viewports: [1200, 600] },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const TabsInSidebar = (
  props: Partial<TabsProps> & Partial<TabProps>,
) => {
  return (
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <Box p="4px">
        <Tabs align="left" position="top" {...props}>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
            {...props}
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
    </DrawerSidebarContext.Provider>
  );
};
TabsInSidebar.storyName = "Tabs in sidebar";
TabsInSidebar.parameters = {
  info: { disable: true },
  chromatic: {
    disableSnapshot: false,
  },
};

export const TabsInSidebarPositionedLeft = (
  props: Partial<TabsProps> & Partial<TabProps>,
) => {
  return (
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <Box p="4px">
        <Tabs align="left" position="left" {...props}>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
            {...props}
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
    </DrawerSidebarContext.Provider>
  );
};
TabsInSidebarPositionedLeft.storyName = "Tabs in sidebar positioned left";
TabsInSidebarPositionedLeft.parameters = {
  info: { disable: true },
  chromatic: {
    disableSnapshot: false,
  },
};

export const LegacyWithHorizontalScrollbarInsideForm = (args: TabsProps) => {
  const onSubmit = () => {};

  return (
    <Form onSubmit={onSubmit}>
      <Box
        margin="var(--spacing200)"
        display="flex"
        flexDirection="column"
        gap="var(--spacing200)"
        minWidth="320px"
        maxWidth="1024px"
      >
        <Tabs {...args}>
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
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-6"
            title="Tab 6"
            key="tab-6"
            href="https://carbon.sage.com/"
          />
        </Tabs>
      </Box>
    </Form>
  );
};
LegacyWithHorizontalScrollbarInsideForm.storyName =
  "With Horizontal Scrollbar Inside Form";
