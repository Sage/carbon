# Carbon JavaScript Style Guide

## Follow these guidelines when contributing JavaScript to the Carbon repository

### Contents

[Introduction](#introduction)

[Conventions](#conventions)

[Airbnb's JavaScript Style Guide](#airbnbs-javascript-style-guide)

[Linting](#linting)

### Introduction

This JavaScript style guide is provided to help you contribute to the Carbon repository in a way that other developers can understand quickly and easily.

### Folder Structure

We have a consistent approach to the file structure for our components as shown below:

```
src/components/new-component/
  |-- __internal__/..
  |-- sub-component/..
  |-- new-component.js
  |-- index.js
  |-- new-component.style.js
  |-- new-component.spec.js
  |-- new-component.stories.mdx
  |-- new-component.stories.js
  |-- new-component.d.ts
  |-- index.d.ts
```

Any sub-component that will not be exported directly from Carbon should go in the `new-component/__internal__/` folder. Sub-components should have the same file structure as shown for components where appropriate.

### Conventions

#### Theme Variants

Props that changes the visual appearance of the component **must** be called `variant`. New props **must not** be called `type` or `xyzType`.

```jsx
<Component variant="light" />
<Component variant="dark" />
```

> If a `type` or `xyzType` prop already exists you are not obligated to change it. For example, if you need to work on that component to fix an unrelated bug. However, we are committed to providing a consistent interface and we will phase out these props when appropriate.

If you need to support a matrix you _may_ add multiple distinct props e.g. `scrollVariant`, `colorVariant` instead of defining every combination as a `variant`. This shouldn't be required often, if you're adding a matrix, please ensure that you intend to support every combination.

```jsx
<Component scrollVariant="light" colorVariant="dark" />
<Component scrollVariant="light" colorVariant="light" />
<Component scrollVariant="dark" colorVariant="dark" />
<Component scrollVariant="dark" colorVariant="light" />
```

### Airbnb's JavaScript Style Guide

We have chosen to adhere to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), which covers everything from variable declarations, functions, and events to testing and performance tips. Our recommendation is to visit their [GitHub pages](https://github.com/airbnb/javascript) and familiarise yourself with their documentation first-hand.

### Linting

#### ESLint

To detect errors and potential problems in our JavaScript we use ESLint. ESLint is designed to allow the creation of custom linting rules and Carbon's configuration extends the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and [ESLint-plugin-React](https://www.npmjs.com/package/eslint-plugin-react) with a few of our own custom configurations.

#### Rules

Our linting rules are defined in [.eslintrc](../.eslintrc) at the root of the project, these rules do change from time-to-time so please check this file and cross reference it against the [ESLint Rules](https://eslint.org/docs/rules/). You can run our linting rules against your code locally with:

```
npm run lint
```
