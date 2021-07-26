# Carbon TypeScript Style Guide

## Follow these guidelines when contributing TypeScript to the Carbon repository

### Contents

[Introduction](#introduction)

[Conventions](#conventions)

[Linting](#linting)

### Introduction

This TypeScript style guide is provided to help you contribute to the Carbon repository in a way that other developers can understand quickly and easily.

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

Each component and sub-component should have a `<component-name>.d.ts` file containing it's TypeScript interface. The root directory of the component should also have a `index.d.ts` file which exports the interfaces from the component and any non-internal sub-components.

### Conventions

#### Component interface

All component interfaces (in `<component-name>.d.ts` files) should follow this template:

```ts
import * as React from "react";

export interface MyComponentProps {
  /** Example required prop description */
  exampleRequiredProp: string;
  /** Example optional prop description */
  exampleOptionalProp?: string;
}

declare function MyComponent(props: MyComponentProps): JSX.Element;

export default MyComponent;
```

Exports in the `<component-name>.d.ts` file should match it's js counterpart.

#### Index file

Exports in the `index.d.ts` file should should match exports in the index.js file:

```ts
export { default } from "./my-component"; // If the js export type is default
export { MyComponent } from "./my-component"; // If the js export type is named
export { default as MyComponent } from "./my-component"; // If the js export type is named and the Component is exported as default in the component.d.ts file
export { MySubComponent } from "./my-sub-component/my-sub-component";
```

### Linting

#### TSLint

To detect errors and potential problems in our TypeScript we currently use TSLint. We will soon look to migrate to ESLint however as TSLint has been deprecated (https://palantir.github.io/tslint/)

#### Rules

Our linting rules are defined in [tsconfig.json](../tsconfig.json) at the root of the project. You can run our linting rules against your code locally with:

```
npm run lint-ts
```

### Tips

To avoid TypeScript eslint errors in VSCode when using the ESLint plugin, a line should be added to the `settings.json` to disable ESLint in TypeScript:
```
"eslint.probe": ["javascript", "javascriptreact", "html", "markdown"],
```
