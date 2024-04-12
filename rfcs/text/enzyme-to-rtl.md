- Start Date: 28/01/2022

# Table of contents

- [Summary](#summary)
- [Basic example](#basic-example)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
  - [Config setup](#config-setup)
  - [Component testing](#component-testing)
  - [User events](#user-events)
- [Drawbacks](#drawbacks)
  - [Conversion effort](#conversion-effort)
  - [Developer training](#developer-training)
  - [Supporting both utilities concurrently](#supporting-both-utilities-concurrently)
- [Alternatives](#alternatives)
  - [Sticking with Enzyme](#sticking-with-enzyme)
  - [Other React testing utilities](#other-react-testing-utilities)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)

# Summary

In Carbon we currently use [Jest](https://jestjs.io/) as our unit testing framework, and [Enzyme](https://enzymejs.github.io/enzyme/) as a testing utility for our React components.

This works well and Enzyme has been a very popular utility for testing React applications for a long time. Recently however, support for it seems to have stalled, particularly for the most recent version of React (at the time of writing), React 17.

An [issue was raised](https://github.com/enzymejs/enzyme/issues/2429) in August 2020 to add support for React 17 to Enzyme, but as of January 2022 this has still not been added and it doesn't look like it will be for the foreseeable future.

This is preventing us from upgrading Carbon to use React 17 and supporting it for Carbon's consumers. React 17 was released in October 2020, and [React 18](https://reactjs.org/blog/2021/06/08/the-plan-for-react-18.html) is now in beta so we are at risk of falling behind, which is not acceptable for a component library supporting so many other projects. We have already had a number of issues raised about the lack of React 17 support in our components.

The logical solution for us is to move towards the officially recommended tesing utility for React, [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). This has much better support, and is actually already used by most of the modern Sage projects we support.

# Basic example

The React Testing Library docs have a great [migration from Enzyme](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme) guide. This has a section on [basic Enzyme to React Testing Library migration examples](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme#basic-enzyme-to-react-testing-library-migration-examples) which show exactly how the two libraries compare. I will add one of the basic examples here, but for a more in depth look, read the above docs.

A simple Enzyme test for one of our components might look something like this:

```jsx
describe("Example Component", () => {
  it("renders the title in a h1 element", () => {
    const wrapper = shallow(<ExampleComponent title="Enzyme test" />);
    expect(wrapper.find("h1").text()).toEqual("Enzyme test");
  });
});
```

The same test converted to React Testing Library will look like this:

```jsx
describe("Example Component", () => {
  test("renders the title in a h1 element", () => {
    render(<ExampleComponent title="Enzyme test" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Enzyme test"
    );
  });
});
```

The two libraries have slightly different APIs, but the tests are fairly similar and the effort required to convert them should be minimal.

# Motivation

The main motivation for us making this conversion is that, as previously mentioned, Enzyme does not yet support React 17. It is well over a year after it was released, and it does not look like support will be added in the near future. React 18 is in beta and we will be blocked from upgrading to that as well when it is released. It could be years before Enzyme add support for that, if ever.

Some of our consumers are already using React 17 and we need to start adding support it for ASAP, as a widely used component library within Sage we can't afford to fall behind on basic things such as React support. A number of issues have already been raised by consumers about support for React 17 in some of our components.

At Sage many of our modern React projects are now using React Testing Library, and it would be wise to use the same utilities across projects so developers across teams can support each other more easily. React Testing Library is also recommended by the architecture team for our React projects.

Also using Jest with React Testing Library is now the [recommended setup](https://reactjs.org/docs/testing.html#tools) in the React documentation.

[This section](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme#why-should-i-use-react-testing-library) in the React Testing Library docs also lists some great reasons to convert from Enzyme.

# Detailed design

In order to make the transition as smooth as possible, we should convert our component tests incrementally, and therefore need to temporarily support both testing utilities.

## Config setup

To add in React Testing Library, we just need to install `@testing-library/react` and `@testing-library/jest-dom` as dev depencencies and no further setup is needed to get started. We can simply import the modules we need into our test files, such as:

```javascript
import { render, screen } from "@testing-library/react";
```

No modifications would be needed to our Jest config either, until we finish the conversion and remove anything related to Enzyme.

We currently wrap components in theme or i18n providers on a test-by-test basis, but if we decide we want to wrap all components in these by default, we can create a custom render method as desribed [here](https://testing-library.com/docs/react-testing-library/setup/#custom-render) in the React Testing Library docs.

If we were to do so, we would likely want to wrap our components in the `CarbonProvider` component (to provide the theme and the Design Token CSS variables) and the `I18nProvider` component for translations, like this:

```jsx
const CustomProviders = ({ children }) => {
  return (
    <CarbonProvider theme={sage}>
      <I18nProvider locale={enGB}>{children}</I18nProvider>
    </CarbonProvider>
  );
};
```

## Component testing

Again the React Testing Library docs give a great [migration guide](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme#basic-enzyme-to-react-testing-library-migration-examples) for converting tests from Enzyme. They note that there isn't an exact one-to-one mapping of features between the two libraries, so some of our tests may have to be re-written slightly, but it should make them more concise and efficient.

React Testing Library aims to test components more in a way that users would use them, rather than a lot of behind the scenes testing of implementation details we do with Enzyme.

One major benefit is there is no longer any need for a wrapper variable (as shown in the [Basic example](#basic-example) section above) and also no need to manually update the state of the wrapper as we often have to in Enzyme tests by calling `wrapper.update()`. We can access the rendered output via the `screen` object. It should also significantly reduce the amount of times we have to call `act()` in our tests as well.

React Testing Library's `render` method is more similar to Enzyme's `mount` than `shallow` which is fine as we use `mount` around 10 times more in ours tests than `shallow`, and it won't break any of our tests that currently use `shallow` anyway.

RTL also cleans up the environment automatically after each test, so we can remove a lot of the cleanup we do manually in our tests in `afterEach` functions.

## User events

React Testing Library also provides a `@testing-library/user-event` package which we should use to simulate user events in our tests. Again the [docs](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme#simulate-user-events) give a great explanation of how to use this.

# Drawbacks

## Conversion effort

Carbon is a large component library and therefore the conversion will take a significant amount of time and effort to complete. We will have to create a task to convert each component individually and support each conversion through all stages of our development workflow.

Some components will be simple to convert, and inevitably some will be more complex with issues not immediately obvious when estimating the work.

## Developer training

Training will likely be needed for some, if not all, developers currently working on Carbon. Whilst training developers is never a bad thing, it will take time to complete and for developers to get comfortable using React Testing Library on a day to day basis.

## Supporting both utilities concurrently

Until all unit tests have been switched from Enzyme to React Testing Library, we will need to support both which will bloat our setup and may cause some teething issues while setting up. Ultimately however, RTL has less config to set up than Enzyme, and our setup will therefore be more streamlined once the conversion is complete.

It may not be a great development experience switching between writing/maintaining tests using both utilities while we undergo the conversion.

# Alternatives

## Sticking with Enzyme

We could simply not do any of this and just continue to use Enzyme. This would obviously require far less initial effort, but the lack of support for React 17+ and questionable future maintainance of the library is inevitably going to cause us more and more problems as time goes on, and it's highly likely that we will have to undergo this conversion when React 18 is released anyway.

## Other React testing utilities

There are other ways to test React components out there, such as using React Test Utils and Test Renderer, however Enzyme and React Testing Library are by far the most widely adopted utilities. There is no other realistic option for efficiently testing a large React code base such as Carbon.

We do not need to move away from using Jest as our test framework so no other options have been considered there for the purposes of this RFC.

# Adoption strategy

As mentioned previously it is possible to support testing using both Enzyme and React Testing Library concurrently, so we will do so. This enables us to convert one component at a time if we wish, as it would be a mammoth task to convert the whole Carbon library in one go. We can create tasks for individual components, and potentially group certain components together at the point of refinement and estimation if needed.

We can follow this [conversion guide](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme) in the React Testing Library docs to set it up in Carbon and convert the tests. The complete API for React Testing Library is also very well documented which will help us significantly in the conversion.

# How we teach this

The creator of React Testing Library, Kent C. Dodds has created a [training course](https://testingjavascript.com/playlists/test-react-components-with-jest-and-react-testing-library-72cf) to educate developers on how to use the library with Jest. There are many other training courses available online to learn how to use React Testing Library as well.

The [React Testing Library docs](https://testing-library.com/docs/react-testing-library/intro) are a great resource from setup to advanced usage of the library.

React Testing Library is already widely adopted in other Sage projects, so the development team here have access to those for examples and we can ask for assistance from developers on other teams if required.
