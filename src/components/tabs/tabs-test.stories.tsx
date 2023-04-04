import React from "react";
import { Tabs, Tab, TabsProps } from ".";
import { Checkbox } from "../checkbox/checkbox.component";

export default {
  title: "Tabs/Test",
  includeStories: ["Default"],
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

export const Default = (args: TabsProps) => {
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

Default.storyName = "default";

export const TabsComponent = ({ ...props }: TabsProps) => {
  return (
    <div
      style={{
        padding: "4px",
      }}
    >
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
    </div>
  );
};

export const TabsComponentValidations = ({ ...props }: TabsProps) => {
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
    <div
      style={{
        padding: "4px",
      }}
    >
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
    </div>
  );
};

export const TabsComponentValidationsUnregistering = () => {
  const [show, setShow] = React.useState(true);

  return (
    <div
      style={{
        padding: "4px",
      }}
    >
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
          {show && <Checkbox label="Add error" onChange={() => {}} checked />}
        </Tab>
      </Tabs>
    </div>
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
