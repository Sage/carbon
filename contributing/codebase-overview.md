# Codebase overview

## Contents

- [Introduction](#introduction)
- [Writing components](#writing-components)
- [Documenting with Storybook](#documenting-with-storybook)
- [Linting](#linting)

## Introduction

This guide will give you an overview to the organisation of the Carbon codebase, its conventions and other tools used.

## Writing components

### Folder Structure

Our components should follow a consistent file structure as shown below (note the component names here are arbitrary).

```none
src/components/textbox/
  |-- textbox.component.(ts|tsx)
  |-- textbox.style.(ts|tsx)
  |-- textbox.spec.(ts|tsx)
  |-- textbox.stories.(ts|tsx)
  |-- textbox.stories.mdx
  |-- textbox.pw.(ts|tsx)
  |-- components.pw.(ts|tsx)
  |-- index.ts
  |-- sub-component/
      |-- ...
  |-- __internal__/
      |-- ...
```

Any sub-component that will not be exported directly from Carbon should go in the `__internal__/` folder. Sub-components should have the same file structure as root directory of the component.

The root directory of the component should also have a `index.ts` file which exports the component, non-internal sub-components and their prop interfaces.

### Component interface

All component prop interfaces (in `<component-name>.component.(ts|tsx)` files) should follow this template:

```ts
// in textbox.component.tsx

import React from "react";

export interface TextboxProps {
  /** Example required prop description */
  exampleRequiredProp: string;
  /** Example optional prop description */
  exampleOptionalProp?: string;
}

Textbox.displayName = "Textbox";
export default Textbox;
```

### Index file

Exports in the `index.ts` file should follow this template:

```ts
// If component is sole export of *.component file, export it as default
export { default } from "./textbox.component";
export { type TextboxProps } from "./textbox.component";

// If component should come with subcomponents - export all as named exports
export { default as Select } from "./select.component";
export { type SelectProps } from "./select.component";

export { default as Option } from "./option/option.component";
export { type OptionProps } from "./option/option.component";
```

> If you find any inconsistencies in module structure you are not obligated to change it. For example, if you need to work on that component to fix an unrelated bug. However, we are committed to provide a consistent interface for our components and will make changes where appropriate. Any changes we do make will be appropriately semantically versioned as well.

## Documenting with Storybook

We use [Storybook](https://storybook.js.org/) for our documentation - which uses example _"stories"_ to demo how our components can be used with certain props or how a particular layout can be achieved. Alongside demoing component behaviour, we also use stories for automated visual testing using [Chromatic](https://www.chromatic.com/), so we require stories to be written for all our components.

> If you are new to Storybook, we recommend first reading their [official docs](https://storybook.js.org/docs/react/get-started/introduction), particularly this section on [how to write stories](https://storybook.js.org/docs/react/writing-stories/introduction#how-to-write-stories), so you are familiar with the following patterns.

New stories should be written in TypeScript as a `<component>.stories.tsx` file to allow for type checking:

```tsx
// in button.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Button from ".";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    variant: "primary",
    children: "Click me!",
  },
};

export const SecondaryButton: Story = {
  args: {
    variant: "secondary",
    children: "Click me!",
  },
};
```

For creating the component docs pages you see on [carbon.sage.com](https://carbon.sage.com), these should be written separately in the [MDX](https://storybook.js.org/docs/react/writing-docs/mdx) format as a `<component>.mdx` file. This allows us to decouple our documentation from our story code. We then import our previously written TypeScript stories from `<component>.stories.tsx` into this new file, which Storybook uses to build our official docs for the component.

This would typically look like the following:

```none
/* in button.mdx... */

import { Meta, Story, Canvas, ArgsTable } from "@storybook/addon-docs/blocks";

import Button from ".";
import * as ButtonStories from "./button.stories.tsx";

<Meta of={ButtonStories} />

# Button

An accessible button which triggers an action on click.

## Examples

### Primary button

<Canvas>
  <Story name="primary button" story={stories.PrimaryButton} />
</Canvas>

### Secondary button

This is an example of a secondary `Button` which has slightly different styling:

<Canvas>
  <Story name="secondary button" story={stories.SecondaryButton} />
</Canvas>

## Props

<ArgTypes of={ButtonStories} />
```

## Linting

We use [ESLint](https://eslint.org/) to detect errors and potential problems in our TypeScript code. ESLint is designed to allow the creation of custom linting rules and Carbon's configuration extends the [Airbnb TypeScript Style Guide](https://github.com/iamturns/eslint-config-airbnb-typescript), [rules recommended for React](https://www.npmjs.com/package/eslint-plugin-react) and a few of our own custom configurations.

ESLint has been configured to be automatically triggered on your code whenever `git commit` to prevent the need to run manually. If required however, you can run ESLint manually with:

```shell
npm run lint
```

### Rules

Our linting rules are defined in [.eslintrc](../.eslintrc) at the root of the project, these rules do change from time-to-time so please check this file and cross reference it against the [ESLint Rules](https://eslint.org/docs/rules/).
