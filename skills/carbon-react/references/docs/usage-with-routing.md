import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Documentation/Usage with routing" />

# Using Carbon components with routing libraries

## Contents

- [Usage with React Router v5](#usage-with-react-router-v5)
- [Usage with React Router v6](#usage-with-react-router-v6)
- [Supported components](#supported-components)

## Introduction

There is no code in Carbon to implement a specific routing library, we aim to let the user decide which library to use.

React Router is one of the most popular routing libraries so we have provided examples below to help with implementing Carbon components as links using both v5 and v6 of this library. There are small but important differences in the implementation of each version.

**Important:** Whichever Routing library you use, when adding `onClick` handlers to `Link` and `MenuItem` components to handle routing, it is important that the `href` prop is also
provided to ensure the component renders as an HTML `<a>` tag rather than a `<button>`.

## Usage with React Router v5

An example of how to use the Carbon `Button` and `Link` components as links with React Router v5 is shown below, this can be applied to any of the supported Carbon components.
Note the use of the `useHistory` hook from `react-router-dom`.

```jsx
import React, { useCallback, useState } from "react";
import Button from "carbon-react/lib/components/button";
import Link from "carbon-react/lib/components/link";
import { Tabs, Tab } from "carbon-react/lib/components/tabs";

import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

const CarbonButtonWithReactRouter = ({ to, children }) => {
  const history = useHistory();
  const onClick = useCallback(() => {
    history.push(to);
  }, [to, history]);

  return <Button onClick={onClick}>{children}</Button>;
};

const CarbonLinkWithReactRouter = ({ to, children }) => {
  const history = useHistory();
  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      history.push(to);
    },
    [to, history]
  );

  return (
    /* note the href prop here - without this an HTML <button> will be rendered
    and the "link" will therefore not behave as expected in every way */
    <Link onClick={onClick} href={to}>
      {children}
    </Link>
  );
};

const CarbonTabsWithReactRouter = ({ children }) => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState();
  const handleTabChange = useCallback(
    (tabId) => {
      history.push(tabId);
      setActiveTab(tabId);
    },
    [history]
  );

  return (
    <Tabs onTabChange={handleTabChange} selectedTabId={activeTab}>
      {children}
    </Tabs>
  );
};

const Home = () => (
  <div>
    <CarbonButtonWithReactRouter to="settings">
      Settings
    </CarbonButtonWithReactRouter>
  </div>
);

const Settings = () => (
  <div>
    <CarbonLinkWithReactRouter to="/">Home</CarbonLinkWithReactRouter>
  </div>
);

const Overview = () => (
  <div>
    <CarbonTabsWithReactRouter>
      <Tab tabId="tab-1" title="Tab 1" key="tab-1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2" key="tab-2">
        Content for tab 2
      </Tab>
    </CarbonTabsWithReactRouter>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/settings" component={Settings} />
      <Route path="/overview" component={Overview} />
    </Switch>
  </BrowserRouter>
);
```

## Usage with React Router v6

An example of how to use the Carbon `Button` and `Link` components as links with React Router v6 is shown below, this can be applied to any of the supported Carbon components.
Note the use of the `useNavigate` hook from `react-router-dom`.

```jsx
import React, { useCallback, useState } from "react";
import Button from "carbon-react/lib/components/button";
import Link from "carbon-react/lib/components/link";
import { Tabs, Tab } from "carbon-react/lib/components/tabs";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const CarbonButtonWithReactRouter = ({ to, children }) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(to);
  }, [to, navigate]);

  return <Button onClick={onClick}>{children}</Button>;
};

const CarbonLinkWithReactRouter = ({ to, children }) => {
  const navigate = useNavigate();
  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      navigate(to);
    },
    [to, navigate]
  );

  return (
    /* note the href prop here - without this an HTML <button> will be rendered
    and the "link" will therefore not behave as expected in every way */
    <Link onClick={onClick} href={to}>
      {children}
    </Link>
  );
};

const CarbonTabsWithReactRouter = ({ children }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState();
  const handleTabChange = useCallback(
    (tabId) => {
      navigate(tabId);
      setActiveTab(tabId);
    },
    [navigate]
  );

  return (
    <Tabs onTabChange={handleTabChange} selectedTabId={activeTab}>
      {children}
    </Tabs>
  );
};

const Home = () => (
  <div>
    <CarbonButtonWithReactRouter to="settings">
      Settings
    </CarbonButtonWithReactRouter>
  </div>
);

const Settings = () => (
  <div>
    <CarbonLinkWithReactRouter to="/">Home</CarbonLinkWithReactRouter>
  </div>
);

const Overview = () => (
  <div>
    <CarbonTabsWithReactRouter>
      <Tab tabId="tab-1" title="Tab 1" key="tab-1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2" key="tab-2">
        Content for tab 2
      </Tab>
    </CarbonTabsWithReactRouter>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="settings" element={<Settings />} />
      <Route path="overview" element={<Overview />} />
    </Routes>
  </BrowserRouter>
);
```

## Supported components

There are many components that you can use this method with, including:

- `ActionPopoverItem`
- `Button`
- `Link`
- `MenuItem`
- `Tab`
- `Tabs`
