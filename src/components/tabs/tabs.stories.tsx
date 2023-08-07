import React, { useState } from "react";

import useMediaQuery from "../../hooks/useMediaQuery";
import { Tabs, Tab } from ".";
import { Checkbox } from "../checkbox";
import Pill from "../pill";
import Icon from "../icon";
import Box from "../box";

export const DefaultStory = () => {
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

export const PositionedTopAlignedRight = () => {
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

export const PositionedLeftAndAlignedLeft = () => {
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

export const PositionedLeftAndAlignedRight = () => {
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

export const WithLinkAsATab = () => {
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

export const WithSpecifiedTabVisible = () => {
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

export const WithoutExtendedDividingLine = () => {
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

export const WithLargeTabsPositionedTop = () => {
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

export const WithLargeTabsPositionedLeft = () => {
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

export const WithBordersPositionedTop = () => {
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

export const WithNoSidesPositionedTop = () => {
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

export const WithBordersPositionedLeft = () => {
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

export const WithNoSidesPositionedLeft = () => {
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

export const WithValidationsPositionedTop = () => {
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

export const WithValidationsSizedLargePositionedTop = () => {
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

export const WithValidationsPositionedLeft = () => {
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

export const WithValidationsSizedLargePositionedLeft = () => {
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

export const WithAlternateStyling = () => {
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

export const WithHeaderWidth = () => {
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

export const WithCustomSpacing = () => {
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

WithStringValidationsSummarised.parameters = {
  chromatic: { disableSnapshot: true },
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
