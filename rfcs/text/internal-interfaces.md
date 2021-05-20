- Start Date: 2020-06-30

# Summary

Introduce `__internal__` folders to distinguish when components/utilities are not intended for use outside of this project.

Introduce `@private` and `@ignore` JSDoc annotations to document prop types.

# Basic example
```
.
└── src
    ├── components
    │   ├── __internal__
    │   │   └── example-two
    │   │       ├── example-two.component.js
    │   │       └── example-two.styles.js
    │   └── example
    │       ├── __internal__
    │       │   ├── example-c.component.js
    │       │   └── example.styles.js
    │       ├── example-a.component.js
    │       ├── example-b.component.js
    │       ├── index.d.ts
    │       └── index.js
    └── utils
        ├── __internal__
        │   ├── example-three.js
        │   └── example-two.js
        ├── example.d.ts
        └── example.js
```

In this example we can freely make changes to the files in the `src/components/example/__internal__` folder as they are
only consumed by the files in `src/components/example/`.

Consumers can directly import from `src/components/example/index.js` or from `src/components/example/example-a.component.js`.
We need to be mindful of breaking changes in these files.

The component in `src/components/__internal__/example-two` is used by two different components, therefore it is not
nested under a public component folder.

Generally we want to focus on publishing components and not utilities, however there may be some cases where this is required.
`src/utils/example.js` is considered public and `src/utils/__internal__/` is private.

```js
import React from 'react';
import PropTypes from 'prop-types';

const Example = ({ text = 'Hello World', enableSuperPower = false }) => {
// ...
};

Example.propTypes = {
  /**
   * This is a public prop
   */
  text: PropTypes.string,

  /**
   * This is a private prop, ignore excludes it from the prop table in storybook
   * @private
   * @ignore
   */
  enableSuperPower: PropTypes.bool
};

export Example;
```

# Motivation

1. We have no way to know if our consumers are using our internal components or props. This means a breaking change to the internal component requires a breaking change release for the project.

1. We have had a few instances where users are using undocumented props, or using documented props that are not clearly marked as internal.

# Detailed design

1. Components that are only used by us should be in an `__internal__` folder. The folder should be nested within the component if it is only used by one component, otherwise it should be in `src/__internal__`
1. `@private` JSDoc explicitly marks the prop as private
1. `@ignore` excludes the prop from Storybook.
1. Internal props should not be included in `d.ts` files.

# Drawbacks

1. Is it confusing that we'll have components that have not been refactored, are they inherently public because they're not in a `__internal__` folder?

# Alternatives

1. Add JSDoc but no `__internal__` folders, documenting that `Example.component.js` files are internal and that users should use the `index.js` to import the component.

The purpose of the `__internal__` folder name is to make it clear to reviewers that the consumer is using part of `carbon-react` internals. It should be clear to people that are unfamiliar with `carbon-react` and JavaScript development in general.

# Adoption strategy

1. Follow RFC for all new development
1. Refactoring older components can be done en masse, we can write a codemod to assist in the path changes.

# How we teach this

This RFC should serve as the source of truth, we can link to it in the getting started guide.

# Unresolved questions

N/A
