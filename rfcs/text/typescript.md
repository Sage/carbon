- Start Date: 22/07/2021

# Table of contents

- [Summary](#summary)
- [Basic example](#basic-example)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
  - [Config](#config)
    - [TypeScript config file](#typescript-config-file)
    - [Babel config](#babel-config)
    - [Packages](#packages)
    - [Scripts](#scripts)
    - [Eslint config](#eslint-config)
  - [Components](#components)
  - [Styled components](#styled-components)
  - [Unit testing](#unit-testing)
- [Drawbacks](#drawbacks)
  - [Conversion effort](#conversion-effort)
  - [Developer training](#developer-training)
  - [TypeScript lifespan](#typescript-lifespan)
- [Alternatives](#alternatives)
  - [Doing nothing](#doing-nothing)
  - [Removing TypeScript support](#removing-typescript-support)
- [Adoption strategy](#adoption-strategy)
- [How we teach this](#how-we-teach-this)
  - [Style guides](#style-guides)
  - [Training](#training)
  - [Documentation](#documentation)

# Summary

Currently Carbon is a JavaScript component library, in which we also provide TypeScript interfaces for our components.

This is a duplication of effort and a large cause of issues raised against the library as the JavaScript/TypeScript prop types are often out of step with one another.

This RFC will detail why and how we should convert Carbon from a JavaScript library, to a TypeScript one.

# Basic example

In the current js implementation of Carbon, a simple component will look like this (using the [`prop-types`](https://www.npmjs.com/package/prop-types) library):

```jsx
// my-component.component.js
const MyComponent = ({ propOne, propTwo, ...rest }) => {
  /* Component logic goes here */

  return <MyStyledComponent>{/* Content */}</MyStyledComponent>;
};

MyComponent.propTypes = {
  propOne: PropTypes.string.isRequired,
  propTwo: PropTypes.boolean,
};

export default MyComponent;
```

In order for a ts project to consume this component we also provide a separate ts interface:

```ts
// my-component.d.ts
export interface MyComponentProps {
  propOne: string;
  propTwo?: boolean;
}

declare function MyComponent(props: MyComponentProps): JSX.Element;

export default MyComponent;
```

Converting the project to ts would result in the same component looking like this, in a single file and the prop types defined in one place:

```tsx
// my-component.component.tsx
type MyComponentProps = {
  propOne: string;
  propTwo?: boolean;
};

const MyComponent = ({ propOne, propTwo, ...rest }: MyComponentProps) => {
  /* Component logic goes here */

  return <MyStyledComponent>{/* Content */}</MyStyledComponent>;
};

export default MyComponent;
```

# Motivation

For every single component in Carbon we currently define the prop types in two places, as shown in the basic example section above. Not only does this double (or more than double)
the amount of code required, it makes it very easy for the prop types to get out of step between the js and ts interfaces.

This is a common occurrence and a significant amount of the issues raised on the Carbon Github page relate to either the prop types being out of step, or the ts types being incorrect. This is causing very preventable bugs and unnecessary extra maintenance for the Carbon team.

A large amount of the more modern Sage repositories consuming Carbon are ts projects and it would make sense to align the technologies used, and upskill Carbon developers in using ts so they are more versatile in being able to help out with other projects.

The [React documentation](https://reactjs.org/docs/static-type-checking.html) itself recommends using either Flow or TypeScript for larger code bases, which Carbon most definitely is.

# Detailed design

Carbon already uses TypeScript for component interface definition files and therefore some of the setup for the project is already there, however it will need some tweaking. The plan is to use Babel for transpiling the code, and the TypeScript compiler (`tsc`) for type checking and generating definition files. We will then automatically generate JavaScript `propTypes` for each component from the TypeScript declarations using a custom script, these are needed for runtime prop checking for JavaScript libraries consuming Carbon.

## Config

The config required for Carbon to be converted to TypeScript will involve the following:

### TypeScript config file

There is already a `tsconfig.json` file in Carbon, however it will likely need to be changed slightly. The below config would be a good place to start:

```js
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": "./src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "importHelpers": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6", "dom"],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": false,
    "noUnusedLocals": true,
    "outDir": "./lib/",
    "resolveJsonModule": true,
    "rootDir": "./src",
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "target": "ES2016"
  },
  "include": ["src/**/*"]
}
```

### Babel config

We will use Babel for transpiling the code and `tsc` for type checking and generating `.d.ts` files. This hybrid approach is common for codebases ported from JavaScript to TypeScript with existing build structures using Babel.

Using Babel enables us to keep listing the exact environments we need to support, i.e. the last 2 versions of our supported browsers. It's also faster to compile than the TypeScript compiler.

We should be able to leave our Babel config as it is as long as type checking is carried out before running Babel in our build setup.

### Packages

The version of the `typescript` package in Carbon should be aligned with the version used in the other Sage TypeScript repositories.

No new packages should need to be added to Carbon for this conversion.

### Scripts

Scripts to generate declaration (`.d.ts`) files and carry out type checking should be added:

```js
 "scripts": {
    "type-check": "tsc --noEmit", // Type check the code once
    "type-check:watch": "npm run type-check -- --watch", // Keep type checking running
    "build:types": "tsc --emitDeclarationOnly", // Generate declaration files
    "copy-def-files": "cpy \"**/(*.d.ts)\" ../lib/ --cwd=src --parents", // Temporary - Copy across declaration files for js components
  },
```

The `--extensions '.js','.ts','.tsx'` option should be added to the `babel` script. This will tell Babel to look for TypeScript files and transpile them to JavaScript, as well as transpile any JavaScript files we need.

The `copy-files` script can now ignore TypeScript files as they will be transpiled and copied into the `lib` folder by Babel. `.d.ts` files will be generated added to the `lib` folder by the `build:types` script, as long as `"outDir": "./lib/",` is specified in the TypeScript config. To allow us to convert components individually, rather than all in one go, the `copy-def-files` script can be used to copy `.d.ts` files for existing JavaScript components where `.d.ts` files have been manually added.

A `generate-proptypes` script should be written to generate JavaScript `propTypes` from the TypeScript definitions. This should use the [`typescript-to-proptypes`](https://www.npmjs.com/package/typescript-to-proptypes) package to achieve this.

The `precompile` script should then be modified to run type checking and generate declaration files, as well as running Babel:

```json
    "precompile": "npm run type-check && npm run clean-lib && npm run copy-files && npm run build:types && npm run copy-def-files && npm run generate-proptypes && npm run babel",
```

### Eslint config

Converting to TypeScript means the parser in the eslint config should change to `@typescript-eslint/parser` rather than `babel-eslint`.

A [Pull Request](https://github.com/Sage/carbon/pull/3978) is already in progress to add eslint config for TypeScript in Carbon. Once we convert the library to TypeScript we can simply replace the base config with the overrides specified in that config.

## Components

See the [Basic Example](#basic-example) section for how components will change when converted to TypeScript. The types of each prop will remain the same but defined only in TypeScript rather than both js and ts.

The types of constants defined within components can be inferred by TypeScript and there is no need to type them. The [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) states "it’s best not to add annotations when the type system would end up inferring the same type anyway".

## Styled Components

The [styled-components documentation](https://styled-components.com/docs/api#typescript) give a comprehensive guide on how to set up TypeScript with styled-components, type themes and use custom props which is everything we need. This is a common set up and there is no need to reinvent the wheel here.

## Unit testing

Converting to TypeScript means our spec files will also be TypeScript and therefore all code within will need to be typed correctly. While more effort than having JavaScript test files, this will help to weed out any bad code in our tests, leading to higher quality unit testing.

There is also a guide in the [Jest documentation](https://jestjs.io/docs/getting-started#using-typescript) on how to set up Jest with TypeScript. We may want to add the [`@types/jest`](https://www.npmjs.com/package/@types/jest) module as described there.

We may also need to add the [`@types/enzyme`](https://www.npmjs.com/package/@types/enzyme?activeTab=versions) module to add the type definitions for Enzyme.

# Drawbacks

## Conversion effort

The first and main drawback is: it will likely be a large job to convert Carbon to TypeScript.

Converting every single component, it's related styled components and spec files will take a while. Some may be simple, but some will be more complex, and running type checking against them may/will unearth bugs currently hidden. These will need to be fixed before the conversion will be complete. The flip side to that is we will likely find and fix bugs that are currently in our source code that we're not aware of.

## Developer training

Training will likely be needed for some, if not all, developers currently working on Carbon. Whilst training developers is never a bad thing, it will take time to complete and for developers to get comfortable using TypeScript on a day to day basis.

## TypeScript lifespan

TypeScript is generally expected to be around for the long run. However, if the JavaScript community moves away for it for whatever reason, future effort will be required to convert the library back to JavaScript.

# Alternatives

## Doing nothing

The simplest alternative is simply to keep Carbon as it is currently. Write components in JavaScript and continue to provide separate TypeScript interfaces for them. This would be far less initial effort than conversion to TypeScript but long term we will continue to see issues raised and continue to have to maintain all of our component prop types in two places. This goes against the DRY principle of software development and will without a doubt continue to cause us problems.

## Removing TypeScript support

This is out of the question really as we know for a fact that a lot of consumers of Carbon are TypeScript projects. To be a good modern open source component library we should be supporting TypeScript.

# Adoption strategy

If this RFC PR is accepted we will need to create a task to carry out this conversion.

This work can be carried out one component at a time if necessary, as long as the config detailed [above](#config) is updated first. This will allow both existing JavaScript components and ones converted to TypeScript to be copied into the lib folder correctly, with both a transpiled `.js` file and corresponding `.d.ts` file.

This shouldn't be a breaking change for our consumers. The TypeScript components will still be transpiled to JavaScript and TypeScript definition files will still be provided per component. The commits will likely be `refactor` or `fix` depending on whether converting a component uncovers any bugs.

The [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) provides a handy guide for converting a JavaScript codebase to TypeScript.

# How we teach this

## Style guides

The TypeScript and coding style guides within Carbon should be updated and provide thorough guidance for both Carbon developers and third party developers wishing to make changes/submit a pull request.

## Training

Training should be provided for Carbon developers before the library is converted. This could potentially be a Pluralsight course or similar teaching how to use TypeScript with React.

## Documentation

There is lots of documentation available for React with TypeScript, styled-components with TypeScript etc as this is a very common technology stack at the time of writing. A list of useful docs can be provided from the Carbon documentation.
