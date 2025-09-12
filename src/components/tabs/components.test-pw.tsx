import React, { useState } from "react";
import { Tabs, Tab, TabsProps, TabProps } from ".";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Checkbox } from "../checkbox";
import Box from "../box";
import Icon from "../icon";
import Pill from "../pill";
import Button from "../button";

import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";

export const TabsComponent = (
  props: Partial<TabsProps> & Partial<TabProps>,
) => {
  return (
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
  );
};

export const TabsComponentValidations = (props: Partial<TabsProps>) => {
  const [errors, setErrors] = React.useState({
    one: true,
    two: false,
    three: false,
  });
  const [warnings, setWarnings] = React.useState({
    one: true,
    two: true,
    three: false,
  });
  const [infos, setInfos] = React.useState({
    one: true,
    two: true,
    three: true,
  });
  return (
    <Tabs align="left" position="top" {...props}>
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
          checked={errors.two}
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
          checked={errors.three}
        />
        <Checkbox
          label="Add warning"
          warning={warnings.three}
          onChange={() => setWarnings({ ...warnings, three: !warnings.three })}
          checked={warnings.three}
        />
        <Checkbox
          label="Add info"
          info={infos.three}
          onChange={() => setInfos({ ...infos, three: !infos.three })}
          checked={infos.three}
        />
      </Tab>
    </Tabs>
  );
};

export const TabsComponentValidationsUnregistering = ({
  validationType,
}: {
  validationType: "error" | "warning" | "info";
}) => {
  const [show, setShow] = React.useState(true);

  return (
    <Box p="4px">
      <button
        data-element="foo-button"
        type="button"
        onClick={() => setShow(false)}
      >
        Hide Tab Child
      </button>
      <Tabs align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          {show && (
            <Checkbox
              label={`Add ${validationType}`}
              onChange={() => {}}
              checked
              {...{ [validationType]: true }}
            />
          )}
        </Tab>
      </Tabs>
    </Box>
  );
};

export const TabsValidationOverride = () => {
  const [validation, setValidation] = React.useState({
    error: true,
    warning: false,
    info: false,
  });

  const { error, warning, info } = validation;

  return (
    <Tabs
      align="left"
      position="top"
      validationStatusOverride={{
        "tab-1": {
          error: false,
          warning: false,
          info: false,
        },
      }}
    >
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
          error={error}
          onChange={() =>
            setValidation((currentState) => ({
              ...currentState,
              error: !currentState.error,
            }))
          }
          checked={error}
        />
        <Checkbox
          label="Add warning"
          warning={warning}
          onChange={() =>
            setValidation((currentState) => ({
              ...currentState,
              warning: !currentState.warning,
            }))
          }
          checked={warning}
        />
        <Checkbox
          label="Add info"
          info={info}
          onChange={() =>
            setValidation((currentState) => ({
              ...currentState,
              info: !currentState.info,
            }))
          }
          checked={info}
        />
      </Tab>
    </Tabs>
  );
};

export const TabsInSidebar = (
  props: Partial<TabsProps> & Partial<TabProps>,
) => {
  return (
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <TabsComponent {...props} />
    </DrawerSidebarContext.Provider>
  );
};

export const WithAdditionalTitleSiblings = () => {
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
            checked={errors.two}
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
            checked={errors.three}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};

export const WithAdditionalTitleSiblingsSizeLarge = () => {
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
            checked={errors.two}
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
            checked={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};

export const WithCustomLayout = () => {
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
            checked={errors.one}
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
            checked={errors.two}
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
            checked={errors.three}
            error={errors.three}
            onChange={() => setErrors({ ...errors, three: !errors.three })}
          />
        </Tab>
      </Tabs>
    </Box>
  );
};

export const WithStringValidationsSummarised = () => {
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

export const Responsive = () => {
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 900px)");

  let position: "top" | "left" = "top";

  if (fullscreenViewBreakPoint) {
    position = "left";
  }

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
      <Tabs align="left" position={position}>
        {tabsData.map((tabData) => (
          <Tab {...tabData} key={tabData.key} />
        ))}
      </Tabs>
    </Box>
  );
};

export const WithUpdatingChild = () => {
  const [updated, setUpdated] = useState(false);
  const onButtonClick = () => setUpdated((prev) => !prev);

  return (
    <Box p="4px">
      <Tabs align="left" position="top" selectedTabId="tab-2">
        <Tab tabId="tab-1" title="Tab 1">
          Content for tab 1
        </Tab>
        <Tab tabId="tab-2" title="Tab 2">
          Content for tab 2{updated ? "Foo" : "Bar"}
          <Button onClick={onButtonClick}>Update</Button>
        </Tab>
      </Tabs>
    </Box>
  );
};
